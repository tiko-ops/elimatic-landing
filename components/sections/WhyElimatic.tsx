import { Ruler, ShieldCheck, Target } from "@phosphor-icons/react/dist/ssr";
import SectionHeader from "../SectionHeader";

const reasons = [
  {
    icon: Target,
    tag: "Focus",
    title: "Purpose-built AI for cost.",
    text: "Made for one job: finding savings and lowering cost.",
  },
  {
    icon: Ruler,
    tag: "Built by",
    title: "Engineers who have done the work.",
    text: "Designed for the way engineering teams actually work.",
  },
  {
    icon: ShieldCheck,
    tag: "Security",
    title: "Secure by design.",
    text: "Your data stays on your own servers, under your control.",
  },
];

/** Laid out like a datasheet: one row per property. */
export default function WhyElimatic() {
  return (
    <section id="why-elimatic" aria-labelledby="why-title" className="px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          id="why-title"
          eyebrow="Why Elimatic"
          title={
            <>
              Made for cost.
              <br />
              Made by engineers.
            </>
          }
        />

        <dl className="mt-16 border-b border-ink/15 md:mt-20">
          {reasons.map(({ icon: Icon, tag, title, text }, i) => (
            <div
              key={tag}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
              className="grid gap-3 border-t border-ink/15 py-8 md:grid-cols-12 md:items-center md:gap-10 md:py-10"
            >
              <dt className="flex items-center gap-4 md:col-span-3">
                <span className="label text-[11px] text-ink/70">{String(i + 1).padStart(2, "0")}</span>
                <span className="label text-[11px] text-muted">{tag}</span>
              </dt>
              <dd className="md:col-span-5">
                <span className="text-[24px] leading-tight font-semibold tracking-[-0.025em] [font-stretch:104%] md:text-[28px]">
                  {title}
                </span>
              </dd>
              <dd className="flex items-start justify-between gap-6 md:col-span-4">
                <span className="max-w-[22rem] text-[17px] leading-relaxed text-muted">{text}</span>
                <Icon
                  aria-hidden="true"
                  weight="light"
                  className="hidden h-8 w-8 shrink-0 text-accent md:block"
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
