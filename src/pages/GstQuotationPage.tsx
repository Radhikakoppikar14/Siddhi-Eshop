import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const inr = (value: number) =>
  value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const GstQuotationPage: React.FC = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: currentUser?.contactPerson || "",
    companyName: currentUser?.companyName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    gstin: currentUser?.gstNo || "",
    address: "",
    notes: "",
  });

  const gstAmount = subtotal * 0.18;
  const grandTotal = subtotal + gstAmount;

  // Lock the page behind the overlay so only the card body scrolls.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Your cart is empty!");
      return;
    }

    // Success notification message & cleanup
    showToast("🎉 Quotation Request Successfully Sent! Our sales team will connect shortly.");
    clearCart();
    navigate("/");
  };

  return (
    <div className="gq-overlay">
      <style>{`
        /* ================= Base (desktop) ================= */
        .gq-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(15, 23, 42, 0.75);
          -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow: hidden; /* overlay never scrolls; only .gq-body does */
        }

        .gq-card {
          width: 100%;
          max-width: 850px;
          max-height: 90vh;
          max-height: 90dvh;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ---------- Header (fixed, never scrolls) ---------- */
        .gq-header {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 24px;
          background: #0f172a;
          color: #ffffff;
        }
        .gq-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .gq-icon {
          flex: 0 0 auto;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #c32125;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gq-eyebrow {
          display: block;
          font-size: 10px;
          font-weight: 800;
          line-height: 1.3;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #ff8589;
        }
        .gq-title {
          margin: 2px 0 0;
          font-size: 16px;
          font-weight: 900;
          line-height: 1.3;
          color: #ffffff;
        }
        .gq-back {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        /* ---------- Scrolling body ---------- */
        .gq-body {
          flex: 1 1 auto;
          min-height: 0;
          padding: 28px;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .gq-intro {
          margin: 0 0 16px;
          font-size: 12px;
          color: #64748b;
        }

        /* ---------- Items table ---------- */
        .gq-table-wrap {
          margin-bottom: 20px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          overflow: hidden;
        }
        .gq-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          text-align: left;
        }
        .gq-table th {
          padding: 12px 16px;
          background: #f1f5f9;
          border-bottom: 1px solid #cbd5e1;
          color: #334155;
          font-weight: 700;
        }
        .gq-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          color: #475569;
        }
        .gq-c { text-align: center !important; }
        .gq-r { text-align: right !important; }
        .gq-product strong {
          display: block;
          margin-bottom: 2px;
          color: #0f172a;
          overflow-wrap: anywhere;
        }
        .gq-part {
          font-size: 11px;
          font-weight: 700;
          color: #c32125;
        }
        .gq-qty { font-weight: 600; color: #334155 !important; }
        .gq-sub { font-weight: 800; color: #0f172a !important; }
        .gq-empty {
          padding: 30px !important;
          text-align: center;
          color: #94a3b8 !important;
        }

        /* ---------- Totals ---------- */
        .gq-calc {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
          padding: 16px 20px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 13px;
        }
        .gq-calc-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: #475569;
        }
        .gq-calc-row strong { color: #1e293b; white-space: nowrap; }
        .gq-calc-row .gq-gst { color: #16a34a; }
        .gq-calc-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding-top: 10px;
          border-top: 1px solid #cbd5e1;
          font-size: 15px;
          font-weight: 900;
          color: #0f172a;
        }
        .gq-calc-total span:last-child { color: #c32125; white-space: nowrap; }

        /* ---------- Form ---------- */
        .gq-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .gq-form-title {
          margin: 0;
          padding-bottom: 6px;
          border-bottom: 2px solid #e2e8f0;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          color: #0f172a;
        }
        .gq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .gq-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .gq-label {
          font-size: 11px;
          font-weight: 700;
          color: #334155;
        }
        .gq-input {
          width: 100%;
          box-sizing: border-box;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 12px;
          outline: none;
        }
        .gq-input:focus {
          border-color: #c32125;
          box-shadow: 0 0 0 3px rgba(195, 33, 37, 0.12);
        }
        textarea.gq-input { resize: vertical; }
        .gq-submit {
          margin-top: 10px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          border: none;
          border-radius: 6px;
          background: #c32125;
          color: #ffffff;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(195, 33, 37, 0.3);
          cursor: pointer;
        }

        /* ================= Tablet (<= 850px) ================= */
        @media (max-width: 850px) {
          .gq-body { padding: 22px; }
        }

        /* ================= Phone (<= 640px) ================= */
        @media (max-width: 640px) {
          .gq-overlay { padding: 12px; }
          .gq-card {
            max-height: 92vh;
            max-height: 92dvh;
          }

          /* Compact fixed header */
          .gq-header { padding: 12px 14px; gap: 10px; }
          .gq-header-left { gap: 10px; }
          .gq-icon { width: 36px; height: 36px; }
          .gq-eyebrow { font-size: 9px; letter-spacing: 0.6px; }
          .gq-title { font-size: 14px; }
          .gq-back { padding: 8px 10px; }

          .gq-body { padding: 16px; }

          /* Items table becomes stacked cards (no sideways scrolling) */
          .gq-table,
          .gq-table tbody,
          .gq-table tr,
          .gq-table td {
            display: block;
            width: 100%;
            box-sizing: border-box;
          }
          .gq-table thead { display: none; }
          .gq-table tbody tr.gq-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px 8px;
            padding: 12px 14px;
            border-bottom: 1px solid #f1f5f9;
          }
          .gq-table tbody tr.gq-row:last-child { border-bottom: none; }
          .gq-table tbody tr.gq-row td {
            padding: 0;
            border: none;
            text-align: left;
          }
          .gq-table td.gq-product { grid-column: 1 / -1; }
          .gq-table td[data-label]::before {
            content: attr(data-label);
            display: block;
            margin-bottom: 2px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            color: #94a3b8;
          }
          .gq-table td.gq-sub { text-align: right !important; }
          .gq-table td.gq-rate { text-align: center !important; }

          .gq-calc { padding: 14px; margin-bottom: 20px; }
          .gq-calc-total { font-size: 14px; }

          /* Single-column form */
          .gq-grid { grid-template-columns: 1fr; gap: 14px; }
          /* 16px stops iOS Safari from zooming when a field is focused */
          .gq-input { font-size: 16px; padding: 11px 10px; }
          .gq-label { font-size: 12px; }
          .gq-submit { padding: 15px 12px; }
        }

        /* ================= Very small phones (<= 380px) ================= */
        @media (max-width: 380px) {
          .gq-back-text { display: none; }
          .gq-back { padding: 9px; }
          .gq-body { padding: 12px; }
        }

        /* ================= Short landscape phones ================= */
        @media (max-height: 480px) and (orientation: landscape) {
          .gq-overlay { padding: 0; }
          .gq-card {
            max-height: 100vh;
            max-height: 100dvh;
            border-radius: 0;
          }
          .gq-header { padding-top: 8px; padding-bottom: 8px; }
        }
      `}</style>

      <div className="gq-card" role="dialog" aria-modal="true" aria-labelledby="gq-title">
        {/* Header */}
        <div className="gq-header">
          <div className="gq-header-left">
            <div className="gq-icon">
              <FileText size={22} />
            </div>
            <div style={{ minWidth: 0 }}>
              <span className="gq-eyebrow">SIDDHI KABEL CORPORATION PVT. LTD.</span>
              <h2 id="gq-title" className="gq-title">
                Official Request For Quotation (RFQ)
              </h2>
            </div>
          </div>
          <button
            type="button"
            className="gq-back"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={16} /> <span className="gq-back-text">Back</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="gq-body">
          <p className="gq-intro">
            Review your itemized specifications, tax calculations, and submit your project details below.
          </p>

          {/* Itemized Table */}
          <div className="gq-table-wrap">
            <table className="gq-table">
              <thead>
                <tr>
                  <th>Product Variation / Part No</th>
                  <th className="gq-c">Qty</th>
                  <th className="gq-r">Rate</th>
                  <th className="gq-r">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="gq-empty">
                      No items in quotation cart.
                    </td>
                  </tr>
                ) : (
                  cart.map((item) => (
                    <tr key={item.id} className="gq-row">
                      <td className="gq-product">
                        <strong>{item.name}</strong>
                        <span className="gq-part">Part No: {item.partNo}</span>
                      </td>
                      <td className="gq-c gq-qty" data-label="Qty">
                        {item.qty} {item.unit || "meter"}
                      </td>
                      <td className="gq-r gq-rate" data-label="Rate">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="gq-r gq-sub" data-label="Subtotal">
                        ₹{(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Calculation Box */}
          <div className="gq-calc">
            <div className="gq-calc-row">
              <span>Subtotal (excl. GST):</span>
              <strong>₹{inr(subtotal)}</strong>
            </div>
            <div className="gq-calc-row">
              <span>GST (18%):</span>
              <strong className="gq-gst">+ ₹{inr(gstAmount)}</strong>
            </div>
            <div className="gq-calc-total">
              <span>Grand Total:</span>
              <span>₹{inr(grandTotal)}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="gq-form">
            <h3 className="gq-form-title">Customer &amp; Project Details</h3>

            <div className="gq-grid">
              <div className="gq-field">
                <label className="gq-label" htmlFor="gq-fullName">Full Name *</label>
                <input
                  id="gq-fullName"
                  className="gq-input"
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="gq-field">
                <label className="gq-label" htmlFor="gq-companyName">Company Name</label>
                <input
                  id="gq-companyName"
                  className="gq-input"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company / Enterprise Name"
                />
              </div>

              <div className="gq-field">
                <label className="gq-label" htmlFor="gq-email">Email Address *</label>
                <input
                  id="gq-email"
                  className="gq-input"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                />
              </div>

              <div className="gq-field">
                <label className="gq-label" htmlFor="gq-phone">Phone Number *</label>
                <input
                  id="gq-phone"
                  className="gq-input"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div className="gq-field">
              <label className="gq-label" htmlFor="gq-address">
                Project Site Address / Delivery Location
              </label>
              <textarea
                id="gq-address"
                className="gq-input"
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete shipping/site address..."
              />
            </div>

            <div className="gq-field">
              <label className="gq-label" htmlFor="gq-notes">
                Additional Project Notes / Delivery Lead Times
              </label>
              <textarea
                id="gq-notes"
                className="gq-input"
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Mention any required delivery schedules or technical requirements..."
              />
            </div>

            {/* Final Action Button */}
            <button type="submit" className="gq-submit">
              <CheckCircle2 size={18} /> Request Official Quotation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
