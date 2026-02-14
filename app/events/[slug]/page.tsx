import {notFound} from "next/navigation";
import Image from "next/image";
import {Calendar, Clock, ComputerIcon, LucideIcon, MapPinIcon, PersonStandingIcon} from "lucide-react";
import connectDB from "@/lib/mongodb";
import Event, {IEvent} from '@/database/event.model'
import BookEvent from "@/components/BookEvent";
import {getSimilarEvents} from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";
import {cacheLife} from "next/cache";

const EventDetailItem = ({Icon, label}: { Icon: LucideIcon, label: string }) => (
    <div className='flex-row-gap-2 items-center'>
        <Icon width={17} height={17} />
        <p>{label}</p>
    </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className='agenda'>
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ eventTags }: { eventTags: string[] }) => (
    <div className='flex gap-1.5 flex-wrap'>
        {eventTags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)

const EventDetails = async ({params}: { params: Promise<{ slug: string }> }) => {
    const {slug} = await params;

    'use cache'
    cacheLife('hours')


    await connectDB()
    const event = await Event.findOne({slug}).lean()

    if (!event) return notFound()

    const { description, image, overview, organizer, date, time, location, mode, agenda, audience, tags } = event;

    const bookings = 10

    const similarEvents: IEvent[] = await getSimilarEvents(slug)

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p className='mt-2'>{description}</p>
            </div>

            <div className="details">
                <div className="content">
                    <Image src={image} alt='Event Banner' width={800} height={800} className='banner'/>

                    <section className='flex-col-gap-2'>
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className='flex-col-gap-2'>
                        <h2>Event Details</h2>
                        <EventDetailItem Icon={Calendar} label={date} />
                        <EventDetailItem Icon={Clock} label={time} />
                        <EventDetailItem Icon={MapPinIcon} label={location} />
                        <EventDetailItem Icon={ComputerIcon} label={mode} />
                        <EventDetailItem Icon={PersonStandingIcon} label={audience} />
                    </section>

                    <EventAgenda agendaItems={agenda} />

                    <section className='flex-col-gap-2'>
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags eventTags={tags} />
                </div>
                <aside className='booking'>
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className='text-sm'>Join {bookings} people who have already booked their spot!</p>
                        ) : (
                            <p className='text-sm'>Be the first to book your spot!</p>
                        )}
                        <BookEvent
                            eventId={event._id.toString()}
                            slug={event.slug}
                        />
                    </div>
                </aside>
            </div>

            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((event) => (
                        <EventCard key={event.slug} {...event} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default EventDetails
