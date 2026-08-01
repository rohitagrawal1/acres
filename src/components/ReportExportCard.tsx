"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, Calendar, Filter, Check } from "lucide-react";
import { ANIMALS } from "@/lib/constants";

export default function ReportExportCard() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1-12

  const [year, setYear] = useState(String(currentYear));
  const [month, setMonth] = useState(String(currentMonth));
  const [category, setCategory] = useState("ALL");
  const [isDownloading, setIsDownloading] = useState(false);

  const months = [
    { id: "1", name: "January" },
    { id: "2", name: "February" },
    { id: "3", name: "March" },
    { id: "4", name: "April" },
    { id: "5", name: "May" },
    { id: "6", name: "June" },
    { id: "7", name: "July" },
    { id: "8", name: "August" },
    { id: "9", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
  ];

  const handleDownload = () => {
    setIsDownloading(true);
    const url = `/api/reports/export?year=${year}&month=${month}&category=${encodeURIComponent(category)}`;
    window.location.href = url;
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 backdrop-blur-xl space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
          <FileSpreadsheet size={18} />
          <span>Admin Monthly Reporting</span>
        </div>
        <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
          CSV Export
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar size={11} className="text-cyan-400" />
            <span>Select Month</span>
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-3 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-xs font-semibold"
          >
            {months.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Select Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-3 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-xs font-semibold"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
          <Filter size={11} className="text-teal-400" />
          <span>Filter Category</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-3 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-xs font-semibold"
        >
          <option value="ALL">All Categories</option>
          {ANIMALS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-zinc-950 font-extrabold text-sm py-3 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
      >
        {isDownloading ? <Check size={16} className="animate-bounce" /> : <Download size={16} />}
        <span>{isDownloading ? "Generating CSV Report..." : "Download CSV Report"}</span>
      </button>
    </div>
  );
}
