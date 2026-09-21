import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="about-section" id="aboutSection">
      <div className="container">
        <div className="about-header-wrap">
          <span className="about-badge">About Siddhi Kabel</span>
          <h2 className="about-title">Dependable Industrial Electrical &amp; Automation Solutions</h2>
          <p className="about-subtitle">Authorised Distributors for LAPP, EATON, PARTEX &amp; MENNEKES Since 2008</p>
        </div>

        <div className="about-grid">
          {/* Left Column: Story, Specialization, Industries & Metrics */}
          <div className="about-col-left">
            <p className="about-lead">
              Siddhi Kabel was established in the year 2008 by professionals with experience of more than 15 years in providing solutions for various needs of high quality industrial electrical, automation, and safety products.
            </p>

            <p className="about-p">
              Siddhi is one of the leading channel partners of world-class international manufacturers, offering a comprehensive range of genuine products across <strong>Lapp Kabel</strong> (ÖLFLEX® power and control cables, UNITRONIC® data cables, UNIPLUS® single cores, SKINTOP® cable glands, and SILVYN® conduits), <strong>Eaton Moeller</strong> (PKZM0® motor protection breakers, DILM® power contactors, NZM® &amp; FAZ® circuit breakers, and RMQ-Titan control &amp; signaling), <strong>Partex Sweden</strong> (PA® closed wire markers, PC® clip-on markers, PO/POZ® printable sleeves, stainless steel 316 markers, and ProMark printers), and <strong>Mennekes</strong> (PowerTOP® Xtra industrial CEE plugs, DUO® switched interlocked sockets, panel receptacles, and EverGUM &amp; AMAXX power distribution units).
            </p>

            <p className="about-p">
              For many customers Siddhi Kabel is more than a supplier — we combine superior product offerings with unparalleled technical support and supply chain services. Whether it is providing products &amp; services for Machine Tool industries, Pharmaceutical, Process industry, Automotive, Oil &amp; Gas, Chemical &amp; Paint industries, infrastructure projects, or System Integrators, we know our customers are looking for more than a supply of parts and pieces; we focus on addressing our customers' larger business needs.
            </p>

            {/* Key Metrics */}
            <div className="about-metrics-row">
              <div className="about-metric-card">
                <div className="about-metric-val">2008</div>
                <div className="about-metric-lbl">Established Year</div>
              </div>
              <div className="about-metric-card">
                <div className="about-metric-val">15+</div>
                <div className="about-metric-lbl">Years Experience</div>
              </div>
              <div className="about-metric-card">
                <div className="about-metric-val">4 Brands</div>
                <div className="about-metric-lbl">Authorized OEM</div>
              </div>
              <div className="about-metric-card">
                <div className="about-metric-val">Pan-India</div>
                <div className="about-metric-lbl">Express Dispatch</div>
              </div>
            </div>

            {/* Industries Served */}
            <div className="about-industries-box">
              <div className="about-industries-title">Key Industries Served</div>
              <div className="about-industry-tags">
                <span className="about-industry-tag">Machine Tool Industries</span>
                <span className="about-industry-tag">Pharmaceutical</span>
                <span className="about-industry-tag">Process Industries</span>
                <span className="about-industry-tag">Automotive &amp; EV</span>
                <span className="about-industry-tag">Oil &amp; Gas</span>
                <span className="about-industry-tag">Chemical &amp; Paints</span>
                <span className="about-industry-tag">System Integrators</span>
                <span className="about-industry-tag">Turnkey Projects</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authorized Partnerships & Techno-Commercial Expertise */}
          <div className="about-col-right">
            <div className="about-partners-card">
              <div className="about-partners-header">
                <h3 className="about-partners-title">Authorized Manufacturing Partners</h3>
                <p className="about-partners-sub">Direct authorized distributor, dealer, channel partner &amp; importer</p>
              </div>

              <ul className="about-partner-list">
                {/* 1. LAPP */}
                <li className="about-partner-item partner-lapp">
                  <Link to="/about-lapp" style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                    <img src="/images/logo-lapp.png" alt="Lapp India Pvt Ltd" className="about-partner-logo" />
                    <div className="about-partner-info" style={{ flex: 1 }}>
                      <div className="about-partner-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>LAPP INDIA PVT LTD</span>
                        <span style={{ fontSize: '11px', color: '#ff6600', fontWeight: 700 }}>About Profile &rarr;</span>
                      </div>
                      <p className="about-partner-desc">ÖLFLEX® Cables, UNITRONIC®, SKINTOP® Glands &amp; SILVYN® Conduits</p>
                    </div>
                  </Link>
                </li>

                {/* 2. EATON */}
                <li className="about-partner-item partner-eaton">
                  <Link to="/about-eaton" style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                    <img src="/images/logo-eaton.png" alt="Eaton Power Quality Pvt Ltd" className="about-partner-logo" />
                    <div className="about-partner-info" style={{ flex: 1 }}>
                      <div className="about-partner-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>EATON Power Quality Pvt Ltd</span>
                        <span style={{ fontSize: '11px', color: '#005ea6', fontWeight: 700 }}>About Profile &rarr;</span>
                      </div>
                      <p className="about-partner-desc">Moeller Switchgear, PKZM0® Breakers, DILM® Contactors &amp; Automation</p>
                    </div>
                  </Link>
                </li>

                {/* 3. PARTEX */}
                <li className="about-partner-item partner-partex">
                  <Link to="/about-partex" style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                    <img src="/images/logo-partex.png" alt="Partex Marking Systems" className="about-partner-logo" />
                    <div className="about-partner-info" style={{ flex: 1 }}>
                      <div className="about-partner-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>PARTEX Marking Systems</span>
                        <span style={{ fontSize: '11px', color: '#ca8a04', fontWeight: 700 }}>About Profile &rarr;</span>
                      </div>
                      <p className="about-partner-desc">Swedish Wire &amp; Cable Markers, Printable Tubing &amp; ProMark Printers</p>
                    </div>
                  </Link>
                </li>

                {/* 4. MENNEKES */}
                <li className="about-partner-item partner-mennekes">
                  <Link to="/about-mennekes" style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                    <img src="/images/logo-mennekes.png" alt="Mennekes Electric India Pvt Ltd" className="about-partner-logo" />
                    <div className="about-partner-info" style={{ flex: 1 }}>
                      <div className="about-partner-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>MENNEKES Electric India Pvt Ltd</span>
                        <span style={{ fontSize: '11px', color: '#c32125', fontWeight: 700 }}>About Profile &rarr;</span>
                      </div>
                      <p className="about-partner-desc">PowerTOP® Xtra Industrial CEE Plugs, Interlocked Sockets &amp; AMAXX Units</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Techno-Commercial & Sourcing Commitment */}
            <div className="about-service-card">
              <div className="about-service-title">
                <ShieldCheck size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>Techno-Commercial Expertise &amp; Supply Assurance</span>
              </div>
              <p className="about-service-desc">
                We constantly monitor and adjust each program so that when our customers' needs change, our solutions change with them. Our expertise lies in understanding customer requirements and careful analysis of applications to provide the best possible techno-commercial solutions. Our team strives hard in planning and managing best inventory apart from arranging and sourcing materials from our large and reliable network to offer uninterrupted services to our valued customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
