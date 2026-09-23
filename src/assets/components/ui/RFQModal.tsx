import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { X, CheckCircle, FileText, Send } from "lucide-react";
import { useToast } from "../../../context/ToastContext";

interface RFQModalProps {
  onClose: () => void;
  product?: string;
}

export const RFQModal: React.FC<RFQModalProps> = ({ onClose, product }) => {
  const { cart, clearCart } = useCart();
  const { showToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state for official submission
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Calculate Subtotal, GST (18%), and Grand Total
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = Number((subtotal * 0.18).toFixed(2));
  const grandTotal = Number((subtotal + gst).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      showToast("Please fill in all required contact fields.");
      return;
    }
    setIsSubmitted(true);
    showToast("Official Quotation Request Submitted Successfully!");
    clearCart();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(15, 23, 42, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "700px",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        position: "relative"
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
        >
          <X size={22} />
        </button>

        {!isSubmitted ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <FileText color="#dc2626" size={26} />
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: "900", color: "#0f172a", margin: 0 }}>Official Request For Quotation (RFQ)</h2>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Review your itemized specifications and pricing summary below.</p>
              </div>
            </div>

            {/* Itemized Table */}
            {product && cart.length === 0 ? (
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", marginBottom: "20px", fontSize: "13px", color: "#334155" }}>
                <strong>Quick Quote Item:</strong> {product}
              </div>
            ) : (
              <div style={{ marginBottom: "20px", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                      <th style={{ padding: "10px", color: "#475569" }}>Product Variation / Part No</th>
                      <th style={{ padding: "10px", color: "#475569", textAlign: "center" }}>Qty</th>
                      <th style={{ padding: "10px", color: "#475569", textAlign: "right" }}>Rate</th>
                      <th style={{ padding: "10px", color: "#475569", textAlign: "right" }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px", color: "#1e293b", fontWeight: 600 }}>
                          {item.name} <br />
                          <span style={{ fontSize: "10.5px", color: "#64748b", fontWeight: 400 }}>Part No: {item.partNo}</span>
                        </td>
                        <td style={{ padding: "10px", textAlign: "center", color: "#334155" }}>{item.qty} {item.unit || "mtr"}</td>
                        <td style={{ padding: "10px", textAlign: "right", color: "#334155" }}>₹{item.price}</td>
                        <td style={{ padding: "10px", textAlign: "right", fontWeight: "bold", color: "#0f172a" }}>₹{(item.price * item.qty).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Calculation Breakdown */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#475569", marginBottom: "8px" }}>
                <span>Subtotal (excl. GST):</span>
                <span style={{ fontWeight: 600, color: "#1e293b" }}>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#475569", marginBottom: "12px", borderBottom: "1px solid #cbd5e1", paddingBottom: "8px" }}>
                <span>GST (18%):</span>
                <span style={{ fontWeight: 600, color: "#16a34a" }}>+ ₹{gst.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "900", color: "#0f172a" }}>
                <span>Grand Total:</span>
                <span style={{ color: "#dc2626" }}>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Official Submission Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>Customer & Project Details</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}
                  required
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}
                  required
                />
              </div>

              <textarea
                placeholder="Project requirements, delivery location, or custom notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", resize: "none" }}
              />

              <button
                type="submit"
                className="btn btn-primary"
                style={{ background: "#dc2626", color: "#fff", fontWeight: "bold", padding: "12px", justifyContent: "center", marginTop: "8px", width: "100%", cursor: "pointer" }}
              >
                <Send size={16} /> REQUEST OFFICIAL QUOTATION
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <CheckCircle color="#16a34a" size={54} style={{ marginBottom: "16px" }} />
            <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", marginBottom: "8px" }}>Quotation Request Sent!</h2>
            <p style={{ fontSize: "13px", color: "#64748b", maxWidth: "400px", margin: "0 auto 20px", lineHeight: "1.5" }}>
              Thank you, <strong>{formData.name}</strong>. Our sales engineering team has received your RFQ summary and will email the official quotation to <strong>{formData.email}</strong> shortly.
            </p>
            <button 
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: "10px 24px", background: "#0f172a", color: "#fff", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}
            >
              Close & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
};