import type { Config } from "tailwindcss";
import * as defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-pt-serif)", ...defaultTheme.fontFamily.serif],
        sans: ["var(--font-rampart-one)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
