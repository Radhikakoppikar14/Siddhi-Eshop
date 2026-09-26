import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import type { Product } from "../../../types";

export const BrandPortfolio: React.FC = () => {
  const [activeBrand, setActiveBrand] = useState<"lapp" | "eaton" | "partex" | "mennekes">("lapp");
  const { addCustomItem } = useCart();
  const { openQuickView } = useAuth();
  const { showToast } = useToast();

  const brandTabs = [
    {
      id: "lapp",
      label: "LAPP KABEL GERMANY",
      logo: "/images/logo-lapp.png",
      tag: "Cables & Glands",
      activeClass: "bg-rose-50 text-rose-700 border-rose-300 shadow-xs font-bold",
      cardBorder: "hover:border-rose-300 hover:shadow-rose-100",
    },
    {
      id: "eaton",
      label: "EATON MOELLER",
      logo: "/images/logo-eaton.png",
      tag: "Industrial Switchgear",
      activeClass: "bg-sky-50 text-sky-700 border-sky-300 shadow-xs font-bold",
      cardBorder: "hover:border-sky-300 hover:shadow-sky-100",
    },
    {
      id: "partex",
      label: "PARTEX SWEDEN",
      logo: "/images/logo-partex.png",
      tag: "Identification Systems",
      activeClass: "bg-amber-50 text-amber-700 border-amber-300 shadow-xs font-bold",
      cardBorder: "hover:border-amber-300 hover:shadow-amber-100",
    },
    {
      id: "mennekes",
      label: "MENNEKES",
      logo: "/images/logo-mennekes.png",
      tag: "CEE Plugs & Enclosures",
      activeClass: "bg-purple-50 text-purple-700 border-purple-300 shadow-xs font-bold",
      cardBorder: "hover:border-purple-300 hover:shadow-purple-100",
    },
  ];

  const portfolioItems: Record<string, any[]> = {
    lapp: [
      {
        id: "port-lapp-01",
        partNo: "1119203",
        name: "ÖLFLEX® CLASSIC 110 Control Cable",
        specs: "3 Cores x 1.5 sq mm · VDE 7030 · -40°C to +80°C",
        image: "/images/cable-olflex-angle.png",
        price: 68.5,
        unit: "meter",
        brand: "LAPP KABEL",
        category: "cables",
        stock: "Ready Drum (Bangalore Hub)",
      },
      {
        id: "port-lapp-02",
        partNo: "1119304",
        name: "ÖLFLEX® CLASSIC 110 4 Core x 2.5 sq mm",
        specs: "4 Cores x 2.5 sq mm · Flame Retardant · Oil Resistant",
        image: "/images/card-olflex.jpg",
        price: 142.0,
        unit: "meter",
        brand: "LAPP KABEL",
        category: "cables",
        stock: "Ready Drum (Bangalore Hub)",
      },
      {
        id: "port-lapp-03",
        partNo: "0034404",
        name: "UNITRONIC® LiYCY Data Cable Screened",
        specs: "4 x 0.5 sq mm Screened · Twisted Pair · Tinned Braid",
        image: "/images/card-cables.jpg",
        price: 94.0,
        unit: "meter",
        brand: "LAPP KABEL",
        category: "cables",
        stock: "Ready Drum (Bangalore Hub)",
      },
      {
        id: "port-lapp-04",
        partNo: "53112020",
        name: "SKINTOP® MS-M Nickel-Plated Brass Gland",
        specs: "M20 x 1.5 Metric · IP68 10 Bar · Integrated Strain Relief",
        image: "/images/cable-gland-brass.png",
        price: 185.0,
        unit: "pc",
        brand: "LAPP KABEL",
        category: "cables",
        stock: "Ready Pack (Bangalore Hub)",
      },
    ],
    eaton: [
      {
        id: "port-eaton-01",
        partNo: "PKZM0-16",
        name: "PKZM0 Motor Protective Circuit Breaker 16A",
        specs: "10-16A Range · 150 kA Breaking · Phase-Failure Sensitive",
        image: "/images/eaton-pkzm0.jpg",
        price: 3450.0,
        unit: "pc",
        brand: "EATON - MOELLER",
        category: "switchgear",
        stock: "In Stock (Bangalore Hub)",
      },
      {
        id: "port-eaton-02",
        partNo: "DILM25-10",
        name: "DILM25 Power Contactor 3-Pole 25A AC-3",
        specs: "11 kW @ 400V · 1NO Aux · 230V 50Hz Coil · Box Terminals",
        image: "/images/eaton-dilm.jpg",
        price: 2420.0,
        unit: "pc",
        brand: "EATON - MOELLER",
        category: "switchgear",
        stock: "In Stock (Bangalore Hub)",
      },
      {
        id: "port-eaton-03",
        partNo: "NZMN2-A250",
        name: "NZM2 Molded Case Circuit Breaker 250A",
        specs: "3-Pole 250A · 50 kA @ 415V · Thermal Magnetic",
        image: "/images/eaton-nzm.jpg",
        price: 18450.0,
        unit: "pc",
        brand: "EATON - MOELLER",
        category: "switchgear",
        stock: "In Stock (Bangalore Hub)",
      },
      {
        id: "port-eaton-04",
        partNo: "M22-D-G",
        name: "RMQ-Titan Flush Pushbutton Actuator Green",
        specs: "22.5mm IP67/IP69K · Titanium Bezel · Toolless Clip",
        image: "/images/eaton-rmq.jpg",
        price: 260.0,
        unit: "pc",
        brand: "EATON - MOELLER",
        category: "switchgear",
        stock: "In Stock (Bangalore Hub)",
      },
    ],
    partex: [
      {
        id: "port-partex-01",
        partNo: "PA-1-0-9",
        name: "PA-1 Closed Chevron Wire Markers (0-9)",
        specs: "0.75 - 4.0 mm² Wire · UL94-V0 PVC · Chevron Interlock",
        image: "/images/partex-pa.jpg",
        price: 480.0,
        unit: "pack",
        brand: "PARTEX SWEDEN",
        category: "data",
        stock: "In Stock (Bangalore Hub)",
      },
      {
        id: "port-partex-02",
        partNo: "PC-20",
        name: "PC-20 Clip-On Open Wire Markers",
        specs: "3.0 - 4.0 mm Wire OD · Retrofit Clip · High Retention",
        image: "/images/partex-pc.jpg",
        price: 520.0,
        unit: "pack",
        brand: "PARTEX SWEDEN",
        category: "data",
        stock: "In Stock (Bangalore Hub)",
      },
      {
        id: "port-partex-03",
        partNo: "PROMARK-T1000",
        name: "ProMark T-1000 Portable Thermal Printer Kit",
        specs: "300 dpi Thermal Transfer · Profile/Tubing · USB PC Link",
        image: "/images/partex-promark.jpg",
        price: 68500.0,
        unit: "set",
        brand: "PARTEX SWEDEN",
        category: "data",
        stock: "In Stock (Bangalore Hub)",
      },
      {
        id: "port-partex-04",
        partNo: "PKS-SS316",
        name: "PKS Stainless Steel Cable Marker Carrier",
        specs: "Grade 316 Acid-Proof · Extreme Temp · Marine Offshore",
        image: "/images/partex-pks.jpg",
        price: 1850.0,
        unit: "pack",
        brand: "PARTEX SWEDEN",
        category: "data",
        stock: "In Stock (Bangalore Hub)",
      },
    ],
    mennekes: [
      {
        id: "port-menn-01",
        partNo: "13511",
        name: "PowerTOP® Xtra 16A 5P Industrial Plug",
        specs: "16A 400V 6h Red · IP67 Watertight · Ergo Rubberized",
        image: "/images/menn-powertop.jpg",
        price: 2120.0,
        unit: "pc",
        brand: "MENNEKES",
        category: "plugs",
        stock: "In Stock (Bangalore Hub)",
      },
      {
        id: "port-menn-02",
        partNo: "13512",
        name: "PowerTOP® Xtra 32A 5P Heavy Duty Plug",
        specs: "32A 400V 6h Red · IP67 Watertight · Rubberized Grip",
        image: "/images/menn-powertop.jpg",
        price: 2840.0,
        unit: "pc",
        brand: "MENNEKES",
        category: "plugs",
        stock: "In Stock (Bangalore Hub)",
      },
      {
        id: "port-menn-03",
        partNo: "AMAXX-2G",
        name: "AMAXX® 2-Gang Receptacle Combination",
        specs: "AMAPLAST Polymer · IP44/IP67 · DIN Rail Window",
        image: "/images/menn-amaxx.jpg",
        price: 14200.0,
        unit: "unit",
        brand: "MENNEKES",
        category: "plugs",
        stock: "In Stock (Bangalore Hub)",
      },
      {
        id: "port-menn-04",
        partNo: "EVERGUM-COMP",
        name: "EverGUM® Solid Rubber Field Distributor",
        specs: "Vulcanized Rubber · Crush & Drop Proof · IP44/IP67",
        image: "/images/menn-evergum.jpg",
        price: 18500.0,
        unit: "unit",
        brand: "MENNEKES",
        category: "plugs",
        stock: "In Stock (Bangalore Hub)",
      },
    ],
  };

  const handleAddToCart = (item: any) => {
    addCustomItem(
      {
        id: item.id,
        name: item.name,
        partNo: item.partNo,
        brand: item.brand,
        price: item.price,
        unit: item.unit,
      },
      item.unit === "meter" ? 100 : 1
    );
    showToast(`Added ${item.name} to RFQ Cart!`);
  };

  const currentItems = portfolioItems[activeBrand] || [];
  const currentTab = brandTabs.find((b) => b.id === activeBrand);

  return (
    <section className="py-12 lg:py-16 select-none bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Minimalist Brand Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                TECHNICAL PORTFOLIO
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Selected High-Demand Inventory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              High-volume warehouse lines stocked in Bangalore for immediate dispatch to manufacturing plants, OEMs, and EPC sites.
            </p>
          </div>

          {/* Segmented Brand Selector Pills */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto scrollbar-none self-start lg:self-auto">
            {brandTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveBrand(tab.id as any)}
                className={`py-2 px-3 sm:px-4 rounded-xl text-xs transition-all whitespace-nowrap flex items-center gap-2 border ${
                  activeBrand === tab.id
                    ? tab.activeClass
                    : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-white/80 font-medium"
                }`}
              >
                <span>{tab.label.split(" ")[0]}</span>
                <span className="text-[10px] opacity-75 font-mono hidden sm:inline">
                  {tab.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Clean Minimalist Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover-card-lift ${currentTab?.cardBorder}`}
            >
              <div>
                {/* Visual Stage in Clean Light Pedestal */}
                <div className="h-44 w-full rounded-2xl bg-slate-50/70 p-4 mb-4 flex items-center justify-center relative overflow-hidden border border-slate-100 group-hover:bg-white transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openQuickView(item as Product)}
                      className="p-1.5 rounded-lg bg-white/90 text-slate-700 hover:text-slate-950 hover:bg-white border border-slate-200 shadow-xs"
                      title="Quick inspection"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className="text-slate-500 font-semibold">{item.brand}</span>
                  <span className="text-slate-400">{item.partNo}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-950 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                  {item.name}
                </h3>

                <p className="text-[11px] text-slate-500 mt-2 font-mono leading-relaxed">
                  {item.specs}
                </p>
              </div>

              {/* Price & CTA */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">
                      Basic Unit Rate
                    </span>
                    <div className="text-base font-black font-mono text-emerald-600">
                      ₹{item.price.toFixed(2)}
                      <span className="text-[11px] font-normal text-slate-400 ml-1">
                        / {item.unit}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                    {item.stock}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 py-2 px-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs hover:scale-102"
                  >
                    <ShoppingCart size={13} />
                    <span>+ Add to RFQ</span>
                  </button>

                  <button
                    onClick={() => openQuickView(item as Product)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-xl transition-colors border border-slate-200/80"
                    title="View details popup"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Make Sheet Link */}
        <div className="mt-8 text-center">
          <Link
            to={
              activeBrand === "lapp"
                ? "/about-lapp"
                : activeBrand === "eaton"
                ? "/about-eaton"
                : activeBrand === "partex"
                ? "/about-partex"
                : "/about-mennekes"
            }
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors"
          >
            <span>Explore Complete {currentTab?.label} Make Sheet & Full Lineup</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
};
