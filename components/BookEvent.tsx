'use client'

import React, {useState} from "react";
import posthog from "posthog-js";
import {createBooking} from "@/lib/actions/booking.actions";

const BookEvent = ({eventId, slug}: { eventId: string, slug: string }) => {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const {success} = await createBooking({eventId, slug, email})

        if (success) {
            setSubmitted(true)

            // Capture event booking
            posthog.capture('event_booked', {
                eventId, slug
            })
            ;
        } else {
            console.error('Booking creation failed')
            posthog.captureException('Booking creation failed')
        }

    }

    return (
        <div id='book-event'>
            {submitted ? (
                <p className='text-sm'>Thank you for signing up!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id='email'
                            placeholder='Enter your email address'
                            name='email'
                            autoComplete='email'
                            required
                        />
                        <button type='submit' className='button-submit'>Submit</button>
                    </div>
                </form>
            )}
        </div>
    )
}
export default BookEvent
