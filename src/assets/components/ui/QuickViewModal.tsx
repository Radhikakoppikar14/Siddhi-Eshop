import React, { useState } from "react";
import {
  X,
  ShoppingCart,
  Check,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Layers,
  Ruler,
  Palette,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate, Link } from "react-router-dom";
import {
  getShortProductName,
  getProductCores,
  getProductSize,
  getProductColor,
} from "../../../utils/formatters";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct.id, qty);
    setAdded(true);
    showToast(`Added ${qty} ${quickViewProduct.unit} of ${quickViewProduct.name} to RFQ Cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCustomQuote = () => {
    const part = quickViewProduct.partNo;
    const name = quickViewProduct.name;
    closeQuickView();

    const fillNotes = () => {
      const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Commercial RFQ Inquiry for:\nProduct: ${name}\nPart No: ${part}\n\nPlease share price list for project volume with freight to site and delivery lead times.`;
        notes.focus();
      }
    };

    if (window.location.pathname !== "/") {
      navigate("/#rfqSection");
      setTimeout(fillNotes, 300);
    } else {
      document.getElementById("rfqSection")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(fillNotes, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Image Stage */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="h-56 w-full flex items-center justify-center">
              <img
                src={quickViewProduct.image || "/images/product-placeholder.svg"}
                alt={quickViewProduct.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/card-cables.jpg";
                }}
              />
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <span className="font-semibold text-slate-700">SKU:</span>
              <span>{quickViewProduct.partNo}</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>100% Genuine Factory Certified</span>
            </div>
          </div>

          {/* Right Column: Details & Technical Parameters */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-red-600 font-bold uppercase tracking-wider font-mono">
                  {quickViewProduct.brand}
                </span>
                <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {quickViewProduct.stock}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {getShortProductName(quickViewProduct.name)}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {quickViewProduct.name}
                </p>
              </div>

              {/* High-Profile Technical Specs Triad: Cores, Size & Color */}
              {(() => {
                const cores = getProductCores(quickViewProduct);
                const size = getProductSize(quickViewProduct);
                const color = getProductColor(quickViewProduct);
                return (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {/* 1. Number of Cores */}
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono font-semibold uppercase">
                        <Layers size={11} className="text-sky-600" />
                        <span>Cores</span>
                      </div>
                      <div className="mt-1 font-bold text-slate-900 text-xs sm:text-sm font-mono truncate" title={cores}>
                        {cores}
                      </div>
                    </div>

                    {/* 2. Size / Cross Section */}
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono font-semibold uppercase">
                        <Ruler size={11} className="text-indigo-600" />
                        <span>Size</span>
                      </div>
                      <div className="mt-1 font-bold text-indigo-700 text-xs sm:text-sm font-mono truncate" title={size}>
                        {size}
                      </div>
                    </div>

                    {/* 3. Color & Sheath */}
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono font-semibold uppercase">
                        <Palette size={11} className="text-amber-600" />
                        <span>Color</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 truncate" title={color.label}>
                        <span
                          className="w-2.5 h-2.5 rounded-full border shrink-0 shadow-2xs"
                          style={{ backgroundColor: color.dotColor, borderColor: "rgba(0,0,0,0.2)" }}
                        />
                        <span className="font-bold text-slate-800 text-[11px] sm:text-xs truncate">
                          {color.label.split("(")[0].trim()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Price Banner */}
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                    Catalog Base Price
                  </span>
                  <div className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                    ₹{quickViewProduct.price.toFixed(2)}
                    <span className="text-xs font-normal text-slate-500 ml-1">
                      / {quickViewProduct.unit}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">
                  Excl. 18% GST & Freight
                </span>
              </div>

              {/* Specs & Engineering Parameters */}
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Number of Cores:</span>
                  <span className="font-bold text-slate-800 font-mono">
                    {getProductCores(quickViewProduct)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Conductor Cross-Section:</span>
                  <span className="font-bold text-indigo-700 font-mono">
                    {getProductSize(quickViewProduct)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Color Code / Sheath:</span>
                  <div className="flex items-center gap-1.5 max-w-[220px]">
                    <span
                      className="w-2.5 h-2.5 rounded-full border shrink-0"
                      style={{ backgroundColor: getProductColor(quickViewProduct).dotColor }}
                    />
                    <span className="font-medium text-slate-800 text-[11px] truncate">
                      {getProductColor(quickViewProduct).label}
                    </span>
                  </div>
                </div>
                {quickViewProduct.voltage && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Nominal Voltage:</span>
                    <span className="font-medium text-slate-800 font-mono">{quickViewProduct.voltage}</span>
                  </div>
                )}
                {quickViewProduct.tempRange && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Temperature Range:</span>
                    <span className="font-medium text-slate-800 font-mono">{quickViewProduct.tempRange}</span>
                  </div>
                )}
                {quickViewProduct.conductor && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Conductor / Material:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[200px]">
                      {quickViewProduct.conductor}
                    </span>
                  </div>
                )}
                {quickViewProduct.application && (
                  <div className="py-1">
                    <span className="text-slate-500 block mb-0.5">Application:</span>
                    <span className="text-slate-700 leading-relaxed text-[11px] block">
                      {quickViewProduct.application}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + Direct RFQ */}
            <div className="pt-3 border-t border-slate-200 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <span className="text-[11px] font-semibold text-slate-500 px-2">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center text-xs font-bold font-mono bg-white border border-slate-200 rounded-lg py-1 outline-none"
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 hover:bg-red-600 text-white shadow-xs"
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={14} />
                      <span>Added to RFQ Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={14} />
                      <span>Add to Quotation Cart</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleCustomQuote}
                  className="flex-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Custom Discount Note</span>
                  <ArrowRight size={13} />
                </button>
                <Link
                  to={`/product/${quickViewProduct.id}`}
                  onClick={closeQuickView}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-slate-200 shrink-0"
                >
                  <span>Open Product Page</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
