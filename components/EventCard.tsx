import {EventCardProps} from "@/types";
import Link from "next/link";
import Image from "next/image";
import {Calendar, Clock, MapPinIcon} from "lucide-react";

const EventCard = ({title, image, slug, location, date, time}: EventCardProps) => {
    return (
        <Link href={`/events/${slug}`} id='event-card'>
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
