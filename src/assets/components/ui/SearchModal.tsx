import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  ArrowRight,
  ShoppingCart,
  Check,
  Sparkles,
  Command,
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
      return list.slice(0, 6);
    }

    const q = query.toLowerCase().trim();
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.partNo.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.some((s) => s.toLowerCase().includes(q)) ||
        p.application.toLowerCase().includes(q)
    );
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
    if (b.includes("lapp")) return "bg-rose-50 text-rose-700 border-rose-200";
    if (b.includes("eaton")) return "bg-sky-50 text-sky-700 border-sky-200";
    if (b.includes("partex")) return "bg-amber-50 text-amber-700 border-amber-200";
    if (b.includes("menn")) return "bg-purple-50 text-purple-700 border-purple-200";
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in select-none"
      onClick={closeSearch}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 transition-all flex flex-col max-h-[78vh] sm:max-h-[80vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar with Input */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 shadow-2xs">
            <Search size={18} className="text-sky-600" />
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
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-200/80 rounded-lg text-[10px] font-mono text-slate-600 select-none">
            <Command size={10} />
            <span>ESC</span>
          </div>

          <button
            onClick={closeSearch}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Filter Brand Chips */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[11px] font-mono text-slate-400 mr-1 shrink-0">
            Brand:
          </span>
          {brandOptions.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setActiveBrand(brand.id)}
              className={`px-3 py-1 rounded-xl transition-all whitespace-nowrap text-xs ${
                activeBrand === brand.id
                  ? "bg-slate-900 text-white font-semibold shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium"
              }`}
            >
              {brand.label}
            </button>
          ))}
        </div>

        {/* Results / Suggestions Container */}
        <div className="overflow-y-auto flex-1 p-3 sm:p-4 divide-y divide-slate-100">
          {!query.trim() && (
            <div className="mb-3 px-2">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1 mb-2">
                <Sparkles size={11} className="text-amber-500" />
                Popular Quick Searches
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 text-xs font-mono transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchResults.length > 0 ? (
            <div className="space-y-1.5 pt-1">
              <div className="px-2 py-1 text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider flex justify-between">
                <span>Matching Inventory Items</span>
                <span>{searchResults.length} results</span>
              </div>

              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="p-3 hover:bg-slate-50 rounded-2xl cursor-pointer flex items-center justify-between gap-3 group transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/card-cables.jpg";
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border font-mono ${getBrandBadge(
                            product.brand
                          )}`}
                        >
                          {product.brand}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {product.partNo}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate group-hover:text-sky-600 transition-colors mt-0.5">
                        {product.name}
                      </h4>

                      <p className="text-[11px] text-slate-500 font-mono truncate">
                        {product.specs.slice(0, 2).join(" · ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-bold font-mono text-slate-950 block">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        /{product.unit}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                        addedIds[product.id]
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white hover:scale-105"
                      }`}
                      title="Add to RFQ Cart"
                    >
                      {addedIds[product.id] ? (
                        <Check size={14} />
                      ) : (
                        <ShoppingCart size={14} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Search size={24} className="mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-slate-700">No products matching "{query}"</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Try searching by brand or submit a custom bill of materials in RFQ below.
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[11px]">
            Press <strong className="text-slate-800">ESC</strong> to exit
          </span>

          <a
            href="#rfqSection"
            onClick={closeSearch}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>Can't find a part? Submit custom RFQ</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
