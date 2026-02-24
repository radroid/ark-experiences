import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { validateTicketCount } from "./lib/validators";

export const getBookingsByEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, { eventId }) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_eventId", (q) => q.eq("eventId", eventId))
      .collect();
  },
});

export const createBooking = mutation({
  args: {
    eventId: v.id("events"),
    ticketCount: v.number(),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, { eventId, ticketCount, userId }) => {
    const event = await ctx.db.get(eventId);
    if (!event) throw new Error("Event not found");

    if (event.status !== "published") {
      throw new Error("Event is not available for booking");
    }

    const ticketError = validateTicketCount(ticketCount);
    if (ticketError) throw new Error(ticketError);

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
    const available = event.capacity - booked;

    if (ticketCount > available) {
      throw new Error(
        `Only ${available} spots available, requested ${ticketCount}`,
      );
    }

    const now = new Date().toISOString();
    const isEarlyBird =
      event.earlyBirdPrice !== undefined &&
      event.earlyBirdDeadline &&
      now < event.earlyBirdDeadline;
    const unitPrice = isEarlyBird ? event.earlyBirdPrice! : event.price;

    return await ctx.db.insert("bookings", {
      userId,
      eventId,
      ticketCount,
      amount: unitPrice * ticketCount,
      status: "pending",
      bookedAt: now,
    });
  },
});

export const confirmBooking = internalMutation({
  args: {
    bookingId: v.id("bookings"),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, { bookingId, stripePaymentIntentId }) => {
    const booking = await ctx.db.get(bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "pending") {
      throw new Error(`Cannot confirm booking with status "${booking.status}"`);
    }

    const event = await ctx.db.get(booking.eventId);
    if (!event) throw new Error("Event not found");

    const confirmedBookings = await ctx.db
      .query("bookings")
      .withIndex("by_eventId_status", (q) =>
        q.eq("eventId", booking.eventId).eq("status", "confirmed"),
      )
      .collect();
    const booked = confirmedBookings.reduce(
      (sum, b) => sum + b.ticketCount,
      0,
    );

    if (booked + booking.ticketCount > event.capacity) {
      throw new Error("Not enough capacity to confirm this booking");
    }

    const now = new Date().toISOString();
    await ctx.db.patch(bookingId, {
      status: "confirmed",
      confirmedAt: now,
      ...(stripePaymentIntentId ? { stripePaymentIntentId } : {}),
    });

    if (booked + booking.ticketCount >= event.capacity) {
      await ctx.db.patch(event._id, { status: "sold_out" });
    }
  },
});

export const cancelBooking = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, { bookingId }) => {
    const booking = await ctx.db.get(bookingId);
    if (!booking) throw new Error("Booking not found");

    if (booking.status === "cancelled") {
      throw new Error("Booking is already cancelled");
    }

    const now = new Date().toISOString();
    await ctx.db.patch(bookingId, {
      status: "cancelled",
      cancelledAt: now,
    });

    const event = await ctx.db.get(booking.eventId);
    if (event && event.status === "sold_out") {
      await ctx.db.patch(event._id, { status: "published" });
    }
  },
});
