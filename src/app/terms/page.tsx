import type { Metadata } from "next"
import { PolicyPage } from "@/components/legal/policy-page"
import { termsDoc } from "@/content/legal/terms"

export const metadata: Metadata = {
  title: "Terms of Service | ARK Experiences",
  description:
    "The terms governing your use of the ARK Experiences website and participation in our outdoor scavenger hunts, including cancellation and refund terms.",
  alternates: { canonical: "https://www.funwithark.ca/terms" },
}

export default function TermsPage() {
  return <PolicyPage doc={termsDoc} />
}
