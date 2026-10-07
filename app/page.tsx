import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { site } from "@/lib/site";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Problem from "@/components/sections/Problem";
import Impact from "@/components/sections/Impact";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Solution from "@/components/sections/Solution";
import WhyElimatic from "@/components/sections/WhyElimatic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.company.legalName || site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.contactEmail,
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <LogoMarquee />
      <Problem />
      <Solution />
      <Impact />
      <WhyElimatic />
      <Faq />
      <FinalCta />
    </>
  );
}
