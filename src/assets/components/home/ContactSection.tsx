import React from "react";
import { MapPin, Mail, Phone, Clock, Building } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <section className="py-14 lg:py-20 bg-white" id="contactSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
            LOGISTICS & DISPATCH HUBS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            Connect With Bangalore Central Office
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Centrally located in Bangalore's industrial supply network with same-day dispatch to Peenya Industrial Area, Electronic City, Whitefield, and Hosur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Registered Head Office */}
          <div className="bg-zinc-50/60 rounded-3xl border border-zinc-200 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200/80 text-zinc-950 flex items-center justify-center mb-4 shadow-2xs">
                <MapPin size={18} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                REGISTERED HEADQUARTERS
              </span>
              <h3 className="text-sm font-bold text-zinc-950 mb-2">
                Siddhi Kabel Corporation Pvt Ltd
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-mono">
                No. 3, 1st Main Road, 1st Block,<br />
                Banashankari 3rd Stage,<br />
                Bangalore - 560085, Karnataka, India.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-200/60 flex items-center gap-1.5 text-xs text-zinc-500">
              <Building size={13} className="text-zinc-400" />
              <span>Bangalore Central Stocking Point</span>
            </div>
          </div>

          {/* Card 2: Sales & Quotation Desk */}
          <div className="bg-zinc-50/60 rounded-3xl border border-zinc-200 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200/80 text-zinc-950 flex items-center justify-center mb-4 shadow-2xs">
                <Mail size={18} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                ELECTRONIC CORRESPONDENCE
              </span>
              <h3 className="text-sm font-bold text-zinc-950 mb-2">
                Quotation & Technical Desks
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono block">Sales & RFQs:</span>
                  <a href="mailto:sales@siddhikabel.com" className="font-semibold text-zinc-900 hover:text-blue-600 transition-colors">
                    sales@siddhikabel.com
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono block">General Technical Enquiry:</span>
                  <a href="mailto:Enquiry@siddhikabel.com" className="font-semibold text-zinc-900 hover:text-blue-600 transition-colors">
                    Enquiry@siddhikabel.com
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono block">Executive Management:</span>
                  <a href="mailto:guru@siddhikabel.com" className="text-zinc-600 hover:text-blue-600 transition-colors font-mono">
                    guru@siddhikabel.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-200/60 text-[11px] text-zinc-500 font-mono">
              Average RFQ response time: &lt; 2 business hours
            </div>
          </div>

          {/* Card 3: Hotline & Site Dispatch */}
          <div className="bg-zinc-50/60 rounded-3xl border border-zinc-200 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200/80 text-zinc-950 flex items-center justify-center mb-4 shadow-2xs">
                <Phone size={18} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                TELEPHONE ASSISTANCE
              </span>
              <h3 className="text-sm font-bold text-zinc-950 mb-2">
                Customer Support Hotlines
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono block">Primary Hotline:</span>
                  <a href="tel:09620000947" className="font-mono font-bold text-zinc-900 hover:text-blue-600 text-sm block">
                    096200 00947
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono block">Technical Support:</span>
                  <a href="tel:09886058511" className="font-mono font-bold text-zinc-900 hover:text-blue-600 text-sm block">
                    098860 58511
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-200/60 flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock size={13} className="text-zinc-400" />
              <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
