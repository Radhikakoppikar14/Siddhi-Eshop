import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PARTEX_PRODUCTS = [
  [
    "PA®",
    "Closed Chevron Wire Markers",
    "/images/partex-pa.jpg",
    "Interlocking chevron profile ensures straight, non-rotating legibility on wires from 0.2 to 70 mm².",
  ],
  [
    "PC®",
    "Snap-on Open Cable Markers",
    "/images/partex-pc.jpg",
    "Open clip-on markers for post-termination retrofitting onto connected cables and patch panels.",
  ],
  [
    "PO / POZ®",
    "Printable Marker Profile & Tubing",
    "/images/partex-po.jpg",
    "Flexible oval profile and zero-halogen POZ tubing for high-speed automated thermal printing.",
  ],
  [
    "PKS®",
    "Stainless Steel 316 Markers",
    "/images/partex-pks.jpg",
    "Acid-proof AISI 316 stainless steel embossed markers for chemical plants, offshore, and harsh environments.",
  ],
  [
    "PROMARK®",
    "ProMark T-1000 Thermal Printers",
    "/images/partex-promark.jpg",
    "Portable high-precision thermal marker printers with USB and Bluetooth connectivity.",
  ],
  [
    "PARTEX®",
    "Cable Ties & Fasteners",
    "/images/partex-ties.jpg",
    "UV-resistant nylon 6.6 and ball-lock stainless steel cable ties for secure industrial bundling.",
  ],
] as const;

export const AboutPartex: React.FC = () => {
  const navigate = useNavigate();

  const scrollToRfqTopic = (topic: string) => {
    navigate("/#rfqSection");
    setTimeout(() => {
      const el = document.getElementById("rfqSection");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Official RFQ for Partex Sweden Marking Systems: ${topic}. Please provide bulk box rates and sample delivery.`;
        notes.focus();
      }
    }, 200);
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
          <Link to="/" style={{ color: "#ca8a04", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>
            About PARTEX Sweden
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
            borderLeft: "5px solid #eab308",
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
                src="/images/logo-partex.png"
                alt="Partex Logo"
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748b",
                  }}
                >
                  PARTEX MARKING SYSTEMS SWEDEN
                </span>
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  PARTEX INDUSTRIAL MARKING SOLUTIONS
                </h1>
              </div>
            </div>
            <span
              style={{
                background: "#fefce8",
                border: "1px solid #fef08a",
                color: "#854d0e",
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "16px",
                textTransform: "uppercase",
              }}
            >
              AUTHORIZED DISTRIBUTOR
            </span>
          </div>

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
                World Pioneer in Cable &amp; Wire Identification
              </h2>
              <p
                style={{
                  fontSize: "11.5px",
                  lineHeight: 1.5,
                  color: "#64748b",
                  margin: 0,
                }}
              >
                Founded in Sweden in 1948, Partex has developed specialist
                identification products for electrical, rail, defense, marine,
                and energy applications.
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
                Complete Marking Portfolio at Siddhi Kabel
              </h2>
              <p
                style={{
                  fontSize: "11.5px",
                  lineHeight: 1.5,
                  color: "#64748b",
                  margin: 0,
                }}
              >
                PA, PC, PO, PKS markers, ProMark printers, and cable ties are
                available for panel builders and industrial maintenance teams.
              </p>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "16px",
          }}
        >
          PARTEX Marking Products Available at Siddhi Kabel
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "30px",
          }}
        >
          {PARTEX_PRODUCTS.map(([tag, title, image, description]) => (
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
                    color: "#ca8a04",
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
                  className="btn btn-primary btn-sm"
                  style={{ width: "100%", fontSize: "10px" }}
                  onClick={() => scrollToRfqTopic(`Partex ${title}`)}
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
            Authorized Partex Distributor:{" "}
            <strong>Siddhi Kabel Corporation Private Limited</strong> •
            Bangalore ready stock • Phone: 09620000947
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => scrollToRfqTopic("PARTEX SAMPLE PACK & BOM")}
          >
            Submit Official RFQ / BOM &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
