import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { isValidPositiveNumber } from "../utils/validation";

export const ProductDetail: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState(
    "/images/cable-olflex-thumb.png",
  );
  const [qty, setQty] = useState(100);
  const { addCustomItem } = useCart();
  const navigate = useNavigate();

  const galleryImages = [
    { src: "/images/cable-olflex-thumb.png", label: "Main Profile" },
    { src: "/images/cable-olflex-angle.png", label: "Angle View" },
    { src: "/images/cable-olflex-cores.png", label: "Numbered Cores" },
    { src: "/images/cable-olflex-detail.png", label: "Cross Section" },
    { src: "/images/cable-olflex-drum.png", label: "Wooden Drum" },
  ];

  const handleAddToCart = () => {
    if (!isValidPositiveNumber(qty)) return;
    addCustomItem(
      {
        id: "lapp-1119203",
        name: "ÖLFLEX® CLASSIC 110 Control Cable (3G1.5)",
        partNo: "1119203",
        brand: "LAPP KABEL",
        price: 68.5,
        unit: "meter",
      },
      qty,
    );
  };

  const handleQuoteClick = () => {
    navigate("/#rfqSection");
    setTimeout(() => {
      const el = document.getElementById("rfqSection");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Official Project Quote Request for ÖLFLEX® CLASSIC 110 (Part No: 1119203). Required Quantity: ${qty} meters. Please provide test certs and Bangalore dispatch schedule.`;
        notes.focus();
      }
    }, 200);
  };

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "24px 0 60px",
      }}
    >
      <div className="container">
        {/* Breadcrumbs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "20px",
          }}
        >
          <Link to="/" style={{ color: "#0284c7", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <Link
            to="/about-lapp"
            style={{ color: "#0284c7", textDecoration: "none" }}
          >
            Lapp Kabel
          </Link>
          <span>/</span>
          <Link
            to="/olflex-cables"
            style={{ color: "#0284c7", textDecoration: "none" }}
          >
            ÖLFLEX® Cables
          </Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>
            ÖLFLEX® CLASSIC 110 (Part: 1119203)
          </span>
        </div>

        {/* Product Hero Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "30px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* Gallery Column */}
          <div>
            <div
              style={{
                width: "100%",
                height: "360px",
                background: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "16px",
              }}
            >
              <img
                src={selectedImg}
                alt="ÖLFLEX CLASSIC 110"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "16px",
                overflowX: "auto",
                paddingBottom: "6px",
              }}
            >
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(img.src)}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "6px",
                    border:
                      selectedImg === img.src
                        ? "2px solid #ff6600"
                        : "1px solid #cbd5e1",
                    background: "#ffffff",
                    padding: "4px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info Column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  background: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontSize: "11.5px",
                  fontWeight: 700,
                }}
              >
                LAPP KABEL GERMANY
              </span>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Part No: <strong>1119203</strong>
              </span>
            </div>

            <h1
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#0f172a",
                margin: "0 0 12px",
              }}
            >
              ÖLFLEX® CLASSIC 110 Control Cable 3G1.5
            </h1>

            <p
              style={{
                fontSize: "14px",
                color: "#475569",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              VDE-registered oil-resistant PVC control and connection cable for
              flexible use and fixed installation under medium mechanical loads.
              Widely specified in machine tools, plant engineering, and control
              panels.
            </p>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "18px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "var(--primary)",
                  }}
                >
                  ₹68.50
                </span>
                <span style={{ fontSize: "14px", color: "#64748b" }}>
                  per meter (excl. 18% GST)
                </span>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#16a34a",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "16px",
                }}
              >
                <CheckCircle2 size={14} /> Ready Stock in Bangalore Warehouse
                (5,000m+)
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#fff",
                  }}
                >
                  <span
                    style={{
                      padding: "0 10px",
                      fontSize: "12.5px",
                      color: "#64748b",
                    }}
                  >
                    Meters:
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="50"
                    value={qty}
                    onChange={(e) => {
                      const nextQty = Number(e.target.value);
                      setQty(
                        isValidPositiveNumber(nextQty)
                          ? Math.floor(nextQty)
                          : 1,
                      );
                    }}
                    style={{
                      width: "80px",
                      height: "38px",
                      border: "none",
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  />
                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "40px",
                    padding: "0 20px",
                  }}
                >
                  <ShoppingCart size={16} />
                  Add to RFQ Cart
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={handleQuoteClick}
                  style={{ height: "40px", padding: "0 16px" }}
                >
                  Custom Quote
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
                fontSize: "12.5px",
              }}
            >
              <div>
                <strong>Conductor:</strong> Bare copper wire, class 5
              </div>
              <div>
                <strong>Rated Voltage:</strong> U0/U: 300/500 V
              </div>
              <div>
                <strong>Core Insulation:</strong> Special PVC (P8/1)
              </div>
              <div>
                <strong>Test Voltage:</strong> 4000 V
              </div>
              <div>
                <strong>Core Identification:</strong> Black with white numbers
              </div>
              <div>
                <strong>Temperature:</strong> -40°C to +80°C (fixed)
              </div>
            </div>
          </div>
        </div>

        {/* Technical Data Sheet Section */}
        <div
          style={{
            marginTop: "30px",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "30px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "16px",
            }}
          >
            Comprehensive Technical Specifications
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13.5px",
            }}
          >
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td
                  style={{
                    padding: "10px 14px",
                    fontWeight: 600,
                    color: "#475569",
                    width: "30%",
                  }}
                >
                  Classification ETIM 5/6
                </td>
                <td style={{ padding: "10px 14px", color: "#1e293b" }}>
                  ETIM 5.0 Class-ID: EC000104 (Control cable)
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td
                  style={{
                    padding: "10px 14px",
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  Core Identification Code
                </td>
                <td style={{ padding: "10px 14px", color: "#1e293b" }}>
                  Black with white numbers acc. to VDE 0293-1 with green-yellow
                  protective conductor
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td
                  style={{
                    padding: "10px 14px",
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  Conductor Stranding
                </td>
                <td style={{ padding: "10px 14px", color: "#1e293b" }}>
                  Fine wire according to VDE 0295, class 5 / IEC 60228 class 5
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td
                  style={{
                    padding: "10px 14px",
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  Minimum Bending Radius
                </td>
                <td style={{ padding: "10px 14px", color: "#1e293b" }}>
                  Occasional flexing: 10 x outer diameter | Fixed installation:
                  4 x outer diameter
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td
                  style={{
                    padding: "10px 14px",
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  Nominal Voltage
                </td>
                <td style={{ padding: "10px 14px", color: "#1e293b" }}>
                  U0/U: 300/500 V
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td
                  style={{
                    padding: "10px 14px",
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  Test Voltage
                </td>
                <td style={{ padding: "10px 14px", color: "#1e293b" }}>
                  4000 V AC spark test
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td
                  style={{
                    padding: "10px 14px",
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  Certifications &amp; Standards
                </td>
                <td style={{ padding: "10px 14px", color: "#1e293b" }}>
                  VDE Reg. No. 7030, CE, RoHS, EAC compliant, Flame-retardant
                  acc. to IEC 60332-1-2
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
