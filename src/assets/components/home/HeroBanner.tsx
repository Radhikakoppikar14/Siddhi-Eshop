import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../../../context/CartContext";

interface HeroSlide {
  id: string;
  bgClass: string;
  showcaseClass: string;
  pill: string;
  headingPre: string;
  headingHighlight: string;
  headingPost?: string;
  paragraph: string;
  primaryLabel: string;
  secondaryLabel: string;
  rfqTopic: string;
  img: string;
  imgAlt: string;
  imgBadge: string;
  logo: string;
  logoAlt: string;
  origin: string;
  name: string;
  offer: string;
  bullets: string[];
  cartId: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: "lapp",
    bgClass: "slide-bg-1",
    showcaseClass: "showcase-lapp",
    pill: "⚡ MEGA INDUSTRIAL DEAL • LAPP KABEL",
    headingPre: "Up to 25% Off on",
    headingHighlight: "ÖLFLEX® & UNITRONIC®",
    headingPost: "Drums",
    paragraph:
      "Special bulk OEM project discount on 500m & 1000m wooden drum orders. Complete with manufacturer test certificates, oil resistance, and same-day Bangalore site dispatch.",
    primaryLabel: "Claim Lapp Deal",
    secondaryLabel: "Request Drum Pricing",
    rfqTopic: "LAPP DRUM OFFER",
    img: "/images/promo-lapp.jpg",
    imgAlt: "Lapp Cables",
    imgBadge: "25% OFF",
    logo: "/images/logo-lapp.png",
    logoAlt: "Lapp Logo",
    origin: "Germany",
    name: "ÖLFLEX® CLASSIC 110",
    offer: "⚡ SPECIAL OEM PROJECT RATES",
    bullets: [
      "✓ 300/500V VDE Certified",
      "✓ Flame Retardant & Oil Resistant",
      "✓ Bangalore Ready Stock",
    ],
    cartId: "lapp-01",
  },
  {
    id: "eaton",
    bgClass: "slide-bg-2",
    showcaseClass: "showcase-eaton",
    pill: "⚡ PANEL BUILDER SPECIAL • EATON MOELLER",
    headingPre: "Flat 18% Off on",
    headingHighlight: "PKZM0 Breakers & Contactors",
    paragraph:
      "Equip your motor control centers with genuine Eaton Moeller motor-protective circuit breakers, DILM contactors, and SmartWire-DT automation packages.",
    primaryLabel: "Claim Eaton Deal",
    secondaryLabel: "Combo Quotation",
    rfqTopic: "EATON COMBO OFFER",
    img: "/images/promo-eaton.jpg",
    imgAlt: "Eaton Switchgear",
    imgBadge: "18% OFF",
    logo: "/images/logo-eaton.svg",
    logoAlt: "Eaton Logo",
    origin: "USA / Germany",
    name: "PKZM0 + DILM Contactor",
    offer: "⚡ PANEL BUILDER ADVANTAGE",
    bullets: [
      "✓ 150 kA Short Circuit Capacity",
      "✓ IEC/EN 60947, VDE 0660 Standards",
      "✓ Combo Starter Pack in Stock",
    ],
    cartId: "eaton-01",
  },
  {
    id: "partex",
    bgClass: "slide-bg-3",
    showcaseClass: "showcase-partex",
    pill: "⚡ SWEDISH PRECISION • PARTEX MARKING",
    headingPre: "Special Offer on",
    headingHighlight: "Partex Markers & Printers",
    paragraph:
      "Complete cable identification systems: PA closed chevron wire markers, PO/POZ sleeves, and ProMark T-1000 thermal printers. Free sample kit with every bulk RFQ.",
    primaryLabel: "Claim Partex Deal",
    secondaryLabel: "Get Free Sample Kit",
    rfqTopic: "PARTEX SAMPLE KIT",
    img: "/images/promo-partex.jpg",
    imgAlt: "Partex Marking",
    imgBadge: "FREE SAMPLE",
    logo: "/images/logo-partex.png",
    logoAlt: "Partex Logo",
    origin: "Sweden",
    name: "Partex Wire Markers & T-1000",
    offer: "⚡ SWEDISH WIRE MARKING OFFER",
    bullets: [
      "✓ Chevron-Cut Interlocking Grip",
      "✓ UL94-V0 Self-Extinguishing PVC",
      "✓ ProMark T-1000 Printer Kits",
    ],
    cartId: "partex-01",
  },
  {
    id: "mennekes",
    bgClass: "slide-bg-4",
    showcaseClass: "showcase-mennekes",
    pill: "⚡ GERMAN ENGINEERING • MENNEKES CEE",
    headingPre: "Direct OEM Box Rates on",
    headingHighlight: "IP44 & IP67 Plugs",
    paragraph:
      "World leader in industrial plugs and sockets, EverGUM distribution enclosures, and watertight connectors for extreme industrial environments.",
    primaryLabel: "Claim Mennekes Deal",
    secondaryLabel: "Bulk Box RFQ",
    rfqTopic: "MENNEKES BULK BOX",
    img: "/images/promo-mennekes.jpg",
    imgAlt: "Mennekes Plugs",
    imgBadge: "OEM BOX RATE",
    logo: "/images/logo-mennekes.png",
    logoAlt: "Mennekes Logo",
    origin: "Germany",
    name: "CEE 16A & 32A (IP44 / IP67)",
    offer: "⚡ FACTORY BOX TIERED RATES",
    bullets: [
      "✓ Impact-Resistant Polyamide 6",
      "✓ Nickel-Plated Brass Pins",
      "✓ Bulk Pack Project Discounts",
    ],
    cartId: "menn-01",
  },
];

