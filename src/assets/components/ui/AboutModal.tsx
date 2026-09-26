import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  FileText,
  Package,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const AboutModal: React.FC = () => {
  const { isAboutOpen, closeAbout, openSupport } = useAuth();

  if (!isAboutOpen) return null;

  const brands = [
    {
      name: "LAPP Kabel",
      logo: "/images/logo-lapp.png",
      country: "Stuttgart, Germany",
      desc: "ÖLFLEX® control cables, UNITRONIC® data lines, SKINTOP® glands",
      color: "border-rose-200 bg-rose-50/60 text-rose-700",
      dot: "bg-rose-500",
      link: "/about-lapp",
    },
    {
      name: "EATON Moeller",
      logo: "/images/logo-eaton.png",
      country: "Bonn, Germany",
      desc: "PKZM0 motor protectors, DILM contactors, NZM circuit breakers",
      color: "border-sky-200 bg-sky-50/60 text-sky-700",
      dot: "bg-sky-500",
      link: "/about-eaton",
    },
    {
      name: "PARTEX Sweden",
      logo: "/images/logo-partex.png",
      country: "Gullspång, Sweden",
      desc: "PA chevron markers, ProMark T-1000 printers, PKS stainless tags",
      color: "border-amber-200 bg-amber-50/60 text-amber-700",
      dot: "bg-amber-500",
      link: "/about-partex",
    },
    {
      name: "MENNEKES",
      logo: "/images/logo-mennekes.png",
      country: "Kirchhundem, Germany",
      desc: "PowerTOP® Xtra industrial plugs, AMAXX® modular distribution",
      color: "border-purple-200 bg-purple-50/60 text-purple-700",
      dot: "bg-purple-500",
      link: "/about-mennekes",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
      onClick={closeAbout}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 transition-all max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Building2 size={18} className="text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-sky-600 font-mono tracking-wider">
                  Corporate Profile
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold">
                  EST. 1998
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-950">
                About Siddhi Kabel Corporation
              </h3>
            </div>
          </div>
          <button
            onClick={closeAbout}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-600">
          {/* Company Brief */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                Authorised Direct Channel Partner
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Bangalore Hub
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-[13px]">
              Siddhi Kabel Corporation Private Limited is a premier Indian B2B industrial infrastructure distributor headquartered in Bangalore. We specialize in genuine OEM supply chains, delivering heavy-duty cables, motor switchgear, wire marking, and industrial plugs directly to manufacturing plants, OEMs, switchboard builders, and EPC contractors.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="block text-lg font-black font-mono text-slate-950">40K+</span>
              <span className="text-[10px] text-slate-500 font-medium">Sq.ft Warehouse</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="block text-lg font-black font-mono text-emerald-600">&lt;24h</span>
              <span className="text-[10px] text-slate-500 font-medium">Ready Dispatch</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="block text-lg font-black font-mono text-sky-600">100%</span>
              <span className="text-[10px] text-slate-500 font-medium">Original OEM</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="block text-lg font-black font-mono text-indigo-600">10,000+</span>
              <span className="text-[10px] text-slate-500 font-medium">Active SKUs</span>
            </div>
          </div>

          {/* Authorised Brand Matrix */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award size={13} className="text-amber-500" />
              Direct Authorised Brand Partnerships
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {brands.map((b) => (
                <Link
                  key={b.name}
                  to={b.link}
                  onClick={closeAbout}
                  className={`p-3.5 rounded-2xl border transition-all hover:scale-101 hover:shadow-sm ${b.color} group block`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      {/* Brand Logo Badge */}
                      <div className="h-8 px-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-center shrink-0">
                        <img
                          src={b.logo}
                          alt={b.name}
                          className="h-5 w-auto max-w-[80px] object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${b.dot}`}></span>
                          <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                            {b.name}
                          </span>
                        </div>
                        <span className="text-[10px] block opacity-75 font-mono">
                          {b.country}
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {b.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Infrastructure & Quality Assurance */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <CheckCircle2 size={13} className="text-emerald-500" />
              Warehouse & Quality Guarantees
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <Package size={12} className="text-slate-400 shrink-0" />
                <span>Ready drum stock with custom cut-to-length meters</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={12} className="text-slate-400 shrink-0" />
                <span>EN 10204 3.1 Mill Test Certificates with every shipment</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-slate-400 shrink-0" />
                <span>Central Depot: Peenya Industrial Area, Bangalore 560058</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-slate-400 shrink-0" />
                <span>Same-day dispatch for all ex-stock orders received by 2 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              closeAbout();
              openSupport();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
          >
            <Phone size={13} />
            <span>Open Helpdesk & Support</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href="/#productsSection"
              onClick={closeAbout}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-200/60 border border-slate-200 transition-colors"
            >
              Browse Catalog
            </a>
            <a
              href="/#rfqSection"
              onClick={closeAbout}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Request Quote</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
