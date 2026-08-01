"use client";

import { useState, useMemo } from "react";
import LogCard from "@/components/LogCard";
import FAB from "@/components/FAB";
import { AlertTriangle, CheckCircle, Clock, Sparkles, Filter, X, Calendar, ChevronDown } from "lucide-react";
import { isToday, subDays, subMonths } from "date-fns";

export default function LogDashboard({ logs }: { logs: any[] }) {
  const [statusFilter, setStatusFilter] = useState<"ALL" | "URGENT" | "PENDING" | "RESOLVED">("ALL");
  const [dateFilter, setDateFilter] = useState<"TODAY" | "WEEK" | "MONTH" | "ALL">("TODAY");
  const [visibleCount, setVisibleCount] = useState(10);

  const urgentCount = logs.filter((l) => l.priority === "Urgent").length;
  const pendingCount = logs.filter((l) => l.status === "Pending" || l.status === "Status").length;
  const completedCount = logs.filter((l) => l.status !== "Pending" && l.status !== "Status").length;

  // Filter logs by date range and status filter
  const filteredLogs = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = subDays(now, 7);
    const oneMonthAgo = subMonths(now, 1);

    return logs.filter((log) => {
      const logDate = new Date(log.createdAt);

      // Date Filtering
      if (dateFilter === "TODAY" && !isToday(logDate)) return false;
      if (dateFilter === "WEEK" && logDate < sevenDaysAgo) return false;
      if (dateFilter === "MONTH" && logDate < oneMonthAgo) return false;

      // Status Filtering
      if (statusFilter === "URGENT" && log.priority !== "Urgent") return false;
      if (statusFilter === "PENDING" && log.status !== "Pending" && log.status !== "Status") return false;
      if (statusFilter === "RESOLVED" && (log.status === "Pending" || log.status === "Status")) return false;

      return true;
    });
  }, [logs, dateFilter, statusFilter]);

  const paginatedLogs = useMemo(() => {
    return filteredLogs.slice(0, visibleCount);
  }, [filteredLogs, visibleCount]);

  const toggleStatusFilter = (selected: "URGENT" | "PENDING" | "RESOLVED") => {
    setStatusFilter((prev) => (prev === selected ? "ALL" : selected));
    setVisibleCount(10);
  };

  const handleDateFilterChange = (range: "TODAY" | "WEEK" | "MONTH" | "ALL") => {
    setDateFilter(range);
    setVisibleCount(10);
  };

  const hasMore = visibleCount < filteredLogs.length;

  return (
    <main className="min-h-full p-3.5 max-w-2xl mx-auto space-y-3.5">
      {/* Interactive Quick Dashboard Stats Banner (Clickable Status Filters) */}
      <div className="grid grid-cols-3 gap-2">
        {/* Urgent Filter Tile */}
        <button
          type="button"
          onClick={() => toggleStatusFilter("URGENT")}
          className={`p-2.5 text-center rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-xl relative overflow-hidden active:scale-95 ${
            statusFilter === "URGENT"
              ? "bg-red-950/80 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.4)] scale-[1.02] ring-2 ring-red-500/60"
              : "bg-gradient-to-br from-red-950/30 to-zinc-900/60 border-red-500/20 hover:border-red-500/40 text-red-400"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <AlertTriangle size={13} className={statusFilter === "URGENT" ? "animate-bounce" : "animate-pulse"} />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Urgent</span>
          </div>
          <p className="text-xl font-black">{urgentCount}</p>
          {statusFilter === "URGENT" && (
            <span className="absolute top-1 right-1 text-[8px] bg-red-500 text-zinc-950 font-bold px-1 rounded-full">
              ACTIVE
            </span>
          )}
        </button>

        {/* Pending Filter Tile */}
        <button
          type="button"
          onClick={() => toggleStatusFilter("PENDING")}
          className={`p-2.5 text-center rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-xl relative overflow-hidden active:scale-95 ${
            statusFilter === "PENDING"
              ? "bg-amber-950/80 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-[1.02] ring-2 ring-amber-500/60"
              : "bg-gradient-to-br from-amber-950/30 to-zinc-900/60 border-amber-500/20 hover:border-amber-500/40 text-amber-400"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Clock size={13} />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Pending</span>
          </div>
          <p className="text-xl font-black">{pendingCount}</p>
          {statusFilter === "PENDING" && (
            <span className="absolute top-1 right-1 text-[8px] bg-amber-400 text-zinc-950 font-bold px-1 rounded-full">
              ACTIVE
            </span>
          )}
        </button>

        {/* Resolved Filter Tile */}
        <button
          type="button"
          onClick={() => toggleStatusFilter("RESOLVED")}
          className={`p-2.5 text-center rounded-xl border transition-all duration-200 cursor-pointer backdrop-blur-xl relative overflow-hidden active:scale-95 ${
            statusFilter === "RESOLVED"
              ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-[1.02] ring-2 ring-emerald-500/60"
              : "bg-gradient-to-br from-emerald-950/30 to-zinc-900/60 border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <CheckCircle size={13} />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Resolved</span>
          </div>
          <p className="text-xl font-black">{completedCount}</p>
          {statusFilter === "RESOLVED" && (
            <span className="absolute top-1 right-1 text-[8px] bg-emerald-400 text-zinc-950 font-bold px-1 rounded-full">
              ACTIVE
            </span>
          )}
        </button>
      </div>

      {/* Date Filter Range Chips */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-cyan-400 shrink-0" />
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Date:</span>
        </div>

        <div className="flex items-center gap-1.5">
          {[
            { id: "ALL", label: "All Time" },
            { id: "TODAY", label: "Today" },
            { id: "WEEK", label: "Past 7 Days" },
            { id: "MONTH", label: "This Month" },
          ].map((item) => {
            const isActive = dateFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleDateFilterChange(item.id as any)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(0,163,224,0.25)]"
                    : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Title & Active Filter Banner */}
      <div className="flex justify-between items-center pt-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black tracking-tight text-zinc-100">
            {statusFilter === "ALL" ? "Recent Rescue Logs" : `${statusFilter.charAt(0) + statusFilter.slice(1).toLowerCase()} Logs`}
          </h2>
          <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            {filteredLogs.length} {statusFilter === "ALL" && dateFilter === "ALL" ? "Total" : "Matching"}
          </span>
        </div>

        {(statusFilter !== "ALL" || dateFilter !== "ALL") && (
          <button
            type="button"
            onClick={() => {
              setStatusFilter("ALL");
              setDateFilter("ALL");
              setVisibleCount(10);
            }}
            className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <X size={12} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Logs Feed */}
      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-zinc-900/30 border border-zinc-800/60 rounded-3xl p-6">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mb-4 border border-cyan-500/20 shadow-[0_0_20px_rgba(0,163,224,0.2)]">
              <Filter className="text-cyan-400" size={32} />
            </div>
            <h3 className="text-zinc-200 font-bold text-lg">No logs match your filter</h3>
            <p className="text-zinc-400 text-xs mt-1.5 max-w-xs leading-relaxed">
              No rescue logs found for the selected date range or status. Tap "Reset Filters" to view all records.
            </p>
          </div>
        ) : (
          paginatedLogs.map((log) => <LogCard key={log.id} log={log} />)
        )}
      </div>

      {/* Pagination: Load More Button */}
      {hasMore && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-cyan-400 font-extrabold text-sm py-3.5 px-4 rounded-2xl border border-zinc-800 hover:border-cyan-500/40 transition-all active:scale-[0.98] shadow-lg cursor-pointer"
          >
            <span>Showing {paginatedLogs.length} of {filteredLogs.length} Logs</span>
            <span className="text-xs text-zinc-400 font-bold bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
              Load More (+10)
            </span>
            <ChevronDown size={16} className="text-cyan-400" />
          </button>
        </div>
      )}

      <FAB />
    </main>
  );
}