const AUTOPLAY_MS = 5000;

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = SLIDES.length;
  const { addToCart } = useCart();

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((idx: number) => {
    setCurrentSlide(idx);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  };

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
    <section className="hero-moglix-section" id="heroBanner">
      <style>{`
        @keyframes heroTimerFill {
          from { width: 0; }
          to { width: 100%; }
        }

        /* Stable crossfade & mobile stacking layout */
        @media (max-width: 768px) {
          #heroBanner .home-banner-container,
          #heroBanner .desktop-banner-section {
            position: relative !important;
            height: auto !important;
            min-height: 0 !important;
          }
          #heroBanner .banner-carousel-wrapper {
            display: grid !important;
            grid-template-columns: 1fr !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: 12px !important;
          }
          #heroBanner .moglix-slide {
            grid-area: 1 / 1 !important;
            position: relative !important;
            display: none !important;
            width: 100% !important;
            height: auto !important;
            opacity: 0 !important;
            transition: opacity 0.3s ease-in-out !important;
          }
          #heroBanner .moglix-slide.active {
            display: block !important;
            opacity: 1 !important;
          }
          #heroBanner .slide-body-split {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
            padding: 20px 14px 56px !important;
            box-sizing: border-box !important;
          }
          #heroBanner .slide-text-col {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          #heroBanner .slide-top-pill {
            display: inline-block !important;
            margin: 0 0 12px 0 !important;
            padding: 6px 12px !important;
            font-size: 10px !important;
            text-align: center !important;
          }
          #heroBanner .slide-heading-main {
            margin: 0 0 10px 0 !important;
            font-size: 20px !important;
            line-height: 1.25 !important;
            text-align: center !important;
          }
          #heroBanner .slide-paragraph {
            margin: 0 0 14px 0 !important;
            font-size: 12px !important;
            line-height: 1.55 !important;
            text-align: center !important;
          }
          #heroBanner .slide-action-btns {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
            width: 100% !important;
          }
          #heroBanner .slide-action-btns .btn {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            padding: 10px 12px !important;
            font-size: 11.5px !important;
          }
          #heroBanner .slide-product-showcase {
            display: flex !important;
            flex-direction: row !important;
            align-items: stretch !important;
            gap: 10px !important;
            width: 100% !important;
            padding: 10px !important;
            box-sizing: border-box !important;
            text-align: left !important;
          }
          #heroBanner .slide-showcase-img-box {
            position: relative !important;
            flex: 0 0 68px !important;
            width: 68px !important;
            min-height: 118px !important;
            border-radius: 8px !important;
            overflow: hidden !important;
          }
          #heroBanner .slide-showcase-img {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          #heroBanner .slide-img-badge {
            position: absolute !important;
            top: 4px !important;
            left: 4px !important;
            z-index: 2 !important;
            padding: 2px 5px !important;
            font-size: 8px !important;
          }
          #heroBanner .slide-showcase-info {
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
            flex: 1 1 auto !important;
            min-width: 0 !important;
          }
          #heroBanner .slide-showcase-brand-row {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 8px !important;
          }
          #heroBanner .slide-showcase-brand-logo {
            max-width: 70% !important;
            height: 16px !important;
            object-fit: contain !important;
          }
          #heroBanner .slide-showcase-origin {
            font-size: 9.5px !important;
            white-space: nowrap !important;
          }
          #heroBanner .slide-showcase-name {
            margin: 0 !important;
            font-size: 13px !important;
          }
          #heroBanner .slide-showcase-offer-badge {
            padding: 4px 7px !important;
            font-size: 9px !important;
            text-align: center !important;
          }
          #heroBanner .slide-showcase-bullets {
            display: flex !important;
            flex-direction: column !important;
            gap: 3px !important;
            font-size: 10.5px !important;
          }
          #heroBanner .slide-showcase-btn {
            width: 100% !important;
            margin-top: 2px !important;
            padding: 8px 10px !important;
            font-size: 10.5px !important;
          }
          #heroBanner .banner-nav-arrow {
            position: absolute !important;
            bottom: 8px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 34px !important;
            height: 34px !important;
            border-radius: 50% !important;
            border: 1px solid rgba(255, 255, 255, 0.22) !important;
            background: rgba(255, 255, 255, 0.12) !important;
            color: #ffffff !important;
            z-index: 6 !important;
            cursor: pointer;
          }
          #heroBanner .banner-nav-arrow.prev-arrow {
            left: 12px !important;
          }
          #heroBanner .banner-nav-arrow.next-arrow {
            right: 12px !important;
          }
          #heroBanner .carousel-progress {
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 23px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 6px !important;
            z-index: 5 !important;
            pointer-events: none;
          }
          #heroBanner .progress-item {
            position: relative !important;
            width: 18px !important;
            height: 4px !important;
            border-radius: 999px !important;
            background: rgba(255, 255, 255, 0.28) !important;
            pointer-events: auto;
            cursor: pointer;
            transition: width 0.3s ease !important;
          }
          #heroBanner .progress-item.active {
            width: 38px !important;
          }
          #heroBanner .progress-fill {
            display: block;
            width: 0;
            height: 100%;
            border-radius: inherit;
            background: #ff5257;
          }
          #heroBanner .progress-item.active .progress-fill {
            animation: heroTimerFill var(--hero-autoplay, 5000ms) linear forwards;
          }
        }

        @media (min-width: 480px) and (max-width: 768px) {
          #heroBanner .slide-action-btns {
            flex-direction: row !important;
          }
          #heroBanner .slide-action-btns .btn {
            flex: 1 1 0 !important;
          }
          #heroBanner .slide-graphic-col {
            max-width: 520px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>

      <div className="container">
        <div className="home-banner-container">
          <div className="desktop-banner-section">
            <div
              className="banner-carousel-wrapper"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`moglix-slide ${slide.bgClass} ${
                    currentSlide === idx ? "active" : ""
                  }`}
                >
                  <div className="slide-body-split">
                    <div className="slide-text-col">
                      <span className="slide-top-pill">{slide.pill}</span>
                      <h1 className="slide-heading-main">
                        {slide.headingPre}{" "}
                        <span className="highlight-red">
                          {slide.headingHighlight}
                        </span>
                        {slide.headingPost ? ` ${slide.headingPost}` : null}
                      </h1>
                      <p className="slide-paragraph">{slide.paragraph}</p>
                      <div className="slide-action-btns">
                        <button
                          className="btn btn-primary"
                          onClick={scrollToCatalog}
                        >
                          {slide.primaryLabel}
                        </button>
                        <button
                          className="btn btn-outline-white"
                          onClick={() => scrollToRfqTopic(slide.rfqTopic)}
                        >
                          {slide.secondaryLabel}
                        </button>
                      </div>
                    </div>
                    <div className="slide-graphic-col">
                      <div
                        className={`slide-product-showcase ${slide.showcaseClass}`}
                      >
                        <div className="slide-showcase-img-box">
                          <img
                            src={slide.img}
                            alt={slide.imgAlt}
                            className="slide-showcase-img"
                          />
                          <span className="slide-img-badge">
                            {slide.imgBadge}
                          </span>
                        </div>
                        <div className="slide-showcase-info">
                          <div className="slide-showcase-brand-row">
                            <img
                              src={slide.logo}
                              alt={slide.logoAlt}
                              className="slide-showcase-brand-logo"
                            />
                            <span className="slide-showcase-origin">
                              {slide.origin}
                            </span>
                          </div>
                          <h4 className="slide-showcase-name">{slide.name}</h4>
                          <div className="slide-showcase-offer-badge">
                            {slide.offer}
                          </div>
                          <div className="slide-showcase-bullets">
                            {slide.bullets.map((b) => (
                              <span key={b}>{b}</span>
                            ))}
                          </div>
                          <button
                            className="btn btn-primary btn-sm slide-showcase-btn"
                            onClick={() => addToCart(slide.cartId)}
                          >
                            Quick Add to RFQ Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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

            <div
              className="carousel-progress"
              style={{ "--hero-autoplay": `${AUTOPLAY_MS}ms` } as React.CSSProperties}
            >
              {SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`progress-item ${idx === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to slide ${idx + 1}`}
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