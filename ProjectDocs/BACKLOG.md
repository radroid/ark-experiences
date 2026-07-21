# ARK Experiences — Product Backlog

> Last updated: 2026-02-13

## Priority Legend

| Priority | Meaning | Guidance |
|----------|---------|----------|
| **P0** | Must-have / Foundation | Blocks other work; build first |
| **P1** | High | Core user-facing value; build soon after P0 |
| **P2** | Medium | Important but not blocking; can parallelize |
| **P3** | Nice-to-have | Polish, optimization, future iteration |

## Dependency Map

```
Epic 1 (Booking Platform)
  └── 1.1 Event data model ─────────────┐
  └── 1.2 Event listing page            │
  └── 1.3 Event detail page             │
  └── 1.4 Calendar view                 │
  └── 1.5 Stripe integration ───────────┤
  └── 1.6 Booking flow ────────────────►│ requires 1.1 + 1.5
  └── 1.7 Early-bird pricing            │ requires 1.6
  └── 1.8 Booking confirmation          │ requires 1.6
  └── 1.9 Waitlist                      │ requires 1.1 + 1.3 + 2.1
                                        │
Epic 2 (Auth & User Profiles)           │
  └── 2.1 Clerk integration ────────────┤
  └── 2.2 Auth pages                    │ requires 2.1
  └── 2.3 User profile page             │ requires 2.1
  └── 2.4 Booking history ─────────────►│ requires 2.1 + 1.6
  └── 2.5 Manage bookings               │ requires 2.4
  └── 2.6 Performance history           │ requires 2.1
                                        │
Epic 3 (Admin Dashboard — Retool)        │
  └── 3.1 Convex HTTP API layer ────────┤ requires 1.1 + 1.5
  └── 3.2 Admin role in Clerk           │ requires 2.1
  └── 3.3 Retool app setup              │ requires 3.1 + 3.2
  └── 3.4 Retool: event mgmt            │ requires 3.3
  └── 3.5 Retool: user & booking mgmt   │ requires 3.3
  └── 3.6 Retool: billing & refunds     │ requires 3.3
                                        │
Epic 4 (Partnerships / B2B)             │
  └── 4.1 Partnership landing page      │ independent
  └── 4.2 Cal.com booking widget        │ independent
  └── 4.3 Partnership inquiry form      │ independent
```

---

## Epic 1: Event Booking Platform

The core commerce engine — lets users discover events, view a calendar, and pay to book.

---

### 1.1 — Event Data Model & Convex Schema

**Priority:** P0
**Type:** Backend / Infrastructure
**Story:** _As a developer, I need a robust data model for events so that all downstream features (listing, booking, payments) have a consistent source of truth._

**Tasks:**

- [ ] Design the Convex schema for `events` table (title, description, date/time, location as free-text string, city defaulting to "Toronto", capacity, price, earlyBirdPrice, status, imageUrl, slug)
- [ ] Design the Convex schema for `bookings` table (userId, eventId, status, stripePaymentIntentId, amount, ticketCount, bookedAt, cancelledAt)
- [ ] Create Convex mutations: `createEvent`, `updateEvent`, `cancelEvent`
- [ ] Create Convex queries: `listUpcomingEvents`, `getEventBySlug`, `getEventById`, `getAvailableCapacity`
- [ ] Add seed data script for local development with 3-5 sample events
- [ ] Write schema validation (capacity > 0, max 12 participants per event, date in future for new events, price >= 0, max 6 tickets per booking)

**Acceptance Criteria:**
- Events can be created, read, updated through Convex functions
- Available capacity decrements by `ticketCount` when bookings are placed
- Event status lifecycle: `draft` → `published` → `sold_out` → `completed` → `cancelled`
- Location is a free-text field (Toronto-only for now; multi-city support later)

---

### 1.2 — Event Listing Page

**Priority:** P0
**Type:** Frontend
**Depends on:** 1.1
**Story:** _As a visitor, I want to see all upcoming events so I can decide which one to attend._

**Tasks:**

- [ ] Create `/events` route with server component page
- [ ] Build `EventCard` component (date, title, location, price, spots remaining, CTA)
- [ ] Query upcoming events from Convex (real-time subscription for live capacity)
- [ ] Add empty state when no events are scheduled
- [ ] Add filtering: upcoming vs past (default to upcoming)
- [ ] Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- [ ] Add link to this page in the main site navigation

