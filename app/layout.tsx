import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { pt_serif, rampart_one } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="relative min-h-full">
      <body
        className={`${pt_serif.variable} ${rampart_one.variable} font-serif px-4 mx-auto max-w-5xl `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
