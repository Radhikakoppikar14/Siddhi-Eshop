import React from 'react';
import { Link } from 'react-router-dom';

export const BrandsShowcase: React.FC = () => {
  return (
    <section className="brands-section" id="brandsSection">
      <div className="container">
        <div className="section-title-wrap" style={{ marginBottom: '28px' }}>
          <span className="section-subtitle">Partnerships &amp; Distribution</span>
          <h2 className="section-title" style={{ fontSize: '26px' }}>Our Authorised Brand Partners</h2>
        </div>

        <div className="brands-grid">
          <Link to="/about-lapp" className="brand-partner-card brand-card-lapp">
            <div className="brand-partner-logo-wrap">
              <img src="/images/logo-lapp.png" alt="Lapp Kabel Germany" className="brand-partner-logo" />
            </div>
            <div className="brand-title">LAPP KABEL</div>
            <div className="brand-subtitle">Germany • Cables &amp; Connectors</div>
          </Link>

          <Link to="/about-eaton" className="brand-partner-card brand-card-eaton">
            <div className="brand-partner-logo-wrap">
              <img src="/images/logo-eaton.png" alt="Eaton Moeller" className="brand-partner-logo" />
            </div>
            <div className="brand-title">EATON - MOELLER</div>
            <div className="brand-subtitle">USA • Switchgear &amp; Automation</div>
          </Link>

          <Link to="/about-partex" className="brand-partner-card brand-card-partex">
            <div className="brand-partner-logo-wrap">
              <img src="/images/logo-partex.png" alt="Partex Marking Systems" className="brand-partner-logo" />
            </div>
            <div className="brand-title">PARTEX SWEDEN</div>
            <div className="brand-subtitle">Sweden • Cable Marking Systems</div>
          </Link>

          <Link to="/about-mennekes" className="brand-partner-card brand-card-mennekes">
            <div className="brand-partner-logo-wrap">
              <img src="/images/logo-mennekes.png" alt="Mennekes Germany" className="brand-partner-logo" />
            </div>
            <div className="brand-title">MENNEKES</div>
            <div className="brand-subtitle">Germany • Industrial CEE Plugs</div>
          </Link>
        </div>
      </div>
    </section>
  );
};
