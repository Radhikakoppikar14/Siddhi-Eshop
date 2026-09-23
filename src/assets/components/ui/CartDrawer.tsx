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
        "Your RFQ Cart is empty. Please add items before requesting a quotation.",
      );
      return;
    }

    if (!currentUser) {
      showToast(
        "Customer Account Required: Please Sign In or Create an Account to request formal quotation.",
      );
      closeCartDrawer();
      openAuthModal("login");
      return;
    }

    // Close the cart drawer and navigate directly to the GST Quotation itemized page
    closeCartDrawer();
    navigate("/gst-quotation");
  };

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isCartOpen ? "open" : ""}`}
        onClick={closeCartDrawer}
      />
      <aside
        className={`cart-drawer ${isCartOpen ? "open" : ""}`}
        id="cartDrawer"
      >
        <div className="cart-drawer-header">
          <h3>
            <ShoppingCart
              size={18}
              style={{
                marginRight: "8px",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />
            Quotation Cart
          </h3>
          <button
            className="btn-close-drawer"
            onClick={closeCartDrawer}
            aria-label="Close Cart"
          >
            <X size={18} />
          </button>
        </div>

        <div className="cart-drawer-items" id="cartItemsList">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingCart
                size={48}
                strokeWidth={1.2}
                style={{ color: "var(--gray-500)", marginBottom: "16px" }}
              />
              <p>Your industrial quotation cart is empty.</p>
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
              <div className="cart-item-row" key={item.id}>
                <div className="cart-item-info">
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--primary)",
                      fontWeight: 700,
                    }}
                  >
                    {item.brand} | {item.partNo}
                  </div>
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">
                    ₹{item.price.toFixed(2)} / {item.unit}
                  </div>
                </div>
                <div className="cart-qty-ctrl">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    aria-label="Decrease"
                  >
                    <Minus size={12} />
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    aria-label="Increase"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer-footer">
          <div
            className="cart-checkout-actions"
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <button className="btn btn-primary" onClick={handleCheckoutRfq}>
              Request Official GST Quotation
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={closeCartDrawer}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};