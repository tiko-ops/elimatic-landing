// Team experience, shown as plain company names (no logos).
const COMPANIES = ["Volvo Cars", "Polestar", "Lear", "Volvo Trucks", "Chalmers", "CEVT", "Quokka"];

function NameItem({ name, dup = false }: { name: string; dup?: boolean }) {
  return (
    <li
      className={`${dup ? "marquee-dup " : ""}flex h-14 shrink-0 items-center px-9 sm:px-14`}
    >
      <span className="text-[24px] leading-none font-[760] tracking-[0.12em] whitespace-nowrap text-muted [font-stretch:115%]">
        {name}
      </span>
    </li>
  );
}

export default function LogoMarquee() {
  return (
    <section aria-labelledby="experience-title" className="marquee-section py-20 md:py-28">
      <p
        id="experience-title"
        className="text-center text-[12px] font-medium tracking-[0.2em] text-muted uppercase sm:text-[13px]"
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
        className="marquee relative mx-auto mt-8 max-w-[1200px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]"
      >
        <ul className="marquee-track flex w-max items-center">
          {[...COMPANIES, ...COMPANIES].map((name, i) => (
            <NameItem key={`${name}-${i}`} name={name} dup={i >= COMPANIES.length} />
          ))}
        </ul>
      </div>
    </section>
  );
}