**Acceptance Criteria:**
- Page loads with all published events sorted by date ascending
- Sold-out events show "Sold Out" badge instead of price
- Capacity updates in real-time without page refresh (Convex subscription)

---

### 1.3 — Event Detail Page

**Priority:** P0
**Type:** Frontend
**Depends on:** 1.1
**Story:** _As a visitor, I want to see full details of an event before I decide to book._

**Tasks:**

- [ ] Create `/events/[slug]` dynamic route
- [ ] Build event detail layout (hero image, title, date/time, location, description, price, capacity indicator)
- [ ] Add "Book Now" CTA button (disabled when sold out; replaced by "Join Waitlist" — see 1.9)
- [ ] Add Google Maps embed or link for location
- [ ] Add structured data (JSON-LD) for SEO (Event schema)
- [ ] Add social sharing meta tags (Open Graph)

**Acceptance Criteria:**
- Displays all event information clearly
- "Book Now" button is prominent and leads to booking flow
- Sold-out events show "Join Waitlist" CTA instead (see 1.9)
- Page is indexable with proper meta tags

---

### 1.4 — Calendar View Component

**Priority:** P2
**Type:** Frontend
**Depends on:** 1.1
**Story:** _As a visitor, I want to see events on a calendar so I can quickly find events on dates that work for me._

**Tasks:**

- [ ] Evaluate calendar libraries (react-big-calendar, @schedule-x/react, custom with date-fns)
- [ ] Build monthly calendar view showing event dots/chips on dates
- [ ] Click on a date → show events for that day
- [ ] Click on event chip → navigate to event detail page
- [ ] Mobile-friendly: list view fallback on small screens
- [ ] Integrate on `/events` page as a toggle (list view / calendar view)

**Acceptance Criteria:**
- Calendar renders current month with event indicators
- Navigation between months works
- Events are clickable and link to detail pages
- Accessible (keyboard navigation, screen reader labels)

---

### 1.5 — Stripe Integration (Payments Infrastructure)

**Priority:** P0
**Type:** Backend / Infrastructure
**Story:** _As a developer, I need Stripe integrated so we can accept payments for event bookings._

**Tasks:**

- [ ] Create Stripe account (product owner will do this) and obtain API keys
- [ ] Add `stripe` npm package
- [ ] Create Convex HTTP action for Stripe Checkout Session creation (takes eventId, userId, returns checkout URL)
- [ ] Create Stripe webhook endpoint (`/api/stripe/webhook`) to handle: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
- [ ] Map Stripe webhook events to Convex mutations (create booking on success, update status on refund)
- [ ] Store Stripe customer ID on user record for future payments
- [ ] Add environment variables: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Set up Stripe test mode for development
- [ ] Create utility for formatting prices (cents to dollars display)

**Acceptance Criteria:**
- Checkout redirects to Stripe, returns to success/cancel page
- Webhook correctly creates bookings on payment success
- Refunds via Stripe dashboard update booking status in Convex
- Works in both test and live Stripe modes

---

### 1.6 — Booking Flow (End-to-End)

**Priority:** P0
**Type:** Full-stack
**Depends on:** 1.1, 1.5, 2.1
**Story:** _As a user, I want to book one or more tickets for an event and pay so I can secure spots for myself and friends._

**Tasks:**

- [ ] Add "Book Now" button on event detail page → checks auth (redirect to sign-in if not authenticated)
- [ ] Build booking confirmation page: event summary, **ticket quantity selector** (1–6, capped by remaining capacity), price breakdown (unit price × quantity)
- [ ] Integrate Stripe Checkout: pass `quantity` to Checkout Session line item, redirect to Stripe
- [ ] Build `/events/[slug]/success` page (booking confirmation with details + ticket count)
- [ ] Build `/events/[slug]/cancel` page (payment cancelled, try again CTA)
- [ ] **Friend invite flow:** On the success page, prompt the user to invite friends for the extra tickets — collect name + email per extra ticket. Send invite emails via Resend with event details and a **sign-up CTA** (each participant must have their own account). Invite email links to `/sign-up` with a redirect back to the event page.
- [ ] Create Convex mutation to reserve spots (optimistic, reserves `ticketCount` spots, released if payment fails within timeout)
- [ ] Handle race condition: check remaining capacity ≥ requested ticket count before creating Checkout Session
- [ ] Send booking confirmation email via Resend (event details, date, location, number of tickets)

