import { internalMutation } from "./_generated/server";

function weeksFromNow(weeks: number): string {
  const date = new Date();
  date.setDate(date.getDate() + weeks * 7);
  date.setHours(10, 0, 0, 0);
  return date.toISOString();
}

export const seedEvents = internalMutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("events").first();
    if (existing) {
      console.log("Seed skipped — events already exist");
      return;
    }

    const event1 = await ctx.db.insert("events", {
      title: "Mystery at Distillery District",
      slug: "mystery-at-distillery-district",
      description:
        "Unravel a web of clues hidden among the cobblestone streets and Victorian architecture of Toronto's beloved Distillery District. Work with your team to solve puzzles, decode messages, and catch the culprit before time runs out.",
      dateTime: weeksFromNow(3),
      location: "Distillery District, 55 Mill St",
      city: "Toronto",
      capacity: 12,
      price: 4500,
      earlyBirdPrice: 3500,
      earlyBirdDeadline: weeksFromNow(1),
      status: "published",
    });

    const event2 = await ctx.db.insert("events", {
      title: "Clue Chase: Kensington Market",
      slug: "clue-chase-kensington-market",
      description:
        "Navigate the eclectic streets of Kensington Market in this fast-paced team scavenger hunt. Discover hidden gems, interact with local vendors, and piece together the mystery before your rivals.",
      dateTime: weeksFromNow(5),
      location: "Kensington Market, Augusta Ave",
      city: "Toronto",
      capacity: 12,
      price: 5000,
      status: "published",
    });

    await ctx.db.insert("events", {
      title: "The St. Lawrence Cipher",
      slug: "the-st-lawrence-cipher",
      description:
        "Crack an elaborate cipher that spans the historic St. Lawrence Market. Your team will explore the market's rich history while racing to decode a century-old mystery.",
      dateTime: weeksFromNow(8),
      location: "St. Lawrence Market, 93 Front St E",
      city: "Toronto",
      capacity: 10,
      price: 4500,
      status: "draft",
    });

    const event4 = await ctx.db.insert("events", {
      title: "Harbourfront Heist",
      slug: "harbourfront-heist",
      description:
        "A daring heist has taken place along Toronto's waterfront. Follow the trail of evidence from the Power Plant to HTO Park, interrogate suspects, and recover the stolen artifact before it's gone forever.",
      dateTime: weeksFromNow(2),
      location: "Harbourfront Centre, 235 Queens Quay W",
      city: "Toronto",
      capacity: 12,
      price: 5500,
      earlyBirdPrice: 4000,
      earlyBirdDeadline: weeksFromNow(1),
      status: "published",
    });

    const now = new Date().toISOString();

    await ctx.db.insert("bookings", {
      eventId: event1,
      ticketCount: 3,
      amount: 3500 * 3,
      status: "confirmed",
      bookedAt: now,
      confirmedAt: now,
    });

    await ctx.db.insert("bookings", {
      eventId: event4,
      ticketCount: 2,
      amount: 4000 * 2,
      status: "confirmed",
      bookedAt: now,
      confirmedAt: now,
    });

    console.log(
      "Seeded 4 events and 2 bookings:",
      { event1, event2, event4 },
    );
  },
});
