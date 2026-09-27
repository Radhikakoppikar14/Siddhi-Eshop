import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Truck,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "../../../context/ToastContext";

export const SalesDeskSection: React.FC = () => {
  const { showToast } = useToast();
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+919620000947");
    setCopiedPhone(true);
    showToast("Sales hotline copied to clipboard!");
    setTimeout(() => setCopiedPhone(false), 2500);
  };

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
              <div className="flex items-center gap-2 font-mono text-xs text-[#e8d5cb] font-bold uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>BANGALORE HEADQUARTERS & TRADE COUNTER</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Direct Sales & Dispatch Desk
              </h2>
              <p className="text-xs sm:text-sm text-[#f0e6e1] max-w-2xl leading-relaxed">
                Connect directly with our senior application engineers for cable sizing assistance, factory batch certificates, or immediate warehouse pickups.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/30 border border-white/20 text-xs font-mono text-[#f0e6e1] shrink-0 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Dispatch Ready Today</span>
            </div>
          </div>

          {/* TOP SECTION: 3-COLUMN CONTACT MATRIX */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
            
            {/* Card 1: Showroom & Trade Counter */}
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

            {/* Card 2: Direct Sales Hotline */}
            <div className="p-5 rounded-3xl bg-white text-slate-900 shadow-xl hover:shadow-2xl transition-all group border border-[#e6d5cc] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Phone size={20} />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-[10px] font-mono font-bold border border-emerald-200">
                    INSTANT CHAT
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                    DIRECT SALES HOTLINE
                  </span>
                  <div className="text-base font-black font-mono text-slate-950">
                    +91 96200 00947
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    Landline: +91 80 2221 4455 / 4456
                  </p>
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

            {/* Card 3: Official Inquiries & Quotes */}
            <div className="p-5 rounded-3xl bg-white text-slate-900 shadow-xl hover:shadow-2xl transition-all group border border-[#e6d5cc] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
                    <Mail size={20} />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[10px] font-mono font-bold border border-slate-200">
                    EST. 2-HR
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block mb-1">
                    OFFICIAL QUOTATIONS
                  </span>
                  <a href="mailto:sales@siddhikabel.com" className="text-xs font-black font-mono text-slate-950 hover:text-purple-700 transition-colors block truncate">
                    sales@siddhikabel.com
                  </a>
                  <p className="text-[11px] text-slate-500 font-mono mt-1 truncate">
                    enquiry@siddhikabel.com
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: FULL-WIDTH CENTRAL LOGISTICS HUB & DISPATCH BANNER */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-2xl relative overflow-hidden border border-[#e6d5cc] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                      <Truck size={18} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-purple-800 font-bold">
                      CENTRAL LOGISTICS HUB & TIMINGS
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 font-medium">
                    Ready Warehouse Drum Stock
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-950 tracking-tight">
                    Bangalore Central Stocking Warehouse
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans mt-1">
                    Equipped for high-velocity bulk dispatch to Peenya Industrial Estate, Electronic City, Whitefield, Hosur, Chennai, and Hyderabad manufacturing corridors.
                  </p>
                </div>

                {/* Operating Hours Table */}
                <div className="p-4 rounded-2xl bg-[#faf6f3] border border-[#e6d5cc] space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-600 pb-2 border-b border-[#e6d5cc]">
                    <span className="flex items-center gap-2 text-slate-900 font-bold">
                      <Clock size={14} className="text-purple-700" /> Monday - Friday:
                    </span>
                    <span className="text-slate-900 font-medium">9:30 AM - 7:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 pb-2 border-b border-[#e6d5cc]">
                    <span className="flex items-center gap-2 text-slate-900 font-bold">
                      <Clock size={14} className="text-purple-700" /> Saturday:
                    </span>
                    <span className="text-slate-900 font-medium">9:30 AM - 5:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 pt-0.5">
                    <span className="text-slate-500">Sunday:</span>
                    <span className="text-emerald-700 font-bold">Emergency Dispatch On-Call</span>
                  </div>
                </div>
              </div>

              {/* Action CTA Buttons Column */}
              <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="w-full py-4 px-6 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl text-xs font-black tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone size={16} className="text-purple-400" />
                  <span>{copiedPhone ? "HOTLINE COPIED!" : "CALL SALES DESK NOW"}</span>
                </button>

                <a
                  href="#rfqSection"
                  className="w-full py-4 px-6 bg-[#faf6f3] hover:bg-[#f0e6e1] text-slate-900 rounded-2xl text-xs font-bold tracking-wider transition-all border border-[#e6d5cc] flex items-center justify-center gap-2 cursor-pointer text-center shadow-xs"
                >
                  <span>Go to Quotation Page</span>
                  <ArrowRight size={16} className="text-purple-700" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};