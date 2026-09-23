import React, { useState } from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { RFQModal } from "./RFQModal";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCartDrawer,
    updateQty,
    removeFromCart,
    clearCart,
    subtotal,
  } = useCart();

  const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(15, 23, 42, 0.5)",
          zIndex: 998,
        }}
      />

      {/* Drawer Container */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "100%",
          maxWidth: "420px",
          height: "100vh",
          backgroundColor: "#ffffff",
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.15)",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={20} color="#0f172a" />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Quotation Cart
            </h2>
          </div>
          <button
            onClick={closeCartDrawer}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Items Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#64748b",
              }}
            >
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: "12px" }} />
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
                Your quotation cart is empty.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  borderBottom: "1px solid #f1f5f9",
                  paddingBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#dc2626",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "2px",
                  }}
                >
                  {item.brand} | {item.partNo}
                </span>
                <strong
                  style={{
                    fontSize: "13px",
                    color: "#0f172a",
                    display: "block",
                    lineHeight: "1.4",
                    marginBottom: "6px",
                  }}
                >
                  {item.name}
                </strong>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "#dc2626",
                    }}
                  >
                    ₹{item.price} / {item.unit || "meter"}
                  </span>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Quantity increment / decrement */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        overflow: "hidden",
                        background: "#fff",
                      }}
                    >
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        style={{
                          width: "26px",
                          height: "26px",
                          background: "#f8fafc",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        -
                      </button>
                      <span
                        style={{
                          padding: "0 8px",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        style={{
                          width: "26px",
                          height: "26px",
                          background: "#f8fafc",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#94a3b8",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid #e2e8f0",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                Estimated Subtotal (excl. GST):
              </span>
              <strong style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a" }}>
                ₹{subtotal.toFixed(2)}
              </strong>
            </div>

            {/* Request Official Quotation Button */}
            <button
              onClick={() => setIsRFQModalOpen(true)}
              style={{
                width: "100%",
                background: "#dc2626",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "14px",
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                cursor: "pointer",
                marginBottom: "8px",
              }}
            >
              REQUEST QUOTATION
            </button>

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                color: "#64748b",
                fontSize: "12px",
                cursor: "pointer",
                padding: "6px",
                textDecoration: "underline",
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>

      {/* RFQ Modal Summary Table & Submission */}
      {isRFQModalOpen && (
        <RFQModal onClose={() => setIsRFQModalOpen(false)} />
      )}
    </>
  );
};