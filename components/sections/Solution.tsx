import { ArrowRight, Check, Clock, Coin, FileText, MagnifyingGlass, Tag } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import SectionHeader from "../SectionHeader";

/* Simple illustrations: everyday objects, one short label each. Decorative only. */

function Caption({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span className={`mt-2 text-[14px] font-medium ${accent ? "text-accent-hover" : "text-muted"}`}>
      {children}
    </span>
  );
}

function OutputVignette() {
  return (
    <div className="flex h-full items-center justify-center gap-6">
      <div className="flex flex-col items-center">
        <FileText aria-hidden="true" weight="light" className="h-16 w-16 text-ink/70" />
        <Caption>Your data</Caption>
      </div>
      <ArrowRight aria-hidden="true" weight="bold" className="h-6 w-6 text-ink/40" />
      <div className="flex flex-col items-center">
        <Tag aria-hidden="true" weight="fill" className="h-16 w-16 text-accent-vivid" />
        <Caption accent>Cost</Caption>
      </div>
    </div>
  );
}

function SavingsVignette() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative h-20 w-20">
        <MagnifyingGlass aria-hidden="true" weight="light" className="absolute inset-0 h-20 w-20 text-ink/70" />
        <Coin aria-hidden="true" weight="fill" className="absolute top-[17%] left-[17%] h-[38%] w-[38%] text-accent-vivid" />
      </div>
      <Caption accent>Savings found</Caption>
    </div>
  );
}

function AlternativesVignette() {
  return (
    <div className="flex h-full items-center justify-center gap-5">
      <div className="flex flex-col items-center">
        <span className="rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-[22px] font-semibold text-ink/40 line-through decoration-2">
          €€€
        </span>
        <Caption>Today</Caption>
      </div>
      <ArrowRight aria-hidden="true" weight="bold" className="mb-6 h-6 w-6 text-ink/40" />
      <div className="flex flex-col items-center">
        <span className="relative rounded-xl border border-accent-vivid/60 bg-white px-4 py-2.5 text-[22px] font-semibold text-ink shadow-raise">
          €€
          <span className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent-vivid text-white">
            <Check aria-hidden="true" weight="bold" className="h-3.5 w-3.5" />
          </span>
        </span>
        <Caption accent>Same job</Caption>
      </div>
    </div>
  );
}

function HoursVignette() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative">
        <Clock aria-hidden="true" weight="light" className="h-20 w-20 text-ink/70" />
        <span className="absolute -right-10 -bottom-1 rounded-full bg-accent-vivid px-2.5 py-1 text-[13px] font-semibold whitespace-nowrap text-white shadow-raise">
          Hours back
        </span>
      </div>
    </div>
  );
}

const benefits: { title: string; text: string; visual: ReactNode }[] = [
  {
    title: "Instant cost output.",
    text: "Put in engineering data. Get the cost impact back in seconds.",
    visual: <OutputVignette />,
  },
  {
    title: "Savings, found automatically.",
    text: "AI scans your data and surfaces savings you would have missed.",
    visual: <SavingsVignette />,
  },
  {
    title: "Lower-cost alternatives.",
    text: "AI suggests cheaper options that meet the same requirements, ranked by savings.",
    visual: <AlternativesVignette />,
  },
  {
    title: "Hours of manual work, removed.",
    text: "Less time in spreadsheets. More time for engineering.",
    visual: <HoursVignette />,
  },
];

export default function Solution() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="solution-title"
      className="px-4 pt-4 pb-28 sm:px-6 md:pb-40"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          id="solution-title"
          eyebrow="How it works"
          title="AI does the heavy lifting."
          intro="Elimatic reads your engineering and cost data, finds what can be improved and tells you before money is spent."
        />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5">
          {benefits.map(({ title, text, visual }, i) => (
            <li
              key={title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 2) * 120}ms` }}
              className="flex flex-col overflow-hidden rounded-[24px] border border-ink/15 bg-white shadow-card"
            >
              <div
                aria-hidden="true"
                className="relative h-[200px] bg-white px-7 pt-8 pb-2 sm:px-9"
              >
                <div className="relative h-full">{visual}</div>
              </div>
              <div className="p-7 sm:p-9">
                <h3 className="text-[22px] leading-tight font-semibold tracking-[-0.025em] [font-stretch:104%] md:text-[26px]">
                  {title}
                </h3>
                <p className="mt-2.5 max-w-[26rem] text-[17px] leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
