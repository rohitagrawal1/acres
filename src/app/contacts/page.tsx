import { Phone, Shield, LifeBuoy, Wrench, Siren, ExternalLink } from "lucide-react";

export default function ContactsPage() {
  const contacts = [
    { name: "ACRES Rescue Hotline", number: "97837730", desc: "Wildlife Rescue (24-Hours)", priority: true, category: "Rescue" },
    { name: "NPARKS Animal Response Centre", number: "18004761600", desc: "National Parks Board (24-Hours)", priority: true, category: "Government" },
    { name: "SPCA Hotline", number: "62875355", desc: "Animal Cruelty & Emergencies (ext 9)", priority: false, category: "NGO" },
    { name: "ACRES Main Office", number: "68929821", desc: "91 Jalan Lekar 698917", priority: false, category: "Rescue" },
    { name: "PUB Hotline", number: "18002255782", desc: "Drains & Waterways Emergency", priority: false, category: "Government" },
    { name: "NEA Hotline", number: "18002255632", desc: "Environmental Health", priority: false, category: "Government" },
    { name: "LTA (EMAS)", number: "18002255582", desc: "Expressway Emergency Assistance", priority: false, category: "Transport" },
    { name: "Traffic Police", number: "65470000", desc: "Road Emergencies", priority: false, category: "Police" },
    { name: "Police Emergency", number: "999", desc: "Immediate Police Response", priority: true, category: "Emergency" },
    { name: "SCDF (Ambulance/Fire)", number: "995", desc: "Medical / Rescue Emergency", priority: true, category: "Emergency" },
    { name: "On-site Tyre Patching", number: "88008999", desc: "24-Hour Van Breakdown Service", priority: false, category: "Breakdown" },
  ];

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-5">
      <div className="flex justify-between items-center pt-1">
        <div>
          <h1 className="text-xl font-black text-zinc-100">
            Emergency Contacts
          </h1>
          <p className="text-xs text-zinc-400 font-medium mt-0.5">Quick-dial directory for field rescuers</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,163,224,0.2)]">
          <Siren size={20} className="animate-pulse" />
        </div>
      </div>

      <div className="space-y-3">
        {contacts.map((c) => (
          <a
            key={c.name}
            href={`tel:${c.number}`}
            className={`group flex items-center justify-between p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 active:scale-[0.98] ${
              c.priority
                ? "bg-gradient-to-r from-cyan-950/30 via-zinc-900/60 to-zinc-900/60 border-cyan-500/40 shadow-[0_0_15px_rgba(0,163,224,0.1)] hover:border-cyan-500/70"
                : "bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700/80"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-zinc-100 text-base group-hover:text-cyan-300 transition-colors">
                  {c.name}
                </h2>
                {c.priority && (
                  <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-cyan-500/30">
                    24-HRS
                  </span>
                )}
              </div>
              <div className="text-zinc-400 text-xs font-medium flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                  {c.number}
                </span>
                {c.desc && <span className="text-zinc-400 truncate">{c.desc}</span>}
              </div>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-400 flex items-center justify-center text-zinc-950 shadow-[0_0_15px_rgba(0,163,224,0.4)] group-hover:scale-110 transition-transform shrink-0">
              <Phone size={20} className="fill-zinc-950" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
