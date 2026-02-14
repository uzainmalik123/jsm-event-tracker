'use client'

import {EventCardProps} from "@/types";
import Link from "next/link";
import Image from "next/image";
import {Calendar, Clock, MapPinIcon} from "lucide-react";
import posthog from "posthog-js";

const EventCard = ({title, image, slug, location, date, time}: EventCardProps) => {
    const handleClick = () => {
        posthog.capture('event_card_clicked', {
            event_title: title,
            event_slug: slug,
            event_location: location,
            event_date: date,
        });
    };

    return (
        <Link href={`/events/${slug}`} id='event-card' onClick={handleClick}>
            <Image src={image} alt={`${title} poster`} width={410} height={300} className="poster"/>
            <div className="flex gap-2 items-center">
                <MapPinIcon width={14} height={14}/>
                <p>{location}</p>
            </div>
            <p className="title">{title}</p>
            <div className="datetime">
                <div className='flex items-center'>
                    <Calendar width={14} height={14} />
                    <p>{date}</p>
                </div>
                <div className='flex items-center'>
                    <Clock width={14} height={14} />
                    <p>{time}</p>
                </div>
            </div>
        </Link>
    )
}
export default EventCard
