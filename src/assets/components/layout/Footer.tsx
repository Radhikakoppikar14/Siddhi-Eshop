import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, FileText, Headphones, MapPin, Phone, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070b14] text-slate-400 text-xs border-t border-slate-800 select-none">
      
      {/* 4 Feature Highlights Strip Matching Image 2 */}
      <div className="border-b border-slate-800/80 bg-[#090e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">
                  100% Genuine OEM Sourced
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Direct factory supply with manufacturer warranty, batch test reports, and compliance certificates.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">
                  Same-Day Bangalore Dispatch
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  25,000+ meters in stock across classic control cables, servo systems, and CEE power plugs.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <FileText size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">
                  Formal GST Commercial Quotations
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Instant project BOM pricing with tiered enterprise volume discounts and freight schedules.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <Headphones size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">
                  Dedicated Engineering Desk
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Cable sizing assistance, cross-reference part lookups, and technical CAD drawing support.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main 4-Column Footer Matching Image 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand Info & Identity (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="Siddhi Kabel Home">
              <div className="h-12 px-3 py-1 bg-white rounded-2xl border border-slate-700 shadow-md inline-flex items-center">
                <img
                  src="/images/siddhi-kabel-lockup.png"
                  alt="Siddhi Kabel Corporation Private Limited"
                  className="h-8 w-auto max-w-[210px] object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/siddhi-kabel-logo.png";
                  }}
                />
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Premier stocking distributor and supply partner for industrial automation cables, switchgear, heavy-duty CEE connections, and precision marking systems across South India.
            </p>

            <div className="pt-2 text-slate-500 font-mono text-[11px] space-y-1">
              <div>GSTIN: <span className="text-slate-300">29AB2I30DNNJ</span></div>
              <div>Central Hub: Peenya Industrial Area, Bangalore 560058</div>
            </div>
          </div>

          {/* Column 2: Authorized Brands (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Authorized Brands
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about-lapp" className="hover:text-amber-400 transition-colors">
                  LAPP Kabel Stuttgart
                </Link>
              </li>
              <li>
                <Link to="/about-eaton" className="hover:text-sky-400 transition-colors">
                  EATON Moeller Switchgear
                </Link>
              </li>
              <li>
                <Link to="/about-mennekes" className="hover:text-rose-400 transition-colors">
                  MENNEKES Industrial Plugs
                </Link>
              </li>
              <li>
                <Link to="/about-partex" className="hover:text-emerald-400 transition-colors">
                  PARTEX Marking Systems
                </Link>
              </li>
              <li>
                <a href="#productsSection" className="hover:text-white transition-colors">
                  Full Catalog & Inventory Stock →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Catalogs (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Product Catalogs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#productsSection" className="hover:text-white transition-colors">
                  ÖLFLEX® Flexible Control Cables
                </a>
              </li>
              <li>
                <a href="#productsSection" className="hover:text-white transition-colors">
                  Industrial Ethernet & PROFINET
                </a>
              </li>
              <li>
                <a href="#productsSection" className="hover:text-white transition-colors">
                  CEE 16A/32A Watertight Plugs
                </a>
              </li>
              <li>
                <a href="#productsSection" className="hover:text-white transition-colors">
                  Motor Starters & Contactors
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Bangalore Sales Desk (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Bangalore Sales Desk
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <span>No. 42/1, 2nd Main, Banashankari 3rd Stage, Bangalore - 560058, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-sky-500 shrink-0" />
                <a href="tel:09620000947" className="hover:text-white transition-colors font-mono">
                  +91 96200 00947
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-emerald-500 shrink-0" />
                <a href="mailto:sales@siddhikabel.com" className="hover:text-white transition-colors font-mono">
                  sales@siddhikabel.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Siddhi Kabel Corporation Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about-lapp" className="hover:text-slate-300">LAPP</Link>
            <Link to="/about-eaton" className="hover:text-slate-300">EATON</Link>
            <Link to="/about-partex" className="hover:text-slate-300">PARTEX</Link>
            <Link to="/about-mennekes" className="hover:text-slate-300">MENNEKES</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
