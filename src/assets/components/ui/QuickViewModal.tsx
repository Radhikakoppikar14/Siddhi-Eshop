import React, { useState, useEffect, useMemo } from "react";
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
  FileText,
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

const FALLBACK_IMG = "/images/card-cables.jpg";
// The 2 extra images shown after the main image.
// Override per product by adding `extraImages: string[]` to your product data.
const EXTRA_IMAGES = ["/images/cable1.png", "/images/cable2.png"];

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Interactive LAPP Customization Options State
  const [selectedCore, setSelectedCore] = useState<string>("4 Cores (with Earth)");
  const [selectedSize, setSelectedSize] = useState<string>("2.5 mm²");
  const [selectedColor, setSelectedColor] = useState<string>("Black Sheath");

  // Interactive Zoom State
  const [isZoomed, setIsZoomed] = useState(false);
  const [bgPosition, setBgPosition] = useState("center");

  // Gallery State
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedCore(getProductCores(quickViewProduct));
      setSelectedSize(getProductSize(quickViewProduct));
      const col = getProductColor(quickViewProduct);
      setSelectedColor(col.label.split("(")[0].trim());
      setQty(1);
      setAdded(false);
      setIsZoomed(false);
      setSelectedImgIndex(0);
    }
  }, [quickViewProduct]);

  // Main image + 2 extra images
  const galleryImages = useMemo(() => {
    const main = quickViewProduct?.image || FALLBACK_IMG;
    const extras: string[] = (quickViewProduct as any)?.extraImages?.length
      ? (quickViewProduct as any).extraImages
      : EXTRA_IMAGES;
    return [main, ...extras.slice(0, 2)];
  }, [quickViewProduct]);

  // Real-time dynamic price calculation based on selected core, size, and sheath
  const calculatedRate = useMemo(() => {
    let baseRate = quickViewProduct?.price || 145.0;

    if (selectedSize.includes("1.5")) baseRate = 145.0;
    else if (selectedSize.includes("2.5")) baseRate = 185.0;
    else if (selectedSize.includes("4.0")) baseRate = 215.0;
    else if (selectedSize.includes("6.0")) baseRate = 245.0;

    if (selectedCore.includes("3")) baseRate *= 0.85;
    else if (selectedCore.includes("4")) baseRate *= 0.95;
    else if (selectedCore.includes("5")) baseRate *= 1.0;

    if (selectedColor.includes("Teal Green")) baseRate += 15;
    else if (selectedColor.includes("Black")) baseRate += 0;
    else if (selectedColor.includes("Silver-Grey")) baseRate -= 10;

    return Number(baseRate.toFixed(2));
  }, [quickViewProduct?.price, selectedSize, selectedCore, selectedColor]);

  const totalPrice = (calculatedRate * qty).toFixed(2);

  if (!quickViewProduct) return null;

  const isLapp = quickViewProduct.brand.toLowerCase().includes("lapp");

  const coreOptions = ["3 Cores (with Earth)", "4 Cores (with Earth)", "5 Cores (with Earth)"];
  const sizeOptions = ["1.5 mm²", "2.5 mm²", "4.0 mm²", "6.0 mm²"];
  const colorOptions = ["Silver-Grey RAL 7001", "Black Sheath", "Teal Green RAL 6018"];

  const handleAddToCart = () => {
    addToCart(quickViewProduct.id, qty);
    setAdded(true);
    const specDetails = isLapp ? ` [${selectedCore}, ${selectedSize}, ${selectedColor}]` : "";
    showToast(`Added ${qty} ${quickViewProduct.unit} of ${quickViewProduct.name}${specDetails} to RFQ Cart!`);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleCustomQuote = () => {
    const part = quickViewProduct.partNo;
    const name = quickViewProduct.name;
    const specSummary = isLapp ? `\nConfigurations: ${selectedCore} · ${selectedSize} · ${selectedColor}` : "";
    closeQuickView();

    const fillNotes = () => {
      const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Commercial RFQ Inquiry for:\nProduct: ${name}\nPart No: ${part}${specSummary}\n\nPlease share price list for project volume with freight to site and delivery lead times.`;
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

  const imgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_IMG;
  };

  const productImage = galleryImages[selectedImgIndex] || FALLBACK_IMG;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in select-none">
      <div
        className="relative bg-gradient-to-br from-white via-[#fcfbfa] to-[#f7f2ea] text-stone-900 rounded-3xl shadow-2xl border border-stone-200/80 w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-950 transition-colors border border-stone-300 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 overflow-y-auto items-center">
          {/* Left Column: Image Stage with Zoom + Thumbnails */}
          <div className="md:col-span-5 flex flex-col items-center justify-between bg-stone-50/60 rounded-2xl p-4 border border-stone-200 h-full shadow-inner">
            <div
              className={`relative w-full aspect-square bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-center overflow-hidden shadow-2xs group ${
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
                  className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                  onError={imgError}
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
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-xs border border-stone-300 p-1 rounded-xl shadow-xs z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                  title={isZoomed ? "Zoom Out" : "Zoom In"}
                >
                  {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                </button>
              </div>
            </div>

            {/* Thumbnails: main image + 2 extra images */}
            {galleryImages.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedImgIndex(idx);
                      setIsZoomed(false);
                    }}
                    aria-label={`Show image ${idx + 1}`}
                    className={`w-14 h-14 rounded-xl bg-white border p-1 overflow-hidden flex items-center justify-center transition-all cursor-pointer ${
                      selectedImgIndex === idx
                        ? "border-pink-600 ring-2 ring-pink-500/25 scale-105"
                        : "border-stone-300 opacity-70 hover:opacity-100 hover:border-stone-500"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${quickViewProduct.name} view ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onError={imgError}
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 w-full text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-mono">
                <span className="font-bold text-stone-700">SKU:</span>
                <span className="text-stone-900 font-semibold">{quickViewProduct.partNo}</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-700 font-mono font-semibold">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>100% Genuine Factory Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Engineering Console Blocks */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Metadata Header */}
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-pink-800 font-bold uppercase tracking-wider bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                  {quickViewProduct.brand}
                </span>
                <span className="text-emerald-800 font-semibold flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {quickViewProduct.stock || "Ready Stock"}
                </span>
              </div>

              {/* Title */}
              <div className="mt-3">
                <h3 className="text-base sm:text-lg font-black text-stone-950 leading-snug">
                  {getShortProductName(quickViewProduct.name)}
                </h3>
              </div>

              {/* Conditional Content: LAPP Interactive Selectors vs Standard Description Box */}
              {isLapp ? (
                <div className="mt-4 space-y-2.5 font-mono text-xs">
                  {/* Cores Selector */}
                  <div className="p-3 bg-white/90 rounded-2xl border border-stone-200/90 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500 font-bold uppercase flex items-center gap-1">
                        <Layers size={11} className="text-sky-600" /> Cores Configuration:
                      </span>
                      <span className="text-[10px] font-bold text-stone-900">{selectedCore}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {coreOptions.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setSelectedCore(c)}
                          className={`px-2 py-1.5 rounded-xl text-[10px] font-semibold transition-all border cursor-pointer text-center truncate ${
                            selectedCore === c
                              ? "bg-stone-950 text-white border-stone-950 shadow-2xs"
                              : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="p-3 bg-white/90 rounded-2xl border border-stone-200/90 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500 font-bold uppercase flex items-center gap-1">
                        <Ruler size={11} className="text-indigo-600" /> Conductor Cross-Section Size:
                      </span>
                      <span className="text-[10px] font-bold text-indigo-700">{selectedSize}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {sizeOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`px-2 py-1.5 rounded-xl text-[10px] font-semibold transition-all border cursor-pointer text-center truncate ${
                            selectedSize === s
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                              : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div className="p-3 bg-white/90 rounded-2xl border border-stone-200/90 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500 font-bold uppercase flex items-center gap-1">
                        <Palette size={11} className="text-amber-600" /> Sheath Color Option:
                      </span>
                      <span className="text-[10px] font-bold text-stone-900">{selectedColor}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {colorOptions.map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => setSelectedColor(col)}
                          className={`px-2 py-1.5 rounded-xl text-[10px] font-semibold transition-all border cursor-pointer flex items-center justify-center gap-1 truncate ${
                            selectedColor === col
                              ? "bg-stone-950 text-white border-stone-950 shadow-2xs"
                              : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
                          }`}
                        >
                          <span
                            className="w-2 h-2 rounded-full border shrink-0"
                            style={{
                              backgroundColor: col.includes("Black") ? "#111" : col.includes("Green") ? "#0f766e" : "#94a3b8",
                              borderColor: "rgba(0,0,0,0.2)",
                            }}
                          />
                          <span className="truncate">{col.split(" ")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-4 bg-white/90 rounded-2xl border border-stone-200/90 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-stone-700 text-xs font-bold font-mono uppercase">
                    <FileText size={13} className="text-pink-700" />
                    <span>Product Application & Specification</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {quickViewProduct.application || quickViewProduct.name}
                  </p>
                </div>
              )}

              {/* Rate Banner */}
              <div className="mt-3 px-4 py-3 bg-white/90 border border-stone-200/90 rounded-2xl flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">Rate:</span>
                  <div className="text-lg font-black text-emerald-700 font-mono tabular-nums">
                    ₹{calculatedRate.toFixed(2)}
                    <span className="text-xs font-normal text-stone-500 ml-1">/ {quickViewProduct.unit}</span>
                  </div>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">Excl. 18% GST</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-stone-200/90 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Stepper Qty */}
                <div className="flex items-center justify-between sm:justify-start border border-stone-300 rounded-xl bg-stone-100 p-1.5">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-1.5 hover:bg-white rounded-lg text-stone-700 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-12 text-center text-xs font-bold font-mono text-stone-900">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="p-1.5 hover:bg-white rounded-lg text-stone-700 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-102 ${
                    added ? "bg-emerald-600 text-white" : "bg-[#FFCC4D] hover:bg-[#F2B935] text-slate-950"
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={15} />
                      <span>Added to RFQ Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={15} />
                      <span>Add to Quotation Cart (₹{totalPrice})</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleCustomQuote}
                  className="w-full py-3 px-4 bg-pink-50 hover:bg-pink-100 text-pink-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-center border border-pink-300 shadow-2xs hover:scale-102"
                >
                  <span className="truncate">Request Custom Discount Note</span>
                  <ArrowRight size={14} className="shrink-0 text-pink-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
