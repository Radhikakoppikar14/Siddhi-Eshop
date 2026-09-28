import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useToast } from "../../../context/ToastContext";

export const SalesDeskSection: React.FC = () => {
  const { showToast } = useToast();

  const handleWhatsAppChat = () => {
    window.open("https://wa.me/919620000947?text=Hello%20Siddhi%20Kabel%20Sales%20Desk,%20I%20would%20like%20to%20inquire%20about%20industrial%20cables%20and%20switchgear.", "_blank");
  };

  return (
    <section className="py-14 lg:py-20 hybrid-light-bg border-b border-[#E2E8F0] select-none" id="salesDesk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* RESTRUCTURED EXECUTIVE COMMAND CENTER (PURPLISH & BEIGE GRADIENT) */}
        <div className="rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border relative overflow-hidden transition-all duration-700 bg-gradient-to-br from-[#2a1b35] via-[#35233f] to-[#e6d5cc] text-white border-[#d8c5bc] shadow-2xl space-y-8">
          
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10 border-b border-white/15 pb-6">
            <div className="space-y-2">
              
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Direct Sales & Dispatch Desk
              </h2>
              <p className="text-xs sm:text-sm text-[#f0e6e1] max-w-2xl leading-relaxed">
                Connect directly with our senior application engineers for cable sizing assistance, factory batch certificates, or immediate warehouse pickups.
              </p>
            </div>

            
          </div>

          {/* TOP SECTION: 3-COLUMN ORGANIZED MATRIX */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
            
            {/* Box 1: Showroom & Address */}
            <div className="p-5 rounded-3xl bg-white text-slate-900 shadow-xl hover:shadow-2xl transition-all group border border-[#e6d5cc] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200">
                    <MapPin size={20} />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[10px] font-mono font-bold border border-slate-200">
                    BANGALORE
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-800 font-bold block mb-1">
                    MAIN SHOWROOM & COUNTER
                  </span>
                  <h4 className="text-sm font-black text-slate-950">
                    Siddhi Kabel Corporation
                  </h4>
                  <p className="text-xs text-slate-600 font-mono leading-relaxed mt-1">
                    No. 42/1, 2nd Main, Banashankari 3rd Stage / Peenya Industrial Area, Bangalore - 560058
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2: Phone Numbers & Email Addresses */}
            <div className="p-5 rounded-3xl bg-white text-slate-900 shadow-xl hover:shadow-2xl transition-all group border border-[#e6d5cc] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Phone size={20} />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-[10px] font-mono font-bold border border-emerald-200">
                    DIRECT CONTACTS
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                    HOTLINE & EMAILS
                  </span>
                  <div className="text-sm font-black font-mono text-slate-950">
                    +91 96200 00947
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Landline: +91 80 2221 4455 / 4456
                  </p>
                  
                  <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-0.5 font-mono text-xs">
                    <a href="mailto:sales@siddhikabel.com" className="font-bold text-slate-900 hover:text-purple-700 transition-colors block truncate">
                      sales@siddhikabel.com
                    </a>
                    <a href="mailto:enquiry@siddhikabel.com" className="text-slate-500 hover:text-purple-700 transition-colors block truncate text-[11px]">
                      enquiry@siddhikabel.com
                    </a>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppChat}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <MessageSquare size={13} />
                <span>Open WhatsApp Chat</span>
              </button>
            </div>

            {/* Box 3: Operating Timings Only */}
            <div className="p-5 rounded-3xl bg-white text-slate-900 shadow-xl hover:shadow-2xl transition-all group border border-[#e6d5cc] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock size={20} />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-[10px] font-mono font-bold border border-amber-200">
                    HOURS
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block mb-1">
                    WAREHOUSE TIMINGS
                  </span>
                  <h4 className="text-sm font-black text-slate-950 mb-2">
                    Operating Schedule
                  </h4>
                </div>

                <div className="pt-1 font-mono text-xs space-y-2 text-slate-600">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-semibold text-slate-900">Monday - Friday:</span>
                    <span className="font-medium text-slate-900">9:30 AM - 7:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-semibold text-slate-900">Saturday:</span>
                    <span className="font-medium text-slate-900">9:30 AM - 5:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Sunday:</span>
                    <span className="text-emerald-700 font-bold">Emergency On-Call</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};