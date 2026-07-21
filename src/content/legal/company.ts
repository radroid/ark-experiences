/**
 * Single source of truth for the business/legal details shown across the
 * support and policy pages. Update values here and every page stays in sync.
 */
export const company = {
  legalName: "Create Club",
  brandName: "ARK Experiences",
  productName: "ARK Scavenger Hunt",
  domain: "funwithark.ca",
  websiteUrl: "https://www.funwithark.ca",
  email: "team@funwithark.ca",
  phoneDisplay: "+1 (647) 839-8849",
  phoneHref: "+16478398849",
  supportHours: "Monday–Friday, 9:00 AM – 6:00 PM ET",
  hstNumber: "715197950RT0001",
  address: {
    line1: "28 Eastern Avenue, Unit 534",
    city: "Toronto",
    region: "ON",
    postalCode: "M5A 0Y2",
    country: "Canada",
  },
  addressOneLine:
    "28 Eastern Avenue, Unit 534, Toronto, ON M5A 0Y2, Canada",
  currency: "CAD",
  governingLaw:
    "the Province of Ontario and the federal laws of Canada applicable therein",
  lastUpdated: "July 18, 2026",
} as const

/** Convenience markdown link to the support email. */
export const emailLink = `[${company.email}](mailto:${company.email})`
/** Convenience markdown link to the support phone number. */
export const phoneLink = `[${company.phoneDisplay}](tel:${company.phoneHref})`
