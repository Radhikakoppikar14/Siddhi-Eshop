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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "16px",
      }}
    >
      <style>{`
        .rfq-modal-dialog .rfq-section > div:first-child:has(button),
        .rfq-modal-dialog .rfq-section header,
        .rfq-modal-dialog .rfq-header-banner,
        .rfq-modal-dialog div[style*="background: rgb(15, 23, 42)"],
        .rfq-modal-dialog div[style*="background: #0f172a"] {
          display: none !important;
        }

        /* Force table container to scroll horizontally and prevent clipping */
        .rfq-modal-dialog .rfq-section form,
        .rfq-modal-dialog .rfq-section div {
          overflow-x: visible !important;
        }

        .rfq-modal-dialog table {
          width: 100% !important;
          min-width: 600px !important;
        }

        /* Force all price and subtotal text to dark black */
        .rfq-modal-dialog table td,
        .rfq-modal-dialog table th {
          color: #0f172a !important;
        }
      `}</style>

      <div
        className="rfq-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rfq-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "850px", // Expanded width so all columns fit naturally
          maxHeight: "92vh",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
        }}
      >
        {/* Professional Modal Header */}
        <div 
          className="rfq-modal-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 24px",
            borderBottom: "1px solid #e2e8f0",
            position: "sticky",
            top: 0,
            background: "#ffffff",
            zIndex: 10,
          }}
        >
          <div>
            <span 
              className="rfq-modal-eyebrow"
              style={{ fontSize: "11px", fontWeight: 800, color: "#ff6600", textTransform: "uppercase", display: "block", marginBottom: "2px" }}
            >
              Request for quotation
            </span>
            <h2 
              id="rfq-modal-title"
              style={{ fontSize: "18px", fontWeight: 900, color: "#0f172a", margin: 0 }}
            >
              Quote for {product}
            </h2>
          </div>
          <button
            className="rfq-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close quotation form"
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Modal Content Body */}
        <div style={{ padding: "20px 24px", overflowX: "auto" }}>
          <RFQSection
            initialNotes={`Official RFQ for ${product}. Please share formal pricing and delivery details.`}
          />
        </div>
      </div>
    </div>
  );
};