import { Eyebrow } from "../SectionHeader";

const faqs = [
  {
    q: "Do we have to change our workflow?",
    a: "No. Elimatic works alongside the tools your teams already use. Nothing to rip out or relearn.",
  },
  {
    q: "Where does it run?",
    a: "Locally during evaluation, and on private hosting for production. Your data stays within your control at every stage.",
  },
  {
    q: "What data does it need?",
    a: "The engineering and cost data you already have. Connect it, and Elimatic starts looking for savings.",
  },
  {
    q: "Can we tune how it reasons?",
    a: "Yes. The factors that shape its judgment can be configured to fit how your business makes decisions.",
  },
  {
    q: "Who makes the final call?",
    a: "You do. Elimatic finds savings and suggests lower-cost alternatives. Your team decides what to act on.",
  },
  {
    q: "How do we get started?",
    a: "Request a demo. We will walk you through what Elimatic can find for your team.",
  },
];

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-4 pb-28 sm:px-6 md:pb-40">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12 md:gap-10">
        <div data-reveal className="md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
            <Eyebrow>Details</Eyebrow>
            <h2 id="faq-title" className="text-headline mt-5">
              Good to know.
            </h2>
          </div>
        </div>

        <div data-reveal className="border-b border-ink/15 md:col-span-8">
          {faqs.map(({ q, a }, i) => (
            <details key={q} open={i === 0} className="faq group border-t border-ink/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md py-6 text-[19px] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-accent sm:text-[21px] [&::-webkit-details-marker]:hidden">
                {q}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0 text-accent">
                  <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 rounded bg-current" />
                  <span className="absolute top-0 left-1/2 h-4 w-[1.5px] -translate-x-1/2 rounded bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-[40rem] pb-7 text-[17px] leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
