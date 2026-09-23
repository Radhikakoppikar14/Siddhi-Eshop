import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "../../../context/ToastContext";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast("Subscribed to Siddhi Kabel notifications!");
      setEmail("");
    }
  };

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== "/") {
      navigate("/#" + id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="main-footer" id="footerContact">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-col">
              <div
                className="footer-logo-wrap"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <img
                  src="/images/siddhi-kabel-lockup.png"
                  alt="Siddhi Logo"
                  className="footer-logo-img"
                  style={{
                    height: "48px",
                    background: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <h4
                style={{
                  color: "#fff",
                  fontSize: "15px",
                  marginBottom: "6px",
                  paddingBottom: 0,
                }}
              >
                SIDDHI KABEL CORPORATION PRIVATE LIMITED
              </h4>
              <p
                style={{
                  fontSize: "11px",
                  color: "#ff8589",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Dependable Electrical Solutions
              </p>
              <p>
                Authorised Distributors, Dealers, Importers, Suppliers and
                Channel Partners of world class Industrial Electrical,
                Automation &amp; Safety Products.
              </p>
              <p
                style={{ fontSize: "12px", color: "#8892a0", marginTop: "8px" }}
              >
                Authorized Channel Partner for Lapp Kabel Germany, Eaton
                Moeller, Partex Sweden, and Mennekes Germany.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a
                    href="#aboutSection"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("aboutSection");
                    }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <Link to="/about-lapp">Lapp Products</Link>
                </li>
                <li>
                  <Link to="/about-eaton">Eaton Products</Link>
                </li>
                <li>
                  <Link to="/about-partex">Partex Products</Link>
                </li>
                <li>
                  <Link to="/about-mennekes">Mennekes Products</Link>
                </li>
                <li>
                  <a
                    href="#brandsSection"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("brandsSection");
                    }}
                  >
                    Authorized Partners
                  </a>
                </li>
                <li>
                  <a
                    href="#rfqSection"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("rfqSection");
                    }}
                  >
                    Request Bulk Quote
                  </a>
                </li>
              </ul>
            </div>

            {/* Product Lines */}
            <div className="footer-col">
              <h4>Product Lines</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/olflex-cables">Lapp ÖLFLEX® Cables</Link>
                </li>
                <li>
                  <Link to="/about-lapp">Lapp UNITRONIC® Cables</Link>
                </li>
                <li>
                  <Link to="/about-lapp">Lapp SKINTOP® &amp; SILVYN®</Link>
                </li>
                <li>
                  <Link to="/about-eaton">Eaton PKZM0 Motor Breakers</Link>
                </li>
                <li>
                  <Link to="/about-partex">Partex Marking Systems</Link>
                </li>
                <li>
                  <Link to="/about-mennekes">
                    Mennekes CEE Plugs &amp; Sockets
                  </Link>
                </li>
              </ul>
            </div>

            {/* Bangalore Contact & Head Office */}
            <div className="footer-col">
              <h4>Bangalore Head Office</h4>
              <ul className="footer-contact-list">
                <li>
                  <MapPin
                    size={16}
                    style={{ flexShrink: 0, marginTop: "3px" }}
                  />
                  <span>
                    No.3, 1st Main Road, 1st Block,
                    <br />
                    Banashankari 3rd Stage,
                    <br />
                    Bangalore 560 085, India
                  </span>
                </li>
                <li>
                  <Phone
                    size={16}
                    style={{ flexShrink: 0, marginTop: "3px" }}
                  />
                  <span>096200 00947 / 098860 58511</span>
                </li>
                <li>
                  <Mail size={16} style={{ flexShrink: 0, marginTop: "3px" }} />
                  <span>
                    sales@siddhikabel.com
                    <br />
                    Enquiry@siddhikabel.com
                  </span>
                </li>
              </ul>

              <div style={{ marginTop: "15px" }}>
                <span style={{ fontSize: "12px", color: "#ced4da" }}>
                  Stay updated on industrial offers:
                </span>
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    className="newsletter-input"
                    required
                    placeholder="Enter your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="newsletter-btn">
                    Join
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <div>
              &copy; 2026 Siddhi Kabel Corporation Private Limited. All Rights
              Reserved. Siddhi Eshop Industrial Portal.
            </div>
            <div className="partner-pills">
              <span>
                Authorised Channel Partner: Lapp Kabel • Eaton Moeller • Partex
                Sweden • Mennekes
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
