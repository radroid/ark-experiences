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
});
