import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import {v2 as cloudinary} from 'cloudinary'
import Event from "@/database/event.model";
import {getPostHogClient} from "@/lib/posthog-server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData()
        let event;
        let agenda
        let tags

        try {
            event = Object.fromEntries(formData.entries())

            agenda = JSON.parse(formData.get('agenda') as string);
            tags = JSON.parse(formData.get('tags') as string);
        } catch (e) {
            return NextResponse.json({
                message: 'Invalid form data',
                error: e instanceof Error ? e.message : 'Unknown error'
            }, {status: 400});
        }

        const file = formData.get('image') as File;

        if (!file) return NextResponse.json({message: 'Image file is required'}, {status: 400});

        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer: Buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'DevEvent'}, (error, result) => {
                if (error) return reject(new Error('Network timeout'));
                resolve(result);
            }).end(fileBuffer);
        })

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create({
            ...event,
            agenda: agenda,
            tags: tags
        })

        // Capture server-side event creation
        const posthog = getPostHogClient();
        const distinctId = req.headers.get('x-posthog-distinct-id') || 'anonymous';
        posthog.capture({
            distinctId,
            event: 'event_created',
            properties: {
                event_title: createdEvent.title,
                event_slug: createdEvent.slug,
                event_mode: createdEvent.mode,
                event_location: createdEvent.location,
                tags_count: tags.length,
                source: 'api'
            }
        });
        await posthog.shutdown();

        return NextResponse.json({message: 'Event created successfully', event: createdEvent}, {status: 201})
    } catch (e) {
        console.error(e);

        // Capture server-side event creation failure
        const posthog = getPostHogClient();
        const distinctId = req.headers.get('x-posthog-distinct-id') || 'anonymous';
        posthog.capture({
            distinctId,
            event: 'event_creation_failed',
            properties: {
                error_message: e instanceof Error ? e.message : 'Unknown Error',
                source: 'api'
            }
        });
        await posthog.shutdown();

        return NextResponse.json({
            message: 'Event creation failed',
            err: e instanceof Error ? e.message : 'Unknown Error'
        }, {status: 400});
    }
}

export async function GET() {
    try {
        await connectDB();
        const events = await Event.find().sort({createdAt: -1});
        return NextResponse.json({message: 'Events fetched successfully', events}, {status: 200});
    } catch (e) {
        return NextResponse.json({
            message: 'Event fetching failed',
            error: e instanceof Error ? e.message : 'Unknown Error'
        }, {status: 500})
    }
}