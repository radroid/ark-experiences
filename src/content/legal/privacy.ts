import type { PolicyDoc } from "./types"
import { company, emailLink } from "./company"

export const privacyDoc: PolicyDoc = {
  title: "Privacy Policy",
  subtitle: "How Create Club (ARK Experiences) collects, uses, discloses, and protects your information.",
  lastUpdated: company.lastUpdated,
  intro: [
    {
      type: "paragraph",
      text: `${company.legalName} operates ${company.brandName} (${company.productName}) and the website at [${company.domain}](${company.websiteUrl}). This policy explains what personal information we collect, how we use and share it, and the choices you have. We handle personal information in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable Ontario law.`,
    },
  ],
  sections: [
    {
      id: "information-we-collect",
      heading: "1. Information we collect",
      blocks: [
        {
          type: "paragraph",
          text: "We collect information you give us and information collected automatically when you use our website.",
        },
        {
          type: "list",
          items: [
            "**Contact and enquiry details** you submit through our forms: your name and contact person, company name, email address, phone number, group/team size, preferred date, and any special requirements you choose to share.",
            "**Booking details** when you reserve an experience: the experience booked, ticket count, amount paid, and a payment reference.",
            "**Payment information:** card payments are collected and processed directly by our payment provider, Stripe. We do not receive or store your full card number.",
            "**Newsletter sign-ups:** the email address you provide to receive updates.",
            "**Automatically collected data:** we and our analytics providers collect usage and device information — such as pages viewed, approximate location, browser and device type, and interactions — using cookies and similar technologies.",
          ],
        },
      ],
    },
    {
      id: "how-we-use",
      heading: "2. How we use your information",
      blocks: [
        {
          type: "list",
          items: [
            "To process bookings and payments and send confirmations and service messages.",
            "To respond to enquiries and provide customer support.",
            "To operate, secure, and improve our website and experiences.",
            "To send marketing emails where you have signed up or otherwise consented — you can unsubscribe at any time.",
            "To meet legal, tax, accounting, and safety obligations.",
          ],
        },
      ],
    },
    {
      id: "consent",
      heading: "3. Our legal basis (consent)",
      blocks: [
        {
          type: "paragraph",
          text: "We rely on your consent to collect, use, and disclose your personal information for the purposes described here, and on the other bases permitted by PIPEDA (such as completing a transaction you requested or meeting a legal obligation). You may withdraw consent for non-essential uses at any time, subject to legal or contractual limits.",
        },
      ],
    },
    {
      id: "how-we-share",
      heading: "4. How and with whom we share your information",
      blocks: [
        {
          type: "paragraph",
          text: "We do not sell your personal information. We share it only with service providers that help us run our business, and only as needed for them to perform their services under contract:",
        },
        {
          type: "list",
          items: [
            "**Stripe** — payment processing.",
            "**Convex** — application database and backend hosting.",
            "**Vercel** — website hosting, plus Vercel Analytics and Speed Insights.",
            "**PostHog** — product and usage analytics.",
            "**Resend** — sending transactional and notification emails.",
            "**Eventbrite and Luma** — where you choose to book through those ticketing platforms.",
          ],
        },
        {
          type: "paragraph",
          text: "We may also disclose information when required by law, to enforce our [Terms of Service](/terms), or to protect the rights, safety, and property of participants, the public, or ARK. If our business is involved in a merger, acquisition, or sale of assets, information may be transferred as part of that transaction.",
        },
      ],
    },
    {
      id: "cookies",
      heading: "5. Cookies and analytics",
      blocks: [
        {
          type: "paragraph",
          text: "We use cookies and similar technologies to keep the site working, remember preferences, and understand how the site is used through our analytics providers. You can control cookies through your browser settings; disabling some cookies may affect how the site functions.",
        },
      ],
    },
    {
      id: "security",
      heading: "6. How we protect your information",
      blocks: [
        {
          type: "paragraph",
          text: "We use technical and organizational safeguards appropriate to the sensitivity of the information, including encryption of data in transit (HTTPS), access controls, and reputable service providers. Card data is handled by Stripe under the PCI-DSS security standard. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
        },
      ],
    },
    {
      id: "retention",
      heading: "7. Data retention",
      blocks: [
        {
          type: "paragraph",
          text: "We keep personal information only as long as needed for the purposes described here or as required for legal, tax, and accounting reasons, after which we securely delete or anonymize it. You can ask us to delete information we are not required to keep.",
        },
      ],
    },
    {
      id: "international",
      heading: "8. Storage and international transfers",
      blocks: [
        {
          type: "paragraph",
          text: "Some of our service providers store or process data outside Canada, including in the United States. Where information is transferred internationally, it may be subject to the laws of those jurisdictions, and we take reasonable steps to ensure it remains protected.",
        },
      ],
    },
    {
      id: "your-rights",
      heading: "9. Your privacy rights",
      blocks: [
        {
          type: "paragraph",
          text: "Under PIPEDA you may:",
        },
        {
          type: "list",
          items: [
            "Request access to the personal information we hold about you.",
            "Ask us to correct information that is inaccurate or incomplete.",
            "Withdraw consent to non-essential uses, or unsubscribe from marketing emails.",
            "Ask us to delete information we are not legally required to retain.",
          ],
        },
        {
          type: "paragraph",
          text: `To make a request, email ${emailLink}. We may need to verify your identity before acting. If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner of Canada.`,
        },
      ],
    },
    {
      id: "children",
      heading: "10. Children's privacy",
      blocks: [
        {
          type: "paragraph",
          text: "Our website and bookings are intended for adults. We do not knowingly collect personal information directly from children under 13 without parental consent. If you believe a child has provided us information, contact us and we will delete it.",
        },
      ],
    },
    {
      id: "changes",
      heading: "11. Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: "We may update this Privacy Policy from time to time. We will post the current version here with a new “last updated” date, and material changes take effect when posted.",
        },
      ],
    },
    {
      id: "contact",
      heading: "12. Contact us",
      blocks: [
        {
          type: "paragraph",
          text: `For privacy questions or requests, contact ${company.legalName} at ${emailLink}, ${company.phoneDisplay}, or ${company.addressOneLine}. See our [Support page](/support) for more ways to reach us.`,
        },
      ],
    },
  ],
}
