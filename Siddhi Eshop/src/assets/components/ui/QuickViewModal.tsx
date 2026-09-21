import React from "react";
import { X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const handleCustomQuote = () => {
    const part = quickViewProduct.partNo;
    closeQuickView();
    if (window.location.pathname !== "/") {
      navigate("/#rfqSection");
      setTimeout(() => {
        const notes = document.getElementById(
          "rfqNotes",
        ) as HTMLTextAreaElement;
        if (notes) {
          notes.value = `Inquiry regarding Part No: ${part}. Please share formal quote with bulk quantity discounts and delivery lead time to our location.`;
          notes.focus();
        }
      }, 200);
    } else {
      const el = document.getElementById("rfqSection");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Inquiry regarding Part No: ${part}. Please share formal quote with bulk quantity discounts and delivery lead time to our location.`;
        notes.focus();
      }
    }
  };

  return (
    <div
      className="modal-overlay open"
      id="quickViewModal"
      onClick={closeQuickView}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={closeQuickView}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="modal-body" id="quickViewContent">
          <div className="modal-img-col">
            <img
              src={quickViewProduct.image || "/images/product-placeholder.svg"}
              alt={quickViewProduct.name}
              className="modal-product-image"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/images/product-placeholder.svg";
              }}
            />
          </div>
          <div className="modal-content-col">
            <span className="modal-badge">
              {quickViewProduct.brand} | {quickViewProduct.partNo}
            </span>
            <h3 className="modal-title">{quickViewProduct.name}</h3>
            <div className="modal-price">
              ₹{quickViewProduct.price.toFixed(2)}{" "}
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--gray-600)",
                }}
              >
                / {quickViewProduct.unit}
              </span>
            </div>

            <p
              style={{
                fontSize: "13px",
                color: "var(--gray-600)",
                marginBottom: "15px",
              }}
            >
              <strong>Application:</strong> {quickViewProduct.application}
            </p>

            <table className="modal-specs-table">
              <tbody>
                <tr>
                  <td>Voltage Rating</td>
                  <td>{quickViewProduct.voltage || "N/A"}</td>
                </tr>
                <tr>
                  <td>Temp Range</td>
                  <td>{quickViewProduct.tempRange || "Standard industrial"}</td>
                </tr>
                <tr>
                  <td>Conductor Spec</td>
                  <td>
                    {quickViewProduct.conductor || "Standard high conductivity"}
                  </td>
                </tr>
                <tr>
                  <td>Stock Availability</td>
                  <td>
                    <strong style={{ color: "var(--success)" }}>
                      {quickViewProduct.stock}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  addToCart(quickViewProduct.id);
                  closeQuickView();
                }}
              >
                Add To RFQ Cart
              </button>
              <button className="btn btn-secondary" onClick={handleCustomQuote}>
                Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
