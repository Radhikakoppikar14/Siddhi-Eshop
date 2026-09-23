import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 99999,
      background: "rgba(15, 23, 42, 0.75)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      overflowY: "auto"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "850px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
        border: "1px solid #cbd5e1",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        maxHeight: "90vh",
        margin: "auto"
      }}>
        
        {/* Header */}
        <div style={{
          background: "#0f172a",
          color: "#ffffff",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "#c32125",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}>
              <FileText size={22} />
            </div>
            <div>
              <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#ff8589", display: "block" }}>
                SIDDHI KABEL CORPORATION PVT. LTD.
              </span>
              <h2 style={{ fontSize: "16px", fontWeight: 900, margin: "2px 0 0", color: "#ffffff" }}>
                Official Request For Quotation (RFQ)
              </h2>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: "6px"
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: "28px", overflowY: "auto", flex: 1 }}>
          <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "16px" }}>
            Review your itemized specifications, tax calculations, and submit your project details below.
          </p>

          {/* Itemized Table */}
          <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden", marginBottom: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f1f5f9", color: "#334155", fontWeight: 700, borderBottom: "1px solid #cbd5e1" }}>
                  <th style={{ padding: "12px 16px" }}>Product Variation / Part No</th>
                  <th style={{ padding: "12px 16px", textAlign: "center" }}>Qty</th>
                  <th style={{ padding: "12px 16px", textAlign: "right" }}>Rate</th>
                  <th style={{ padding: "12px 16px", textAlign: "right" }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                      No items in quotation cart.
                    </td>
                  </tr>
                ) : (
                  cart.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <strong style={{ color: "#0f172a", display: "block", marginBottom: "2px" }}>{item.name}</strong>
                        <span style={{ fontSize: "11px", color: "#c32125", fontWeight: 700 }}>Part No: {item.partNo}</span>
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#334155" }}>
                        {item.qty} {item.unit || "meter"}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", color: "#475569" }}>
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 800, color: "#0f172a" }}>
                        ₹{(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Calculation Box */}
          <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "16px 20px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
              <span>Subtotal (excl. GST):</span>
              <strong style={{ color: "#1e293b" }}>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
              <span>GST (18%):</span>
              <strong style={{ color: "#16a34a" }}>+ ₹{gstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "15px", paddingTop: "10px", borderTop: "1px solid #cbd5e1", fontWeight: 900, color: "#0f172a" }}>
              <span>Grand Total:</span>
              <span style={{ color: "#c32125" }}>₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "6px", margin: "0" }}>
              Customer &amp; Project Details
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px", fontSize: "12px", outline: "none" }}
                  placeholder="Enter full name"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px", fontSize: "12px", outline: "none" }}
                  placeholder="Company / Enterprise Name"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px", fontSize: "12px", outline: "none" }}
                  placeholder="name@company.com"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px", fontSize: "12px", outline: "none" }}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>Project Site Address / Delivery Location</label>
              <textarea
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px", fontSize: "12px", outline: "none", resize: "vertical" }}
                placeholder="Enter complete shipping/site address..."
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>Additional Project Notes / Delivery Lead Times</label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px", fontSize: "12px", outline: "none", resize: "vertical" }}
                placeholder="Mention any required delivery schedules or technical requirements..."
              />
            </div>

            {/* Final Action Button */}
            <button
              type="submit"
              style={{
                marginTop: "10px",
                width: "100%",
                background: "#c32125",
                color: "#ffffff",
                border: "none",
                padding: "14px",
                borderRadius: "6px",
                fontWeight: 900,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(195,33,37,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <CheckCircle2 size={18} /> Request Official Quotation
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};