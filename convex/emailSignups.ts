import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const subscribe = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await ctx.db
      .query("emailSignups")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      return { alreadySubscribed: true };
    }

    const id = await ctx.db.insert("emailSignups", {
      email: normalizedEmail,
    });

    return { alreadySubscribed: false, id };
  },
});
