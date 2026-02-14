'use client'

import Link from "next/link";
import {ArrowDown} from "lucide-react";
import posthog from "posthog-js";

const ExploreBtn = () => {
    const handleClick = () => {
        posthog.capture('explore_events_clicked');
    };

    return (
        <Link id="explore-btn" href="#events" className="mt-7 mx-auto inline-flex items-center gap-2" onClick={handleClick}>
            Explore Events
            <ArrowDown width={24} height={24}/>
        </Link>
    )
}
export default ExploreBtn
