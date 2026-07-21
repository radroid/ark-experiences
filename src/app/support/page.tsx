import type { Metadata } from "next"
import { PolicyPage } from "@/components/legal/policy-page"
import { supportDoc } from "@/content/legal/support"

export const metadata: Metadata = {
  title: "Customer Support | ARK Experiences",
  description:
    "Contact ARK Experiences (Create Club) for help with bookings, refunds, and questions. Email, phone, hours, and registered business details.",
  alternates: { canonical: "https://www.funwithark.ca/support" },
}

export default function SupportPage() {
  return <PolicyPage doc={supportDoc} />
}
