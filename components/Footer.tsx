import Link from "next/link";
import { site } from "@/lib/site";
import Wordmark from "./Wordmark";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "The effect over time", href: "/#effect" },
      { label: "Why Elimatic", href: "/#why-elimatic" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Request a demo", href: "/contact" },
      { label: "Contact", href: `mailto:${site.contactEmail}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { legalName, orgNumber, address } = site.company;
  const companyLine = [legalName, orgNumber, address].filter(Boolean);

  return (
    <footer className="mt-4 bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 pt-16 pb-10 sm:px-6">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" aria-label="Elimatic home" className="inline-block rounded-md">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-[17rem] text-[15px] leading-relaxed text-muted">
              The AI platform for cost. Engineering data in, savings and lower-cost alternatives
              out.
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-5 inline-block rounded-md text-[15px] font-medium text-accent-hover transition-colors hover:text-ink"
            >
              {site.contactEmail}
            </a>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[15px] font-semibold text-ink">{col.title}</p>
                <ul className="mt-4 space-y-3 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("mailto:") ? (
                        <a href={l.href} className="rounded-md text-muted transition-colors hover:text-ink">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="rounded-md text-muted transition-colors hover:text-ink">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Registered company details, once filled in (lib/site.ts) */}
        {companyLine.length > 0 && (
          <p className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink/10 pt-6 text-[13px] text-muted">
            {companyLine.map((part, i) => (
              <span key={part} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                <span className={i === 0 ? "text-ink/80" : undefined}>{part}</span>
              </span>
            ))}
          </p>
        )}

        <div
          className={`flex flex-col gap-3 border-t border-ink/10 pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:gap-8 ${
            companyLine.length > 0 ? "mt-6" : "mt-16"
          }`}
        >
          <p>© {year} Elimatic. All rights reserved.</p>
          <Link href="/cookies" className="rounded-md transition-colors hover:text-ink">
            No tracking cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
