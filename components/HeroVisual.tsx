/*
 * Two coin stacks: what you pay today, and what you pay with Elimatic.
 * A hand-drawn arrow leads from one to the other. Illustrative only: no figures.
 * Plays once on load; final state with reduced motion.
 */
const TODAY_COINS = 11;
const ELIMATIC_COINS = 5;
const START_MS = 400;
const COIN_MS = 75; // between coins
const ARROW_MS = START_MS + TODAY_COINS * COIN_MS + 200;
const ELIMATIC_START_MS = ARROW_MS + 700;

function Stack({
  count,
  startMs,
  tone,
  label,
}: {
  count: number;
  startMs: number;
  tone: "grey" | "orange";
  label: string;
}) {
  const coin =
    tone === "grey"
      ? "bg-[#dad9d6] shadow-[inset_0_-4px_0_rgba(33,32,28,0.14),inset_0_2px_0_rgba(255,255,255,0.7)]"
      : "bg-accent-vivid shadow-[inset_0_-4px_0_rgba(0,0,0,0.18),inset_0_2px_0_rgba(255,255,255,0.35)]";
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col-reverse items-center">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={`coin-drop block h-[var(--coin-h)] w-[var(--coin-w)] rounded-[50%] ${coin}`}
            style={{
              marginTop: i === count - 1 ? 0 : "calc(var(--coin-h) * -0.46)",
              ["--d" as string]: `${startMs + i * COIN_MS}ms`,
            }}
          />
        ))}
      </div>
      <p
        className={`hero-fade mt-3 text-[15px] sm:text-[17px] ${
          tone === "grey" ? "font-medium text-muted" : "font-semibold text-ink"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Two stacks of coins. Today: a tall grey stack. An arrow points to With Elimatic: a much shorter orange stack, so you pay less."
      className="relative flex min-h-[170px] w-full flex-1 items-end justify-center overflow-hidden rounded-[24px] border border-ink/15 bg-white px-5 pt-6 pb-5 shadow-card sm:px-10 sm:pb-7"
      style={{
        ["--coin-w" as string]: "clamp(76px, 11vw, 132px)",
        ["--coin-h" as string]: "clamp(18px, 3svh, 30px)",
      }}
    >
      <div aria-hidden="true" className="flex items-end gap-[clamp(1.5rem,7vw,7rem)]">
        <Stack count={TODAY_COINS} startMs={START_MS} tone="grey" label="Today" />

        {/* Hand-drawn arrow, drawn once */}
        <svg
          viewBox="0 0 120 70"
          className="mb-[calc(var(--coin-h)*3)] w-[clamp(64px,10vw,130px)] shrink-0 text-ink/70"
        >
          <path
            className="arrow-draw"
            pathLength={1}
            d="M6 18 C 34 2, 74 4, 104 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ ["--d" as string]: `${ARROW_MS}ms` }}
          />
          <path
            className="arrow-draw"
            pathLength={1}
            d="M90 38 L105 42 L103 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ ["--d" as string]: `${ARROW_MS + 450}ms` }}
          />
        </svg>

        <Stack count={ELIMATIC_COINS} startMs={ELIMATIC_START_MS} tone="orange" label="With Elimatic" />
      </div>
    </div>
  );
}
