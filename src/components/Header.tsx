"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneCall, ShieldAlert } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // Do not render header on login page
  if (pathname === "/login") return null;

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/60 px-4 py-3 shadow-lg transition-all">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Brand & Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="ACRES Logo"
              className="h-9 w-auto object-contain drop-shadow-[0_0_10px_rgba(0,163,224,0.6)]"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold tracking-wider text-base bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent uppercase">
                ACRES
              </h1>
              <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-[11px] font-medium text-zinc-400 tracking-tight">
              Wildlife Rescue Logger
            </p>
          </div>
        </Link>

        {/* Quick Emergency Action */}
        <a
          href="tel:97837730"
          className="flex items-center gap-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-[0_0_12px_rgba(0,163,224,0.15)]"
        >
          <PhoneCall size={13} className="animate-bounce text-cyan-400" />
          <span>Hotline</span>
        </a>
      </div>
    </header>
  );
}
