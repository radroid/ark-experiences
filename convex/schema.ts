import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contacts: defineTable({
    company_name: v.string(),
    contact_person: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    team_size: v.optional(v.number()),
    preferred_date: v.optional(v.string()),
    special_requirements: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("converted"),
    ),
  }).index("by_email", ["email"]),

  emailSignups: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),

  events: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    dateTime: v.string(),
    endDateTime: v.optional(v.string()),
    location: v.string(),
    city: v.string(),
    capacity: v.number(),
    price: v.number(),
    earlyBirdPrice: v.optional(v.number()),
    earlyBirdDeadline: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    status: v.union(
      v.literal("draft"),
      v.literal("published"),
      v.literal("sold_out"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_dateTime", ["dateTime"])
    .index("by_status_dateTime", ["status", "dateTime"]),

  bookings: defineTable({
    userId: v.optional(v.string()),
    eventId: v.id("events"),
    ticketCount: v.number(),
    amount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
    ),
    stripePaymentIntentId: v.optional(v.string()),
    bookedAt: v.string(),
    confirmedAt: v.optional(v.string()),
    cancelledAt: v.optional(v.string()),
  })
    .index("by_eventId", ["eventId"])
    .index("by_userId", ["userId"])
    .index("by_eventId_status", ["eventId", "status"])
    .index("by_stripePaymentIntentId", ["stripePaymentIntentId"]),
});
