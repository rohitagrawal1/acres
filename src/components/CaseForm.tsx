"use client";

import { useState, useEffect, useMemo } from "react";
import { saveCase } from "@/app/actions";
import { ANIMALS, PRIORITIES, ACTIONS_TAKEN, STATUSES, getSpeciesList, normalizeAnimalCategory, getSpeciesEmoji } from "@/lib/constants";
import { ChevronDown, ArrowLeft, Save, ShieldAlert, User, Activity, Truck, PhoneCall, Sparkles, Search, Check, Layers } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton({ onSaveMemory }: { onSaveMemory: () => void }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={onSaveMemory}
      disabled={pending}
      className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-zinc-950 font-extrabold text-base py-4 rounded-2xl mt-6 transition-all active:scale-[0.98] disabled:opacity-50 shadow-[0_0_25px_rgba(0,163,224,0.3)] cursor-pointer"
    >
      <Save size={20} className={pending ? "animate-spin" : ""} />
      <span>{pending ? "Saving Rescue Log..." : "Save Rescue Log"}</span>
    </button>
  );
}

const CATEGORY_CHIPS = [
  { id: "Mammal", label: "Mammal", emoji: "🐒" },
  { id: "Bird", label: "Bird", emoji: "🐦" },
  { id: "Reptile", label: "Reptile", emoji: "🐍" },
  { id: "Amphibian", label: "Amphibian", emoji: "🐸" },
  { id: "Insect / Arthropod", label: "Insect", emoji: "🐝" },
  { id: "Domestic", label: "Domestic", emoji: "🐱" },
  { id: "Errand", label: "Errand", emoji: "🚚" },
  { id: "Other", label: "Other", emoji: "🐾" },
];

