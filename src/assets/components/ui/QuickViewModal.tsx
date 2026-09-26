import React, { useState, useMemo } from "react";
import {
  X,
  ShoppingCart,
  Check,
  ArrowRight,
  ShieldCheck,
  Layers,
  Ruler,
  Palette,
  Plus,
  Minus,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import {
  getShortProductName,
  getProductCores,
  getProductSize,
  getProductColor,
} from "../../../utils/formatters";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useAuth();
  const { addToCart, addCustomItem } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Interactive Selection State
  const [selectedCore, setSelectedCore] = useState("3 Core");
  const [selectedSize, setSelectedSize] = useState("1.5 Sqmm");
  const [selectedColor, setSelectedColor] = useState("Silver-Grey RAL 7001");

  // Interactive Zoom & Cursor Movement State
  const [isZoomed, setIsZoomed] = useState(false);
  const [bgPosition, setBgPosition] = useState("center");

  if (!quickViewProduct) return null;

  const coreOptions = ["2 Core", "3 Core", "4 Core", "5 Core", "7 Core"];
  const sizeOptions = ["0.75 Sqmm", "1 Sqmm", "1.5 Sqmm", "2.5 Sqmm", "4 Sqmm"];
  const colorOptions = [
    { label: "Silver-Grey RAL 7001", dotColor: "#94a3b8" },
    { label: "Black Sheath (PUR)", dotColor: "#0f172a" },
    { label: "Orange Flexible", dotColor: "#f97316" },
  ];

  // Dynamic Rate Calculation based on selected Cores and Size
  const calculatedPrice = useMemo(() => {
    const base = quickViewProduct.price || 52.00;
    const coreNum = parseInt(selectedCore) || 3;
    const sizeNum = parseFloat(selectedSize) || 1.5;
    // Dynamic multiplier formula scaling with cores and size
    const factor = Math.max(1, Math.round(Math.pow(coreNum, 0.45) * Math.pow(sizeNum, 0.65) * 10) / 10);
    return Math.round((base * (factor / 1.5)) * 100) / 100;
  }, [quickViewProduct, selectedCore, selectedSize]);

  const handleAddToCart = () => {
    if (quickViewProduct.category?.includes("cable") || quickViewProduct.name.toLowerCase().includes("cable")) {
      const configName = `${quickViewProduct.name} - ${selectedCore} · ${selectedSize} · ${selectedColor}`;
      addCustomItem(
        {
          id: `${quickViewProduct.partNo}-${selectedCore}-${selectedSize}`,
          name: configName,
          partNo: quickViewProduct.partNo,
          brand: quickViewProduct.brand,
          price: calculatedPrice,
          unit: quickViewProduct.unit,
        },
        qty
      );
    } else {
      addToCart(quickViewProduct.id, qty);
    }
    setAdded(true);
    showToast(`Added configured product to Quotation Cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCustomQuote = () => {
    const part = quickViewProduct.partNo;
    const name = quickViewProduct.name;
    closeQuickView();

    const fillNotes = () => {
      const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Commercial RFQ Inquiry for:\nProduct: ${name} (${selectedCore}, ${selectedSize}, ${selectedColor})\nPart No: ${part}\nCalculated Unit Rate: ₹${calculatedPrice}\n\nPlease share price list for project volume with freight to site and delivery lead times.`;
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBgPosition(`${x}% ${y}%`);
  };

  const productImage = quickViewProduct.image || "/images/card-cables.jpg";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-5 overflow-y-auto items-center">
          
          {/* Left Column: Square Image Stage with Zoom */}
          <div className="md:col-span-5 flex flex-col items-center justify-between bg-slate-50/70 rounded-xl p-3 border border-slate-100 h-full">
            <div
              className={`relative w-full aspect-square bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-center overflow-hidden ${
                isZoomed ? "cursor-crosshair" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setBgPosition("center")}
            >
              {!isZoomed ? (
                <img
                  src={productImage}
                  alt={quickViewProduct.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-200 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/card-cables.jpg";
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0 w-full h-full bg-no-repeat transition-all duration-75"
                  style={{
                    backgroundImage: `url(${productImage})`,
                    backgroundSize: "250%",
                    backgroundPosition: bgPosition,
                  }}
                />
              )}

              {/* Zoom Action Bar Overlay */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-xs border border-slate-200 p-1 rounded-lg shadow-xs z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="p-1 rounded hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  title={isZoomed ? "Zoom Out" : "Zoom In"}
                >
                  {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                </button>
              </div>
            </div>

            <div className="mt-2.5 w-full text-center">
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <span className="font-semibold text-slate-700">SKU:</span>
                <span>{quickViewProduct.partNo}</span>
              </div>
              <div className="mt-0.5 flex items-center justify-center gap-1 text-[9px] text-emerald-700 font-medium">
                <ShieldCheck size={11} className="text-emerald-500" />
                <span>100% Genuine Factory Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multiple Selectors for Cores, Size, Color & Actions */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-3">
            <div>
              {/* Metadata Header */}
              <div className="flex items-center justify-between text-[10px] font-semibold mb-0.5">
                <span className="text-red-600 font-bold uppercase tracking-wider font-mono">
                  {quickViewProduct.brand}
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {quickViewProduct.stock}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  {getShortProductName(quickViewProduct.name)}
                </h3>
              </div>

              {/* Interactive Selectors Block */}
              <div className="mt-2.5 space-y-2">
                {/* 1. Cores Options */}
                <div>
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 font-mono font-semibold uppercase mb-1">
                    <Layers size={10} className="text-sky-600" />
                    <span>Select Cores</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {coreOptions.map((core) => (
                      <button
                        key={core}
                        type="button"
                        onClick={() => setSelectedCore(core)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border transition-all cursor-pointer ${
                          selectedCore === core
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {core}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Size Options */}
                <div>
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 font-mono font-semibold uppercase mb-1">
                    <Ruler size={10} className="text-indigo-600" />
                    <span>Select Cross-Section Size</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border transition-all cursor-pointer ${
                          selectedSize === size
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Color Options */}
                <div>
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 font-mono font-semibold uppercase mb-1">
                    <Palette size={10} className="text-amber-600" />
                    <span>Select Sheath Color</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {colorOptions.map((col) => (
                      <button
                        key={col.label}
                        type="button"
                        onClick={() => setSelectedColor(col.label)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                          selectedColor === col.label
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full border shrink-0"
                          style={{ backgroundColor: col.dotColor, borderColor: "rgba(0,0,0,0.3)" }}
                        />
                        <span>{col.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Price Banner */}
              <div className="mt-2.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    Dynamic Rate:
                  </span>
                  <div className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                    ₹{calculatedPrice.toFixed(2)}
                    <span className="text-[10px] font-normal text-slate-500 ml-1">
                      / {quickViewProduct.unit}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 font-mono">
                  Excl. GST
                </span>
              </div>
            </div>

            {/* Actions: Quantity Stepper + Add to Cart + Discount Note */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* Stepper Qty */}
                <div className="flex items-center justify-between sm:justify-start border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-1 hover:bg-white rounded-lg text-slate-600 transition-colors cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-xs font-bold font-mono text-slate-900">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-1 hover:bg-white rounded-lg text-slate-600 transition-colors cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
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

              <div>
                <button
                  onClick={handleCustomQuote}
                  className="w-full py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <span className="truncate">Request Custom Discount Note</span>
                  <ArrowRight size={13} className="shrink-0" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};