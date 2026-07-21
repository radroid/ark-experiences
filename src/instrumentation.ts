/**
 * Next.js Instrumentation Hook
 * Runs once when a new Next.js server instance is initialised.
 *
 * Node.js 22+ ships an experimental `localStorage` global that does NOT
 * implement the Web Storage API (.getItem/.setItem are undefined) unless
 * the --localstorage-file flag is provided.  Many libraries (Convex,
 * Supabase, analytics SDKs, …) detect `localStorage` and then call
 * `.getItem()`, which throws "localStorage.getItem is not a function"
 * during SSR.
 *
 * Removing the broken global forces those libraries to fall back to their
 * "no localStorage" codepath – the correct behaviour on the server.
 */
export function register() {
  if (
    typeof globalThis.localStorage !== "undefined" &&
    typeof globalThis.localStorage.getItem !== "function"
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (globalThis as any).localStorage;
  }
}
