"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PhoneCall, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on login screen
  if (pathname === "/login") return null;

  const navItems = [
    { name: "Logs", path: "/", icon: Home },
    { name: "Search", path: "/search", icon: Search },
    { name: "Contacts", path: "/contacts", icon: PhoneCall },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/85 backdrop-blur-2xl border-t border-zinc-800/80 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-300 relative ${
                isActive ? "text-cyan-400 font-bold" : "text-zinc-500 hover:text-zinc-300 font-medium"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(0,163,224,0.8)]" />
              )}
              <Icon
                size={21}
                className={`transition-transform duration-300 ${
                  isActive ? "scale-110 drop-shadow-[0_0_10px_rgba(0,163,224,0.6)]" : ""
                }`}
              />
              <span className="text-[10px] tracking-wide mt-1">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
