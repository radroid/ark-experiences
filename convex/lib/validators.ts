// Pure validation helpers — no Convex context, no side effects

const EVENT_STATUSES = [
  "draft",
  "published",
  "sold_out",
  "completed",
  "cancelled",
] as const;

export type EventStatus = (typeof EVENT_STATUSES)[number];

const BOOKING_STATUSES = ["pending", "confirmed", "cancelled"] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

const VALID_EVENT_TRANSITIONS: Record<EventStatus, EventStatus[]> = {
  draft: ["published", "cancelled"],
  published: ["sold_out", "completed", "cancelled"],
  sold_out: ["published", "completed", "cancelled"],
  completed: [],
  cancelled: [],
};

const VALID_BOOKING_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["cancelled"],
  cancelled: [],
};

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isValidEventStatusTransition(
  from: EventStatus,
  to: EventStatus,
): boolean {
  return VALID_EVENT_TRANSITIONS[from]?.includes(to) ?? false;
}

export function isValidBookingStatusTransition(
  from: BookingStatus,
  to: BookingStatus,
): boolean {
  return VALID_BOOKING_TRANSITIONS[from]?.includes(to) ?? false;
}

export function validateCapacity(n: number): string | null {
  if (!Number.isInteger(n)) return "Capacity must be an integer";
  if (n < 1 || n > 12) return "Capacity must be between 1 and 12";
  return null;
}

export function validatePrice(n: number): string | null {
  if (!Number.isInteger(n)) return "Price must be an integer (cents)";
  if (n < 0) return "Price must be >= 0";
  return null;
}

export function validateTicketCount(n: number): string | null {
  if (!Number.isInteger(n)) return "Ticket count must be an integer";
  if (n < 1 || n > 6) return "Ticket count must be between 1 and 6";
  return null;
}

export function validateFutureDate(iso: string): string | null {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "Invalid ISO 8601 date";
  if (date.getTime() <= Date.now()) return "Date must be in the future";
  return null;
}

export function validateEarlyBirdPrice(
  earlyBird: number,
  regular: number,
): string | null {
  const priceError = validatePrice(earlyBird);
  if (priceError) return `Early bird price: ${priceError}`;
  if (earlyBird >= regular)
    return "Early bird price must be less than regular price";
  return null;
}
