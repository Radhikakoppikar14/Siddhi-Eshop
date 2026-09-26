import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingCart,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Clock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { PRODUCTS_DATA } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { isValidPositiveNumber } from "../utils/validation";
import { RFQModal } from "../assets/components/ui/RFQModal";

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addCustomItem, addToCart } = useCart();
  const { showToast } = useToast();

  // Find product in catalog
  const catalogProduct = useMemo(() => {
    return PRODUCTS_DATA.find(
      (p) =>
        p.id === id ||
        p.partNo.toLowerCase() === id?.toLowerCase() ||
        p.name.toLowerCase().includes(id?.toLowerCase() || "")
    );
  }, [id]);

  // Cable interactive configurator state
  const [selectedCore, setSelectedCore] = useState("3 Core");
  const [selectedSize, setSelectedSize] = useState("1.5 Sqmm");
  const selectedConductor = "Bare Copper Class 5";
  const [drumLength, setDrumLength] = useState(100);
  const [qty, setQty] = useState(1);
  const [selectedProductForRFQ, setSelectedProductForRFQ] = useState<string | null>(null);

  // Determine active brand theme
  const brandName = catalogProduct?.brand || "LAPP KABEL";
  const productName = catalogProduct?.name || `ÖLFLEX® CLASSIC 110 Industrial Cable`;
  const partNumber = catalogProduct?.partNo || (id ? `LAPP-${id}` : "LAPP-1119203");
  const unit = catalogProduct?.unit || "meter";

  // Dynamic price calculation
  const calculatedPrice = useMemo(() => {
    if (catalogProduct && !catalogProduct.category.includes("cable")) {
      return {
        unitPrice: catalogProduct.price,
        gst: catalogProduct.price * 0.18,
        total: catalogProduct.price * qty,
      };
    }
    const coreNum = parseInt(selectedCore) || 3;
    const sizeNum = parseFloat(selectedSize) || 1.5;
    const dynamicUnit = Math.max(
      28,
      Math.round(28 * Math.pow(coreNum, 0.45) * Math.pow(sizeNum, 0.72) + 12)
    );
    const gstUnit = dynamicUnit * 0.18;
    return {
      unitPrice: dynamicUnit,
      gst: gstUnit,
      total: dynamicUnit * drumLength * qty,
    };
  }, [catalogProduct, selectedCore, selectedSize, drumLength, qty]);

  const handleAddToCart = () => {
    if (!isValidPositiveNumber(qty)) return;

    if (catalogProduct && !catalogProduct.category.includes("cable")) {
      addToCart(catalogProduct.id, qty);
      showToast(`Added ${qty} ${unit} of ${productName} to RFQ Cart!`);
    } else {
      const configName = `${productName} ${selectedCore} ${selectedSize} (${selectedConductor}) · ${drumLength}m Drum`;
      addCustomItem(
        {
          id: `${partNumber}-${selectedCore}-${selectedSize}-${drumLength}m`,
          name: configName,
          partNo: partNumber,
          brand: brandName,
          price: calculatedPrice.unitPrice,
          unit: "meter",
        },
        drumLength * qty
      );
      showToast(`Added ${drumLength * qty}m of ${configName} to RFQ Cart!`);
    }
  };

  const handleDirectRfq = () => {
    setSelectedProductForRFQ(`${productName} (${partNumber})`);
  };

  const productImage = catalogProduct?.image || "/images/cable-olflex-thumb.png";

  return (
    <div className="py-8 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 font-mono">
          <Link to="/" className="hover:text-zinc-950 transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-zinc-400" />
          <Link to="/#productsSection" className="hover:text-zinc-950 transition-colors">
            Products
          </Link>
          <ChevronRight size={13} className="text-zinc-400" />
          <span className="text-zinc-900 font-semibold truncate max-w-xs sm:max-w-md">
            {productName}
          </span>
        </nav>

        {/* Main PDP Grid: Gallery Left + Contiguous Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-2xs mb-10">
          
          {/* Left Column: Image Stage & Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="h-80 sm:h-96 w-full rounded-2xl bg-zinc-50 border border-zinc-100 p-6 flex items-center justify-center relative overflow-hidden">
              <img
                src={productImage}
                alt={productName}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/card-cables.jpg";
                }}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs border border-zinc-200 px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider text-zinc-700 uppercase font-mono">
                {brandName}
              </div>
            </div>

            {/* Trust Badges under image */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                <ShieldCheck size={18} className="text-emerald-500 mx-auto mb-1" />
                <span className="font-bold text-zinc-900 block text-[11px]">100% Genuine</span>
                <span className="text-[10px] text-zinc-500">OEM Certificate</span>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                <Clock size={18} className="text-zinc-700 mx-auto mb-1" />
                <span className="font-bold text-zinc-900 block text-[11px]">Bangalore Stock</span>
                <span className="text-[10px] text-zinc-500">&lt;24h Dispatch</span>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                <FileText size={18} className="text-zinc-700 mx-auto mb-1" />
                <span className="font-bold text-zinc-900 block text-[11px]">GST Invoicing</span>
                <span className="text-[10px] text-zinc-500">18% Input Credit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase & Specification Module */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand & Part No Metadata Header */}
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-zinc-400 font-bold uppercase tracking-wider font-mono">
                  {brandName}
                </span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Ready Stock · Central Dispatch
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 leading-tight">
                {productName}
              </h1>

              <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500 font-mono">
                <span>SKU: <strong className="text-zinc-900">{partNumber}</strong></span>
                <span>·</span>
                <span>Category: <strong className="text-zinc-900 uppercase">{catalogProduct?.category || "Industrial"}</strong></span>
              </div>

              {/* Price Banner */}
              <div className="mt-5 p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-zinc-400 font-semibold block uppercase tracking-wider font-mono">
                    Basic Unit Rate (Excl. 18% GST)
                  </span>
                  <div className="text-2xl font-black text-zinc-950 font-mono tabular-nums mt-0.5">
                    ₹{calculatedPrice.unitPrice.toFixed(2)}
                    <span className="text-xs font-normal text-zinc-400 ml-1">
                      / {unit}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-zinc-400 block font-mono">Est. with GST:</span>
                  <span className="text-base font-bold text-zinc-950 font-mono tabular-nums">
                    ₹{(calculatedPrice.unitPrice * 1.18).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Cable Reel Configurator if applicable */}
              {(!catalogProduct || catalogProduct.category.includes("cable")) && (
                <div className="mt-5 space-y-3.5 pt-4 border-t border-zinc-100">
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-800">
                    <span>Configure Drum / Reel Parameters</span>
                    <span className="text-[11px] text-zinc-400 font-mono">VDE 0295 Class 5</span>
                  </div>

                  {/* Core count */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-600 block mb-1 font-mono">
                      Conductor Cores:
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 text-xs font-mono">
                      {["2 Core", "3 Core", "4 Core", "5 Core", "7 Core", "12 Core"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedCore(c)}
                          className={`py-1.5 rounded-lg border font-semibold transition-all ${
                            selectedCore === c
                              ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                              : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700"
                          }`}
                        >
                          {c.replace(" Core", "C")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size mm2 */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-600 block mb-1 font-mono">
                      Cross Section (sq mm):
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 text-xs font-mono">
                      {["0.5 Sqmm", "0.75 Sqmm", "1 Sqmm", "1.5 Sqmm", "2.5 Sqmm"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`py-1.5 rounded-lg border font-semibold transition-all ${
                            selectedSize === s
                              ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                              : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700"
                          }`}
                        >
                          {s.replace(" Sqmm", " mm²")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Packaging length */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-600 block mb-1 font-mono">
                      Drum Cut Length:
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[100, 500, 1000].map((len) => (
                        <button
                          key={len}
                          onClick={() => setDrumLength(len)}
                          className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
                            drumLength === len
                              ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                              : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700"
                          }`}
                        >
                          {len}m {len >= 500 ? "Wooden Drum" : "Coil"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* General specs summary */}
              {catalogProduct?.specs && (
                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono mb-2">
                    Key Specifications
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-600">
                    {catalogProduct.specs.map((sp, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span>{sp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Purchase CTAs */}
            <div className="pt-6 border-t border-zinc-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 p-1">
                  <span className="text-xs font-semibold text-zinc-500 px-2.5 font-mono">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center text-xs font-bold font-mono bg-white border border-zinc-200 rounded-lg py-1.5 outline-none"
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={15} />
                  <span>Add to RFQ Quotation Cart</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDirectRfq}
                  className="flex-1 py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-zinc-200"
                >
                  <FileText size={14} />
                  <span>Request Official Commercial Proforma</span>
                </button>

                <Link
                  to="/olflex-cables"
                  className="px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-semibold text-xs rounded-xl transition-colors shrink-0 border border-zinc-200 flex items-center gap-1.5"
                >
                  <span>Full Catalog</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* RFQ Modal if opened */}
      {selectedProductForRFQ && (
        <RFQModal
          product={selectedProductForRFQ}
          onClose={() => setSelectedProductForRFQ(null)}
        />
      )}
    </div>
  );
};
