import React from "react";
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
    <div className="product-card" data-category={product.category}>
      <div className="product-badge-wrap">
        <span className="product-badge badge-brand">{product.brand}</span>
        <span className="product-badge badge-stock">{product.stock}</span>
      </div>

      <div className="product-image-box">
        <img
          src={productImage}
          alt={product.name}
          className="product-image"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "contain",
            display: "block",
            background: "#f7f7f7",
            borderRadius: "10px",
          }}
        />

        <div className="product-quick-actions">
          <button
            className="btn-icon-action"
            onClick={() => openQuickView(product)}
            title="Quick View Specs"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-part-no">Part: {product.partNo}</span>
        <h4 className="product-name" title={product.name}>
          {product.name}
        </h4>

        <div className="product-specs-list">
          {product.specs.map((s, idx) => (
            <div key={idx}>• {s}</div>
          ))}
        </div>

        <div className="product-footer">
          <div className="product-pricing">
            <span className="price-main">₹{product.price.toFixed(2)}</span>
            <span className="price-unit">per {product.unit} (excl. GST)</span>
          </div>

          <button
            className="btn-add-cart"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart size={14} style={{ marginRight: "4px" }} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
