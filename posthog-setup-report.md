# PostHog post-wizard report

The wizard has completed a deep integration of your DevEvent project. PostHog analytics has been configured with client-side initialization via `instrumentation-client.ts` (recommended for Next.js 15.3+), server-side tracking for API routes, and a reverse proxy setup for reliable event delivery. Five custom events have been instrumented to track key user interactions and business operations.

## Events instrumented

| Event Name | Description | File |
|------------|-------------|------|
| `event_booked` | User submits their email to book a spot at an event | `components/BookEvent.tsx` |
| `event_card_clicked` | User clicks on an event card to view event details | `components/EventCard.tsx` |
| `explore_events_clicked` | User clicks the explore events button to scroll to events section | `components/ExploreBtn.tsx` |
| `event_created` | Server-side: An event is successfully created via API | `app/api/events/route.ts` |
| `event_creation_failed` | Server-side: Event creation fails due to validation or server error | `app/api/events/route.ts` |

## Files created/modified

| File | Change |
|------|--------|
| `instrumentation-client.ts` | Created - Client-side PostHog initialization |
| `lib/posthog-server.ts` | Created - Server-side PostHog client |
| `next.config.ts` | Modified - Added reverse proxy rewrites for `/ingest` |
| `.env.local` | Modified - Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` |
| `components/BookEvent.tsx` | Modified - Added `event_booked` capture |
| `components/EventCard.tsx` | Modified - Added `event_card_clicked` capture, converted to client component |
| `components/ExploreBtn.tsx` | Modified - Added `explore_events_clicked` capture |
| `app/api/events/route.ts` | Modified - Added server-side `event_created` and `event_creation_failed` captures |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/313592/dashboard/1278846)

### Insights
- [Event Bookings Over Time](https://us.posthog.com/project/313592/insights/xPqNurn9) - Track booking activity over time
- [Event Card Clicks](https://us.posthog.com/project/313592/insights/uLrnBPu8) - Monitor user interest in events
- [Browse to Booking Conversion Funnel](https://us.posthog.com/project/313592/insights/sQsX8LTQ) - Measure conversion from exploration to booking
- [Event Creation Activity](https://us.posthog.com/project/313592/insights/kj4Xo6dF) - Monitor event creation success/failure rates
- [Total Event Bookings](https://us.posthog.com/project/313592/insights/qUdGlgFp) - Quick view of total bookings

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
