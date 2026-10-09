// Team experience, shown as plain company names (no logos).
const COMPANIES = ["Volvo Cars", "Polestar", "Lear", "Volvo Trucks", "Chalmers", "CEVT", "Quokka"];

function NameItem({ name, dup = false, compact }: { name: string; dup?: boolean; compact: boolean }) {
  return (
    <li
      className={`${dup ? "marquee-dup " : ""}flex shrink-0 items-center ${
        compact ? "h-10 px-7 sm:px-11" : "h-14 px-9 sm:px-14"
      }`}
    >
      <span
        className={`leading-none font-[760] tracking-[0.12em] whitespace-nowrap text-muted [font-stretch:115%] ${
          compact ? "text-[20px] sm:text-[24px]" : "text-[24px]"
        }`}
      >
        {name}
      </span>
    </li>
  );
}

/** `compact` is the smaller version shown at the bottom of the hero, inside the first screen. */
export default function LogoMarquee({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-labelledby="experience-title"
      className={`marquee-section ${compact ? "pt-[clamp(0.5rem,1.6svh,1.25rem)]" : "py-20 md:py-28"}`}
    >
      <p
        id="experience-title"
        className="text-center text-[11px] font-medium tracking-[0.2em] text-muted uppercase sm:text-[12px]"
      >
        With experience from
      </p>

      {/* Screen readers get a plain list; the moving strip is decorative */}
      <ul className="sr-only">
        {COMPANIES.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      {/* The list is rendered twice so the scroll can loop seamlessly */}
      <div
        aria-hidden="true"
        className={`marquee relative mx-auto max-w-[1200px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)] ${
          compact ? "mt-2" : "mt-8"
        }`}
      >
        <ul className="marquee-track flex w-max items-center">
          {[...COMPANIES, ...COMPANIES].map((name, i) => (
            <NameItem key={`${name}-${i}`} name={name} dup={i >= COMPANIES.length} compact={compact} />
          ))}
        </ul>
      </div>
    </section>
  );
}
