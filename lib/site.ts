/**
 * Site-wide configuration. Edit values here.
 */
export const site = {
  name: "Elimatic",
  /** Public contact email shown in the footer, contact page and legal pages. */
  contactEmail: "contact@elimatic.se",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://www.elimatic.se" : "http://localhost:3000")
  ).replace(/\/$/, ""),
  title: "Elimatic | Less cost. Same quality. With AI.",
  description:
    "Put in your engineering data. Elimatic returns the cost impact, the savings and lower-cost alternatives, instantly. Lower cost, less manual work, faster decisions.",
  /**
   * Registered company details, shown in the footer and on the legal pages.
   * Fill these in before going live; empty values are simply not shown.
   */
  company: {
    legalName: "", // e.g. "Elimatic AB"
    orgNumber: "", // e.g. "559000-0000"
    address: "", // e.g. "Street 1, 411 00 Gothenburg, Sweden"
  },
  /** Shown on the legal pages. Update when the policies change. */
  legalUpdated: "October 2026",
} as const;
