import React from "react";
import { X } from "lucide-react";
import { RFQSection } from "../home/RFQSection";

interface RFQModalProps {
  product: string;
  onClose: () => void;
}

export const RFQModal: React.FC<RFQModalProps> = ({ product, onClose }) => {
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block">
              Official Quotation Desk
            </span>
            <h2 className="text-lg font-bold text-white leading-tight">
              Request Commercial Quote for: {product}
            </h2>
          </div>
          <button
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            type="button"
            onClick={onClose}
            aria-label="Close quotation form"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">
          <RFQSection
            initialNotes={`Official Commercial RFQ for ${product}. Please share formal pricing, quantity rebates, and site delivery schedule to Bangalore.`}
          />
        </div>
      </div>
    </div>
  );
};
