import React from "react";
import { X, FileText } from "lucide-react";
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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in select-none"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-[#2a1b3d] via-[#1a1226] to-[#0f0a17] rounded-[2.5rem] shadow-2xl border border-purple-900/50 w-full max-w-4xl overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* MODAL HEADER */}
        <div className="p-6 sm:p-8 border-b border-purple-900/40 flex items-center justify-between relative z-10 bg-[#1a1226]/80 backdrop-blur-md">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 font-extrabold uppercase tracking-widest">OFFICIAL QUOTATION DESK</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight flex items-center gap-2">
              <FileText size={20} className="text-purple-400 shrink-0" />
              <span>Request Commercial Quote for: {product}</span>
            </h2>
          </div>

          <button
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20 shrink-0"
            type="button"
            onClick={onClose}
            aria-label="Close quotation form"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL BODY CONTENT */}
        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6 relative z-10">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl text-slate-900">
            <RFQSection
              initialNotes={`Official Commercial RFQ for ${product}. Please share formal pricing, quantity rebates, and site delivery schedule to Bangalore.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};