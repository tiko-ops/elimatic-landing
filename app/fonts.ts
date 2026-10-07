import localFont from "next/font/local";

/** Mona Sans by GitHub (SIL OFL 1.1). Variable weight and width. */
export const monaSans = localFont({
  src: "./fonts/MonaSans-Variable.woff2",
  variable: "--font-mona",
  weight: "200 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});

/** JetBrains Mono (SIL OFL 1.1). Used sparingly for technical labels. */
export const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jbmono",
  weight: "100 800",
  display: "swap",
});
