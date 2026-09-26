import React from "react";
import { Phone, Mail, ShieldCheck } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#0b0f19] text-slate-300 text-[11px] border-b border-slate-800/80 tracking-normal select-none py-1.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
        
        {/* Left: Company Name & Authorized Status */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="font-bold text-white text-xs tracking-tight">
            Siddhi Kabel Corporation Private Limited
          </span>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-mono text-[10px] font-semibold">
            <ShieldCheck size={11} className="text-emerald-400" />
            <span>OFFICIAL AUTHORIZED DISTRIBUTOR</span>
          </div>

          <span className="hidden lg:inline text-slate-400 font-mono text-[10px]">
            (LAPP Kabel Germany · EATON Moeller · PARTEX Sweden · MENNEKES)
          </span>
        </div>

        {/* Right: Phone & Emails only */}
        <div className="flex items-center gap-3 sm:gap-5 text-slate-300 font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <Phone size={11} className="text-amber-400" />
            <a href="tel:09620000947" className="hover:text-white transition-colors">
              +91 96200 00947
            </a>
            <span className="text-slate-600">/</span>
            <a href="tel:08022214455" className="hover:text-white transition-colors hidden sm:inline">
              +91 80 2221 4455
            </a>
          </div>

          <div className="flex items-center gap-1.5">
            <Mail size={11} className="text-rose-400" />
            <a href="mailto:sales@siddhikabel.com" className="hover:text-white transition-colors">
              sales@siddhikabel.com
            </a>
            <span className="text-slate-600 hidden md:inline">/</span>
            <a href="mailto:enquiry@siddhikabel.com" className="hover:text-white transition-colors hidden md:inline">
              enquiry@siddhikabel.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

