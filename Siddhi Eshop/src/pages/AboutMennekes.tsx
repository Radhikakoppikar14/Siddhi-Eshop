import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RFQModal } from "../assets/components/ui/RFQModal.tsx";

const MENNEKES_PRODUCTS = [
  [
    "POWERTOP®",
    "PowerTOP Xtra Plugs & Sockets",
    "/images/menn-powertop.jpg",
    "16A to 125A IP44/IP67 heavy-duty rubberized industrial CEE plugs with ErgoCONTACT cage terminals.",
  ],
  [
    "DUO®",
    "Switched Interlocked Sockets",
    "/images/menn-duo.jpg",
    "DUO mechanical interlock prevents plugging in under load and switching on without a plug inserted.",
  ],
  [
    "MENNEKES®",
    "Panel Mounted Straight & Angled",
    "/images/menn-panel.jpg",
    "Straight and angled panel sockets for industrial machinery, OEM distribution panels, and gensets.",
  ],
  [
    "PHASE INVERTER",
    "Phase Inverter Reversal Plugs",
    "/images/menn-phase.jpg",
    "Instant 180° rotation of two phases to easily reverse 3-phase motor rotation without rewiring.",
  ],
  [
    "EVERGUM®",
    "EverGUM Solid Rubber Distro",
    "/images/menn-evergum.jpg",
    "Indestructible vulcanized rubber portable distribution boxes for construction, tunnels, and events.",
  ],
  [
    "AMAXX®",
    "AMAXX Modular Combinations",
    "/images/menn-amaxx.jpg",
    "Custom combinable industrial receptacle enclosures fitted with MCBs, RCDs, and CEE sockets.",
  ],
] as const;

export const AboutMennekes: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const scrollToRfqTopic = (topic: string) => {
    setSelectedProduct(topic);
  };

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "20px 0 60px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "14px",
          }}
        >
          <Link to="/" style={{ color: "#c32125", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>
            About MENNEKES Germany
          </span>
        </div>

        {/* Hero Card */}
        <div
          className="sheet-hero-card"
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 12px rgba(15, 23, 42, 0.04)",
            marginBottom: "20px",
            borderLeft: "5px solid #c32125",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <img
                src="/images/logo-mennekes.png"
                alt="Mennekes Logo"
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                background: "#fbebee",
                border: "1px solid #fecdd3",
                color: "#9f1239",
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "16px",
                textTransform: "uppercase",
              }}
            >
              AUTHORIZED INDUSTRIAL DISTRIBUTOR
            </span>
          </div>

          <h1
            style={{
              borderTop: "2px solid #f1f5f9",
              paddingTop: "14px",
              fontSize: "20px",
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 14px",
            }}
          >
            About MENNEKES Germany
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "14px",
              }}
            >
              <h2
                style={{
                  fontSize: "14px",
                  margin: "0 0 6px",
                  color: "#0f172a",
                }}
              >
                World Pioneer in Industrial Plugs &amp; Receptacles
              </h2>
              <p
                style={{
                  fontSize: "11.5px",
                  lineHeight: 1.5,
                  color: "#64748b",
                  margin: 0,
                }}
              >
                Founded in 1935 in Kirchhundem, Germany, MENNEKES Elektrotechnik
                GmbH &amp; Co. KG is globally acknowledged as the gold standard
                in industrial electrical plugs and sockets.
              </p>
            </div>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "14px",
              }}
            >
              <h2
                style={{
                  fontSize: "14px",
                  margin: "0 0 6px",
                  color: "#0f172a",
                }}
              >
                Complete CEE Range Supplied by Siddhi Kabel
              </h2>
              <p
                style={{
                  fontSize: "11.5px",
                  lineHeight: 1.5,
                  color: "#64748b",
                  margin: 0,
                }}
              >
                Siddhi Kabel supplies genuine MENNEKES products including
                PowerTOP®, DUO®, panel-mounted sockets, phase inverters,
                EverGUM® distribution boxes, and AMAXX® combinations.
              </p>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#c32125",
            marginBottom: "16px",
          }}
        >
          MENNEKES Industrial CEE Products Available at Siddhi Kabel
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "30px",
          }}
        >
          {MENNEKES_PRODUCTS.map(([tag, title, image, description]) => (
            <div
              key={tag}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}
            >
              <img
                src={image}
                alt={title}
                style={{ width: "100%", height: "130px", objectFit: "cover" }}
              />
              <div style={{ padding: "12px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#c32125",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    margin: "4px 0 6px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    lineHeight: 1.45,
                    minHeight: "48px",
                    margin: "0 0 10px",
                  }}
                >
                  {description}
                </p>
                <button
                  className="mennekes-quote-link"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#dc2626",
                    padding: 0,
                    fontSize: "10px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  onClick={() => scrollToRfqTopic(`Mennekes ${title}`)}
                >
                  Request Quotation &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            background: "#0f172a",
            color: "#ffffff",
            borderRadius: "8px",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            fontSize: "11px",
          }}
        >
          <span>
            Authorized Mennekes Importer:{" "}
            <strong>Siddhi Kabel Corporation Private Limited</strong> •
            Bangalore ready stock • Phone: 09620000947
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => scrollToRfqTopic("MENNEKES BULK BOX ORDER")}
          >
            Submit Official RFQ / BOM &rarr;
          </button>
        </div>
      </div>
      {selectedProduct && (
        <RFQModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
