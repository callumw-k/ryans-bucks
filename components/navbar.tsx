import { link } from "fs";
import Link from "next/link";

const links = [
  { name: "Scorecard", href: "/" },
  { name: "Rules", href: "/ruels" },
  { name: "Leaderboard", href: "/leaderboard" },
];
export function Navbar() {
  return (
    <header className="border-y border-[rgba(0,0,0,51%)] py-1 mt-7">
      <nav className="border-y border-black">
        <ul className="flex justify-between my-2">
          {links.map((link) => (
            <li className="text-2xl italic" key={link.href}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
