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
        badge: "bg-amber-50 text-amber-800 border-amber-300",
        borderHover: "hover:border-amber-400 hover:shadow-amber-100/60",
        selectedBorder: "border-2 border-amber-500 ring-4 ring-amber-100",
        accent: "text-amber-700",
        btnColor: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold",
        logo: "/images/logo-lapp.png",
      };
    }
    if (b.includes("eaton")) {
      return {
        badge: "bg-sky-50 text-sky-800 border-sky-300",
        borderHover: "hover:border-sky-400 hover:shadow-sky-100/60",
        selectedBorder: "border-2 border-sky-500 ring-4 ring-sky-100",
        accent: "text-sky-700",
        btnColor: "bg-sky-600 hover:bg-sky-500 text-white font-bold",
        logo: "/images/logo-eaton.png",
      };
    }
    if (b.includes("partex")) {
      return {
        badge: "bg-emerald-50 text-emerald-800 border-emerald-300",
        borderHover: "hover:border-emerald-400 hover:shadow-emerald-100/60",
        selectedBorder: "border-2 border-emerald-500 ring-4 ring-emerald-100",
        accent: "text-emerald-700",
        btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white font-bold",
        logo: "/images/logo-partex.png",
      };
    }
    if (b.includes("menn")) {
      return {
        badge: "bg-purple-50 text-purple-800 border-purple-300",
        borderHover: "hover:border-purple-400 hover:shadow-purple-100/60",
        selectedBorder: "border-2 border-purple-500 ring-4 ring-purple-100",
        accent: "text-purple-700",
        btnColor: "bg-purple-600 hover:bg-purple-500 text-white font-bold",
        logo: "/images/logo-mennekes.png",
      };
    }
    return {
      badge: "bg-slate-100 text-slate-800 border-slate-300",
      borderHover: "hover:border-slate-400 hover:shadow-slate-100",
      selectedBorder: "border-2 border-slate-800 ring-4 ring-slate-100",
      accent: "text-slate-800",
      btnColor: "bg-slate-950 hover:bg-slate-800 text-white font-bold",
      logo: "/images/siddhi-kabel-logo.png",
    };
  };

  const theme = getBrandTheme();

  return (
    <div
      onClick={handleClickCard}
      className={`bg-white rounded-3xl p-5 shadow-2xs transition-all duration-300 flex flex-col justify-between group cursor-pointer relative ${
        isSelected ? theme.selectedBorder : `border border-slate-200/90 ${theme.borderHover}`
      } hover:-translate-y-1 hover:shadow-xl`}
    >
      <div>
        {/* Visual Stage in Crisp Light Pedestal with Subtle Hover Zoom */}
        <div className="h-48 w-full rounded-2xl bg-slate-50/70 p-4 mb-4 flex items-center justify-center relative overflow-hidden border border-slate-100 group-hover:bg-white transition-colors">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/card-cables.jpg";
            }}
          />

          {/* Top Right Quick View Floating Trigger */}
          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleQuickView}
              className="p-1.5 rounded-xl bg-white/95 text-slate-700 hover:text-slate-950 hover:bg-white border border-slate-200 shadow-xs transition-colors cursor-pointer"
              title="Quick inspection modal"
            >
              <Eye size={14} />
            </button>
          </div>
        </div>

        {/* Metadata Row: Brand badge & SKU */}
        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 gap-2">
          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${theme.badge}`}>
            {product.brand.split(" ")[0]}
          </span>
          <span className="text-slate-400 font-semibold truncate">
            {product.partNo}
          </span>
        </div>

        {/* Short Product Title */}
        <h3
          className="text-xs sm:text-sm font-bold text-slate-950 group-hover:text-sky-600 transition-colors line-clamp-1 leading-snug"
          title={product.name}
        >
          {getShortProductName(product.name)}
        </h3>

        {/* Short Specs / Application */}
        <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 font-mono leading-relaxed">
          {product.application || product.specs[0]}
        </p>

        {/* Structured Technical Specs Micro-Grid: Cores, Size & Color */}
        {(() => {
          const cores = getProductCores(product);
          const size = getProductSize(product);
          const color = getProductColor(product);
          return (
            <div className="mt-2.5 p-2 bg-slate-50/90 rounded-xl border border-slate-200/70 text-[10px] font-mono space-y-1.5">
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-white px-2 py-1 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 block text-[9px] uppercase font-sans font-semibold">Cores</span>
                  <span className="font-bold text-slate-900 truncate block">
                    {cores}
                  </span>
                </div>
                <div className="bg-white px-2 py-1 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 block text-[9px] uppercase font-sans font-semibold">Size</span>
                  <span className="font-bold text-sky-700 truncate block">
                    {size}
                  </span>
                </div>
              </div>
              <div className="bg-white px-2 py-1 rounded-lg border border-slate-200/60 flex items-center justify-between gap-1">
                <span className="text-slate-400 text-[9px] uppercase font-sans font-semibold shrink-0">Color</span>
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full border shrink-0 shadow-2xs"
                    style={{ backgroundColor: color.dotColor, borderColor: "rgba(0,0,0,0.15)" }}
                  />
                  <span className="font-medium text-slate-700 truncate text-[9.5px]">
                    {color.label.split("(")[0].trim()}
                  </span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Price & CTA Bottom */}
      <div className="mt-5 pt-3.5 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono block">
              Basic Rate
            </span>
            <div className="text-base font-black font-mono text-emerald-600">
              ₹{product.price.toFixed(2)}
              <span className="text-[11px] font-normal text-slate-400 ml-1">
                / {product.unit}
              </span>
            </div>
          </div>

          <span className="text-[10px] text-emerald-700 font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
            {(product as any).availability === "out-of-stock" ? "Short Lead" : "Ready Stock"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs hover:scale-102 ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-slate-950 hover:bg-slate-800 text-white"
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
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200/80"
            title="Full specifications"
          >
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
