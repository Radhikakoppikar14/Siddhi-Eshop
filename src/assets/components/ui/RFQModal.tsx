import React from "react";
import { X } from "lucide-react";
import { RFQSection } from "../home/RFQSection";

interface RFQModalProps {
  product?: string | null;
  onClose: () => void;
}

export const RFQModal: React.FC<RFQModalProps> = ({ product, onClose }) => {
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    // Lock background scroll while the modal is open, without the page
    // jumping sideways when the page scrollbar disappears (desktop only).
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  let cleanProduct = product && product.trim() !== "" ? product : "General Inquiry";
  cleanProduct = cleanProduct
    .replace(/^(quote for bulk order rfq:\s*)+/gi, "")
    .replace(/^(bulk order rfq:\s*)+/gi, "")
    .trim();

  return (
    <div
      className="rfqm-overlay"
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
        justifyContent: "center",
        zIndex: 99999,
        overflow: "hidden", // the overlay itself never scrolls
      }}
    >
      {/*
        All new classes use the unique "rfqm-" prefix so they can't collide with
        older .rfq-modal-* rules in your global stylesheet (a collision like that
        can add stray borders or make header text invisible).
      */}
      <style>{`
        /* ---------- Base (desktop) ---------- */
        .rfqm-overlay {
          align-items: center;
          padding: 16px;
        }

        .rfqm-dialog {
          background: #ffffff;
          width: 100%;
          max-width: 1100px;
          max-height: 92vh;
          max-height: 92dvh;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden; /* dialog never scrolls; only the body does */
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
        }

        /* Header: FIXED. It sits outside the scroll area, so it never scrolls away. */
        .rfqm-dialog .rfqm-header {
          flex: 0 0 auto;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 36px 18px 36px;
          background: #ffffff;
          border-bottom: 1px solid #eef2f7;
        }
        .rfqm-dialog .rfqm-header-text {
          flex: 1 1 auto;
          min-width: 0;
        }

        .rfqm-dialog .rfqm-eyebrow {
          display: block;
          margin: 0 0 4px 0;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #b91c1c;
        }

        /* Weight 800 fills in the Q's tail so it reads like an O.
           700 + a full line box keeps the glyph intact. */
        .rfqm-dialog .rfqm-title {
          font-family: inherit;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.35;
          padding-bottom: 2px;
          margin: 0;
          color: #0f172a;
          overflow: visible !important;
          text-overflow: clip !important;
          white-space: normal !important;
          word-break: break-word;
          overflow-wrap: break-word;
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        .rfqm-dialog .rfqm-close {
          flex: 0 0 auto;
          width: 38px;
          height: 38px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 50%;
          background: #f1f5f9;
          color: #475569;
          cursor: pointer;
        }

        /* The body is the ONLY scroll container. */
        .rfqm-dialog .rfqm-body {
          flex: 1 1 auto;
          min-height: 0;
          padding: 20px 36px 36px 36px;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }

        /* Neutralise inner scroll areas so no second scrollbar appears. */
        .rfqm-dialog .rfqm-body section,
        .rfqm-dialog .rfqm-body .rfq-wrapper,
        .rfqm-dialog .rfqm-body .rfq-form {
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }

        .rfqm-dialog .rfq-wrapper {
          display: grid !important;
          grid-template-columns: 320px 1fr !important;
          gap: 24px !important;
          width: 100% !important;
        }
        .rfqm-dialog .rfq-wrapper > * {
          min-width: 0;
        }

        .rfqm-dialog .rfq-form {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 16px !important;
        }
        .rfqm-dialog .form-group {
          min-width: 0;
        }
        .rfqm-dialog .form-group.full-width {
          grid-column: span 2 !important;
        }
        .rfqm-dialog .rfq-form input,
        .rfqm-dialog .rfq-form select,
        .rfqm-dialog .rfq-form textarea {
          max-width: 100%;
          box-sizing: border-box;
        }

        /* ---------- Tablet (<= 850px): stack info panel above the form ---------- */
        @media (max-width: 850px) {
          .rfqm-dialog .rfqm-header {
            padding: 20px 24px 14px 24px;
          }
          .rfqm-dialog .rfqm-body {
            padding: 16px 24px 28px 24px;
          }
          .rfqm-dialog .rfq-wrapper {
            grid-template-columns: 1fr !important;
          }
        }

        /* ---------- Phone (<= 640px): compact fixed header, floating card ---------- */
        @media (max-width: 640px) {
          .rfqm-overlay {
            align-items: center;
            padding: 12px;
          }
          .rfqm-dialog {
            max-height: 92vh;
            max-height: 92dvh;
            border-radius: 16px;
          }

          .rfqm-dialog .rfqm-header {
            padding: 14px 14px 12px 16px;
            gap: 10px;
          }
          .rfqm-dialog .rfqm-eyebrow {
            font-size: 10px;
            margin-bottom: 2px;
          }
          .rfqm-dialog .rfqm-title {
            font-size: 18px;
            line-height: 1.3;
          }
          /* Shorter title on phones: "Quote for <product>" */
          .rfqm-dialog .rfqm-title-extra {
            display: none;
          }
          .rfqm-dialog .rfqm-close {
            width: 40px;  /* comfortable tap target */
            height: 40px;
          }

          .rfqm-dialog .rfqm-body {
            padding: 14px 16px 20px 16px;
          }
          .rfqm-dialog .rfq-wrapper {
            gap: 16px !important;
          }

          /* Purple info panel: tighter padding and smaller heading */
          .rfqm-dialog .rfq-wrapper > *:first-child {
            padding: 16px !important;
          }
          .rfqm-dialog .rfq-wrapper > *:first-child h2,
          .rfqm-dialog .rfq-wrapper > *:first-child h3 {
            font-size: 20px !important;
            line-height: 1.25 !important;
          }

          /* Single-column form */
          .rfqm-dialog .rfq-form {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .rfqm-dialog .form-group.full-width {
            grid-column: auto !important;
          }
          /* 16px stops iOS Safari from zooming when a field is focused */
          .rfqm-dialog .rfq-form input,
          .rfqm-dialog .rfq-form select,
          .rfqm-dialog .rfq-form textarea {
            width: 100%;
            font-size: 16px !important;
          }
          .rfqm-dialog .rfq-form button[type="submit"] {
            width: 100%;
          }
        }

        /* ---------- Very small phones (<= 360px) ---------- */
        @media (max-width: 360px) {
          .rfqm-dialog .rfqm-title {
            font-size: 16px;
          }
          .rfqm-dialog .rfqm-body {
            padding-left: 10px;
            padding-right: 10px;
          }
        }

        /* ---------- Short landscape phones ---------- */
        @media (max-height: 480px) and (orientation: landscape) {
          .rfqm-overlay {
            padding: 0;
          }
          .rfqm-dialog {
            max-height: 100vh;
            max-height: 100dvh;
            border-radius: 0;
          }
          .rfqm-dialog .rfqm-header {
            padding-top: 10px;
            padding-bottom: 8px;
          }
        }
      `}</style>

      <div
        className="rfqm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rfq-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Fixed header (outside the scroll area) */}
        <div className="rfqm-header">
          <div className="rfqm-header-text">
            <span className="rfqm-eyebrow" style={{ color: "#b91c1c" }}>
              Request For Quotation
            </span>
            <h2
              id="rfq-modal-title"
              className="rfqm-title"
              style={{ color: "#0f172a" }}
            >
              Quote for{" "}
              <span className="rfqm-title-extra">Bulk Order RFQ: </span>
              {cleanProduct}
            </h2>
          </div>
          <button
            type="button"
            className="rfqm-close"
            onClick={onClose}
            aria-label="Close quotation form"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrolling body: the single scroll area */}
        <div className="rfqm-body">
          <RFQSection
            initialNotes={`Official RFQ for ${cleanProduct}. Please share formal pricing and delivery details.`}
          />
        </div>
      </div>
    </div>
  );
};
