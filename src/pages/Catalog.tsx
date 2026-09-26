import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CatalogGrid } from "../assets/components/home/CatalogGrid";
import { ArrowLeft, ShieldCheck, Zap, PackageCheck, Layers } from "lucide-react";

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParam = searchParams.get("brand") || "all";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBrandChange = (newBrand: string) => {
    if (newBrand === "all") {
      searchParams.delete("brand");
    } else {
      searchParams.set("brand", newBrand);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-50/70 py-6 sm:py-10">
      {/* Top Breadcrumb & Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-4">
          <Link
            to="/"
            className="hover:text-slate-900 transition-colors flex items-center gap-1 font-semibold"
          >
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Complete Industrial Catalog</span>
        </div>

        {/* Catalog Page Hero Banner — Luminous Light Gold & Champagne Pearl Theme */}
        <div className="bg-gradient-to-br from-[#fffdf6] via-[#faf3e3] to-[#f3e7cb] text-slate-900 rounded-3xl p-6 sm:p-10 border border-[#e5d5b3] shadow-[0_16px_40px_-12px_rgba(180,130,50,0.12),0_2px_8px_rgba(0,0,0,0.03)] relative overflow-hidden">
          {/* Subtle Ambient Radial Golden Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none" />

          {/* Ultra-Soft Warm Champagne Drafting Grid */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #b48228 1px, transparent 1px), linear-gradient(to bottom, #b48228 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300/90 text-amber-950 font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <Layers size={13} className="text-amber-800" />
              <span>Full OEM Product Library</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Industrial Product Catalog
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed font-normal">
              Browse our complete catalog of certified industrial cables, flexible control wires, motor switchgear, wire marking systems, and CEE industrial plugs. Direct authorized distribution from Bangalore Central Warehouse.
            </p>

            {/* Quick Metrics Bar — Clean Floating Badges on Light Gold */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 pt-6 border-t border-[#e2d0ab] text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 text-emerald-900 border border-emerald-300/80 font-medium shadow-2xs">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>100% Genuine OEM Factory Stock</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 text-amber-950 border border-amber-300/80 font-medium shadow-2xs">
                <Zap size={14} className="text-amber-600" />
                <span>GST Tax Credit (18%) Pass-Through</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 text-sky-950 border border-sky-300/80 font-medium shadow-2xs">
                <PackageCheck size={14} className="text-sky-600" />
                <span>Bangalore Warehouse Ready Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Catalog Grid in Full Page Mode */}
      <CatalogGrid
        selectedBrand={brandParam}
        onBrandChange={handleBrandChange}
        isFullPage={true}
      />
    </main>
  );
};
