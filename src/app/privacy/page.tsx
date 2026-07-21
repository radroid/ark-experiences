import type { Metadata } from "next"
import { PolicyPage } from "@/components/legal/policy-page"
import { privacyDoc } from "@/content/legal/privacy"

export const metadata: Metadata = {
  title: "Privacy Policy | ARK Experiences",
  description:
    "How ARK Experiences (Create Club) collects, uses, discloses, and protects your personal information, and your privacy rights under PIPEDA.",
  alternates: { canonical: "https://www.funwithark.ca/privacy" },
}

export default function PrivacyPage() {
  return <PolicyPage doc={privacyDoc} />
}
