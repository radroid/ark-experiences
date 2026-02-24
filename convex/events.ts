import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  generateSlug,
  isValidEventStatusTransition,
  validateCapacity,
  validateFutureDate,
  validatePrice,
  validateEarlyBirdPrice,
} from "./lib/validators";
import type { EventStatus } from "./lib/validators";

export const getEventById = query({
  args: { id: v.id("events") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getEventBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("events")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const getAvailableCapacity = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, { eventId }) => {
    const event = await ctx.db.get(eventId);
    if (!event) throw new Error("Event not found");

    const confirmedBookings = await ctx.db
      .query("bookings")
      .withIndex("by_eventId_status", (q) =>
        q.eq("eventId", eventId).eq("status", "confirmed"),
      )
      .collect();

    const booked = confirmedBookings.reduce(
      (sum, b) => sum + b.ticketCount,
      0,
    );

    return {
      total: event.capacity,
      booked,
      available: event.capacity - booked,
    };
  },
});

export const listUpcomingEvents = query({
  handler: async (ctx) => {
    const now = new Date().toISOString();

    const published = await ctx.db
      .query("events")
      .withIndex("by_status_dateTime", (q) =>
        q.eq("status", "published").gte("dateTime", now),
      )
      .collect();

    const soldOut = await ctx.db
      .query("events")
      .withIndex("by_status_dateTime", (q) =>
        q.eq("status", "sold_out").gte("dateTime", now),
      )
      .collect();

    return [...published, ...soldOut].sort((a, b) =>
      a.dateTime.localeCompare(b.dateTime),
    );
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    dateTime: v.string(),
    endDateTime: v.optional(v.string()),
    location: v.string(),
    city: v.optional(v.string()),
    capacity: v.number(),
    price: v.number(),
    earlyBirdPrice: v.optional(v.number()),
    earlyBirdDeadline: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const dateError = validateFutureDate(args.dateTime);
    if (dateError) throw new Error(dateError);

    const capacityError = validateCapacity(args.capacity);
    if (capacityError) throw new Error(capacityError);

    const priceError = validatePrice(args.price);
    if (priceError) throw new Error(priceError);

    if (args.earlyBirdPrice !== undefined) {
      const ebError = validateEarlyBirdPrice(args.earlyBirdPrice, args.price);
      if (ebError) throw new Error(ebError);
    }

    let slug = generateSlug(args.title);

    const existing = await ctx.db
      .query("events")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    return await ctx.db.insert("events", {
      title: args.title,
      slug,
      description: args.description,
      dateTime: args.dateTime,
      endDateTime: args.endDateTime,
      location: args.location,
      city: args.city ?? "Toronto",
      capacity: args.capacity,
      price: args.price,
      earlyBirdPrice: args.earlyBirdPrice,
      earlyBirdDeadline: args.earlyBirdDeadline,
      imageUrl: args.imageUrl,
      status: "draft",
    });
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("events"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dateTime: v.optional(v.string()),
    endDateTime: v.optional(v.string()),
    location: v.optional(v.string()),
    city: v.optional(v.string()),
    capacity: v.optional(v.number()),
    price: v.optional(v.number()),
    earlyBirdPrice: v.optional(v.number()),
    earlyBirdDeadline: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("published"),
        v.literal("sold_out"),
        v.literal("completed"),
        v.literal("cancelled"),
      ),
    ),
  },
  handler: async (ctx, { id, ...updates }) => {
    const event = await ctx.db.get(id);
    if (!event) throw new Error("Event not found");

    if (updates.status) {
      const valid = isValidEventStatusTransition(
        event.status as EventStatus,
        updates.status as EventStatus,
      );
      if (!valid) {
        throw new Error(
          `Invalid status transition: ${event.status} → ${updates.status}`,
        );
      }
    }

    if (updates.capacity !== undefined) {
      const capacityError = validateCapacity(updates.capacity);
      if (capacityError) throw new Error(capacityError);

      const confirmedBookings = await ctx.db
        .query("bookings")
        .withIndex("by_eventId_status", (q) =>
          q.eq("eventId", id).eq("status", "confirmed"),
        )
        .collect();
      const booked = confirmedBookings.reduce(
        (sum, b) => sum + b.ticketCount,
        0,
      );
      if (updates.capacity < booked) {
        throw new Error(
          `Cannot reduce capacity below ${booked} confirmed tickets`,
        );
      }
    }

    if (updates.price !== undefined) {
      const priceError = validatePrice(updates.price);
      if (priceError) throw new Error(priceError);
    }

    if (updates.earlyBirdPrice !== undefined) {
      const regularPrice = updates.price ?? event.price;
      const ebError = validateEarlyBirdPrice(
        updates.earlyBirdPrice,
        regularPrice,
      );
      if (ebError) throw new Error(ebError);
    }

    const patch: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    if (updates.title && updates.title !== event.title) {
      let slug = generateSlug(updates.title);
      const existing = await ctx.db
        .query("events")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      if (existing && existing._id !== id) {
        slug = `${slug}-${Date.now()}`;
      }
      patch.slug = slug;
    }

    await ctx.db.patch(id, patch);
  },
});

export const cancelEvent = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, { id }) => {
    const event = await ctx.db.get(id);
    if (!event) throw new Error("Event not found");

    const valid = isValidEventStatusTransition(
      event.status as EventStatus,
      "cancelled",
    );
    if (!valid) {
      throw new Error(
        `Cannot cancel event with status "${event.status}"`,
      );
    }

    await ctx.db.patch(id, { status: "cancelled" });
  },
});
