import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingCart,
  FileText,
  ShieldCheck,
  ArrowRight,
  X,
  Plus,
  Minus,
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

  const brandName = catalogProduct?.brand || "LAPP KABEL";
  const productName = catalogProduct?.name || `ÖLFLEX® CLASSIC 110 Control Cable`;
  const partNumber = catalogProduct?.partNo || (id ? `LAPP-${id}` : "LAPP-1119203");
  const unit = catalogProduct?.unit || "meter";
  const specs = catalogProduct?.specs || [
    "VDE 0295 Class 5 Conductor",
    "Nominal Voltage: 300/500V",
    "Temperature Range: -40°C to +80°C",
    "Flame retardant according to IEC 60332-1-2"
  ];

  const calculatedPrice = useMemo(() => {
    return catalogProduct?.price || 68.50;
  }, [catalogProduct]);

  const handleAddToCart = () => {
    if (!isValidPositiveNumber(qty)) return;
    if (catalogProduct) {
      addToCart(catalogProduct.id, qty);
    } else {
      addCustomItem(
        {
          id: partNumber,
          name: productName,
          partNo: partNumber,
          brand: brandName,
          price: calculatedPrice,
          unit: unit,
        },
        qty
      );
    }
    showToast(`Added ${qty} ${unit}(s) of ${productName} to Quote Cart!`);
  };

  const handleDirectRfq = () => {
    setSelectedProductForRFQ(`${productName} (${partNumber})`);
  };

  const productImage = catalogProduct?.image || "/images/card-cables.jpg";

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
          
          {/* Left Column: Image Stage & Stock Badge */}
          <div className="md:col-span-5 bg-zinc-50/50 p-6 flex flex-col items-center justify-center border-r border-zinc-100 h-full">
            <div className="w-full h-52 sm:h-64 flex items-center justify-center p-2">
              <img
                src={productImage}
                alt={productName}
                className="max-h-full max-w-full object-contain drop-shadow-md"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/card-cables.jpg";
                }}
              />
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

              {/* Technical Specifications Section */}
              <div className="mt-3 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                  Technical Specifications
                </span>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-zinc-700 font-mono">
                  {specs.map((sp, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded bg-amber-500 shrink-0"></span>
                      <span className="truncate">{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Callout Box */}
              <div className="mt-3 p-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-[11px] font-mono text-zinc-600">
                <strong className="text-zinc-900">Application:</strong> Industrial machinery, machine tools, plant engineering, automation.
              </div>
            </div>

            {/* Pricing & Cart Action Bar */}
            <div className="pt-3 border-t border-zinc-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono uppercase block">
                    Catalog Base Rate (Ex-GST)
                  </span>
                  <div className="text-lg sm:text-xl font-black text-zinc-950 font-mono tabular-nums">
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
                  <span className="w-10 text-center text-xs font-bold font-mono text-zinc-900">
                    {qty}
                  </span>
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
                  <span>Add to Quote Cart</span>
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