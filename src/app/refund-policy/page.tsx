import type { Metadata } from "next"
import { PolicyPage } from "@/components/legal/policy-page"
import { refundPolicyDoc } from "@/content/legal/refund-policy"

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | ARK Experiences",
  description:
    "ARK Experiences cancellation, rescheduling, and refund terms — including our tiered refund windows, weather policy, and how refunds are issued.",
  alternates: { canonical: "https://www.funwithark.ca/refund-policy" },
}

export default function RefundPolicyPage() {
  return <PolicyPage doc={refundPolicyDoc} />
}
