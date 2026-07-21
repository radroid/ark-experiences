import type { PolicyDoc } from "./types"
import { company, emailLink } from "./company"

export const refundPolicyDoc: PolicyDoc = {
  title: "Cancellation & Refund Policy",
  subtitle: "How cancellations, rescheduling, and refunds work for ARK experiences.",
  lastUpdated: company.lastUpdated,
  intro: [
    {
      type: "paragraph",
      text: `This policy applies to bookings for ${company.brandName} (${company.productName}) experiences operated by ${company.legalName}. It forms part of our [Terms of Service](/terms). All amounts are in Canadian dollars (${company.currency}).`,
    },
  ],
  sections: [
    {
      id: "cancellations-by-you",
      heading: "Cancellations by you",
      blocks: [
        {
          type: "paragraph",
          text: "If you need to cancel a booking, the refund you receive depends on how far in advance you let us know, based on your experience's scheduled start time:",
        },
        {
          type: "table",
          headers: ["When you cancel", "Refund"],
          rows: [
            ["**7 or more days** before your experience", "100% refund"],
            ["**48 hours to 7 days** before", "50% refund"],
            ["**Less than 48 hours** before", "No refund"],
          ],
        },
        {
          type: "paragraph",
          text: `The cancellation time is measured from when we receive your written request at ${emailLink}. Any processing fees charged by third-party platforms are non-refundable (see Third-party bookings below).`,
        },
      ],
    },
    {
      id: "rescheduling",
      heading: "Rescheduling",
      blocks: [
        {
          type: "paragraph",
          text: "We know plans change. You may reschedule to another available date **once at no charge**, provided you request it at least 48 hours before your scheduled start time and subject to availability.",
        },
        {
          type: "list",
          items: [
            "Additional reschedules, or requests made less than 48 hours before, may be treated as a cancellation under the table above.",
            "Rescheduling does not extend or reset the refund windows above relative to your original booking date.",
          ],
        },
      ],
    },
    {
      id: "weather",
      heading: "Weather and unsafe conditions",
      blocks: [
        {
          type: "paragraph",
          text: "Our experiences take place outdoors. If we determine that weather or other conditions make an experience unsafe and we cancel or pause it, you will be offered a **free reschedule or a full refund or credit** for the affected booking. We do not issue refunds for ordinary weather (for example, light rain) when the experience still runs as planned, so please dress for the forecast.",
        },
      ],
    },
    {
      id: "cancellations-by-us",
      heading: "Cancellations by us",
      blocks: [
        {
          type: "paragraph",
          text: "Occasionally we may need to cancel an experience — for example, due to insufficient sign-ups, staffing, permits, or circumstances beyond our reasonable control. If we cancel, you will receive a **full refund or an equivalent credit**, at your choice.",
        },
      ],
    },
    {
      id: "no-shows",
      heading: "No-shows and late arrivals",
      blocks: [
        {
          type: "paragraph",
          text: "If you do not arrive at the designated meeting point at the scheduled start time, the booking is treated as a no-show and is **non-refundable**. Late arrivals may join in progress where possible, but time and content missed cannot be refunded or extended.",
        },
      ],
    },
    {
      id: "how-to-request",
      heading: "How to request a cancellation or refund",
      blocks: [
        {
          type: "paragraph",
          text: `Email us at ${emailLink} with your booking name, the experience date, and the email or order number used to book. We will confirm the outcome and, where a refund applies, the amount.`,
        },
      ],
    },
    {
      id: "how-refunds-issued",
      heading: "How refunds are issued",
      blocks: [
        {
          type: "list",
          items: [
            "Approved refunds are returned to your **original payment method**.",
            "For direct bookings, refunds are processed through our payment provider, Stripe, and typically appear within **5–10 business days** depending on your bank or card issuer.",
            "We issue refunds in Canadian dollars; your bank's exchange rate may apply if your card is in another currency.",
          ],
        },
      ],
    },
    {
      id: "third-party-bookings",
      heading: "Bookings made through Eventbrite or Luma",
      blocks: [
        {
          type: "paragraph",
          text: "If you booked through a third-party platform such as Eventbrite or Luma, the refund timing and any platform service fees are also governed by that platform's own policies. The ARK refund tiers above still determine what portion of the ticket price is refundable; contact us and we will coordinate the refund.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Questions",
      blocks: [
        {
          type: "paragraph",
          text: `Questions about this policy? Reach us at ${emailLink} or ${company.phoneDisplay}, or visit our [Support page](/support).`,
        },
      ],
    },
  ],
}
