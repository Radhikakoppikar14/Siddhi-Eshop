import React from "react";
import { ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const AboutSection: React.FC = () => {
  const { openAbout } = useAuth();

  const industries = [
    "Machine Tool Builders",
    "Pharmaceutical Cleanrooms",
    "Automotive & Robotics",
    "Process & Chemical Plants",
    "Oil & Gas Refineries",
    "System Integrators & Panel Builders",
    "Commercial Infrastructure",
    "Renewable Energy & Solar",
  ];

  return (
    <section className="py-14 lg:py-20 select-none bg-transparent" id="aboutSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative & Credentials in High-Contrast Typography */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                CORPORATE PROFILE // EST. 1998
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                Engineering Electrical Solutions with European Precision Standards
              </h2>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Siddhi Kabel Corporation Private Limited is an engineering-driven industrial supply enterprise with over two decades of hands-on experience in mission-critical infrastructure. Operating from Bangalore's central industrial hub, we serve as an authorized direct channel partner for European leaders: <strong className="text-slate-950 font-bold">Lapp Kabel Germany</strong>, <strong className="text-slate-950 font-bold">Eaton Moeller</strong>, <strong className="text-slate-950 font-bold">Partex Sweden</strong>, and <strong className="text-slate-950 font-bold">Mennekes Germany</strong>.
            </p>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              For manufacturing plants, OEMs, switchboard builders, and EPC contractors, Siddhi Kabel provides complete technical consulting, cable schedule reviews, drum length optimization, and same-day dispatch from our central stocking warehouse with 100% genuine factory test certificates.
            </p>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 bg-white border border-slate-200/90 shadow-2xs rounded-2xl text-center">
                <span className="text-xl sm:text-2xl font-black text-slate-950 font-mono block">1998</span>
                <span className="text-[11px] text-slate-500 font-medium">Established Year</span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200/90 shadow-2xs rounded-2xl text-center">
                <span className="text-xl sm:text-2xl font-black text-sky-600 font-mono block">25+</span>
                <span className="text-[11px] text-slate-500 font-medium">Years Expertise</span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200/90 shadow-2xs rounded-2xl text-center">
                <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono block">4</span>
                <span className="text-[11px] text-slate-500 font-medium">Authorized OEMs</span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200/90 shadow-2xs rounded-2xl text-center">
                <span className="text-xl sm:text-2xl font-black text-purple-600 font-mono block">Pan-India</span>
                <span className="text-[11px] text-slate-500 font-medium">Site Dispatch</span>
              </div>
            </div>

            {/* Industries Served */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono mb-2.5">
                Key Industrial Verticals Served
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {industries.map((ind, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-xl font-medium"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Open Modal Action */}
            <div className="pt-1">
              <button
                type="button"
                onClick={openAbout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                <span>View Full Corporate Profile Modal</span>
                <ArrowRight size={13} />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Trust Card in Deep Obsidian Style (Crisp Dark Accent) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0f172a] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block">
                      Quality & Compliance Guarantee
                    </span>
                    <h3 className="text-base font-bold text-white">
                      The Siddhi Kabel Assurance
                    </h3>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Zero Compromise on Authenticity</strong>
                      <span className="text-slate-400">Direct OEM sourcing with factory test certificates (Form 3.1 / VDE compliance) per consignment.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Cut-to-Length Drum Capability</strong>
                      <span className="text-slate-400">Custom precision drum length cuts to eliminate on-site conductor wastage for EPC contractors.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Pan-India Freight Logistics</strong>
                      <span className="text-slate-400">Daily express despatches to Peenya, Hosur, Pune, Chennai, Gujarat, Hyderabad, and Delhi NCR.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    GSTIN: <span className="text-white">29AB2I30DNNJ</span>
                  </div>
                  <a
                    href="#rfqSection"
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Connect with Team</span>
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
