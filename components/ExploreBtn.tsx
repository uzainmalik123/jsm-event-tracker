'use client'

import Link from "next/link";
import Image from "next/image";
import {ArrowDown} from "lucide-react";

const ExploreBtn = () => {
    return (
        <Link id="explore-btn" href="#events" className="mt-7 mx-auto inline-flex items-center gap-2">
            Explore Events
            <ArrowDown width={24} height={24}/>
        </Link>
    )
}
export default ExploreBtn
