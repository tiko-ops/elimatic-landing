import Image from "next/image";

type Img = { src: string; h: number; ratio: number };

type Logo = {
  name: string;
  /** Brand symbol, shown before the name. Single-tone PNGs built by `npm run logos`. */
  mark?: Img;
  /** The name as an official wordmark image... */
  word?: Img;
  /** ...or as text when no wordmark is used. */
  text?: { label: string; className: string };
};

// Team experience. Logos are trademarks of their owners.
// Each entry shows symbol + name where the brand has both; the two Volvo entries are kept apart.
const VOLVO_TEXT = "text-[14px] font-semibold tracking-[0.28em] uppercase";
const LOGOS: Logo[] = [
  {
    name: "Volvo Cars",
    mark: { src: "/logos/volvo-iron-mark.png", h: 30, ratio: 1 },
    text: { label: "Volvo Cars", className: VOLVO_TEXT },
  },
  {
    name: "Polestar",
    mark: { src: "/logos/polestar-mark.png", h: 24, ratio: 0.99 },
    word: { src: "/logos/polestar.png", h: 22, ratio: 4.52 },
  },
  { name: "Lear", word: { src: "/logos/lear.png", h: 30, ratio: 3.73 } },
  {
    name: "Volvo Trucks",
    mark: { src: "/logos/volvo-iron-mark.png", h: 30, ratio: 1 },
    text: { label: "Volvo Trucks", className: VOLVO_TEXT },
  },
  { name: "Zeekr", word: { src: "/logos/zeekr.png", h: 24, ratio: 4.06 } },
  { name: "Chalmers", word: { src: "/logos/chalmers.png", h: 30, ratio: 5.03 } },
  {
    name: "CEVT",
    text: { label: "CEVT", className: "text-[24px] font-[760] tracking-[0.12em] [font-stretch:115%]" },
  },
  { name: "Quokka", word: { src: "/logos/quokka.png", h: 24, ratio: 4.88 } },
];

function LogoImg({ img }: { img: Img }) {
  return (
    <Image
      src={img.src}
      alt=""
      width={Math.round(img.h * img.ratio)}
      height={img.h}
      unoptimized
      loading="eager"
      draggable={false}
      className="opacity-55"
      style={{ height: img.h, width: "auto" }}
    />
  );
}

function LogoItem({ logo, dup = false }: { logo: Logo; dup?: boolean }) {
  return (
    <li
      className={`${dup ? "marquee-dup " : ""}flex h-14 shrink-0 items-center gap-3 px-9 sm:px-14`}
    >
      {logo.mark && <LogoImg img={logo.mark} />}
      {logo.word && <LogoImg img={logo.word} />}
      {logo.text && (
        <span className={`leading-none whitespace-nowrap text-ink/55 ${logo.text.className}`}>
          {logo.text.label}
        </span>
      )}
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
        {LOGOS.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="marquee relative mx-auto mt-8 max-w-[1200px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]"
      >
        <ul className="marquee-track flex w-max items-center">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} logo={logo} dup={i >= LOGOS.length} />
          ))}
        </ul>
      </div>
    </section>
  );
}
