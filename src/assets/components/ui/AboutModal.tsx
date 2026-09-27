import React, { useEffect } from "react";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Building2,
  ArrowRight,
  X,
  HelpCircle,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";

interface AboutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const brandPartnerships = [
    {
      name: "LAPP Kabel",
      location: "Stuttgart, Germany",
      desc: "ÖLFLEX® control cables, UNITRONIC® data lines, SKINTOP® glands",
      hoverStyle: "hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 hover:shadow-lg",
      badgeStyle: "bg-amber-100 text-amber-900 border-amber-300",
      dotColor: "bg-amber-500",
    },
    {
      name: "EATON Moeller",
      location: "Bonn, Germany",
      desc: "PKZM0 motor protectors, DILM contactors, NZM circuit breakers",
      hoverStyle: "hover:bg-[#0284c7] hover:text-white hover:border-[#0284c7] hover:shadow-lg",
      badgeStyle: "bg-sky-100 text-sky-900 border-sky-300",
      dotColor: "bg-sky-500",
    },
    {
      name: "PARTEX Sweden",
      location: "Gullspång, Sweden",
      desc: "PA chevron markers, ProMark T-1000 printers, PKS stainless tags",
      hoverStyle: "hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-lg",
      badgeStyle: "bg-rose-100 text-rose-900 border-rose-300",
      dotColor: "bg-rose-500",
    },
    {
      name: "MENNEKES",
      location: "Kirchhundem, Germany",
      desc: "PowerTOP® Xtra industrial plugs, AMAXX® modular distribution",
      hoverStyle: "hover:bg-purple-700 hover:text-white hover:border-purple-700 hover:shadow-lg",
      badgeStyle: "bg-purple-100 text-purple-900 border-purple-300",
      dotColor: "bg-purple-500",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#fdf2f4] via-[#fbf8f5] to-[#f5e6d3] rounded-[2.5rem] w-full max-w-4xl max-h-[88vh] flex flex-col border border-[#e6d5cc] shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Ambient Lighting Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* STICKY MODAL HEADER */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#e6d5cc] bg-[#fbf8f5]/95 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-600 text-white shadow-md">
              <Building2 size={20} />
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8c6d62]">CORPORATE PROFILE</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-300">
                EST. 1998
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* SCROLLABLE BODY CONTAINER */}
        <div className="p-6 sm:p-10 space-y-8 overflow-y-auto flex-1 z-10">
          
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B0F17] tracking-tight">
            About Siddhi Kabel Corporation
          </h2>

          {/* INTRO BOX */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0B0F17] text-white shadow-xl relative overflow-hidden space-y-2.5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400" /> AUTHORISED DIRECT CHANNEL PARTNER
              </span>
              <span className="text-slate-400">Bangalore Hub</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              Siddhi Kabel Corporation Private Limited is a premier Indian B2B industrial infrastructure distributor headquartered in Bangalore. We specialize in genuine OEM supply chains, delivering heavy-duty cables, motor switchgear, wire marking, and industrial plugs directly to manufacturing plants, OEMs, switchboard builders, and EPC contractors.
            </p>
          </div>

          {/* TELEMETRY METRICS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { val: "40K+", label: "Sq.ft Warehouse" },
              { val: "<24h", label: "Ready Dispatch" },
              { val: "100%", label: "Original OEM" },
              { val: "10,000+", label: "Active SKUs" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/90 border border-[#e6d5cc] text-center space-y-0.5 shadow-sm">
                <div className="text-lg sm:text-xl font-black font-mono text-slate-950">{stat.val}</div>
                <div className="text-[11px] font-mono text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* BRAND PARTNERSHIPS SECTION */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#8c6d62]">
              <Sparkles size={14} className="text-rose-600" />
              <span>DIRECT AUTHORISED BRAND PARTNERSHIPS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {brandPartnerships.map((brand, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer bg-white/90 border-[#e6d5cc] shadow-xs ${brand.hoverStyle}`}
                >
                  <div className="space-y-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${brand.dotColor}`} />
                      <h4 className="text-sm font-black group-hover:text-inherit">{brand.name}</h4>
                      <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${brand.badgeStyle}`}>
                        {brand.location}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 group-hover:text-white/90 font-sans truncate">
                      {brand.desc}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-white text-slate-900 shadow-2xs shrink-0 border border-slate-200 group-hover:scale-105 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WAREHOUSE & QUALITY GUARANTEES */}
          <div className="p-5 rounded-2xl bg-white/90 border border-[#e6d5cc] space-y-3 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900">
              <ShieldCheck size={16} className="text-rose-600" />
              <span>Warehouse & Quality Guarantees</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Ready drum stock with custom cut-to-length meters</span>
              </div>
              <div className="flex items-start gap-2">
                <FileText size={13} className="text-purple-600 shrink-0 mt-0.5" />
                <span>EN 10204 3.1 Mill Test Certificates with every shipment</span>
              </div>
              <div className="flex items-start gap-2">
                <Building2 size={13} className="text-amber-600 shrink-0 mt-0.5" />
                <span>Central Depot: Peenya Industrial Area, Bangalore 560058</span>
              </div>
              <div className="flex items-start gap-2">
                <Truck size={13} className="text-rose-600 shrink-0 mt-0.5" />
                <span>Same-day dispatch for all ex-stock orders received by 2 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* STICKY MODAL FOOTER */}
        <div className="px-6 sm:px-10 py-4 border-t border-[#e6d5cc] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fbf8f5]/95 backdrop-blur-md z-20 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <HelpCircle size={14} />
            <span>Open Helpdesk & Support</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
            >
              <FileText size={14} />
              <span>Browse Catalog</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#0B0F17] hover:bg-slate-900 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <span>Request Quote</span>
              <Send size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};