**Acceptance Criteria:**
- User can select 1–6 tickets and pay in a single Stripe Checkout
- Capacity decrements by the full ticket count atomically
- After payment, user is prompted to invite friends (each friend must create their own account)
- Invite emails include sign-up link + event info
- Double-booking is prevented (capacity check is atomic against ticket count)
- Confirmation email includes ticket quantity
- Abandoned checkouts release all reserved spots after 30 minutes

---

### 1.7 — Early-Bird / Supporter Pricing

**Priority:** P2
**Type:** Full-stack
**Depends on:** 1.6
**Story:** _As an early supporter, I want access to discounted tickets so I feel rewarded for supporting ARK early._

**Tasks:**

- [ ] Add `earlyBirdPrice`, `earlyBirdDeadline`, `earlyBirdCapacity` fields to event schema
- [ ] Display early-bird pricing on event card and detail page when applicable
- [ ] Show countdown or "X early-bird spots left" messaging
- [ ] Automatically switch to regular pricing when deadline passes or early-bird capacity fills
- [ ] Apply correct price in Stripe Checkout Session based on timing/availability

**Acceptance Criteria:**
- Early-bird pricing displays with clear visual distinction from regular price
- Price transition happens automatically with no manual intervention
- Stripe charges the correct amount based on when the user checks out

---

### 1.8 — Booking Confirmation & Email Notifications

**Priority:** P1
**Type:** Full-stack
**Depends on:** 1.6
**Story:** _As a user, I want confirmation of my booking via email so I have a record and reminder._

**Tasks:**

- [ ] Design booking confirmation email template (event name, date, time, location, map link, booking reference)
- [ ] Send confirmation email via Resend on successful payment (Convex action triggered by webhook)
- [ ] Send reminder email 24 hours before event (Convex scheduled function)
- [ ] Send post-event thank-you email with feedback link (Convex scheduled function)
- [ ] Add booking reference number generation (human-readable, e.g., ARK-2026-0001)

**Acceptance Criteria:**
- Confirmation email arrives within 1 minute of payment
- Email contains all info needed to attend (no login required to view)
- Reminder email fires 24h before event start time

---

### 1.9 — Waitlist for Sold-Out Events

**Priority:** P1
**Type:** Full-stack
**Depends on:** 1.1, 1.3, 2.1
**Story:** _As a user, I want to join a waitlist for a sold-out event so I get notified when a spot opens up._

**Tasks:**

- [ ] Add `waitlist` Convex table (userId, eventId, joinedAt, status: `waiting` | `notified` | `converted` | `expired`)
- [ ] Add "Join Waitlist" button on event detail page when event is sold out (replaces "Book Now")
- [ ] Requires authentication — redirect to sign-in if not logged in, then return to event page
- [ ] Create Convex mutation: `joinWaitlist` (validates event is sold out, user not already on waitlist)
- [ ] Show waitlist position to the user (e.g., "You are #3 on the waitlist")
- [ ] On cancellation (2.5) or capacity increase: trigger waitlist notification flow
  - Find next user(s) on the waitlist (FIFO order)
  - Send email via Resend: "A spot opened up! Book your ticket now" with direct link to event page
  - Mark waitlist entry as `notified`, set expiry window (e.g., 24h to claim)
  - If not claimed within window, notify next person in line and mark as `expired`
- [ ] Create Convex scheduled function to handle expiry checks
- [ ] User dashboard: show events the user is waitlisted for (under 2.4 bookings page or separate tab)

**Acceptance Criteria:**
- Users can join a waitlist without paying
- When a spot opens, the next waitlisted user gets an email via Resend
- Notified user has a 24h window to book before the spot goes to the next person
- No payment is taken for waitlist — user goes through normal booking flow (1.6) when claiming their spot

---

## Epic 2: User Authentication & Profiles (Clerk)

User identity layer — sign up, manage bookings, view history.

---

### 2.1 — Clerk Integration (Shared Instance)

**Priority:** P0
**Type:** Infrastructure
**Story:** _As a developer, I need authentication set up so users can create accounts and we can associate bookings with them._

