import React from "react"
import Link from "next/link"
import type { PolicyBlock, PolicyDoc } from "@/content/legal/types"

const LINK_COLOR = { color: "var(--primary-blue)" }

/** Parse `[label](href)` and `**bold**` markers into React nodes. */
function renderInline(text: string): React.ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    const [, label, href, bold] = match

    if (href && label) {
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={key++} href={href} className="underline underline-offset-2" style={LINK_COLOR}>
            {label}
          </Link>,
        )
      } else {
        const external = href.startsWith("http")
        nodes.push(
          <a
            key={key++}
            href={href}
            className="underline underline-offset-2 break-words"
            style={LINK_COLOR}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>,
        )
      }
    } else if (bold) {
      nodes.push(
        <strong key={key++} style={{ color: "var(--safe-black)" }}>
          {bold}
        </strong>,
      )
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

function Block({ block }: { block: PolicyBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="mb-4 leading-relaxed" style={{ color: "var(--safe-black)" }}>
        {renderInline(block.text)}
      </p>
    )
  }

  if (block.type === "list") {
    const listClass = `mb-4 space-y-2 pl-6 ${block.ordered ? "list-decimal" : "list-disc"}`
    const items = block.items.map((item, i) => (
      <li key={i} className="leading-relaxed" style={{ color: "var(--safe-black)" }}>
        {renderInline(item)}
      </li>
    ))
    return block.ordered ? <ol className={listClass}>{items}</ol> : <ul className={listClass}>{items}</ul>
  }

  return (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            {block.headers.map((h, i) => (
              <th
                key={i}
                className="border px-4 py-2 font-semibold"
                style={{ borderColor: "var(--soft-gray)", backgroundColor: "var(--yinmn-blue-50)", color: "var(--safe-black)" }}
              >
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} className="border px-4 py-2" style={{ borderColor: "var(--soft-gray)", color: "var(--safe-black)" }}>
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PolicyContent({ doc }: { doc: PolicyDoc }) {
  return (
    <div className="space-y-10">
      {doc.intro && doc.intro.length > 0 && (
        <div>
          {doc.intro.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      )}
      {doc.sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <h2 className="mb-4 text-xl font-semibold md:text-2xl" style={{ color: "var(--yinmn-blue)" }}>
            {section.heading}
          </h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}
    </div>
  )
}
