"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function FAB() {
  return (
    <Link
      href="/add"
      className="fixed bottom-20 right-5 group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-zinc-950 px-4 py-3.5 rounded-full shadow-[0_0_25px_rgba(0,163,224,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 z-40 border border-cyan-300/40"
    >
      <Plus size={22} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
      <span className="font-extrabold text-sm tracking-wide">Log Rescue</span>
    </Link>
  );
}
