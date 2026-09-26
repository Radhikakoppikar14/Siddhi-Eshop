import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const BrandsShowcase: React.FC = () => {
  const partners = [
    {
      name: "LAPP KABEL GERMANY",
      country: "Germany · Stuttgart",
      products: "ÖLFLEX®, UNITRONIC®, SKINTOP®, SILVYN®",
      link: "/about-lapp",
      logo: "/images/logo-lapp.png",
      stats: "30+ Years Global Standard",
    },
    {
      name: "EATON MOELLER",
      country: "Germany · Bonn",
      products: "PKZM0®, DILM®, NZM®, RMQ-TITAN®, FAZ®",
      link: "/about-eaton",
      logo: "/images/logo-eaton.png",
      stats: "Pioneering Motor Controls",
    },
    {
      name: "PARTEX SWEDEN",
      country: "Sweden · Gullspång",
      products: "PA/PC Markers, PO Tubing, ProMark T-1000",
      link: "/about-partex",
      logo: "/images/logo-partex.png",
      stats: "1948 Identification Pioneer",
    },
    {
      name: "MENNEKES GERMANY",
      country: "Germany · Kirchhundem",
      products: "PowerTOP® Xtra, AMAXX®, EverGUM®",
      link: "/about-mennekes",
      logo: "/images/logo-mennekes.png",
      stats: "CEE Industrial Plug Standard",
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-zinc-50/60 border-b border-zinc-200" id="brandsSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
              GLOBAL ALLIANCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Authorised Brand Partnerships
            </h2>
          </div>

          <p className="text-xs text-zinc-500 max-w-md">
            Direct channel agreements ensuring 100% genuine factory-certified stock, official manufacturer technical support, and project warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {partners.map((p, idx) => (
            <Link
              key={idx}
              to={p.link}
              className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs hover:shadow-lg hover:border-zinc-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-10 w-full flex items-center justify-start mb-4">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-full max-w-[130px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 mb-1">
                  <ShieldCheck size={13} className="text-emerald-500" />
                  <span>{p.country}</span>
                </div>

                <h3 className="text-sm font-bold text-zinc-950 group-hover:text-blue-600 transition-colors">
                  {p.name}
                </h3>

                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  {p.products}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-700 group-hover:text-blue-600 transition-colors">
                <span>View Make Sheet</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