**Decision:** Uses the **same Clerk application** as the companion player app. Users have one account across both apps.

**Tasks:**

- [ ] Install `@clerk/nextjs`
- [ ] Configure ClerkProvider in `src/app/layout.tsx` (alongside existing ConvexProvider)
- [ ] Obtain Clerk keys from the existing shared Clerk application (same instance as companion app)
- [ ] Set up Clerk environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) using the shared app's keys
- [ ] Configure Clerk + Convex integration (add a JWT template in Clerk for this app's Convex deployment)
- [ ] Update `ConvexProviderWithClerk` wrapper to pass Clerk auth to Convex
- [ ] Set up Clerk middleware (`src/middleware.ts`) for protected routes
- [ ] Define public routes (homepage, `/events`, `/events/[slug]`, `/partnerships`, `/blog/*`)
- [ ] Define protected routes (`/dashboard/*`, `/bookings/*`, `/profile/*`)
- [ ] Store Clerk user ID (`clerkId`) in Convex `users` table on first sign-in (webhook or on-demand)
- [ ] Verify that existing users from the companion app can sign in without re-registering

**Acceptance Criteria:**
- Users can sign up / sign in via Clerk
- Existing companion app users can log in seamlessly (shared identity)
- Authenticated state is available in both client and server components
- Convex functions can access the authenticated user's identity
- Unauthenticated users can still browse events and the homepage

---

### 2.2 — Auth Pages (Sign In / Sign Up)

**Priority:** P0
**Type:** Frontend
**Depends on:** 2.1
**Story:** _As a visitor, I want a clean sign-up/sign-in experience that fits the ARK brand._

**Tasks:**

- [ ] Create `/sign-in/[[...sign-in]]` route with Clerk `<SignIn />` component
- [ ] Create `/sign-up/[[...sign-up]]` route with Clerk `<SignUp />` component
- [ ] Style Clerk components to match ARK design system (Clerk theming / appearance prop)
- [ ] Add sign-in/sign-up buttons to site header (conditionally show user avatar when logged in)
- [ ] Configure redirect URLs (after sign-in → back to previous page or `/dashboard`)
- [ ] Enable Google OAuth in Clerk (may already be configured on the shared instance from companion app)
- [ ] Apple login deferred — product owner will set up later

**Acceptance Criteria:**
- Auth pages match the site's visual identity
- Google login works as a sign-up / sign-in option
- Redirect after auth is seamless (returns to the page user was on)
- Header shows auth state (sign in button vs user menu)

---

### 2.3 — User Profile Page

**Priority:** P1
**Type:** Frontend
**Depends on:** 2.1
**Story:** _As a user, I want to view and manage my profile information._

**Tasks:**

- [ ] Create `/dashboard/profile` route
- [ ] Display user info from Clerk (name, email, avatar)
- [ ] Add Clerk `<UserProfile />` component for self-service account management
- [ ] Show account creation date and total events attended
- [ ] Add navigation sidebar/tabs for dashboard sections (Profile, Bookings, Performance)

**Acceptance Criteria:**
- User can view their profile details
- User can update their name, email, and avatar through Clerk's UI
- Dashboard navigation is clear and consistent across all dashboard pages

---

### 2.4 — Booking History

**Priority:** P1
**Type:** Full-stack
**Depends on:** 2.1, 1.6
**Story:** _As a user, I want to see my past and upcoming bookings so I can keep track of my events._

**Tasks:**

- [ ] Create `/dashboard/bookings` route
- [ ] Create Convex query: `getBookingsByUser` (returns bookings with joined event data)
- [ ] Build booking list with tabs: "Upcoming" and "Past"
- [ ] Each booking card shows: event name, date, status, booking reference, amount paid
- [ ] Upcoming bookings show countdown (e.g., "In 3 days")
- [ ] Past bookings link to performance history if available
- [ ] Empty states for both tabs

**Acceptance Criteria:**
- All user bookings are displayed with correct categorization
- Real-time updates (if a booking is cancelled, it moves/updates immediately)
- Booking reference is copyable

---

### 2.5 — Manage Bookings (Cancel / Transfer)

**Priority:** P2
**Type:** Full-stack
**Depends on:** 2.4
**Story:** _As a user, I want to cancel or modify my booking if my plans change._

**Cancellation Policy (confirmed):**
- **48h+ before event:** Full refund (100%)
- **24–48h before event:** 50% refund
- **< 24h before event:** No refund

**Tasks:**

- [ ] Add "Cancel Booking" button on upcoming booking cards
- [ ] Build cancellation confirmation modal showing the applicable refund tier based on event date
- [ ] Create Convex action: `cancelBooking` (calculates refund % from time-to-event, triggers Stripe refund, updates booking status)
- [ ] Implement refund tier logic as a shared utility (reusable by admin Retool workflows)
- [ ] Send cancellation confirmation email via Resend (include refund amount or "no refund" notice)
- [ ] Restore event capacity on cancellation
- [ ] Add booking transfer option (change attendee name/email) — stretch goal

**Acceptance Criteria:**
- Users can self-service cancel with the exact refund amount shown before confirming
- Refund is processed automatically: 100% if 48h+, 50% if 24-48h, $0 if <24h
- Event capacity is restored atomically on cancellation

---

### 2.6 — Performance / Game History

**Priority:** P3
**Type:** Full-stack
**Depends on:** 2.1
**Story:** _As a returning player, I want to see my scores and performance from past events so I can track my improvement._

**Architecture note:** Performance data lives in the **companion app's Convex deployment** (separate from this website's deployment). Both apps share the same Clerk user ID, which is the join key. Data must be synced or fetched cross-deployment.

