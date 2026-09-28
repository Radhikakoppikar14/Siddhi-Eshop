import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  ShoppingCart,
  Check,
  Sparkles,
  Command,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";
import { PRODUCTS_DATA } from "../../../data/products";
import type { Product } from "../../../types";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, openQuickView } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [query, setQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState("all");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
      setActiveBrand("all");
    }
  }, [isSearchOpen]);

  const brandOptions = [
    { id: "all", label: "All Items" },
    { id: "lapp", label: "LAPP Kabel" },
    { id: "eaton", label: "EATON Moeller" },
    { id: "partex", label: "PARTEX Sweden" },
    { id: "mennekes", label: "MENNEKES" },
  ];

  const popularSearches = [
    "ÖLFLEX CLASSIC 110",
    "PKZM0-16",
    "ProMark T-1000",
    "PowerTOP Xtra 32A",
    "SKINTOP MS-M",
    "DILM25",
  ];

  const searchResults = useMemo(() => {
    let list = PRODUCTS_DATA;

    if (activeBrand !== "all") {
      list = list.filter((p) => p.brand.toLowerCase().includes(activeBrand));
    }

    if (!query.trim()) {
      return list.slice(0, 4);
    }

    const q = query.toLowerCase().trim();
    return list
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.partNo.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q)) ||
          p.application.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [query, activeBrand]);

  const handleSelectProduct = (product: Product) => {
    closeSearch();
    openQuickView(product);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product.id, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    showToast(`Added ${product.name} to RFQ Cart!`);
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const getBrandBadge = (brand: string) => {
    const b = brand.toLowerCase();
    if (b.includes("lapp")) return "bg-amber-100 text-amber-900 border-amber-300";
    if (b.includes("eaton")) return "bg-sky-100 text-sky-900 border-sky-300";
    if (b.includes("partex")) return "bg-rose-100 text-rose-900 border-rose-300";
    if (b.includes("menn")) return "bg-purple-100 text-purple-900 border-purple-300";
    return "bg-emerald-100 text-emerald-900 border-emerald-300";
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in select-none"
      onClick={closeSearch}
    >
      <div
        className="w-full max-w-2xl bg-gradient-to-br from-[#fdf2f4] via-[#fbf8f5] to-[#f5e6d3] rounded-[2.5rem] shadow-2xl border border-[#e6d5cc] overflow-hidden text-slate-900 transition-all flex flex-col max-h-[82vh] sm:max-h-[85vh] my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Lighting Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Search Header Bar with Input */}
        <div className="p-4 sm:p-5 border-b border-[#e6d5cc] flex items-center gap-3 bg-[#fbf8f5]/90 backdrop-blur-md relative z-10 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#e6d5cc] flex items-center justify-center text-rose-600 shrink-0 shadow-2xs">
            <Search size={18} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by SKU, Part No, Conductor, Brand, Model..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 outline-none"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 cursor-pointer"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white/80 border border-[#e6d5cc] rounded-lg text-[10px] font-mono text-slate-600 select-none">
            <Command size={10} />
            <span>ESC</span>
          </div>

          <button
            onClick={closeSearch}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Filter Brand Chips */}
        <div className="px-4 py-3 bg-white/70 border-b border-[#e6d5cc] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs relative z-10 shrink-0">
          <span className="text-[11px] font-mono text-[#8c6d62] font-bold mr-1 shrink-0">
            Brand:
          </span>
          {brandOptions.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setActiveBrand(brand.id)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap text-xs cursor-pointer ${
                activeBrand === brand.id
                  ? "bg-[#0B0F17] text-white font-bold shadow-xs"
                  : "bg-white/90 hover:bg-white text-slate-700 border border-[#e6d5cc] font-medium"
              }`}
            >
              {brand.label}
            </button>
          ))}
        </div>

        {/* Results / Suggestions Container */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4 relative z-10">
          {!query.trim() && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#8c6d62] tracking-wider flex items-center gap-1">
                <Sparkles size={11} className="text-amber-600" />
                Popular Quick Searches
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs font-mono border border-[#e6d5cc] transition-colors shadow-2xs cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchResults.length > 0 ? (
            <div className="space-y-2">
              <div className="space-y-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="p-3.5 bg-white/90 hover:bg-white rounded-2xl cursor-pointer flex items-center justify-between gap-3 group transition-all border border-[#e6d5cc] shadow-2xs hover:shadow-md"
                  >
                    <div className="min-w-0 space-y-0.5 pl-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border font-mono ${getBrandBadge(
                            product.brand
                          )}`}
                        >
                          {product.brand}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {product.partNo}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-black text-slate-950 truncate group-hover:text-rose-600 transition-colors">
                        {product.name}
                      </h4>

                      <p className="text-[11px] text-slate-600 font-mono truncate">
                        {product.specs.slice(0, 2).join(" · ")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-black font-mono text-slate-950 block">
                          ₹{product.price.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          /{product.unit}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                          addedIds[product.id]
                            ? "bg-emerald-600 text-white"
                            : "bg-[#0B0F17] hover:bg-slate-900 text-white hover:scale-105"
                        }`}
                        title="Add to RFQ Cart"
                      >
                        {addedIds[product.id] ? (
                          <Check size={15} />
                        ) : (
                          <ShoppingCart size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs space-y-1">
              <Search size={28} className="mx-auto mb-2 text-slate-400" />
              <p className="font-bold text-slate-800">No products matching "{query}"</p>
              <p className="text-[11px] text-slate-500">
                Try searching by brand or submit a custom bill of materials in RFQ below.
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-4 bg-[#fbf8f5]/90 border-t border-[#e6d5cc] flex items-center justify-between text-xs text-slate-600 relative z-10 shrink-0">
          <span className="font-mono text-[11px]">
            Press <strong className="text-slate-950">ESC</strong> to exit
          </span>

          <a
            href="#rfqSection"
            onClick={closeSearch}
            className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
          >
            <span>Can't find a part? Submit custom RFQ</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};