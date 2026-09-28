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
        className="relative bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#172554] rounded-[2.5rem] shadow-2xl shadow-blue-950/50 border border-blue-500/30 w-full max-w-4xl overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Floating Ambient Glow Orbs in Blue / Indigo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* MODAL HEADER */}
        <div className="p-6 sm:p-8 border-b border-blue-900/40 flex items-center justify-between relative z-10 bg-[#1e1b4b]/80 backdrop-blur-md">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 font-extrabold uppercase tracking-widest">OFFICIAL QUOTATION DESK</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight flex items-center gap-2">
              <FileText size={20} className="text-blue-400 shrink-0" />
              <span>Request Commercial Quote for: {product}</span>
            </h2>
          </div>

          <button
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20 shrink-0 shadow-2xs"
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