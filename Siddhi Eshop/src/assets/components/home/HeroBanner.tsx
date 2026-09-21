import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../../../context/CartContext";

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;
  const { addToCart } = useCart();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToRfqTopic = (topic: string) => {
    const rfqSec = document.getElementById("rfqSection");
    if (rfqSec) {
      rfqSec.scrollIntoView({ behavior: "smooth" });
      const notes = document.getElementById("rfqNotes") as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Inquiry regarding: ${topic}\n\nPlease share price list, technical datasheet, and delivery timeline.`;
        notes.focus();
      }
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("productsSection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-moglix-section">
      <div className="container">
        <div className="home-banner-container">
          <div className="desktop-banner-section">
            <div className="banner-carousel-wrapper">
              {/* Slide 1: Lapp */}
              <div
                className={`moglix-slide slide-bg-1 ${currentSlide === 0 ? "active" : ""}`}
              >
                <div className="slide-body-split">
                  <div className="slide-text-col">
                    <span className="slide-top-pill">
                      ⚡ MEGA INDUSTRIAL DEAL • LAPP KABEL
                    </span>
                    <h1 className="slide-heading-main">
                      Up to 25% Off on{" "}
                      <span className="highlight-red">
                        ÖLFLEX® &amp; UNITRONIC®
                      </span>{" "}
                      Drums
                    </h1>
                    <p className="slide-paragraph">
                      Special bulk OEM project discount on 500m &amp; 1000m
                      wooden drum orders. Complete with manufacturer test
                      certificates, oil resistance, and same-day Bangalore site
                      dispatch.
                    </p>
                    <div className="slide-action-btns">
                      <button
                        className="btn btn-primary"
                        onClick={scrollToCatalog}
                      >
                        Claim Lapp Deal
                      </button>
                      <button
                        className="btn btn-outline-white"
                        onClick={() => scrollToRfqTopic("LAPP DRUM OFFER")}
                      >
                        Request Drum Pricing
                      </button>
                    </div>
                  </div>
                  <div className="slide-graphic-col">
                    <div className="slide-product-showcase showcase-lapp">
                      <div className="slide-showcase-img-box">
                        <img
                          src="/images/promo-lapp.jpg"
                          alt="Lapp Cables"
                          className="slide-showcase-img"
                        />
                        <span className="slide-img-badge">25% OFF</span>
                      </div>
                      <div className="slide-showcase-info">
                        <div className="slide-showcase-brand-row">
                          <img
                            src="/images/logo-lapp.png"
                            alt="Lapp Logo"
                            className="slide-showcase-brand-logo"
                          />
                          <span className="slide-showcase-origin">Germany</span>
                        </div>
                        <h4 className="slide-showcase-name">
                          ÖLFLEX® CLASSIC 110
                        </h4>
                        <div className="slide-showcase-offer-badge">
                          ⚡ SPECIAL OEM PROJECT RATES
                        </div>
                        <div className="slide-showcase-bullets">
                          <span>✓ 300/500V VDE Certified</span>
                          <span>✓ Flame Retardant &amp; Oil Resistant</span>
                          <span>✓ Bangalore Ready Stock</span>
                        </div>
                        <button
                          className="btn btn-primary btn-sm slide-showcase-btn"
                          onClick={() => addToCart("lapp-01")}
                        >
                          Quick Add to RFQ Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 2: Eaton */}
              <div
                className={`moglix-slide slide-bg-2 ${currentSlide === 1 ? "active" : ""}`}
              >
                <div className="slide-body-split">
                  <div className="slide-text-col">
                    <span className="slide-top-pill">
                      ⚡ PANEL BUILDER SPECIAL • EATON MOELLER
                    </span>
                    <h1 className="slide-heading-main">
                      Flat 18% Off on{" "}
                      <span className="highlight-red">
                        PKZM0 Breakers &amp; Contactors
                      </span>
                    </h1>
                    <p className="slide-paragraph">
                      Equip your motor control centers with genuine Eaton
                      Moeller motor-protective circuit breakers, DILM
                      contactors, and SmartWire-DT automation packages.
                    </p>
                    <div className="slide-action-btns">
                      <button
                        className="btn btn-primary"
                        onClick={scrollToCatalog}
                      >
                        Claim Eaton Deal
                      </button>
                      <button
                        className="btn btn-outline-white"
                        onClick={() => scrollToRfqTopic("EATON COMBO OFFER")}
                      >
                        Combo Quotation
                      </button>
                    </div>
                  </div>
                  <div className="slide-graphic-col">
                    <div className="slide-product-showcase showcase-eaton">
                      <div className="slide-showcase-img-box">
                        <img
                          src="/images/promo-eaton.jpg"
                          alt="Eaton Switchgear"
                          className="slide-showcase-img"
                        />
                        <span className="slide-img-badge">18% OFF</span>
                      </div>
                      <div className="slide-showcase-info">
                        <div className="slide-showcase-brand-row">
                          <img
                            src="/images/logo-eaton.svg"
                            alt="Eaton Logo"
                            className="slide-showcase-brand-logo"
                          />
                          <span className="slide-showcase-origin">
                            USA / Germany
                          </span>
                        </div>
                        <h4 className="slide-showcase-name">
                          PKZM0 + DILM Contactor
                        </h4>
                        <div className="slide-showcase-offer-badge">
                          ⚡ PANEL BUILDER ADVANTAGE
                        </div>
                        <div className="slide-showcase-bullets">
                          <span>✓ 150 kA Short Circuit Capacity</span>
                          <span>✓ IEC/EN 60947, VDE 0660 Standards</span>
                          <span>✓ Combo Starter Pack in Stock</span>
                        </div>
                        <button
                          className="btn btn-primary btn-sm slide-showcase-btn"
                          onClick={() => addToCart("eaton-01")}
                        >
                          Quick Add to RFQ Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 3: Partex */}
              <div
                className={`moglix-slide slide-bg-3 ${currentSlide === 2 ? "active" : ""}`}
              >
                <div className="slide-body-split">
                  <div className="slide-text-col">
                    <span className="slide-top-pill">
                      ⚡ SWEDISH PRECISION • PARTEX MARKING
                    </span>
                    <h1 className="slide-heading-main">
                      Special Offer on{" "}
                      <span className="highlight-red">
                        Partex Markers &amp; Printers
                      </span>
                    </h1>
                    <p className="slide-paragraph">
                      Complete cable identification systems: PA closed chevron
                      wire markers, PO/POZ sleeves, and ProMark T-1000 thermal
                      printers. Free sample kit with every bulk RFQ.
                    </p>
                    <div className="slide-action-btns">
                      <button
                        className="btn btn-primary"
                        onClick={scrollToCatalog}
                      >
                        Claim Partex Deal
                      </button>
                      <button
                        className="btn btn-outline-white"
                        onClick={() => scrollToRfqTopic("PARTEX SAMPLE KIT")}
                      >
                        Get Free Sample Kit
                      </button>
                    </div>
                  </div>
                  <div className="slide-graphic-col">
                    <div className="slide-product-showcase showcase-partex">
                      <div className="slide-showcase-img-box">
                        <img
                          src="/images/promo-partex.jpg"
                          alt="Partex Marking"
                          className="slide-showcase-img"
                        />
                        <span className="slide-img-badge">FREE SAMPLE</span>
                      </div>
                      <div className="slide-showcase-info">
                        <div className="slide-showcase-brand-row">
                          <img
                            src="/images/logo-partex.png"
                            alt="Partex Logo"
                            className="slide-showcase-brand-logo"
                          />
                          <span className="slide-showcase-origin">Sweden</span>
                        </div>
                        <h4 className="slide-showcase-name">
                          Partex Wire Markers &amp; T-1000
                        </h4>
                        <div className="slide-showcase-offer-badge">
                          ⚡ SWEDISH WIRE MARKING OFFER
                        </div>
                        <div className="slide-showcase-bullets">
                          <span>✓ Chevron-Cut Interlocking Grip</span>
                          <span>✓ UL94-V0 Self-Extinguishing PVC</span>
                          <span>✓ ProMark T-1000 Printer Kits</span>
                        </div>
                        <button
                          className="btn btn-primary btn-sm slide-showcase-btn"
                          onClick={() => addToCart("partex-01")}
                        >
                          Quick Add to RFQ Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 4: Mennekes */}
              <div
                className={`moglix-slide slide-bg-4 ${currentSlide === 3 ? "active" : ""}`}
              >
                <div className="slide-body-split">
                  <div className="slide-text-col">
                    <span className="slide-top-pill">
                      ⚡ GERMAN ENGINEERING • MENNEKES CEE
                    </span>
                    <h1 className="slide-heading-main">
                      Direct OEM Box Rates on{" "}
                      <span className="highlight-red">
                        IP44 &amp; IP67 Plugs
                      </span>
                    </h1>
                    <p className="slide-paragraph">
                      World leader in industrial plugs and sockets, EverGUM
                      distribution enclosures, and watertight connectors for
                      extreme industrial environments.
                    </p>
                    <div className="slide-action-btns">
                      <button
                        className="btn btn-primary"
                        onClick={scrollToCatalog}
                      >
                        Claim Mennekes Deal
                      </button>
                      <button
                        className="btn btn-outline-white"
                        onClick={() => scrollToRfqTopic("MENNEKES BULK BOX")}
                      >
                        Bulk Box RFQ
                      </button>
                    </div>
                  </div>
                  <div className="slide-graphic-col">
                    <div className="slide-product-showcase showcase-mennekes">
                      <div className="slide-showcase-img-box">
                        <img
                          src="/images/promo-mennekes.jpg"
                          alt="Mennekes Plugs"
                          className="slide-showcase-img"
                        />
                        <span className="slide-img-badge">OEM BOX RATE</span>
                      </div>
                      <div className="slide-showcase-info">
                        <div className="slide-showcase-brand-row">
                          <img
                            src="/images/logo-mennekes.png"
                            alt="Mennekes Logo"
                            className="slide-showcase-brand-logo"
                          />
                          <span className="slide-showcase-origin">Germany</span>
                        </div>
                        <h4 className="slide-showcase-name">
                          CEE 16A &amp; 32A (IP44 / IP67)
                        </h4>
                        <div className="slide-showcase-offer-badge">
                          ⚡ FACTORY BOX TIERED RATES
                        </div>
                        <div className="slide-showcase-bullets">
                          <span>✓ Impact-Resistant Polyamide 6</span>
                          <span>✓ Nickel-Plated Brass Pins</span>
                          <span>✓ Bulk Pack Project Discounts</span>
                        </div>
                        <button
                          className="btn btn-primary btn-sm slide-showcase-btn"
                          onClick={() => addToCart("menn-01")}
                        >
                          Quick Add to RFQ Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              className="banner-nav-arrow prev-arrow"
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              className="banner-nav-arrow next-arrow"
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>

            {/* Progress Indicators */}
            <div className="carousel-progress">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`progress-item ${idx === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(idx)}
                >
                  <div className="progress-fill" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
