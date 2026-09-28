import React, { useState } from "react";
import { ArrowRight, Layers, ShieldCheck, Tag, Zap } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const RfqSection: React.FC = () => {
  const { openRfq } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("lapp");

  const handleLaunchRfq = () => {
    openRfq(`Bulk Procurement - ${selectedCategory.toUpperCase()}`);
  };

  return (
    <section className="py-14 lg:py-20 bg-[#faf8f5] border-b border-stone-300 select-none" id="rfqSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* EXECUTIVE B2B COMMERCIAL PROCUREMENT STUDIO BOX */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#172554] text-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl border border-blue-500/30 relative overflow-hidden flex flex-col justify-between">
          
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header & Right Button Layout */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            
            {/* Left Content */}
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-red-500 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span>EXECUTIVE B2B COMMERCIAL PROCUREMENT STUDIO</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Request a Bulk Project Quotation <span className="text-red-500">(RFQ)</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Configure your procurement parameters or upload a Bill of Materials (BOM). Our Bangalore engineering desk generates official GST quotations with guaranteed compliance certificates.
              </p>
            </div>

            {/* Right Side Action Button */}
            <div className="shrink-0 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={handleLaunchRfq}
                className="px-6 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-mono font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-3 transition-transform hover:scale-102 cursor-pointer border border-red-400/40"
              >
                <span>RFQ Application</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

          {/* PROCUREMENT CATEGORY SELECTORS (4 BRAND CHANNELS WITH UNIQUE COLORS) */}
          <div className="mt-8 pt-6 border-t border-blue-900/40 relative z-10 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 font-bold block">
              SELECT AUTHORIZED BRAND CHANNEL:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* 1. LAPP KABEL (Amber / Gold Theme) */}
              <button
                type="button"
                onClick={() => setSelectedCategory("lapp")}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  selectedCategory === "lapp"
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)] font-bold scale-[1.02]"
                    : "bg-black/40 text-slate-300 border-white/10 hover:bg-black/60 hover:text-white"
                }`}
              >
                <Layers size={18} className={selectedCategory === "lapp" ? "text-slate-950" : "text-amber-400"} />
                <div>
                  <span className="text-xs font-black block">Flexible Cables & Wires</span>
                  <span className={`text-[10px] font-mono block ${selectedCategory === "lapp" ? "text-slate-900 font-semibold" : "text-slate-400"}`}>
                    LAPP ÖLFLEX® & UNITRONIC®
                  </span>
                </div>
              </button>

              {/* 2. EATON MOELLER (Engineering Blue Theme) */}
              <button
                type="button"
                onClick={() => setSelectedCategory("eaton")}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  selectedCategory === "eaton"
                    ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.5)] font-bold scale-[1.02]"
                    : "bg-black/40 text-slate-300 border-white/10 hover:bg-black/60 hover:text-white"
                }`}
              >
                <ShieldCheck size={18} className={selectedCategory === "eaton" ? "text-white" : "text-blue-400"} />
                <div>
                  <span className="text-xs font-black block">Industrial Switchgear</span>
                  <span className={`text-[10px] font-mono block ${selectedCategory === "eaton" ? "text-blue-100 font-semibold" : "text-slate-400"}`}>
                    EATON Moeller PKZM0
                  </span>
                </div>
              </button>

              {/* 3. PARTEX SWEDEN (Swedish Rose/Red Theme) */}
              <button
                type="button"
                onClick={() => setSelectedCategory("partex")}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  selectedCategory === "partex"
                    ? "bg-rose-600 text-white border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.5)] font-bold scale-[1.02]"
                    : "bg-black/40 text-slate-300 border-white/10 hover:bg-black/60 hover:text-white"
                }`}
              >
                <Tag size={18} className={selectedCategory === "partex" ? "text-white" : "text-rose-400"} />
                <div>
                  <span className="text-xs font-black block">Wire Marking Systems</span>
                  <span className={`text-[10px] font-mono block ${selectedCategory === "partex" ? "text-rose-100 font-semibold" : "text-slate-400"}`}>
                    PARTEX Cable Tagging
                  </span>
                </div>
              </button>

              {/* 4. MENNEKES (Electric Purple Theme) */}
              <button
                type="button"
                onClick={() => setSelectedCategory("mennekes")}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  selectedCategory === "mennekes"
                    ? "bg-purple-700 text-white border-purple-500 shadow-[0_0_25px_rgba(147,51,234,0.5)] font-bold scale-[1.02]"
                    : "bg-black/40 text-slate-300 border-white/10 hover:bg-black/60 hover:text-white"
                }`}
              >
                <Zap size={18} className={selectedCategory === "mennekes" ? "text-white" : "text-purple-400"} />
                <div>
                  <span className="text-xs font-black block">Industrial Plugs & Sockets</span>
                  <span className={`text-[10px] font-mono block ${selectedCategory === "mennekes" ? "text-purple-100 font-semibold" : "text-slate-400"}`}>
                    MENNEKES Heavy-Duty
                  </span>
                </div>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};