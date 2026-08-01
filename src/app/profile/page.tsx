import Image from "next/image";
import { User, Key, HelpCircle, LogOut, ShieldCheck, Mail, Building2, BadgeCheck } from "lucide-react";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import ReportExportCard from "@/components/ReportExportCard";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-cyan-950/40 via-zinc-900/60 to-zinc-900/60 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="ACRES Logo"
              className="h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,163,224,0.6)]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-zinc-100">{session.name}</h1>
              <BadgeCheck size={18} className="text-cyan-400" />
            </div>
            <p className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 inline-block">
              {session.role === "ADMIN" ? "Administrator" : "Wildlife Rescuer"}
            </p>
          </div>
        </div>
      </div>

      {/* Account Info Card */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 backdrop-blur-xl space-y-3.5 shadow-xl">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-2">Account Details</h2>

        <div className="flex items-center gap-3 p-3 bg-zinc-950/50 rounded-2xl border border-zinc-800/40">
          <Mail size={18} className="text-cyan-400 shrink-0" />
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500">Email Address</p>
            <p className="text-sm font-semibold text-zinc-200">{session.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-zinc-950/50 rounded-2xl border border-zinc-800/40">
          <Building2 size={18} className="text-teal-400 shrink-0" />
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500">Organization</p>
            <p className="text-sm font-semibold text-zinc-200">ACRES Singapore Wildlife Rescue</p>
          </div>
        </div>
      </div>

      {/* Admin Reporting Card */}
      {session.role === "ADMIN" && <ReportExportCard />}

      {/* Actions */}
      <div className="space-y-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-base transition-all active:scale-[0.98] shadow-lg shadow-red-500/10 cursor-pointer"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
