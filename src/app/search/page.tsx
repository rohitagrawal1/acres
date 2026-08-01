"use client";

import { useState } from "react";
import { Search as SearchIcon, Filter, Sparkles } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchIn, setSearchIn] = useState("callerName");

  const categories = [
    { id: "callerName", label: "Caller Name" },
    { id: "callerNumber", label: "Phone Number" },
    { id: "location", label: "Location" },
    { id: "animal", label: "Animal/Species" },
    { id: "status", label: "Status" },
  ];

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-5">
      <div className="flex justify-between items-center pt-1">
        <div>
          <h1 className="text-xl font-black text-zinc-100">
            Search Logs
          </h1>
          <p className="text-xs text-zinc-400 font-medium mt-0.5">Filter past rescue cases and caller records</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,163,224,0.2)]">
          <Filter size={20} />
        </div>
      </div>

      <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800/80 shadow-2xl backdrop-blur-2xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
            Search Keyword
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
              <SearchIcon size={18} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl pl-10 pr-4 py-3.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-zinc-500 text-sm font-medium"
              placeholder="Enter keyword..."
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
            Filter By Field
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSearchIn(cat.id)}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-all border ${
                  searchIn === cat.id
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(0,163,224,0.2)]"
                    : "bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:bg-zinc-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <select
            value={searchIn}
            onChange={(e) => setSearchIn(e.target.value)}
            className="sr-only"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-zinc-950 font-extrabold text-base py-3.5 rounded-xl mt-3 transition-all active:scale-[0.98] shadow-lg shadow-cyan-500/20 cursor-pointer">
          Search Records
        </button>
      </div>

      <div className="py-12 text-center text-zinc-400 text-xs font-medium bg-zinc-900/30 border border-zinc-800/60 rounded-3xl p-6">
        <Sparkles size={24} className="mx-auto mb-2 text-cyan-400 opacity-60" />
        <p>Type a keyword above and select a field to search through past cases.</p>
      </div>
    </div>
  );
}
