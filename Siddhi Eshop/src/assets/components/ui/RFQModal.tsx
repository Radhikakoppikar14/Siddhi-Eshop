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
      className="rfq-modal-overlay"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="rfq-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rfq-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="rfq-modal-header">
          <div>
            <span className="rfq-modal-eyebrow">Request for quotation</span>
            <h2 id="rfq-modal-title">Quote for {product}</h2>
          </div>
          <button
            className="rfq-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close quotation form"
          >
            <X size={20} />
          </button>
        </div>
        <RFQSection
          initialNotes={`Official RFQ for ${product}. Please share formal pricing and delivery details.`}
        />
      </div>
    </div>
  );
};
