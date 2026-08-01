import Link from "next/link";
import { Clock, MapPin, AlertCircle, CheckCircle2, ChevronRight, UserCheck } from "lucide-react";
import { format } from "date-fns";

type LogCardProps = {
  log: {
    id: string;
    createdAt: Date;
    animal: string;
    location: string;
    priority: string;
    status: string;
    species?: string | null;
    callerName?: string | null;
    callerNumber?: string | null;
    phoneHolder?: string | null;
    driver?: string | null;
    phoneHolderDriver?: string | null;
    animalAdditionalInfo?: string | null;
  };
};

function getAnimalEmoji(animal: string, species?: string | null): string {
  const text = `${animal} ${species || ""}`.toLowerCase();
  if (text.includes("snake") || text.includes("python") || text.includes("cobra")) return "🐍";
  if (text.includes("monkey") || text.includes("macaque")) return "🐒";
  if (text.includes("bird") || text.includes("pigeon") || text.includes("owl") || text.includes("koel") || text.includes("myna") || text.includes("eagle") || text.includes("falcon")) return "🐦";
  if (text.includes("turtle") || text.includes("tortoise") || text.includes("terrapin")) return "🐢";
  if (text.includes("pangolin")) return "🦔";
  if (text.includes("lizard") || text.includes("monitor") || text.includes("gecko")) return "🦎";
  if (text.includes("bat")) return "🦇";
  if (text.includes("cat") || text.includes("kitten")) return "🐱";
  if (text.includes("dog") || text.includes("puppy")) return "🐶";
  if (text.includes("otter")) return "🦦";
  if (text.includes("wild boar") || text.includes("pig")) return "🐗";
  return "🐾";
}

export default function LogCard({ log }: LogCardProps) {
  const emoji = getAnimalEmoji(log.animal, log.species);
  const isUrgent = log.priority === "Urgent";
  const isCompleted = log.status !== "Status" && log.status !== "Pending";

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.2)]";
      case "Get Updates":
      case "Call before going":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Sending to us":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      default:
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    }
  };

  return (
    <Link href={`/edit/${log.id}`} className="block group">
      <div
        className={`relative overflow-hidden rounded-xl p-3 mb-2 backdrop-blur-xl border transition-all duration-200 active:scale-[0.99] ${
          isUrgent
            ? "bg-gradient-to-r from-red-950/30 via-zinc-900/70 to-zinc-900/70 border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.15)] group-hover:border-red-500/60"
            : "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700/80 shadow-sm"
        }`}
      >
        {/* Glow overlay for urgent */}
        {isUrgent && (
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-lg pointer-events-none" />
        )}

        {/* Row 1: Animal Info + Priority */}
        <div className="flex justify-between items-center mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-zinc-800/90 border border-zinc-700/50 flex items-center justify-center text-sm shrink-0 shadow-inner">
              {emoji}
            </div>
            <div className="min-w-0 flex items-baseline gap-1.5">
              <h3 className="font-bold text-zinc-100 text-sm tracking-tight truncate group-hover:text-cyan-300 transition-colors">
                {log.species || log.animal}
              </h3>
              {log.species && (
                <span className="text-[10px] text-zinc-400 font-medium shrink-0">({log.animal})</span>
              )}
            </div>
          </div>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 ${getPriorityStyle(log.priority)}`}>
            {isUrgent && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
            {log.priority}
          </span>
        </div>

        {/* Row 2: Location & Maps Navigation Button */}
        <div className="flex items-center justify-between gap-2 bg-zinc-950/50 px-2.5 py-1.5 rounded-lg border border-zinc-800/40 mb-1.5">
          <div className="flex items-center text-zinc-300 text-xs font-medium min-w-0">
            <MapPin size={13} className="mr-1 text-cyan-400 shrink-0" />
            <p className="truncate text-[11px] text-zinc-300">{log.location}</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(log.location + ", Singapore")}`, "_blank", "noopener,noreferrer");
            }}
            className="flex items-center gap-1 shrink-0 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-bold text-[10px] px-2 py-0.5 rounded-md border border-cyan-500/30 transition-all cursor-pointer"
            title="Open Google Maps Navigation"
          >
            <span>Navigate</span>
            <span className="text-[10px]">🗺️</span>
          </button>
        </div>

        {/* Row 3: Footer status, crew & time */}
        <div className="flex justify-between items-center text-[11px] text-zinc-400">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1 font-semibold shrink-0">
              {isCompleted ? (
                <CheckCircle2 size={12} className="text-emerald-400" />
              ) : (
                <AlertCircle size={12} className="text-amber-400" />
              )}
              <span className={isCompleted ? "text-emerald-400 text-[10px]" : "text-amber-400 text-[10px]"}>
                {log.status}
              </span>
            </div>

            {(log.phoneHolder || log.driver || log.phoneHolderDriver) && (
              <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-medium bg-zinc-800/40 px-1.5 py-0.2 rounded border border-zinc-700/40 truncate">
                <UserCheck size={11} className="text-cyan-400 shrink-0" />
                <span className="truncate max-w-[110px]">
                  {log.phoneHolder && log.driver
                    ? `${log.phoneHolder} / ${log.driver}`
                    : log.phoneHolder || log.driver || log.phoneHolderDriver}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-zinc-500 font-medium text-[10px] shrink-0">
            <Clock size={10} />
            <span>{format(new Date(log.createdAt), "h:mm a")}</span>
            <ChevronRight size={13} className="text-zinc-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
