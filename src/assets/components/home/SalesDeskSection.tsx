import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Truck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const SalesDeskSection: React.FC = () => {
  const { openSupport } = useAuth();

  return (
    <section className="py-10 sm:py-14 select-none bg-[#f4f8fc]/70" id="contactSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container with Light Color Background and Blue Contrast */}
        <div className="bg-white rounded-3xl border-2 border-blue-200/90 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-blue-100 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-800 font-bold">
                  BANGALORE HEADQUARTERS & TRADE COUNTER
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Direct Sales & Dispatch Desk
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Connect directly with our senior application engineers for cable sizing assistance, factory batch certificates, or immediate warehouse pickups.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-mono text-xs font-semibold">
                <CheckCircle2 size={13} className="text-blue-600" />
                Live Dispatch Ready Today
              </span>
            </div>
          </div>

          {/* Grid Layout: 3 Contact Cards on Left + Executive Warehouse Hub Card on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Column: 3 Contact Pillar Cards with Blue Contrast */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
              
              {/* Card 1: Main Showroom & Trade Counter */}
              <div className="p-5 rounded-2xl border-2 border-blue-200/90 bg-gradient-to-r from-blue-50/40 via-white to-sky-50/30 hover:border-blue-400 hover:shadow-md transition-all flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-900">
                      MAIN SHOWROOM & TRADE COUNTER
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-950 border border-blue-300">
                      BANGALORE
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 mb-1">
                    Siddhi Kabel Corporation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No. 42/1, 2nd Main, Banashankari 3rd Stage / Peenya Industrial Area, Bangalore - 560058, Karnataka, India
                  </p>
                </div>
              </div>

              {/* Card 2: Direct Sales Hotline & WhatsApp */}
              <div className="p-5 rounded-2xl border-2 border-blue-300/90 bg-gradient-to-r from-blue-50/60 via-white to-sky-50/40 hover:border-blue-500 hover:shadow-md transition-all flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-[#0052cc] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Phone size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-900">
                      DIRECT SALES HOTLINE / WHATSAPP
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      INSTANT CHAT
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="tel:09620000947"
                      className="text-base font-black font-mono text-blue-950 hover:text-blue-600 transition-colors"
                    >
                      +91 96200 00947
                    </a>
                    <a
                      href="https://wa.me/919620000947"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
                    >
                      <MessageSquare size={11} />
                      WhatsApp
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono block mt-1">
                    Landline: +91 80 2221 4455 / 2221 4456
                  </span>
                </div>
              </div>

              {/* Card 3: Official Inquiries & Quotation Desk */}
              <div className="p-5 rounded-2xl border-2 border-blue-200/90 bg-gradient-to-r from-blue-50/40 via-white to-sky-50/30 hover:border-blue-400 hover:shadow-md transition-all flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-900">
                      OFFICIAL INQUIRIES & QUOTATION SUBMISSIONS
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-950 border border-blue-300">
                      EST. 2-HR RESPONSE
                    </span>
                  </div>
                  <a
                    href="mailto:sales@siddhikabel.com"
                    className="text-sm font-bold font-mono text-blue-950 hover:text-blue-700 transition-colors block"
                  >
                    sales@siddhikabel.com
                  </a>
                  <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                    Corporate Desk: enquiry@siddhikabel.com
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Executive Central Stocking Warehouse Card (Light Color Background with Blue Contrast) */}
            <div className="lg:col-span-6">
              <div className="h-full bg-gradient-to-br from-[#eff6ff] via-white to-[#dbeafe]/40 text-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-blue-300/90 shadow-md flex flex-col justify-between relative overflow-hidden">
                
                {/* Background Subtle Glow */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  {/* Top Pill Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white border border-blue-700/30 text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
                      <Truck size={12} />
                      CENTRAL LOGISTICS HUB
                    </span>
                    <span className="text-[10px] font-mono text-blue-700 font-semibold">
                      Ready Warehouse Drum Stock
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-blue-950 mb-2">
                      Bangalore Central Stocking Warehouse
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Equipped for high-velocity bulk dispatch to Peenya Industrial Estate, Electronic City, Whitefield, Hosur, Chennai, and Hyderabad manufacturing corridors.
                    </p>
                  </div>

                  {/* Operating Timings Table */}
                  <div className="pt-3 border-t border-blue-200/80 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-blue-600" />
                        Monday - Friday:
                      </span>
                      <span className="font-bold text-blue-950">9:30 AM - 7:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-blue-600" />
                        Saturday:
                      </span>
                      <span className="font-bold text-blue-950">9:30 AM - 5:30 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-blue-800 font-bold pt-1.5 border-t border-blue-200/60">
                      <span>Sunday:</span>
                      <span className="text-blue-700">Emergency Dispatch On-Call</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons with Blue Contrast */}
                <div className="pt-6 relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={openSupport}
                    className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md shadow-blue-600/25 hover:scale-102 cursor-pointer"
                  >
                    CALL SALES DESK NOW
                  </button>

                  <a
                    href="#rfqSection"
                    className="py-3 px-4 rounded-xl bg-white hover:bg-blue-50 text-blue-950 hover:text-blue-700 border-2 border-blue-300 font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 hover:scale-102 cursor-pointer shadow-2xs"
                  >
                    <span>Go to Quotation Page</span>
                    <ArrowRight size={13} />
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
