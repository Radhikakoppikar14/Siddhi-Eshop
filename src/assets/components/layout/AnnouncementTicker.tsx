import React from "react";
import { ShieldCheck, Award, Zap } from "lucide-react";

export const AnnouncementTicker: React.FC = () => {
  const tickerItems = [
    {
      type: "brand",
      logo: "/images/logo-lapp.png",
      name: "LAPP KABEL GERMANY",
      desc: "ÖLFLEX® · UNITRONIC® · SKINTOP®",
      pillStyle: "bg-rose-50/90 text-rose-700 border-rose-200/80",
    },
    {
      type: "feature",
      icon: ShieldCheck,
      text: "Direct Channel Partner · 100% Genuine OEM Test Certificates",
      pillStyle: "bg-emerald-50/90 text-emerald-700 border-emerald-200/80",
    },
    {
      type: "brand",
      logo: "/images/logo-eaton.png",
      name: "EATON MOELLER",
      desc: "PKZM0® · DILM® · NZM®",
      pillStyle: "bg-sky-50/90 text-sky-700 border-sky-200/80",
    },
    {
      type: "feature",
      icon: Zap,
      text: "Ready Bangalore Warehouse Drum Stock · Pan-India Dispatch",
      pillStyle: "bg-amber-50/90 text-amber-700 border-amber-200/80",
    },
    {
      type: "brand",
      logo: "/images/logo-partex.png",
      name: "PARTEX SWEDEN",
      desc: "PA · PC · ProMark T-1000",
      pillStyle: "bg-orange-50/90 text-orange-700 border-orange-200/80",
    },
    {
      type: "feature",
      icon: Award,
      text: "ISO 9001:2015 Technical Distributor · Official GST Tax Invoicing",
      pillStyle: "bg-purple-50/90 text-purple-700 border-purple-200/80",
    },
    {
      type: "brand",
      logo: "/images/logo-mennekes.png",
      name: "MENNEKES GERMANY",
      desc: "PowerTOP® Xtra · AMAXX®",
      pillStyle: "bg-purple-50/90 text-purple-700 border-purple-200/80",
    },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-xs border-b border-zinc-200/60 overflow-hidden py-2 select-none">
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0 text-xs">
            {item.type === "brand" ? (
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border shadow-2xs ${item.pillStyle} transition-transform hover:scale-105`}>
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-3.5 max-w-[65px] object-contain"
                />
                <span className="font-bold font-mono text-[11px]">
                  {item.name}
                </span>
                <span className="text-[10px] opacity-75 border-l border-current/20 pl-2">
                  {item.desc}
                </span>
              </div>
            ) : (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium ${item.pillStyle}`}>
                {item.icon && <item.icon size={12} className="shrink-0" />}
                <span>{item.text}</span>
              </div>
            )}
            <span className="text-zinc-300">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
