import Link from "next/link";
import { Eyebrow } from "../SectionHeader";

export default function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-ink px-6 py-24 text-white sm:px-12 md:py-32">
        {/* Dot-grid paper, as in the hero chart */}
        <div
          aria-hidden="true"
          className="pattern-dots pointer-events-none absolute inset-0 text-white/[0.14] [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_75%)]"
        />
        <div data-reveal className="relative mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <Eyebrow className="text-white/60">Get started</Eyebrow>
          <h2 id="cta-title" className="text-headline mt-6">
            Optimize before money is spent.
          </h2>
          <p className="mt-6 max-w-[30rem] text-[19px] leading-relaxed text-white/65 sm:text-[21px]">
            See what Elimatic finds in your data.
          </p>
          <Link
            href="/contact"
            className="mt-10 rounded-full bg-accent px-7 py-3.5 text-[17px] font-medium text-white transition-colors hover:bg-accent-hover focus-visible:rounded-full focus-visible:outline-white"
          >
            Request a demo
          </Link>
        </div>
      </div>
    </section>
  );
}
