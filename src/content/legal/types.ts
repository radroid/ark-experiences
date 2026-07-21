/**
 * Content model for support and policy pages. Wording lives in the
 * `src/content/legal/*.ts` files; `PolicyPage` renders these structures so the
 * page components stay tiny and the copy stays easy to edit.
 *
 * Inline text supports two lightweight markers:
 *   - `[label](href)` renders a link (internal paths use next/link)
 *   - `**text**` renders bold
 */
export type PolicyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }

export type PolicySection = {
  id: string
  heading: string
  blocks: PolicyBlock[]
}

export type PolicyDoc = {
  title: string
  subtitle?: string
  lastUpdated: string
  intro?: PolicyBlock[]
  sections: PolicySection[]
}
