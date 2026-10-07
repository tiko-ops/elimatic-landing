import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Eyebrow } from "@/components/SectionHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "See what Elimatic finds in your data. Request a demo of the AI platform that brings down cost.",
  alternates: { canonical: "/contact" },
  // Page-level openGraph replaces the root one, so repeat the shared fields.
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Request a demo | Elimatic",
    description: "See what Elimatic finds in your data.",
    url: "/contact",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a demo | Elimatic",
    description: "See what Elimatic finds in your data.",
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <section
      aria-labelledby="contact-title"
      className="px-4 pt-10 pb-24 sm:px-6 md:pt-24 md:pb-40"
    >
      <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-[1fr_1.15fr] md:grid-rows-[auto_1fr] md:gap-x-16 md:gap-y-10 lg:gap-x-24">
        <div className="md:col-start-1 md:row-start-1 md:pt-6">
          <Eyebrow>Request a demo</Eyebrow>
          <h1
            id="contact-title"
            className="text-title mt-4 sm:mt-5 sm:text-[clamp(2.5rem,1.4rem+3vw,3.5rem)]"
          >
            See what Elimatic finds in your data.
          </h1>
          <p className="mt-4 max-w-[28rem] text-[17px] leading-relaxed text-muted sm:mt-6 sm:text-[19px]">
            Tell us a little about you and your team. We will get back to you to set up a short,
            focused demo.
          </p>
        </div>

        <div className="rounded-[24px] bg-surface p-5 sm:p-10 md:col-start-2 md:row-span-2 md:row-start-1">
          <ContactForm />
        </div>

        <div className="border-t border-ink/15 pt-6 text-[15px] text-muted md:col-start-1 md:row-start-2 md:self-start">
          <p>Prefer email?</p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="mt-1 inline-block rounded-md text-ink transition-colors hover:text-accent"
          >
            {site.contactEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
