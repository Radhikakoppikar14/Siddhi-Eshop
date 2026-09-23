import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowDownToLine } from "lucide-react";

export const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (hash: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + hash);
    } else {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav-bar">
      <div className="container">
        <div className="nav-bar-inner">
          <button
            className="mobile-toggler"
            id="mobileMenuBtn"
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul
            className={`nav-links ${mobileOpen ? "show" : ""}`}
            id="navLinksMenu"
          >
            <li
              className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
            >
              <Link
                to="/"
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <a
                href="#categoriesSection"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#lappPortfolioSection");
                }}
              >
                <span>Products & Categories</span>
                <ChevronDown size={14} style={{ marginLeft: "4px" }} />
              </a>
              <ul className="cat-dropdown">
                {/* Lapp Submenu */}
                <li className="dropdown-submenu">
                  <Link
                    to="/about-lapp"
                    title="View LAPP India Make Sheet"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>Lapp Products</span>
                    <span>&rarr;</span>
                  </Link>
                  <ul className="submenu-list submenu-lapp">
                    <li>
                      <Link
                        to="/olflex-cables"
                        onClick={() => setMobileOpen(false)}
                      >
                        Power &amp; Control Cables (ÖLFLEX®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-lapp"
                        onClick={() => setMobileOpen(false)}
                      >
                        Data Communication Cables (UNITRONIC®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-lapp"
                        onClick={() => setMobileOpen(false)}
                      >
                        Control Cabinet Single Cores (UNIPLUS®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-lapp"
                        onClick={() => setMobileOpen(false)}
                      >
                        Cable Glands &amp; Counter Nuts (SKINTOP®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-lapp"
                        onClick={() => setMobileOpen(false)}
                      >
                        Rill, Conduit &amp; Klick (SILVYN®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-lapp"
                        onClick={() => setMobileOpen(false)}
                      >
                        Domestic / House Wiring (LAPP INFRA)
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Eaton Submenu */}
                <li className="dropdown-submenu">
                  <Link
                    to="/about-eaton"
                    title="View EATON Moeller Make Sheet"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>Eaton Products</span>
                    <span>&rarr;</span>
                  </Link>
                  <ul className="submenu-list submenu-eaton">
                    <li>
                      <Link
                        to="/about-eaton"
                        onClick={() => setMobileOpen(false)}
                      >
                        Motor Protection (PKZM0®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-eaton"
                        onClick={() => setMobileOpen(false)}
                      >
                        Power Contactors (DILM®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-eaton"
                        onClick={() => setMobileOpen(false)}
                      >
                        Molded Case Breakers (NZM®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-eaton"
                        onClick={() => setMobileOpen(false)}
                      >
                        Miniature Circuit Breakers (FAZ®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-eaton"
                        onClick={() => setMobileOpen(false)}
                      >
                        Control &amp; Signaling (RMQ-TITAN®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-eaton"
                        onClick={() => setMobileOpen(false)}
                      >
                        Variable Speed Drives (POWERXL®)
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Partex Submenu */}
                <li className="dropdown-submenu">
                  <Link
                    to="/about-partex"
                    title="View PARTEX Sweden Make Sheet"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>Partex Products</span>
                    <span>&rarr;</span>
                  </Link>
                  <ul className="submenu-list submenu-partex">
                    <li>
                      <Link
                        to="/about-partex"
                        onClick={() => setMobileOpen(false)}
                      >
                        Closed Wire Markers (PA®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-partex"
                        onClick={() => setMobileOpen(false)}
                      >
                        Clip-on Open Markers (PC®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-partex"
                        onClick={() => setMobileOpen(false)}
                      >
                        Printable Marker Tubing (PO / POZ®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-partex"
                        onClick={() => setMobileOpen(false)}
                      >
                        Stainless Steel 316 Markers (PKS®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-partex"
                        onClick={() => setMobileOpen(false)}
                      >
                        ProMark Thermal Printers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-partex"
                        onClick={() => setMobileOpen(false)}
                      >
                        Cable Ties &amp; Fasteners
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Mennekes Submenu */}
                <li className="dropdown-submenu">
                  <Link
                    to="/about-mennekes"
                    title="View MENNEKES Germany Make Sheet"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>Mennekes Products</span>
                    <span>&rarr;</span>
                  </Link>
                  <ul className="submenu-list submenu-mennekes">
                    <li>
                      <Link
                        to="/about-mennekes"
                        onClick={() => setMobileOpen(false)}
                      >
                        Industrial CEE Plugs (POWERTOP®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-mennekes"
                        onClick={() => setMobileOpen(false)}
                      >
                        Switched Interlocked Sockets (DUO®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-mennekes"
                        onClick={() => setMobileOpen(false)}
                      >
                        Panel Mounted Sockets (MENNEKES®)
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-mennekes"
                        onClick={() => setMobileOpen(false)}
                      >
                        Phase Inverter Reversal Plugs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-mennekes"
                        onClick={() => setMobileOpen(false)}
                      >
                        EverGUM Solid Rubber Distro
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-mennekes"
                        onClick={() => setMobileOpen(false)}
                      >
                        AMAXX® Modular Combinations
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a
                href="#aboutSection"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#aboutSection");
                }}
              >
                About Us
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#contactSection"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contactSection");
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>

          <div className="nav-cta">
            <button
              className="btn-rfq-nav"
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => handleNavClick("#rfqSection")}
            >
              <ArrowDownToLine size={14} strokeWidth={2.5} />
              Request Price List / RFQ
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
