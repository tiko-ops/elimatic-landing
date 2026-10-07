import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Eyebrow } from "./SectionHeader";

/** Shared layout for Privacy, Terms and Cookie pages: readable column, quiet typography. */
export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="px-4 pt-16 pb-28 sm:px-6 md:pt-24 md:pb-36">
      <div className="mx-auto max-w-[44rem]">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-title mt-4">{title}</h1>
        <p className="mt-3 text-[15px] text-muted">Last updated {site.legalUpdated}</p>

        <div className="legal mt-12 border-t border-ink/15 pt-10">{children}</div>
      </div>
    </article>
  );
}

/** "Elimatic" or the registered name and details, when filled in lib/site.ts. */
export function CompanyIdentity() {
  const { legalName, orgNumber, address } = site.company;
  const name = legalName || "Elimatic";
  const details = [orgNumber && `company registration number ${orgNumber}`, address]
    .filter(Boolean)
    .join(", ");
  return (
    <>
      {name}
      {details ? ` (${details})` : ""}
    </>
  );
}

export function ContactLink() {
  return (
    <a href={`mailto:${site.contactEmail}`} className="font-medium text-accent hover:underline">
      {site.contactEmail}
    </a>
  );
}
