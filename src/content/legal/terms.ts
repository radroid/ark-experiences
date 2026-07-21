import type { PolicyDoc } from "./types"
import { company, emailLink } from "./company"

export const termsDoc: PolicyDoc = {
  title: "Terms of Service",
  subtitle: "The terms that govern your use of our website and participation in our experiences.",
  lastUpdated: company.lastUpdated,
  intro: [
    {
      type: "paragraph",
      text: `These Terms of Service ("Terms") are a legal agreement between you and ${company.legalName} ("Create Club", "ARK", "we", "us", or "our"), which operates ${company.brandName} / ${company.productName} and the website at [${company.domain}](${company.websiteUrl}). By accessing our website, booking, or taking part in an experience, you agree to these Terms and to our [Privacy Policy](/privacy) and [Cancellation & Refund Policy](/refund-policy).`,
    },
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "1. Who we are",
      blocks: [
        {
          type: "paragraph",
          text: `${company.brandName} offers outdoor scavenger hunts and interactive "outdoor escape room" experiences in the Greater Toronto Area. The service is provided by ${company.legalName}, registered at ${company.addressOneLine} (HST/GST ${company.hstNumber}).`,
        },
      ],
    },
    {
      id: "eligibility",
      heading: "2. Eligibility",
      blocks: [
        {
          type: "paragraph",
          text: "You must be at least 18 years old to make a booking. Participants under 18 are welcome as part of a group but must be accompanied and supervised by a responsible adult who accepts these Terms on their behalf. By booking for a group, you confirm you have the authority to accept these Terms for every participant.",
        },
      ],
    },
    {
      id: "the-experience",
      heading: "3. Our experiences",
      blocks: [
        {
          type: "paragraph",
          text: "Our experiences are physical, outdoor activities that involve walking around public areas of the city, solving clues, and interacting with your surroundings and other participants. Routes, clue locations, timing, and content may change, and experiences run rain or shine unless we determine conditions are unsafe.",
        },
      ],
    },
    {
      id: "bookings-payment",
      heading: "4. Bookings and payment",
      blocks: [
        {
          type: "list",
          items: [
            `All prices are listed in Canadian dollars (${company.currency}) and are exclusive of applicable taxes unless stated otherwise. Applicable HST is added at checkout (HST/GST ${company.hstNumber}).`,
            "You may book directly through our website via our payment provider, Stripe, or through third-party platforms such as Eventbrite or Luma. When you book through a third party, that platform's terms and fees also apply.",
            "Your booking is confirmed only once payment is completed and you receive a confirmation. We may decline or cancel a booking and issue a refund where required (for example, pricing errors, capacity limits, or suspected fraud).",
            "We do not store your full card details. Card payments are processed by Stripe under its own terms and security standards.",
          ],
        },
      ],
    },
    {
      id: "cancellations",
      heading: "5. Cancellations and rescheduling",
      blocks: [
        {
          type: "paragraph",
          text: "You may cancel or reschedule a booking in accordance with our [Cancellation & Refund Policy](/refund-policy). In summary: cancel 7 or more days before your experience for a full refund; 48 hours to 7 days before for a 50% refund; and no refund for cancellations less than 48 hours before. You may reschedule once at no charge if you ask at least 48 hours in advance, subject to availability.",
        },
      ],
    },
    {
      id: "refunds",
      heading: "6. Refunds",
      blocks: [
        {
          type: "paragraph",
          text: "Refunds are governed by our [Cancellation & Refund Policy](/refund-policy). If we cancel an experience, or cancel or pause it for weather or safety reasons, you will be offered a free reschedule or a full refund or credit. No-shows are non-refundable. Approved refunds are returned to your original payment method, typically within 5–10 business days.",
        },
      ],
    },
    {
      id: "assumption-of-risk",
      heading: "7. Assumption of risk and waiver",
      blocks: [
        {
          type: "paragraph",
          text: "You understand that taking part in an outdoor scavenger hunt involves inherent risks, including walking on city streets and uneven ground, crossing roads, weather exposure, contact with public spaces, and physical activity. You voluntarily assume these risks. To the fullest extent permitted by law, you agree to take part at your own risk and to release ARK and Create Club from claims for injury, loss, or damage that are not caused by our negligence.",
        },
        {
          type: "paragraph",
          text: "You are responsible for assessing your own fitness to participate and for obeying all laws, traffic signals, and reasonable instructions from our staff during the experience.",
        },
      ],
    },
    {
      id: "conduct",
      heading: "8. Participant conduct",
      blocks: [
        {
          type: "paragraph",
          text: "During an experience you agree to behave lawfully and respectfully, not to trespass, damage property, or endanger yourself or others, and not to participate while impaired in a way that creates a safety risk. We may remove any participant who behaves unsafely or unlawfully, or who harasses staff or others, without a refund.",
        },
      ],
    },
    {
      id: "media",
      heading: "9. Photography and media",
      blocks: [
        {
          type: "paragraph",
          text: "We may take photos or video during experiences for our records and marketing. If you do not want your image used, let a staff member know at the event or email us and we will accommodate reasonable requests. See our [Privacy Policy](/privacy) for how we handle personal information.",
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "10. Intellectual property",
      blocks: [
        {
          type: "paragraph",
          text: "All clues, puzzles, storylines, branding, text, images, and other materials that make up our experiences and website are owned by Create Club or our licensors and are protected by intellectual property laws. You may not copy, record, redistribute, or create derivative experiences from our content without our written permission.",
        },
      ],
    },
    {
      id: "third-party",
      heading: "11. Third-party services and links",
      blocks: [
        {
          type: "paragraph",
          text: "We rely on third-party services such as Stripe (payments), Eventbrite and Luma (ticketing), and others to operate. Our website may link to third-party sites. We are not responsible for the content, terms, or privacy practices of services we do not control.",
        },
      ],
    },
    {
      id: "disclaimers",
      heading: "12. Disclaimers",
      blocks: [
        {
          type: "paragraph",
          text: 'Our website and experiences are provided "as is" and "as available". To the fullest extent permitted by law, we disclaim all warranties not expressly stated in these Terms, including implied warranties of merchantability and fitness for a particular purpose. Nothing in these Terms limits rights you have under the Ontario Consumer Protection Act or other applicable consumer-protection law that cannot lawfully be excluded.',
        },
      ],
    },
    {
      id: "liability",
      heading: "13. Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the fullest extent permitted by law, ARK and Create Club, and our staff and contractors, will not be liable for indirect, incidental, or consequential damages arising from your use of our website or participation in an experience. Where liability cannot be excluded, our total liability for any claim is limited to the amount you paid for the booking giving rise to the claim.",
        },
      ],
    },
    {
      id: "indemnification",
      heading: "14. Indemnification",
      blocks: [
        {
          type: "paragraph",
          text: "You agree to indemnify and hold harmless Create Club and its staff from claims, losses, and expenses arising out of your breach of these Terms, your violation of any law, or your negligent or wrongful conduct during an experience.",
        },
      ],
    },
    {
      id: "changes",
      heading: "15. Changes to these Terms",
      blocks: [
        {
          type: "paragraph",
          text: "We may update these Terms from time to time. The version in effect at the time of your booking applies to that booking. We will post the current version here with an updated date, and material changes take effect when posted.",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "16. Governing law",
      blocks: [
        {
          type: "paragraph",
          text: `These Terms are governed by the laws of ${company.governingLaw}, without regard to conflict-of-laws rules. You agree to the exclusive jurisdiction of the courts located in Toronto, Ontario for any dispute that is not otherwise resolved, subject to any non-waivable rights under applicable consumer law.`,
        },
      ],
    },
    {
      id: "contact",
      heading: "17. Contact us",
      blocks: [
        {
          type: "paragraph",
          text: `Questions about these Terms? Email ${emailLink} or write to us at ${company.addressOneLine}. See our [Support page](/support) for more ways to reach us.`,
        },
      ],
    },
  ],
}
