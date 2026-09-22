import React from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingCart } from "lucide-react";
import type { Product } from "../../../types";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { openQuickView } = useAuth();

  const productImage = product.image || "/images/product-placeholder.svg";

  return (
    <div 
      className="product-card group" 
      data-category={product.category}
      style={{ 
        background: "#fff", 
        border: "1px solid #e5e7eb", 
        borderRadius: "12px", 
        padding: "16px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}
    >
      <div style={{ position: "relative" }}>
        <div className="product-badge-wrap" style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span className="product-badge badge-brand" style={{ fontSize: "10px", fontWeight: "700", background: "#f3f4f6", padding: "2px 8px", borderRadius: "4px" }}>{product.brand}</span>
          <span className="product-badge badge-stock" style={{ fontSize: "10px", fontWeight: "700", color: "#16a34a" }}>{product.stock}</span>
        </div>

        {/* Clickable Image Box */}
        <Link to={`/product-detail?sku=${product.partNo}`} style={{ display: "block" }}>
          <div className="product-image-box" style={{ cursor: "pointer", height: "150px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", borderRadius: "8px" }}>
            <img
              src={productImage}
              alt={product.name}
              className="product-image"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </Link>

        <div className="product-quick-actions" style={{ position: "absolute", top: "35px", right: "8px" }}>
          <button
            className="btn-icon-action"
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            title="Quick View Specs"
            style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "4px", cursor: "pointer" }}
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      <div className="product-info" style={{ marginTop: "12px" }}>
        <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px", lineHeight: "1.2" }}>
          Power and control cables<br />
          PVC outer sheath and numbered cor...
        </div>

        {/* Clickable Orange Product Title */}
        <Link to={`/product-detail?sku=${product.partNo}`} style={{ textDecoration: "none" }}>
          <h4 
            className="group-hover:text-orange-600 transition-colors"
            style={{ 
              fontSize: "14px", 
              fontWeight: "750", 
              color: "#ea580c", 
              cursor: "pointer",
              margin: "6px 0",
              lineHeight: "1.3"
            }}
            title={product.name}
          >
            {product.name}
          </h4>
        </Link>

        {/* Clickable Part Number */}
        <div style={{ fontSize: "12px", color: "#374151", margin: "6px 0" }}>
          Part No:{" "}
          <Link 
            to={`/product-detail?sku=${product.partNo}`}
            style={{ color: "#0284c7", fontWeight: "600", cursor: "pointer", textDecoration: "none" }}
          >
            {product.partNo}
          </Link>
        </div>

        {/* Variant Spec Badge */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "6px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", color: "#334155", margin: "8px 0" }}>
          {product.specs[0] || "2 Cores • 0.5 mm² (Numbered)"}
        </div>

        <div className="product-footer" style={{ marginTop: "12px", borderTop: "1px solid #f3f4f6", paddingTop: "12px" }}>
          <div className="product-pricing" style={{ background: "#f8fafc", padding: "8px", borderRadius: "8px", marginBottom: "10px" }}>
            <span style={{ fontSize: "16px", fontWeight: "800", color: "#111827" }}>₹{product.price.toFixed(2)}</span>
            <span style={{ fontSize: "10px", color: "#6b7280", display: "block" }}>+ ₹{(product.price * 0.18).toFixed(2)} GST</span>
            <div style={{ fontSize: "10px", color: "#16a34a", fontWeight: "700", marginTop: "2px" }}>
              MRP ₹{(product.price * 1.82).toFixed(2)} 45% OFF
            </div>
          </div>

          <button
            className="btn-add-cart"
            onClick={() => addToCart(product.id)}
            style={{
              width: "100%",
              background: "#ff6600",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}
          >
            <ShoppingCart size={14} />
            ADD TO ENQUIRY
          </button>
        </div>
      </div>
    </div>
  );
};