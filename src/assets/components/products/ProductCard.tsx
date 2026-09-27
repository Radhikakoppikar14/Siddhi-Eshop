import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingCart, Check, ArrowRight } from "lucide-react";
import type { Product } from "../../../types";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import {
  getShortProductName,
  getProductCores,
  getProductSize,
  getProductColor,
} from "../../../utils/formatters";

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected = false,
  onSelect,
}) => {
  const { addToCart } = useCart();
  const { openQuickView } = useAuth();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    setAdded(true);
    showToast(`Added ${product.name} to RFQ Cart!`);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleClickCard = () => {
    openQuickView(product);
    if (onSelect) {
      onSelect(product);
    }
  };

  const getBrandTheme = () => {
    const b = product.brand.toLowerCase();
    if (b.includes("lapp")) {
      return {
        badge: "bg-amber-100 text-amber-900 border-amber-300",
        selectedBorder: "border-2 border-amber-500 ring-4 ring-amber-100",
        defaultBorder: "border-stone-300 hover:border-amber-400 hover:shadow-xl",
        btnColor: "bg-[#FFCC4D] hover:bg-[#F2B935] text-slate-950 font-black",
      };
    }
    if (b.includes("eaton")) {
      return {
        badge: "bg-sky-100 text-sky-900 border-sky-300",
        selectedBorder: "border-2 border-sky-500 ring-4 ring-sky-100",
        defaultBorder: "border-stone-300 hover:border-sky-400 hover:shadow-xl",
        btnColor: "bg-[#0073e6] hover:bg-[#005bb5] text-white font-black",
      };
    }
    if (b.includes("partex")) {
      return {
        badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
        selectedBorder: "border-2 border-emerald-500 ring-4 ring-emerald-100",
        defaultBorder: "border-stone-300 hover:border-emerald-400 hover:shadow-xl",
        btnColor: "bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black",
      };
    }
    if (b.includes("menn")) {
      return {
        badge: "bg-purple-100 text-purple-900 border-purple-300",
        selectedBorder: "border-2 border-purple-500 ring-4 ring-purple-100",
        defaultBorder: "border-stone-300 hover:border-purple-400 hover:shadow-xl",
        btnColor: "bg-[#8B2272] hover:bg-[#721B5D] text-white font-black",
      };
    }
    return {
      badge: "bg-stone-100 text-stone-800 border-stone-300",
      selectedBorder: "border-2 border-stone-900 ring-4 ring-stone-200",
      defaultBorder: "border-stone-300 hover:border-stone-400",
      btnColor: "bg-stone-950 hover:bg-stone-800 text-white font-bold",
    };
  };

  const theme = getBrandTheme();
  const colorInfo = getProductColor(product);

  return (
    <div
      onClick={handleClickCard}
      className={`bg-white text-stone-900 rounded-3xl p-5 shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
        isSelected ? theme.selectedBorder : `border ${theme.defaultBorder}`
      } hover:-translate-y-1`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div>
        {/* Visual Stage Window */}
        <div className="h-44 w-full rounded-2xl bg-stone-50 p-4 mb-4 flex items-center justify-center relative overflow-hidden border border-stone-200 group-hover:bg-white transition-colors shadow-inner">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/card-cables.jpg";
            }}
          />

          {/* Quick View Floating Trigger */}
          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleQuickView}
              className="p-1.5 rounded-xl bg-white text-stone-700 hover:text-stone-950 border border-stone-300 shadow-xs transition-colors cursor-pointer"
              title="Quick inspection modal"
            >
              <Eye size={14} />
            </button>
          </div>
        </div>

        {/* Metadata Row: Brand badge & SKU */}
        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 gap-2">
          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${theme.badge}`}>
            {product.brand.split(" ")[0]}
          </span>
          <span className="text-stone-500 font-semibold truncate font-mono">
            {product.partNo}
          </span>
        </div>

        {/* Short Product Title */}
        <h3
          className="text-xs sm:text-sm font-black text-stone-950 group-hover:text-amber-700 transition-colors line-clamp-1 leading-snug"
          title={product.name}
        >
          {getShortProductName(product.name)}
        </h3>

        {/* Short Specs / Application */}
        <p className="text-[11px] text-stone-600 mt-1 line-clamp-1 font-mono leading-relaxed">
          {product.application || product.specs[0]}
        </p>

        {/* Structured Technical Specs Micro-Grid (Clean Light Neutral Box) */}
        <div className="mt-2.5 p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-[10px] font-mono space-y-1.5 shadow-inner">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-white px-2 py-1 rounded-lg border border-stone-200">
              <span className="text-stone-400 block text-[9px] uppercase font-sans font-semibold">Cores</span>
              <span className="font-bold text-stone-900 truncate block">
                {getProductCores(product)}
              </span>
            </div>
            <div className="bg-white px-2 py-1 rounded-lg border border-stone-200">
              <span className="text-stone-400 block text-[9px] uppercase font-sans font-semibold">Size</span>
              <span className="font-bold text-sky-800 truncate block">
                {getProductSize(product)}
              </span>
            </div>
          </div>
          <div className="bg-white px-2 py-1 rounded-lg border border-stone-200 flex items-center justify-between gap-1">
            <span className="text-stone-400 text-[9px] uppercase font-sans font-semibold shrink-0">Color</span>
            <div className="flex items-center gap-1.5 truncate">
              <span
                className="w-2.5 h-2.5 rounded-full border shrink-0 shadow-2xs"
                style={{ backgroundColor: colorInfo.dotColor, borderColor: "rgba(0,0,0,0.2)" }}
              />
              <span className="font-medium text-stone-800 truncate text-[9.5px]">
                {colorInfo.label.split("(")[0].trim()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price & CTA Bottom */}
      <div className="mt-5 pt-3.5 border-t border-stone-200">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] text-stone-500 uppercase font-mono block">
              Basic Rate
            </span>
            <div className="text-base font-black font-mono text-emerald-700">
              ₹{product.price.toFixed(2)}
              <span className="text-[11px] font-normal text-stone-500 ml-1">
                / {product.unit}
              </span>
            </div>
          </div>

          <span className="text-[10px] text-emerald-800 font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{(product as any).availability === "out-of-stock" ? "Short Lead" : "Ready Stock"}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-102 cursor-pointer ${
              added
                ? "bg-emerald-600 text-white font-bold"
                : theme.btnColor
            }`}
          >
            {added ? (
              <>
                <Check size={13} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                <span>+ Add to RFQ</span>
              </>
            )}
          </button>

          <Link
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors border border-stone-300 cursor-pointer"
            title="Full specifications"
          >
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};