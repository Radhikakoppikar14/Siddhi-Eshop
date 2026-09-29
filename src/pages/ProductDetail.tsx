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

  return (
    <div className="py-6 bg-zinc-900/50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden relative">
        {/* Close Button */}
        <Link
          to="/"
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors z-20 cursor-pointer"
        >
          <X size={18} />
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left Column: Image Gallery & Stock Badge */}
          <div className="md:col-span-5 bg-zinc-50/50 p-6 flex flex-col items-center justify-center border-r border-zinc-100 h-full">
            {/* Main image */}
            <div
              className={`relative w-full h-52 sm:h-64 flex items-center justify-center p-2 bg-white rounded-2xl border border-zinc-200 overflow-hidden ${
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
                src={galleryImages[activeImg]}
                alt={productName}
                draggable={false}
                className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-200 ease-out select-none pointer-events-none"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
                onError={imgError}
              />

              {/* Zoom controls */}
              <div
                className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/95 border border-zinc-300 rounded-xl p-1 shadow-sm z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => changeZoom(-0.5)}
                  disabled={zoom <= 1}
                  aria-label="Zoom out"
                  className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="w-9 text-center text-[10px] font-mono font-bold text-zinc-700">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => changeZoom(0.5)}
                  disabled={zoom >= 3}
                  aria-label="Zoom in"
                  className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            {/* Thumbnails: main image + 2 extra images */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveImg(idx);
                    setZoom(1);
                  }}
                  aria-label={`Show image ${idx + 1}`}
                  className={`w-14 h-14 rounded-xl bg-white border p-1 flex items-center justify-center overflow-hidden transition-all cursor-pointer ${
                    activeImg === idx
                      ? "border-amber-500 ring-2 ring-amber-400/30 scale-105"
                      : "border-zinc-200 opacity-70 hover:opacity-100 hover:border-zinc-400"
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

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/50 text-emerald-700 text-[11px] font-semibold font-mono">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>In Stock (5,000m+)</span>
            </div>
          </div>

          {/* Right Column: Dynamic Specifications & Actions */}
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Brand Header */}
              <div className="text-[11px] font-mono font-bold tracking-wider text-amber-600 uppercase mb-0.5">
                {brandName} · <span className="text-zinc-400">{partNumber}</span>
              </div>

              <h1 className="text-lg sm:text-xl font-black text-zinc-950 leading-snug">
                {productName}
              </h1>

              {/* DYNAMIC CONFIGURATION SELECTORS */}
              <div className="mt-3 space-y-3 p-3 bg-zinc-50/80 rounded-2xl border border-zinc-200/80">
                {/* Cores Configuration */}
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Cores Configuration:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["3 Cores (with Earth)", "4 Cores (with Earth)", "5 Cores (with Earth)"].map((coreOpt) => (
                      <button
                        key={coreOpt}
                        type="button"
                        onClick={() => setSelectedCores(coreOpt)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all border cursor-pointer ${
                          selectedCores === coreOpt
                            ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                            : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100"
                        }`}
                      >
                        {coreOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conductor Cross-Section Size */}
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Conductor Cross-Section Size:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["1.5 mm²", "2.5 mm²", "4.0 mm²", "6.0 mm²"].map((sizeOpt) => (
                      <button
                        key={sizeOpt}
                        type="button"
                        onClick={() => setSelectedSize(sizeOpt)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all border cursor-pointer ${
                          selectedSize === sizeOpt
                            ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                            : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100"
                        }`}
                      >
                        {sizeOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sheath Color Option */}
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Sheath Color Option:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["Silver-Grey RAL 7001", "Black Sheath", "Teal Green RAL 6018"].map((colorOpt) => (
                      <button
                        key={colorOpt}
                        type="button"
                        onClick={() => setSelectedSheath(colorOpt)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all border cursor-pointer ${
                          selectedSheath === colorOpt
                            ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                            : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100"
                        }`}
                      >
                        {colorOpt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Specifications Section */}
              <div className="mt-3 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                  Technical Specifications
                </span>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-zinc-700 font-mono">
                  {specs.map((sp, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded bg-amber-500 shrink-0"></span>
                      <span className="truncate">{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing & Cart Action Bar */}
            <div className="pt-3 border-t border-zinc-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono uppercase block">
                    Calculated Rate (Ex-GST)
                  </span>
                  <div className="text-lg sm:text-xl font-black text-emerald-700 font-mono tabular-nums">
                    ₹{calculatedPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    <span className="text-xs font-normal text-zinc-400 ml-1">/ {unit}</span>
                  </div>
                </div>

                {/* Quantity Selector Stepper */}
                <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-1 hover:bg-white rounded-lg text-zinc-600 transition-colors cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-xs font-bold font-mono text-zinc-900">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-1 hover:bg-white rounded-lg text-zinc-600 transition-colors cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart size={14} />
                  <span>Add to Quote (₹{totalPrice})</span>
                </button>

                <button
                  onClick={handleDirectRfq}
                  className="py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-zinc-200 cursor-pointer"
                >
                  <FileText size={14} className="text-amber-600" />
                  <span>Formal Quotation</span>
                </button>
              </div>

              <div className="text-center pt-0.5">
                <Link
                  to="/"
                  className="text-[11px] font-bold text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1 transition-colors"
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
