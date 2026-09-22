import React from "react";
import { Link, useNavigate } from "react-router-dom";

const EATON_PRODUCTS = [
  [
    "PKZM0®",
    "Motor-Protective Breakers",
    "/images/eaton-pkzm0.jpg",
    "PKZM0 & PKZM4 rotary motor starters up to 65A with short-circuit and thermal overload protection.",
  ],
  [
    "DILM®",
    "Power Contactors & Relays",
    "/images/eaton-dilm.jpg",
    "DILM 3-pole and 4-pole contactors from 7A to 1000A with electronic coils and auxiliary accessories.",
  ],
  [
    "NZM®",
    "Molded Case Circuit Breakers",
    "/images/eaton-nzm.jpg",
    "NZM circuit breakers up to 1600A with thermal-magnetic and electronic trip units.",
  ],
  [
    "FAZ®",
    "Miniature Circuit Breakers",
    "/images/eaton-faz.jpg",
    "Industrial DIN-rail MCBs from 0.5A to 63A with reliable breaking capacity and trip curves.",
  ],
  [
    "RMQ-TITAN®",
    "Push Buttons & Pilot Lights",
    "/images/eaton-rmq.jpg",
    "M22 pilot lights, selector switches, emergency stops, and illuminated control devices.",
  ],
  [
    "POWERXL®",
    "Variable Speed Drives",
    "/images/eaton-drives.jpg",
    "DC1 and DA1 high-performance AC frequency inverters for motors and automation panels.",
  ],
] as const;

export const AboutEaton: React.FC = () => {
  const navigate = useNavigate();

  const scrollToRfqTopic = (topic: string) => {
    navigate("/#rfqSection");
    setTimeout(() => {
      const el = document.getElementById("rfqSection");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Official RFQ for Eaton Moeller Products: ${topic}. Please provide bulk pricing, availability, and delivery lead time.`;
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
          <Link to="/" style={{ color: "#005ea6", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>
            About EATON Moeller
          </span>
        </div>

        {/* Compact Eaton overview */}
        <div
          className="sheet-hero-card"
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 12px rgba(15, 23, 42, 0.04)",
            marginBottom: "20px",
            borderLeft: "5px solid #005ea6",
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
                src="/images/logo-eaton.png"
                alt="Eaton Logo"
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                background: "#e0f2fe",
                border: "1px solid #bae6fd",
                color: "#0369a1",
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "16px",
                textTransform: "uppercase",
              }}
            >
              OFFICIAL INDUSTRIAL DISTRIBUTOR
            </span>
          </div>

          <h1
            style={{
              borderTop: "2px solid #f1f5f9",
              paddingTop: "16px",
              fontSize: "24px",
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 18px",
            }}
          >
            About EATON Moeller Switchgear
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
                Global Power Management Leadership
              </h2>
              <p
                style={{
                  fontSize: "11.5px",
                  lineHeight: 1.5,
                  color: "#64748b",
                  margin: 0,
                }}
              >
                Eaton is a global intelligent power management company dedicated
                to improving the quality of life and protecting the environment
                for people everywhere. With over a century of electrical
                engineering innovation, Eaton&apos;s Electrical Sector is a
                worldwide benchmark in power distribution, circuit protection,
                motor control, industrial automation, and harsh environment
                solutions. In India, Eaton operates state-of-the-art
                manufacturing and engineering development centers delivering
                certified, high-reliability switchgear designed for continuous
                industrial operation.
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
                Comprehensive Moeller Series Automation Portfolio
              </h2>
              <p
                style={{
                  fontSize: "11.5px",
                  lineHeight: 1.5,
                  color: "#64748b",
                  margin: 0,
                }}
              >
                Recognized across panel builders, machine tool manufacturers,
                and process industries, the world-famous Moeller series
                portfolio provides unmatched reliability. Key product families
                include PKZM0® &amp; PKE motor-protective circuit breakers up to
                65A, DILM® contactors and thermal overload relays up to 1000A,
                NZM® molded case circuit breakers up to 1600A, FAZ® miniature
                circuit breakers, RMQ-Titan® pilot devices, and PowerXL®
                variable speed drives.
              </p>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#005ea6",
            marginBottom: "16px",
          }}
        >
          EATON Industrial Switchgear Available at Siddhi Kabel
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "30px",
          }}
        >
          {EATON_PRODUCTS.map(([tag, title, image, description]) => (
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
                    color: "#005ea6",
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
                  className="eaton-quote-link"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#005ea6",
                    padding: 0,
                    fontSize: "10px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  onClick={() => scrollToRfqTopic(`Eaton ${title}`)}
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
            Authorized Eaton Distributor:{" "}
            <strong>Siddhi Kabel Corporation Private Limited</strong> •
            Bangalore ready stock • Phone: 09620000947
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => scrollToRfqTopic("EATON SWITCHGEAR FULL BOM")}
          >
            Submit Official RFQ / BOM &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