**Status:** Low priority. The companion app's data schema is actively evolving. Product owner will provide a CSV of sample data and finalize the schema before this item is picked up.

**Tasks:**

- [ ] Design sync strategy (pick one):
  - **Option A — Pull on demand:** Website's Convex calls companion's Convex HTTP API (using `httpAction`) to fetch performance data by Clerk user ID. Cached locally with TTL.
  - **Option B — Push via webhook:** Companion app sends performance data to website's Convex via HTTP endpoint after each game. Website stores a local copy in a `performances` table.
  - **Option C — Shared read-only access:** Expose a read-only Convex HTTP endpoint on the companion deployment; website queries it directly from the client.
- [ ] Implement the chosen sync mechanism
- [ ] Design `performances` Convex table once companion app schema is finalized (schema TBD — product owner will provide sample CSV)
- [ ] Create `/dashboard/performance` route
- [ ] Build performance cards: event name, date, score, rank, team
- [ ] Add summary stats (total events, average score/rank, best performance)
- [ ] Empty state with CTA to book first event

**Acceptance Criteria:**
- Users see a history of their game performances (sourced from companion app data)
- Stats are aggregated correctly
- Data is linked by shared Clerk user ID across both deployments

---

## Epic 3: Admin Dashboard (Retool)

Back-office tools for game hosts and admins, built with **Retool** for speed and reliability. This means the UI lives in Retool (not in this codebase). Our job is to build the **API layer** that Retool connects to, plus admin role gating.

---

### 3.1 — Convex HTTP API Layer for Retool

**Priority:** P1
**Type:** Backend
**Depends on:** 1.1, 1.5
**Story:** _As a developer, I need a set of HTTP endpoints that Retool can call to read and write platform data._

