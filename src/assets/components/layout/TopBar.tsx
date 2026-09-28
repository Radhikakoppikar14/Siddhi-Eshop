import React from "react";
import { Phone, Mail } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#0b0f19] text-slate-300 text-[11px] border-b border-slate-800/80 tracking-normal select-none py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 font-mono">
        
        {/* Company Name */}
        <div className="font-bold text-white text-xs tracking-tight text-center md:text-left truncate w-full md:w-auto">
          Siddhi Kabel Corporation Private Limited
        </div>

        {/* Phone & Email Container */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-1 text-slate-300 text-[10px] sm:text-[11px]">
          
          {/* Phone Numbers */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Phone size={11} className="text-amber-400 shrink-0" />
            <a href="tel:09620000947" className="hover:text-white transition-colors">
              +91 96200 00947
            </a>
            <span className="text-slate-600">/</span>
            <a href="tel:08022214455" className="hover:text-white transition-colors">
              +91 80 2221 4455
            </a>
          </div>

          {/* Emails */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Mail size={11} className="text-rose-400 shrink-0" />
            <a href="mailto:sales@siddhikabel.com" className="hover:text-white transition-colors">
              sales@siddhikabel.com
            </a>
            <span className="text-slate-600">/</span>
            <a href="mailto:enquiry@siddhikabel.com" className="hover:text-white transition-colors">
              enquiry@siddhikabel.com
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};