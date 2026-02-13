'use client'

import Link from "next/link";
import Image from "next/image";
import {ArrowDown} from "lucide-react";

const ExploreBtn = () => {
    return (
        <button type="button" id="explore-btn" className="mt-7 mx-auto">
            <Link href="#events">
                Explore Events
                <ArrowDown width={24} height={24} />
            </Link>
        </button>
    )
}
export default ExploreBtn
