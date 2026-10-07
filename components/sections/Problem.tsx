import { Eyebrow } from "../SectionHeader";

const points = [
  {
    title: "Cost output takes days.",
    text: "Engineering input waits in queues, inboxes and meetings before anyone knows the cost.",
  },
  {
    title: "Spreadsheets everywhere.",
    text: "Hours of manual work, copied numbers and versions no one trusts.",
  },
  {
    title: "Savings found too late.",
    text: "Often after the money is spent. Sometimes never.",
  },
];

const SHEETS = [-2.5, 1.5, -1, 2.5, -2, 0.5, 2, -1.5, 1, -0.5]; // slight tilt per sheet, bottom to top

/** A messy pile of paperwork: copied numbers, spreadsheets, emails. */
function PaperStack() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[clamp(96px,14vw,150px)]">
        <div className="flex flex-col-reverse">
          {SHEETS.map((tilt, i) => (
            <span
              key={i}
              className="paper-drop block h-3 rounded-[3px] border border-ink/20 bg-white shadow-[0_1px_0_rgba(33,32,28,0.08)]"
              style={{
                marginTop: i === SHEETS.length - 1 ? 0 : -2,
                transform: `rotate(${tilt}deg) translateX(${tilt * 1.5}px)`,
                ["--d" as string]: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-[15px] font-medium text-ink sm:text-[17px]">Today</p>
      <p className="text-[14px] text-muted sm:text-[15px]">Days</p>
    </div>
  );
}

/** One clean sheet, done. */
function OneSheet() {
  return (
    <div className="flex flex-col items-center">
      <div
        className="paper-drop relative flex h-[clamp(72px,10vw,96px)] w-[clamp(58px,8vw,78px)] flex-col gap-1.5 rounded-[6px] border border-accent-vivid/50 bg-white p-2.5 shadow-raise"
        style={{ ["--d" as string]: "2100ms" }}
      >
        <span className="h-1.5 w-full rounded-full bg-ink/20" />
        <span className="h-1.5 w-4/5 rounded-full bg-ink/15" />
        <span className="h-1.5 w-3/5 rounded-full bg-ink/15" />
        <span className="absolute -right-2.5 -bottom-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-accent-vivid text-white shadow-raise">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5"><path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <p className="mt-4 text-[15px] font-semibold whitespace-nowrap text-ink sm:text-[17px]">With Elimatic</p>
      <p className="text-[14px] font-medium text-accent-hover sm:text-[15px]">Seconds</p>
    </div>
  );
}

export default function Problem() {
  return (
    <section aria-labelledby="problem-title" className="px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div data-reveal className="md:col-span-6">
            <Eyebrow>The problem</Eyebrow>
            <h2 id="problem-title" className="text-headline mt-5 max-w-[14ch]">
              Cost work is still slow, manual and late.
            </h2>
          </div>

          {/* Today vs with Elimatic: a pile of paperwork vs one clean sheet */}
          <div data-reveal className="paper-figure md:col-span-6 md:pt-14">
            <figure className="rounded-[20px] border border-ink/20 bg-surface px-6 pt-8 pb-6 sm:px-9">
              <figcaption className="sr-only">
                Today, getting from engineering input to cost output is a tall pile of paperwork
                that takes days. With Elimatic it is a single sheet, done in seconds.
              </figcaption>
              <div aria-hidden="true" className="flex items-end justify-center gap-[clamp(1rem,5vw,3rem)]">
                <PaperStack />

                {/* Hand-drawn arrow */}
                <svg viewBox="0 0 120 70" className="mb-16 w-[clamp(56px,9vw,100px)] shrink-0 text-ink/70">
                  <path className="paper-arrow" pathLength={1} d="M6 18 C 34 2, 74 4, 104 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ ["--d" as string]: "1150ms" }} />
                  <path className="paper-arrow" pathLength={1} d="M90 38 L105 42 L103 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ ["--d" as string]: "1600ms" }} />
                </svg>

                <OneSheet />
              </div>
            </figure>
          </div>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-8 md:mt-24 md:grid-cols-3">
          {points.map(({ title, text }, i) => (
            <li
              key={title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
              className="border-t border-ink/15 pt-5"
            >
              <h3 className="text-[21px] font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 max-w-[22rem] text-[17px] leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
