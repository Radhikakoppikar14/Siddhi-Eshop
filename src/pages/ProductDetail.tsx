import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingCart,
  FileText,
  ShieldCheck,
  ArrowRight,
  X,
  Plus,
  Minus,
  ZoomIn,
  ZoomOut,
  PackageCheck,
  BadgeCheck,
} from "lucide-react";
import { PRODUCTS_DATA } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { isValidPositiveNumber } from "../utils/validation";
import { RFQModal } from "../assets/components/ui/RFQModal";

const FALLBACK_IMG = "/images/card-cables.jpg";
// The 2 extra images shown after the main image.
// Override per product by adding `extraImages: string[]` to the product data.
const EXTRA_IMAGES = ["/images/cable1.png", "/images/cable2.png"];

// ---------------------------------------------------------------
// PICTURE FOR EACH OPTION — the main picture changes when a
// core / size / colour button is clicked. Replace these paths with
// your real photos (one per option).
// ---------------------------------------------------------------
const CORE_IMAGES: Record<string, string> = {
  "3 Cores (with Earth)": "/images/cable1.png",
  "4 Cores (with Earth)": "/images/cable2.png",
  "5 Cores (with Earth)": "/images/cable3.png",
};
const SIZE_IMAGES: Record<string, string> = {
  "1.5 mm²": "/images/cable4.png",
  "2.5 mm²": "/images/cable5.png",
  "4.0 mm²": "/images/cable7.png",
  "6.0 mm²": "/images/cable10.png",
};
const SHEATH_IMAGES: Record<string, string> = {
  "Silver-Grey RAL 7001": "/images/cable14.png",
  "Black Sheath": "/images/cable12.png",
  "Teal Green RAL 6018": "/images/cable13.png",
};

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addCustomItem, addToCart } = useCart();
  const { showToast } = useToast();

  const catalogProduct = useMemo(() => {
    return PRODUCTS_DATA.find(
      (p) =>
        p.id === id ||
        p.partNo.toLowerCase() === id?.toLowerCase() ||
        p.name.toLowerCase().includes(id?.toLowerCase() || "")
    );
  }, [id]);

  const [qty, setQty] = useState(1);
  const [selectedProductForRFQ, setSelectedProductForRFQ] = useState<string | null>(null);

  // Dynamic configuration states
  const [selectedCores, setSelectedCores] = useState<string>("5 Cores (with Earth)");
  const [selectedSize, setSelectedSize] = useState<string>("6.0 mm²");
  const [selectedSheath, setSelectedSheath] = useState<string>("Teal Green RAL 6018");

  // Gallery state
  const [activeImg, setActiveImg] = useState(0);
  // Picture chosen by the last clicked core / size / colour option (null = use gallery)
  const [variantImg, setVariantImg] = useState<string | null>(null);

  const pickVariant = (image?: string) => {
    if (image) setVariantImg(image);
    setZoom(1);
    setZoomPos({ x: 50, y: 50 });
  };

  // Zoom state (1 = normal, up to 3x)
  const [zoom, setZoom] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const changeZoom = (delta: number) =>
    setZoom((z) => Math.min(3, Math.max(1, Number((z + delta).toFixed(1)))));

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - left) / width) * 100,
      y: ((e.clientY - top) / height) * 100,
    });
  };

  const brandName = catalogProduct?.brand || "LAPP KABEL";
  const productName = catalogProduct?.name || `ÖLFLEX® FD 855 CP High Flex Chain`;
  const partNumber = catalogProduct?.partNo || (id ? `LAPP-${id}` : "LAPP-1119203");
  const unit = catalogProduct?.unit || "meter";
  const specs = catalogProduct?.specs || [
    "VDE 0295 Class 6 Extra Fine Wire Conductor",
    "PUR Outer Sheath · Highly Oil Resistant",
    "Temperature Range: -40°C to +80°C",
    "Flame retardant according to IEC 60332-1-2",
  ];

  // Main image + 2 extra images
  const mainImage = catalogProduct?.image || FALLBACK_IMG;
  const galleryImages = useMemo(() => {
    const extras: string[] = (catalogProduct as any)?.extraImages?.length
      ? (catalogProduct as any).extraImages
      : EXTRA_IMAGES;
    return [mainImage, ...extras.slice(0, 2)];
  }, [catalogProduct, mainImage]);

  // Go back to the first image when the product changes
  useEffect(() => {
    setActiveImg(0);
    setVariantImg(null);
    setZoom(1);
    setZoomPos({ x: 50, y: 50 });
  }, [id]);

  const imgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_IMG;
  };

  // Dynamic price calculation based on size, core count, and sheath
  const calculatedPrice = useMemo(() => {
    let baseRate = catalogProduct?.price || 145.0;

    // Size multiplier factor
    if (selectedSize.includes("1.5")) baseRate *= 1.0;
    else if (selectedSize.includes("2.5")) baseRate *= 1.35;
    else if (selectedSize.includes("4.0")) baseRate *= 1.75;
    else if (selectedSize.includes("6.0")) baseRate *= 2.15;

    // Core multiplier factor
    if (selectedCores.includes("3")) baseRate *= 0.85;
    else if (selectedCores.includes("4")) baseRate *= 0.95;
    else if (selectedCores.includes("5")) baseRate *= 1.0;

    // Sheath premium
    if (selectedSheath.includes("Teal Green")) baseRate += 15;

    return Number(baseRate.toFixed(2));
  }, [catalogProduct, selectedSize, selectedCores, selectedSheath]);

  const totalPrice = (calculatedPrice * qty).toFixed(2);

  const handleAddToCart = () => {
    if (!isValidPositiveNumber(qty)) return;
    const customConfigName = `${productName} [${selectedCores}, ${selectedSize}, ${selectedSheath}]`;

    if (catalogProduct) {
      addToCart(catalogProduct.id, qty);
    } else {
      addCustomItem(
        {
          id: partNumber,
          name: customConfigName,
          partNo: partNumber,
          brand: brandName,
          price: calculatedPrice,
          unit: unit,
        },
        qty
      );
    }
    showToast(`Added ${qty} ${unit}(s) of configured cable to Quote Cart!`);
  };

  const handleDirectRfq = () => {
    setSelectedProductForRFQ(`${productName} [${selectedCores}, ${selectedSize}, ${selectedSheath}] (${partNumber})`);
  };

  // Shared style for the option chips (cores / size / sheath)
  const chipBase =
    "px-3.5 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all border cursor-pointer";
  const chipOff =
    "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/60";
  const chipOn =
    "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400/40";

  return (
    // LIGHT GRADIENT #1 — page background: warm champagne -> soft white -> pale sky
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-[#fff7e6] via-[#fbfaf7] to-[#e6f3fb]">
      <div className="max-w-6xl w-full bg-white rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(15,23,42,0.18)] border border-slate-200/80 overflow-hidden relative">
        {/* Close Button */}
        <Link
          to="/"
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-sm transition-colors z-20 cursor-pointer"
        >
          <X size={18} />
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Image Gallery & Stock Badge */}
          {/* LIGHT GRADIENT #2 — image panel: soft amber -> white -> soft sky */}
          <div className="md:col-span-5 bg-gradient-to-b from-amber-50 via-white to-sky-50 p-6 sm:p-8 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r border-slate-200/70">
            {/* Main image */}
            <div
              className={`relative w-full h-56 sm:h-72 flex items-center justify-center p-3 bg-white rounded-3xl border border-slate-200 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.15)] overflow-hidden ${
                zoom > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => {
                // click toggles between normal and 2x
                setZoom((z) => (z > 1 ? 1 : 2));
                setZoomPos({ x: 50, y: 50 });
              }}
              onMouseMove={handleZoomMove}
              onMouseLeave={() => zoom > 1 && setZoomPos({ x: 50, y: 50 })}
            >
              <img
                key={variantImg ?? galleryImages[activeImg]}
                src={variantImg ?? galleryImages[activeImg]}
                alt={productName}
                draggable={false}
                className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-200 ease-out select-none pointer-events-none animate-fade-in"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
                onError={imgError}
              />

              {/* Zoom controls */}
              <div
                className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur border border-slate-200 rounded-xl p-1 shadow-md z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => changeZoom(-0.5)}
                  disabled={zoom <= 1}
                  aria-label="Zoom out"
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="w-10 text-center text-[10px] font-mono font-bold text-slate-700">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => changeZoom(0.5)}
                  disabled={zoom >= 3}
                  aria-label="Zoom in"
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            {/* Thumbnails: main image + 2 extra images */}
            <div className="mt-4 flex items-center justify-center gap-2.5">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveImg(idx);
                    setVariantImg(null);
                    setZoom(1);
                  }}
                  aria-label={`Show image ${idx + 1}`}
                  className={`w-16 h-16 rounded-2xl bg-white border p-1.5 flex items-center justify-center overflow-hidden transition-all cursor-pointer ${
                    !variantImg && activeImg === idx
                      ? "border-amber-500 ring-2 ring-amber-400/30 shadow-md scale-105"
                      : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${productName} view ${idx + 1}`}
                    className="max-h-full max-w-full object-contain"
                    onError={imgError}
                  />
                </button>
              ))}
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-300/70 bg-emerald-50 text-emerald-800 text-[11px] font-semibold font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>In Stock (5,000m+)</span>
            </div>

              {/* Technical Specifications Section */}
              <div className="w-full mt-5 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BadgeCheck size={13} className="text-amber-500" />
                  Technical Specifications
                </span>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-2 text-xs text-slate-700 font-mono">
                  {specs.map((sp, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70"
                    >
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-amber-500 shrink-0"></span>
                      <span className="leading-snug break-words">{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>
          </div>

          {/* Right Column: Dynamic Specifications & Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div className="space-y-5">
              {/* Brand Header */}
              <div>
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {brandName}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-mono font-semibold">
                    Part No: {partNumber}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug tracking-tight pr-10">
                  {productName}
                </h1>
              </div>

              {/* DYNAMIC CONFIGURATION SELECTORS */}
              <div className="space-y-4 p-4 sm:p-5 bg-gradient-to-br from-slate-50 via-white to-amber-50/50 rounded-2xl border border-slate-200/80 shadow-sm">
                {/* Cores Configuration */}
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Cores Configuration
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["3 Cores (with Earth)", "4 Cores (with Earth)", "5 Cores (with Earth)"].map((coreOpt) => (
                      <button
                        key={coreOpt}
                        type="button"
                        onClick={() => {
                          setSelectedCores(coreOpt);
                          pickVariant(CORE_IMAGES[coreOpt]);
                        }}
                        className={`${chipBase} ${selectedCores === coreOpt ? chipOn : chipOff}`}
                      >
                        {coreOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conductor Cross-Section Size */}
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Conductor Cross-Section Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["1.5 mm²", "2.5 mm²", "4.0 mm²", "6.0 mm²"].map((sizeOpt) => (
                      <button
                        key={sizeOpt}
                        type="button"
                        onClick={() => {
                          setSelectedSize(sizeOpt);
                          pickVariant(SIZE_IMAGES[sizeOpt]);
                        }}
                        className={`${chipBase} ${
                          selectedSize === sizeOpt
                            ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-300/50"
                            : chipOff
                        }`}
                      >
                        {sizeOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sheath Color Option */}
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Sheath Color Option
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Silver-Grey RAL 7001", "Black Sheath", "Teal Green RAL 6018"].map((colorOpt) => (
                      <button
                        key={colorOpt}
                        type="button"
                        onClick={() => {
                          setSelectedSheath(colorOpt);
                          pickVariant(SHEATH_IMAGES[colorOpt]);
                        }}
                        className={`${chipBase} ${selectedSheath === colorOpt ? chipOn : chipOff}`}
                      >
                        {colorOpt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Cart Action Bar */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-amber-50 border border-slate-200/80 shadow-sm">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase block tracking-wider">
                    Calculated Rate (Ex-GST)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono tabular-nums leading-tight">
                    ₹{calculatedPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ {unit}</span>
                  </div>
                </div>

                {/* Quantity Selector Stepper */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                    Quantity ({unit}s)
                  </span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      aria-label="Decrease quantity"
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-12 text-center text-sm font-bold font-mono text-slate-900">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(qty + 1)}
                      aria-label="Increase quantity"
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart size={15} />
                  <span>Add to Quote (₹{totalPrice})</span>
                </button>

                <button
                  onClick={handleDirectRfq}
                  className="py-3 px-4 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 shadow-sm hover:-translate-y-0.5 cursor-pointer"
                >
                  <FileText size={15} className="text-amber-600" />
                  <span>Formal Quotation</span>
                </button>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[10px] font-mono text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-600" /> 100% Genuine Factory Stock
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText size={12} className="text-amber-600" /> GST Tax Invoice (18%)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <PackageCheck size={12} className="text-sky-600" /> Bangalore Warehouse Ready Stock
                </span>
              </div>

              <div className="text-center">
                <Link
                  to="/"
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
                >
                  <span>View Full Technical Data Sheet & Approvals</span>
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProductForRFQ && (
        <RFQModal
          product={selectedProductForRFQ}
          onClose={() => setSelectedProductForRFQ(null)}
        />
      )}
    </div>
  );
};