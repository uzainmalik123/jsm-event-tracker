import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";

import {events} from "@/constants";

export default function Home() {
    return (
        <section className='flex flex-col items-center'>
            <h1 className="text-center">The Hub for Every Dev <br/> Event You Can't Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in one place</p>

            <ExploreBtn />

            <div id='events' className='mt-20 space-y-7'>
                <h3>Featured Events</h3>

                <ul className='events'>
                    {events.map((event) => (
                        <li className='list-none' key={event.slug}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>

    );
}