export default function CaseForm({ initialData = {} }: { initialData?: any }) {
  const initialCategory = normalizeAnimalCategory(initialData.animal || "Mammal");
  const [animal, setAnimal] = useState(initialCategory);
  const [species, setSpecies] = useState(initialData.species || "");
  const [phoneHolder, setPhoneHolder] = useState(initialData.phoneHolder || "");
  const [driver, setDriver] = useState(initialData.driver || "");
  const [speciesSearch, setSpeciesSearch] = useState("");

  // Dynamically compute species list for selected animal category
  const speciesOptions = useMemo(() => getSpeciesList(animal), [animal]);

  const filteredSpeciesOptions = useMemo(() => {
    if (!speciesSearch) return speciesOptions;
    return speciesOptions.filter((s) => s.toLowerCase().includes(speciesSearch.toLowerCase()));
  }, [speciesOptions, speciesSearch]);

  // Keep selected species valid when animal category changes
  useEffect(() => {
    const list = getSpeciesList(animal);
    if (list.length > 0 && (!species || !list.includes(species))) {
      setSpecies(list[0]);
    }
  }, [animal]);

  // Load remembered driver & phone holder from localStorage if not editing an existing log
  useEffect(() => {
    if (!initialData.id) {
      const savedDriver = localStorage.getItem("acres_last_driver");
      const savedPhoneHolder = localStorage.getItem("acres_last_phone_holder");
      if (savedDriver && !driver) setDriver(savedDriver);
      if (savedPhoneHolder && !phoneHolder) setPhoneHolder(savedPhoneHolder);
    }
  }, [initialData.id, driver, phoneHolder]);

  const handleSaveMemory = () => {
    if (driver) localStorage.setItem("acres_last_driver", driver);
    if (phoneHolder) localStorage.setItem("acres_last_phone_holder", phoneHolder);
  };

  const handleCategorySelect = (category: string) => {
    const norm = normalizeAnimalCategory(category);
    setAnimal(norm);
    setSpeciesSearch("");
    const newList = getSpeciesList(norm);
    setSpecies(newList[0] || "");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24 max-w-2xl mx-auto">
      <header className="sticky top-0 z-30 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-zinc-900">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-teal-200 bg-clip-text text-transparent">
            {initialData.id ? "Edit Rescue Log" : "New Rescue Log"}
          </h1>
        </div>
      </header>

      <form action={saveCase} className="p-4 space-y-5">
        {initialData.id && <input type="hidden" name="id" value={initialData.id} />}
        <input type="hidden" name="animal" value={animal} />

        {/* Section 1: Animal & Location */}
        <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800/80 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm border-b border-zinc-800/60 pb-3">
            <Activity size={18} />
            <span>1. Animal & Location Details</span>
          </div>

          {/* Tile-Based Category Selector ONLY (Redundant Dropdown Removed) */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Animal Category *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORY_CHIPS.map((chip) => {
                const isSelected = animal === chip.id || (chip.id === "Insect / Arthropod" && animal.includes("Insect"));
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handleCategorySelect(chip.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,163,224,0.3)] scale-[1.02]"
                        : "bg-zinc-800/40 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-xl mb-1 pointer-events-none">{chip.emoji}</span>
                    <span className="truncate max-w-full pointer-events-none">{chip.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Species Selector */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Species
              </label>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                {speciesOptions.length} {animal} Species Available
              </span>
            </div>

            {/* Species Search Input */}
            {speciesOptions.length > 8 && (
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="text"
                  placeholder={`Search ${animal} species...`}
                  value={speciesSearch}
                  onChange={(e) => setSpeciesSearch(e.target.value)}
                  className="w-full bg-zinc-800/40 border border-zinc-700/50 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-zinc-500 font-medium"
                />
              </div>
            )}

            {/* Species Dropdown Selector */}
            <div className="relative">
              <select
                key={`species-select-${animal}`}
                name="species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3.5 pr-10 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none font-medium cursor-pointer text-sm"
              >
                <option value="">Select Species</option>
                {filteredSpeciesOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-cyan-400">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
              Case Description *
            </label>
            <textarea
              name="caseInfo"
              defaultValue={initialData.caseInfo}
              rows={3}
              className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none font-medium text-sm"
              placeholder="Describe animal condition, trapped status, injuries, or behavior..."
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
              Exact Location *
            </label>
            <textarea
              name="location"
              defaultValue={initialData.location}
              rows={2}
              className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none font-medium text-sm"
              placeholder="e.g. 81 Joo Chiat Road Carpark, near Lift Lobby A"
              required
            />
          </div>

          {/* Optional Additional Info */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider flex items-center justify-between">
              <span>Additional Info</span>
              <span className="text-zinc-500 text-[10px] normal-case font-normal">(Optional)</span>
            </label>
            <textarea
              name="animalAdditionalInfo"
              defaultValue={initialData.animalAdditionalInfo}
              rows={2}
              className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none font-medium text-sm placeholder-zinc-600"
              placeholder="e.g. Landmarks, gate codes, animal movement direction, tree height..."
            />
          </div>
        </div>

        {/* Section 2: Rescue Van Crew (Phone Holder & Driver with Local Memory) */}
        <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800/80 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Truck size={18} />
              <span>2. Rescue Van Crew</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <Sparkles size={10} /> Auto-Remembers Crew
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                <PhoneCall size={12} className="text-cyan-400" />
                <span>Phone Holder</span>
              </label>
              <input
                type="text"
                name="phoneHolder"
                value={phoneHolder}
                onChange={(e) => setPhoneHolder(e.target.value)}
                placeholder="e.g. Rohit"
                className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-medium text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                <Truck size={12} className="text-teal-400" />
                <span>Driver</span>
              </label>
              <input
                type="text"
                name="driver"
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                placeholder="e.g. Dave"
                className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 font-medium text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Caller Info */}
        <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800/80 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm border-b border-zinc-800/60 pb-3">
            <User size={18} />
            <span>3. Caller Information</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Caller Name *</label>
              <input
                type="text"
                name="callerName"
                defaultValue={initialData.callerName}
                className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 font-medium text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Phone Number *</label>
              <input
                type="tel"
                name="callerNumber"
                defaultValue={initialData.callerNumber}
                className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 font-medium text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 4: Action & Status */}
        <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800/80 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-zinc-800/60 pb-3">
            <ShieldAlert size={18} />
            <span>4. Action & Priority Status</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Priority</label>
              <select name="priority" defaultValue={initialData.priority} className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none text-sm font-medium">
                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Action Taken</label>
              <select name="actionTaken" defaultValue={initialData.actionTaken} className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none text-sm font-medium">
                {ACTIONS_TAKEN.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">General Remarks</label>
            <textarea
              name="additionalInfo"
              defaultValue={initialData.additionalInfo}
              rows={2}
              className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none font-medium text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Action Conclusion</label>
            <input
              type="text"
              name="actionConclusion"
              defaultValue={initialData.actionConclusion}
              className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Log Status</label>
            <select name="status" defaultValue={initialData.status} className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none text-sm font-medium">
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <SubmitButton onSaveMemory={handleSaveMemory} />
      </form>
    </div>
  );
}
