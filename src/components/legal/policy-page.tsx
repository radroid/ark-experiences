import Link from "next/link"
import type { PolicyDoc } from "@/content/legal/types"
import { PolicyContent } from "./policy-content"

const CROSS_LINKS = [
  { href: "/support", label: "Support" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Cancellation & Refund Policy" },
]

/**
 * Shared chrome for the support and policy pages: a breadcrumb + "Back to ARK"
 * header (mirrors the blog), the document title/subtitle, a last-updated line,
 * the rendered content, and a cross-link nav to the other legal pages.
 */
export function PolicyPage({ doc }: { doc: PolicyDoc }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--pure-white)" }}>
      <div className="pt-24 pb-6 md:pt-28" style={{ backgroundColor: "var(--yinmn-blue)", color: "var(--pure-white)" }}>
        <div className="container mx-auto px-4">
          <div className="mb-4 flex items-center gap-2 text-sm" style={{ color: "var(--pure-white-800)" }}>
            <Link href="/" className="flex items-center gap-1 transition-opacity hover:opacity-80" style={{ color: "var(--pure-white-800)" }}>
              🏠 Home
            </Link>
            <span aria-hidden>→</span>
            <span style={{ color: "var(--pure-white)" }}>{doc.title}</span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{doc.title}</h1>
              {doc.subtitle && (
                <p className="mt-1 max-w-2xl" style={{ color: "var(--pure-white-900)" }}>
                  {doc.subtitle}
                </p>
              )}
            </div>
            <Link
              href="/"
              className="inline-flex items-center whitespace-nowrap rounded-lg px-4 py-2 font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "var(--pure-white-200)", color: "var(--pure-white)" }}
            >
              ← Back to ARK
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-3xl px-4 py-10">
        <p className="mb-8 text-sm" style={{ color: "var(--safe-black-600)" }}>
          Last updated: {doc.lastUpdated}
        </p>

        <PolicyContent doc={doc} />

        <nav
          aria-label="Legal pages"
          className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t pt-6 text-sm"
          style={{ borderColor: "var(--soft-gray)" }}
        >
          {CROSS_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="underline underline-offset-2" style={{ color: "var(--primary-blue)" }}>
              {link.label}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  )
}
