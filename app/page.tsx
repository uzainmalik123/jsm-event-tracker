import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database";
import {cacheLife} from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Home() {
    'use cache'

    cacheLife('hours')

    if (!BASE_URL) {
        console.error('NEXT_PUBLIC_BASE_URL is not configured');
        return <section className='flex flex-col items-center'><p>Configuration error</p></section>;
    }

    const response = await fetch(`${BASE_URL}/api/events`);

    if (!response.ok) {
        console.error('Failed to fetch events:', response.status);
        return <section className='flex flex-col items-center'><p>Failed to load events</p></section>;
    }

    const {events} = await response.json();

    return (
        <section className='flex flex-col items-center'>
            <h1 className="text-center">The Hub for Every Dev <br/> Event You Can't Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in one place</p>

            <ExploreBtn/>

            <div id='events' className='mt-20 space-y-7'>
                <h3>Featured Events</h3>

                <ul className='events'>
                    {events && events.length > 0 && events.map((event: IEvent) => (
                        <li className='list-none' key={event.slug}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>

    );
}