Retool connects to backends via REST APIs. Convex supports [HTTP actions](https://docs.convex.dev/functions/http-actions) which expose HTTP endpoints. We build these so Retool can CRUD all admin data.

**Tasks:**

- [ ] Create `convex/http.ts` with a Convex HTTP router for admin endpoints
- [ ] **Event endpoints:**
  - `GET /admin/events` — list all events (with filters: status, date range)
  - `GET /admin/events/:id` — get event detail
  - `POST /admin/events` — create event
  - `PATCH /admin/events/:id` — update event (including status transitions)
  - `DELETE /admin/events/:id` — cancel/archive event
- [ ] **Booking endpoints:**
  - `GET /admin/bookings` — list all bookings (with filters: eventId, status, userId, date range)
  - `GET /admin/bookings/:id` — get booking detail (with joined event + user data)
  - `POST /admin/bookings` — create manual booking (comp/walk-in, no Stripe)
  - `PATCH /admin/bookings/:id` — update booking (cancel, mark attendance)
  - `POST /admin/bookings/:id/refund` — trigger Stripe refund (full or partial, applies cancellation policy)
- [ ] **User endpoints:**
  - `GET /admin/users` — list users (with search by name/email, pagination)
  - `GET /admin/users/:id` — get user detail (with booking history)
  - `PATCH /admin/users/:id` — update user metadata (ban, notes)
- [ ] **Billing endpoints:**
  - `GET /admin/billing/revenue` — revenue summary (total, by event, by date range)
  - `GET /admin/billing/refunds` — refund history
- [ ] **Dashboard endpoints:**
  - `GET /admin/dashboard/metrics` — key metrics (total users, upcoming events, recent bookings, revenue)
- [ ] Add admin auth middleware to all `/admin/*` HTTP actions (verify Clerk JWT + admin role from token claims)
- [ ] Return consistent JSON response format: `{ data, error, pagination }`
- [ ] Add image upload endpoint (Convex file storage) for event images

**Acceptance Criteria:**
- All endpoints return well-structured JSON
- Non-admin requests receive 401/403
- Endpoints are documented (input params, response shape) for Retool configuration
- Refund endpoint correctly applies the cancellation policy (100% if 48h+, 50% if 24-48h, $0 if <24h)

---

### 3.2 — Admin Role in Clerk

**Priority:** P1
**Type:** Infrastructure
**Depends on:** 2.1
**Story:** _As a developer, I need an admin role defined so we can gate access to admin tools._

**Tasks:**

- [ ] Define admin role using Clerk public metadata (`{ role: "admin" }`) on the shared Clerk instance
- [ ] Assign admin role to initial admin users via Clerk Dashboard
- [ ] Create a Convex utility to verify admin role from Clerk JWT claims (used by HTTP action middleware in 3.1)
- [ ] Configure the Clerk JWT template to include `publicMetadata.role` in token claims
- [ ] Document how to grant/revoke admin access (Clerk Dashboard → User → Public Metadata)

**Acceptance Criteria:**
- Admin role is readable from Clerk JWT in Convex HTTP actions
- Non-admin users cannot call admin API endpoints
- Adding/removing admin access is a Clerk Dashboard operation (no code deploy needed)

---

### 3.3 — Retool App Setup & Connection

**Priority:** P1
**Type:** Configuration (Retool)
**Depends on:** 3.1, 3.2
**Story:** _As a developer, I need to configure Retool to connect to our Convex HTTP API so admins have a working dashboard._

**Tasks:**

- [ ] Create a Retool application for ARK Admin
- [ ] Configure REST API resource in Retool pointing to Convex HTTP actions base URL
- [ ] Set up authentication headers (admin Clerk JWT passed as Bearer token)
- [ ] Build the main navigation layout in Retool (Events, Bookings, Users, Billing, Dashboard)
- [ ] Create a dashboard home page with key metrics (calls `GET /admin/dashboard/metrics`)
- [ ] Configure Retool access: invite game hosts and admins

**Acceptance Criteria:**
- Retool app connects to Convex API successfully
- Dashboard home page displays live metrics
- Only invited team members can access the Retool app

---

### 3.4 — Retool: Event Management

**Priority:** P1
**Type:** Configuration (Retool)
**Depends on:** 3.3
**Story:** _As an admin, I want to create and manage events so I can publish new experiences without developer help._

**Tasks:**

- [ ] Build events table view in Retool (list all events with status filters)
- [ ] Build event create/edit form (title, description, date/time, location, capacity, pricing, image upload)
- [ ] Add status transition buttons (draft → published, published → cancelled)
- [ ] Add "Duplicate Event" action (pre-fills form with existing event data)
- [ ] Add per-event attendee list with CSV export
- [ ] Add "Preview on Site" link that opens `/events/[slug]` in a new tab

**Acceptance Criteria:**
- Admins can create, edit, and publish events entirely from Retool
- Event form validates required fields before submission
- Image upload works through the Convex file storage endpoint

---

### 3.5 — Retool: User & Booking Management

**Priority:** P1
**Type:** Configuration (Retool)
**Depends on:** 3.3
**Story:** _As an admin, I want to search users and manage bookings so I can handle support requests._

**Tasks:**

- [ ] Build users table with search (name/email), pagination, and click-through detail view
- [ ] User detail view: profile info, booking history, total events attended
- [ ] Add actions: disable/ban user (calls Clerk Admin API via Convex HTTP action)
- [ ] Build bookings table with filters (event, status, date range)
- [ ] Booking detail view: event info, user info, payment details, status
- [ ] Add "Create Manual Booking" form (for walk-ins/comp tickets)
- [ ] Add "Cancel Booking" action with refund tier displayed (uses cancellation policy)
- [ ] Add attendance marking: check-in / no-show toggle per booking
- [ ] Add CSV export for bookings (filtered by event)

**Acceptance Criteria:**
- Admins can find any user or booking within seconds
- Manual booking creation works without requiring Stripe payment
- Cancellation action shows the refund amount before confirming

---

### 3.6 — Retool: Billing & Refunds

**Priority:** P2
**Type:** Configuration (Retool)
**Depends on:** 3.3
**Story:** _As an admin, I want to view revenue and process refunds without logging into Stripe._

**Tasks:**

- [ ] Build revenue dashboard: total revenue, revenue by event (chart + table), refunds issued
- [ ] Build per-booking payment detail view (Stripe payment intent ID, amount, status, payment method)
- [ ] Add "Issue Refund" action with amount input (full or partial)
- [ ] Display refund history per booking
- [ ] Add "Open in Stripe" link for edge cases (escape hatch)
- [ ] Add date-range revenue filtering and export

**Acceptance Criteria:**
- Admins can issue full or partial refunds from Retool
- Refund is reflected in booking status immediately
- Revenue charts update when new payments/refunds occur

---

## Epic 4: Partnerships / B2B

A separate funnel for community leaders and event organizers who want to partner with ARK.

---

### 4.1 — Partnership Landing Page

**Priority:** P2
**Type:** Frontend
**Story:** _As a community leader or event organizer, I want to understand what ARK offers so I can decide if partnering makes sense for my community._

**Tasks:**

- [ ] Create `/partnerships` route
- [ ] Build hero section: value proposition for partners (not players)
- [ ] Add sections: what we offer, how it works for partners, past partnership examples/testimonials
- [ ] Add stats/social proof (events hosted, participants served, satisfaction scores)
- [ ] Responsive design matching site identity
- [ ] Add "Partner with Us" CTA prominently throughout
- [ ] Add link in site footer and potentially main navigation

**Acceptance Criteria:**
- Page clearly communicates the partnership value proposition
- CTAs lead to booking a call (4.2) or inquiry form (4.3)
- Content structure is built with placeholder sections; final copy to be provided by product owner

---

### 4.2 — Cal.com "Book a Call" Integration

**Priority:** P2
**Type:** Frontend
**Depends on:** 4.1
**Story:** _As a potential partner, I want to easily schedule a call with the ARK team to discuss partnership opportunities._

**Tasks:**

- [ ] Create a "Partnership Discussion" event type in the existing Cal.com account (30 min)
- [ ] Embed Cal.com widget on partnerships page (inline or modal)
- [ ] Option A: Use Cal.com embed snippet (`@calcom/embed-react`)
- [ ] Option B: Simple "Book a Call" button linking to Cal.com hosted page
- [ ] Style the embed to match ARK design system as much as possible
- [ ] Add Cal.com link as CTA in partnership page sections

**Acceptance Criteria:**
- Users can book a call directly from the partnerships page without leaving the site (embed) or with a clear redirect (link)
- Calendar shows real-time availability
- Booking confirmation is handled by Cal.com (email to both parties)

---

### 4.3 — Partnership Inquiry Form

**Priority:** P3
**Type:** Full-stack
**Story:** _As a potential partner who isn't ready for a call, I want to submit an inquiry so the ARK team can follow up._

**Tasks:**

- [ ] Build inquiry form on `/partnerships` page (organization name, contact name, email, event type/size, message)
- [ ] Create Convex mutation to store partnership inquiries (`partnershipInquiries` table)
- [ ] Send notification email to ARK team via Resend when inquiry is submitted
- [ ] Send confirmation email to the inquirer
- [ ] Add inquiry management to admin dashboard (Epic 3 extension)

**Acceptance Criteria:**
- Form submissions are stored in Convex and trigger team notification
- Inquirer receives a confirmation email
- Admins can view and respond to inquiries from the dashboard

## Suggested Build Order

This is the recommended sequence, grouped into phases:

### Phase 1 — Foundation (Weeks 1-2)
> Get the data model and auth in place. Nothing user-facing yet beyond auth.

| # | Item | Priority |
|---|------|----------|
| 1 | 1.1 — Event Data Model & Convex Schema | P0 |
| 2 | 2.1 — Clerk Integration | P0 |
| 3 | 2.2 — Auth Pages | P0 |
| 4 | 1.5 — Stripe Integration | P0 |

### Phase 2 — Core Booking (Weeks 3-4)
> Users can discover events, book, and pay.

| # | Item | Priority |
|---|------|----------|
| 5 | 1.2 — Event Listing Page | P0 |
| 6 | 1.3 — Event Detail Page | P0 |
| 7 | 1.6 — Booking Flow | P0 |
| 8 | 1.8 — Booking Confirmation & Emails | P1 |

### Phase 3 — User Dashboard & Waitlist (Weeks 5-6)
> Authenticated users manage their account, bookings, and join waitlists.

| # | Item | Priority |
|---|------|----------|
| 9 | 1.9 — Waitlist for Sold-Out Events | P1 |
| 10 | 2.3 — User Profile Page | P1 |
| 11 | 2.4 — Booking History | P1 |
| 12 | 2.5 — Manage Bookings | P2 |

### Phase 4 — Admin Dashboard via Retool (Weeks 6-8)
> Build the API layer, then configure Retool apps on top.

| # | Item | Priority |
|---|------|----------|
| 13 | 3.1 — Convex HTTP API Layer for Retool | P1 |
| 14 | 3.2 — Admin Role in Clerk | P1 |
| 15 | 3.3 — Retool App Setup & Connection | P1 |
| 16 | 3.4 — Retool: Event Management | P1 |
| 17 | 3.5 — Retool: User & Booking Management | P1 |
| 18 | 3.6 — Retool: Billing & Refunds | P2 |

### Phase 5 — Partnerships & Polish (Weeks 8-10)
> B2B funnel and remaining features.

| # | Item | Priority |
|---|------|----------|
| 19 | 4.1 — Partnership Landing Page | P2 |
| 20 | 4.2 — Cal.com Integration | P2 |
| 21 | 1.4 — Calendar View | P2 |
| 22 | 1.7 — Early-Bird Pricing | P2 |
| 23 | 4.3 — Partnership Inquiry Form | P3 |
| 24 | 2.6 — Performance / Game History | P3 |

---

## Resolved Decisions

| Decision | Answer | Affects |
|----------|--------|---------|
| **Clerk instance** | Shared — same Clerk app as the companion player app. One account across both. | 2.1, 2.2, 3.2 |
| **Clerk JWT constraints** | No constraints on the existing setup. Free to add a second JWT template. | 2.1 |
| **Convex deployments** | Separate — companion app has its own Convex. Shared Clerk ID is the join key for cross-deployment data. Companion Convex URL will be in `.env`. | 2.6 |
| **Admin framework** | **Retool** (free tier, ≤5 users) — no custom admin UI in this codebase. We build a Convex HTTP API layer; Retool calls it. | Epic 3 |
| **Cancellation policy** | 100% refund if 48h+ before event, 50% if 24-48h, $0 if <24h | 2.5, 3.1 |
| **Stripe account** | Needs to be created — product owner will create it when we reach 1.5. Start in test mode. | 1.5 |
| **OAuth providers** | Google login at launch. Apple login deferred (product owner will set up later). | 2.2 |
| **Event locations** | Toronto-only for now. Free-text location field. Multi-city support planned for later. | 1.1, 1.3 |
| **Multi-ticket bookings** | Yes — max 6 tickets per booking (event cap is 12 participants). Friends must create their own accounts. Invite email includes sign-up CTA. | 1.6, 1.1 |
| **Waitlist** | Yes — no payment upfront. Email notification via Resend when spot opens. 24h claim window. User then books normally. | 1.9 |
| **Performance data** | Low priority — companion app schema is actively evolving. Product owner will provide sample CSV and finalize schema before this is picked up. | 2.6 |
| **Cal.com** | Existing account available — just need to create the event type | 4.2 |
| **Partnership content** | Product owner will provide — build page structure with placeholder sections | 4.1 |

## Open Questions

_No blocking questions at this time. All decisions resolved above._
