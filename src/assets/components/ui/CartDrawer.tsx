import React from "react";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCartDrawer,
    updateQty,
    removeFromCart,
  } = useCart();
  const { currentUser, openAuthModal } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutRfq = () => {
    if (cart.length === 0) {
      showToast(
        "Your RFQ Cart is empty. Please add items before requesting a quotation."
      );
      return;
    }

    if (!currentUser) {
      showToast(
        "Customer Account Required: Please Sign In or Create an Account to request formal quotation."
      );
      closeCartDrawer();
      openAuthModal("login");
      return;
    }

    closeCartDrawer();
    navigate("/gst-quotation");
  };

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isCartOpen ? "open" : ""}`}
        onClick={closeCartDrawer}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          zIndex: 2147483646,
        }}
      />
      <aside
        className={`cart-drawer ${isCartOpen ? "open" : ""}`}
        id="cartDrawer"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          zIndex: 2147483647,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 25px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Cart Header */}
        <div 
          className="cart-drawer-header" 
          style={{ 
            padding: "24px 24px 16px 24px", 
            background: "#ffffff", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            borderBottom: "1px solid #e2e8f0" 
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
            <ShoppingCart size={18} />
            Quotation Cart
          </h3>
          <button
            className="btn-close-drawer"
            onClick={closeCartDrawer}
            aria-label="Close Cart"
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#475569",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List */}
        <div 
          className="cart-drawer-items" 
          id="cartItemsList" 
          style={{ 
            flex: 1, 
            overflowY: "auto", 
            padding: "16px 24px", 
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          {cart.length === 0 ? (
            <div className="cart-empty-state" style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
              <ShoppingCart
                size={48}
                strokeWidth={1.2}
                style={{ color: "#94a3b8", marginBottom: "16px" }}
              />
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 6px" }}>Your industrial quotation cart is empty.</p>
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: "15px" }}
                onClick={closeCartDrawer}
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                className="cart-item-row" 
                key={item.id} 
                style={{ 
                  borderBottom: "1px solid #f1f5f9", 
                  paddingBottom: "16px",
                  marginBottom: "12px",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  gap: "12px" 
                }}
              >
                {/* Left Side: Product Details */}
                <div className="cart-item-info" style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#b91c1c",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {item.brand} | {item.partNo}
                  </div>
                  <div className="cart-item-title" style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", lineHeight: "1.3", wordBreak: "break-word" }}>
                    {item.name}
                  </div>
                  <div className="cart-item-price" style={{ fontSize: "13px", fontWeight: 700, color: "#b91c1c", marginTop: "2px" }}>
                    ₹{item.price.toFixed(2)} / {item.unit}
                  </div>
                </div>

                {/* Right Side: Quantity Stepper and Delete Icon */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                  <div 
                    className="cart-qty-ctrl" 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      border: "1px solid #cbd5e1", 
                      borderRadius: "4px", 
                      background: "#f8fafc",
                      overflow: "hidden"
                    }}
                  >
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      aria-label="Decrease"
                      style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", color: "#475569" }}
                    >
                      <Minus size={11} />
                    </button>
                    <span style={{ padding: "0 6px", fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      aria-label="Increase"
                      style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", color: "#475569" }}
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                    style={{ 
                      background: "none", 
                      border: "none", 
                      cursor: "pointer", 
                      color: "#64748b",
                      padding: "4px"
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        <div 
          className="cart-drawer-footer" 
          style={{ 
            borderTop: "1px solid #e2e8f0", 
            padding: "20px 24px", 
            background: "#f8fafc" 
          }}
        >
          <div
            className="cart-checkout-actions"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button className="btn btn-primary" onClick={handleCheckoutRfq} style={{ width: "100%", padding: "12px", fontWeight: 700 }}>
              Request Official GST Quotation
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={closeCartDrawer}
              style={{ 
                width: "100%", 
                background: "none", 
                border: "1px solid #cbd5e1", 
                borderRadius: "6px", 
                padding: "10px", 
                fontSize: "13px", 
                fontWeight: 600, 
                color: "#475569", 
                cursor: "pointer" 
              }}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};