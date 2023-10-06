import { Rampart_One } from "next/font/google";
import { PT_Serif } from "next/font/google";
export const pt_serif = PT_Serif({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-pt-serif",
  display: "swap",
  preload: true,
});
export const rampart_one = Rampart_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rampart-one",
  preload: true,
  display: "swap",
});
