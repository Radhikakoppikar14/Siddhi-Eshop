import React from 'react';
import { Link } from 'react-router-dom';

export const PromoCards: React.FC = () => {
  return (
    <div className="container">
      <div className="category-subBanner" style={{ marginTop: '20px' }}>
        {/* 1. Lapp Cables Offer Box */}
        <Link to="/about-lapp" className="moglix-promo-card card-bg-lapp" title="View LAPP India Products & Solutions">
          <div className="promo-card-left">
            <div className="promo-brand-logo-wrap">
              <img src="/images/logo-lapp.png" alt="Lapp Kabel" className="promo-brand-logo" />
            </div>
            <div className="promo-slogan">
              Reliable Connection Solutions<br />for Industrial Projects
            </div>
            <div className="promo-shop-btn">
              SHOP NOW
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
          </div>
          <div className="promo-card-right">
            <img src="/images/promo-lapp.jpg" alt="Lapp Industrial Cables" className="promo-product-img" />
          </div>
        </Link>

        {/* 2. Eaton Switchgear Offer Box */}
        <Link to="/about-eaton" className="moglix-promo-card card-bg-eaton" title="View Eaton Moeller Switchgear">
          <div className="promo-card-left">
            <div className="promo-brand-logo-wrap">
              <img src="/images/logo-eaton.png" alt="Eaton Moeller" className="promo-brand-logo" />
            </div>
            <div className="promo-slogan">
              Powering Business Worldwide<br />Switchgear &amp; Controls
            </div>
            <div className="promo-shop-btn">
              SHOP NOW
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
          </div>
          <div className="promo-card-right">
            <img src="/images/promo-eaton.jpg" alt="Eaton PKZM0 Switchgear" className="promo-product-img" />
          </div>
        </Link>

        {/* 3. Partex Marking Systems Offer Box */}
        <Link to="/about-partex" className="moglix-promo-card card-bg-partex" title="View Partex Sweden Marking Systems">
          <div className="promo-card-left">
            <div className="promo-brand-logo-wrap">
              <img src="/images/logo-partex.png" alt="Partex Marking" className="promo-brand-logo" />
            </div>
            <div className="promo-slogan">
              Marking Systems<br />Swedish Wire Markers
            </div>
            <div className="promo-shop-btn">
              SHOP NOW
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
          </div>
          <div className="promo-card-right">
            <img src="/images/promo-partex.jpg" alt="Partex Wire Markers & Printer" className="promo-product-img" />
          </div>
        </Link>

        {/* 4. Mennekes CEE Plugs Offer Box */}
        <Link to="/about-mennekes" className="moglix-promo-card card-bg-mennekes" title="View MENNEKES Germany Industrial Plugs">
          <div className="promo-card-left">
            <div className="promo-brand-logo-wrap">
              <img src="/images/logo-mennekes.png" alt="Mennekes" className="promo-brand-logo" />
            </div>
            <div className="promo-slogan">
              Plugs for the world<br />Heavy-Duty IP44 / IP67
            </div>
            <div className="promo-shop-btn">
              SHOP NOW
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
          </div>
          <div className="promo-card-right">
            <img src="/images/promo-mennekes.jpg" alt="Mennekes CEE Plugs" className="promo-product-img" />
          </div>
        </Link>
      </div>
    </div>
  );
};
