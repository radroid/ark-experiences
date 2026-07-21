import type { PolicyDoc } from "./types"
import { company, emailLink, phoneLink } from "./company"

export const supportDoc: PolicyDoc = {
  title: "Customer Support",
  subtitle: "We're here to help with bookings, refunds, and anything else about your ARK experience.",
  lastUpdated: company.lastUpdated,
  intro: [
    {
      type: "paragraph",
      text: `${company.brandName} (${company.productName}) is operated by ${company.legalName}. Whether you have a question about an upcoming hunt, need to change or cancel a booking, or want to follow up on a refund, here is how to reach a real person.`,
    },
  ],
  sections: [
    {
      id: "contact",
      heading: "How to reach us",
      blocks: [
        {
          type: "list",
          items: [
            `**Email:** ${emailLink}`,
            `**Phone:** ${phoneLink}`,
            `**Support hours:** ${company.supportHours}`,
            `**Mailing address:** ${company.addressOneLine}`,
          ],
        },
        {
          type: "paragraph",
          text: "Email is the fastest way to get a documented response. If you reach out after hours, we will get back to you the next business day.",
        },
      ],
    },
    {
      id: "help-with",
      heading: "What we can help with",
      blocks: [
        {
          type: "list",
          items: [
            "Booking a scavenger hunt or planning a group / corporate event",
            "Changing the date of an existing booking or [rescheduling](/refund-policy)",
            "[Cancellations and refunds](/refund-policy), including checking the status of a refund",
            "Accessibility needs or special requirements for your group",
            "Questions about how the experience works, meeting points, and what to bring",
            "Privacy questions or [data access and deletion requests](/privacy)",
          ],
        },
      ],
    },
    {
      id: "response-times",
      heading: "Response times",
      blocks: [
        {
          type: "list",
          items: [
            "**General enquiries:** we aim to reply within one business day.",
            "**Refund requests:** reviewed within one business day; approved refunds are returned to your original payment method within 5–10 business days.",
          ],
        },
      ],
    },
    {
      id: "policies",
      heading: "Our policies",
      blocks: [
        {
          type: "list",
          items: [
            "[Terms of Service](/terms)",
            "[Privacy Policy](/privacy)",
            "[Cancellation & Refund Policy](/refund-policy)",
          ],
        },
      ],
    },
    {
      id: "business-details",
      heading: "Business details",
      blocks: [
        {
          type: "list",
          items: [
            `**Legal entity:** ${company.legalName}`,
            `**Operating as:** ${company.brandName} (${company.productName})`,
            `**Registered address:** ${company.addressOneLine}`,
            `**Phone:** ${company.phoneDisplay}`,
            `**Email:** ${company.email}`,
            `**HST/GST registration:** ${company.hstNumber}`,
          ],
        },
      ],
    },
  ],
}
