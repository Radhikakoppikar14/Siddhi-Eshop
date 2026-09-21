import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const BrandPortfolio: React.FC = () => {
  const [lappFilter, setLappFilter] = useState('all');
  const [eatonFilter, setEatonFilter] = useState('all');
  const [partexFilter, setPartexFilter] = useState('all');
  const [mennekesFilter, setMennekesFilter] = useState('all');

  const scrollToRfqTopic = (topic: string) => {
    const rfqSec = document.getElementById('rfqSection');
    if (rfqSec) {
      rfqSec.scrollIntoView({ behavior: 'smooth' });
      const notes = document.getElementById('rfqNotes') as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Inquiry regarding: ${topic}\n\nPlease share price list, technical datasheet, and delivery timeline.`;
        notes.focus();
      }
    }
  };

  return (
    <>
      {/* 1. LAPP KABEL GERMANY PORTFOLIO */}
      <section className="lapp-portfolio-section" id="lappPortfolioSection">
        <div className="container">
          <div className="lapp-header-row">
            <div>
              <div className="brand-header-title-wrap">
                <Link to="/about-lapp" className="brand-header-logo-box" title="View About LAPP India (Official Profile)">
                  <img src="/images/logo-lapp.png" alt="Lapp" className="brand-header-logo-img" />
                </Link>
                <h2 className="section-title">Products</h2>
                <Link
                  to="/about-lapp"
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#ff6600',
                    textDecoration: 'none',
                    background: '#fff7ed',
                    border: '1px solid #fed7aa',
                    padding: '3px 9px',
                    borderRadius: '12px',
                    marginLeft: '6px'
                  }}
                >
                  About Lapp &rarr;
                </Link>
              </div>
              <p className="section-desc" style={{ textAlign: 'left', margin: '6px 0 0', fontSize: '13.5px', color: '#64748b', maxWidth: 'none', width: '100%', whiteSpace: 'nowrap' }}>
                World leader in integrated cable technology: ÖLFLEX® cables, UNITRONIC® data cables, SKINTOP® glands, SILVYN® conduits, and industrial single cores.
              </p>
            </div>
          </div>

          {/* Lapp Filter Tabs */}
          <div className="lapp-tabs-bar">
            <button className={`lapp-tab-btn ${lappFilter === 'all' ? 'active' : ''}`} onClick={() => setLappFilter('all')}>All Lapp Products (6)</button>
            <button className={`lapp-tab-btn ${lappFilter === 'cables' ? 'active' : ''}`} onClick={() => setLappFilter('cables')}>Power &amp; Control Cables</button>
            <button className={`lapp-tab-btn ${lappFilter === 'data' ? 'active' : ''}`} onClick={() => setLappFilter('data')}>Data Communication</button>
            <button className={`lapp-tab-btn ${lappFilter === 'single-cores' ? 'active' : ''}`} onClick={() => setLappFilter('single-cores')}>Cabinet Single Cores</button>
            <button className={`lapp-tab-btn ${lappFilter === 'glands' ? 'active' : ''}`} onClick={() => setLappFilter('glands')}>Glands &amp; Counter Nuts</button>
            <button className={`lapp-tab-btn ${lappFilter === 'conduits' ? 'active' : ''}`} onClick={() => setLappFilter('conduits')}>Rill, Conduit &amp; Klick</button>
            <button className={`lapp-tab-btn ${lappFilter === 'domestic' ? 'active' : ''}`} onClick={() => setLappFilter('domestic')}>Domestic / House Wiring</button>
          </div>

          <div className="lapp-carousel-container">
            <div className="lapp-cards-grid" id="lappCardsGrid">
              {(lappFilter === 'all' || lappFilter === 'cables') && (
                <Link to="/olflex-cables" className="lapp-photo-card" data-cat="cables" title="View ÖLFLEX® Power & Control Cables Sheet">
                  <img src="/images/card-olflex.jpg" alt="Power and control cables" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="lapp-photo-card-content">
                    <span className="lapp-card-brand-tag">ÖLFLEX®</span>
                    <h3 className="lapp-card-title">Power and Control Cables</h3>
                    <p className="lapp-card-subtitle">ÖLFLEX® CLASSIC 110, 110 SY, 110 CY, 100 I flexible cabling</p>
                    <span className="lapp-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(lappFilter === 'all' || lappFilter === 'data') && (
                <Link to="/about-lapp" className="lapp-photo-card" data-cat="data">
                  <img src="/images/card-unitronic.jpg" alt="Data communication cables" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="lapp-photo-card-content">
                    <span className="lapp-card-brand-tag">UNITRONIC®</span>
                    <h3 className="lapp-card-title">Data Communication Cables</h3>
                    <p className="lapp-card-subtitle">LiYY, LIYCY and LIYY(TP), LIYCY (TP)</p>
                    <span className="lapp-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(lappFilter === 'all' || lappFilter === 'single-cores') && (
                <Link to="/about-lapp" className="lapp-photo-card" data-cat="single-cores">
                  <img src="/images/card-uniplus.jpg" alt="Control cabinet Single cores" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="lapp-photo-card-content">
                    <span className="lapp-card-brand-tag">UNIPLUS®</span>
                    <h3 className="lapp-card-title">Control Cabinet Single Cores</h3>
                    <p className="lapp-card-subtitle">UNIPLUS® FR, FRLS flexible single cores</p>
                    <span className="lapp-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(lappFilter === 'all' || lappFilter === 'glands') && (
                <a href="#rfqSection" className="lapp-photo-card" data-cat="glands" onClick={(e) => { e.preventDefault(); scrollToRfqTopic('LAPP GLANDS AND COUNTER NUTS'); }}>
                  <img src="/images/card-skintop.jpg" alt="Cable Glands and Counter Nuts" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="lapp-photo-card-content">
                    <span className="lapp-card-brand-tag">SKINTOP®</span>
                    <h3 className="lapp-card-title">Cable Glands &amp; Counter Nuts</h3>
                    <p className="lapp-card-subtitle">SKINTOP® glands &amp; SKINDICHT® counter nuts (Metric &amp; PG)</p>
                    <span className="lapp-card-arrow">&rarr;</span>
                  </div>
                </a>
              )}

              {(lappFilter === 'all' || lappFilter === 'conduits') && (
                <a href="#rfqSection" className="lapp-photo-card" data-cat="conduits" onClick={(e) => { e.preventDefault(); scrollToRfqTopic('LAPP RILL CONDUIT AND KLICK'); }}>
                  <img src="/images/card-conduit.jpg" alt="Rill, Conduit and Klick" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="lapp-photo-card-content">
                    <span className="lapp-card-brand-tag">SILVYN®</span>
                    <h3 className="lapp-card-title">Rill, Conduit &amp; Klick</h3>
                    <p className="lapp-card-subtitle">SILVYN® RILL conduits &amp; SILVYN® KLICK connectors</p>
                    <span className="lapp-card-arrow">&rarr;</span>
                  </div>
                </a>
              )}

              {(lappFilter === 'all' || lappFilter === 'domestic') && (
                <a href="#rfqSection" className="lapp-photo-card" data-cat="domestic" onClick={(e) => { e.preventDefault(); scrollToRfqTopic('LAPP INFRA HOUSE WIRING'); }}>
                  <img src="/images/card-infra.jpg" alt="Domestic House Wiring" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="lapp-photo-card-content">
                    <span className="lapp-card-brand-tag">LAPP INFRA</span>
                    <h3 className="lapp-card-title">Domestic / House Wiring</h3>
                    <p className="lapp-card-subtitle">LAPP INFRA Flame Retardant (FR-LSH) building wires</p>
                    <span className="lapp-card-arrow">&rarr;</span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. EATON MOELLER PORTFOLIO */}
      <section className="brand-portfolio-section brand-eaton" id="eatonPortfolioSection">
        <div className="container">
          <div className="lapp-header-row">
            <div>
              <div className="brand-header-title-wrap">
                <Link to="/about-eaton" className="brand-header-logo-box" title="View Eaton Profile">
                  <img src="/images/logo-eaton.png" alt="Eaton" className="brand-header-logo-img" />
                </Link>
                <h2 className="section-title">Products</h2>
                <Link
                  to="/about-eaton"
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#005ea6',
                    textDecoration: 'none',
                    background: '#e0f2fe',
                    border: '1px solid #bae6fd',
                    padding: '3px 9px',
                    borderRadius: '12px',
                    marginLeft: '6px'
                  }}
                >
                  About Eaton &rarr;
                </Link>
              </div>
              <p className="section-desc" style={{ textAlign: 'left', margin: '6px 0 0', fontSize: '13.5px', color: '#64748b', maxWidth: 'none', width: '100%', whiteSpace: 'nowrap' }}>
                Powering Business Worldwide: PKZM0 motor protection, DILM contactors, NZM breakers, and industrial control.
              </p>
            </div>
          </div>

          <div className="lapp-tabs-bar">
            <button className={`brand-tab-btn ${eatonFilter === 'all' ? 'active' : ''}`} onClick={() => setEatonFilter('all')}>All Eaton Products (6)</button>
            <button className={`brand-tab-btn ${eatonFilter === 'motor-protection' ? 'active' : ''}`} onClick={() => setEatonFilter('motor-protection')}>Motor Protection</button>
            <button className={`brand-tab-btn ${eatonFilter === 'contactors' ? 'active' : ''}`} onClick={() => setEatonFilter('contactors')}>Power Contactors</button>
            <button className={`brand-tab-btn ${eatonFilter === 'mccb' ? 'active' : ''}`} onClick={() => setEatonFilter('mccb')}>Circuit Breakers</button>
            <button className={`brand-tab-btn ${eatonFilter === 'mcb' ? 'active' : ''}`} onClick={() => setEatonFilter('mcb')}>Miniature Breakers</button>
            <button className={`brand-tab-btn ${eatonFilter === 'pilot-devices' ? 'active' : ''}`} onClick={() => setEatonFilter('pilot-devices')}>Control &amp; Signaling</button>
            <button className={`brand-tab-btn ${eatonFilter === 'drives' ? 'active' : ''}`} onClick={() => setEatonFilter('drives')}>Variable Drives</button>
          </div>

          <div className="lapp-carousel-container">
            <div className="lapp-cards-grid brand-cards-grid" id="eatonCardsGrid">
              {(eatonFilter === 'all' || eatonFilter === 'motor-protection') && (
                <Link to="/about-eaton" className="brand-photo-card" data-cat="motor-protection">
                  <img src="/images/eaton-pkzm0.jpg" alt="PKZM0 Motor-Protective Breakers" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">PKZM0®</span>
                    <h3 className="brand-card-title">Motor-Protective Breakers</h3>
                    <p className="brand-card-subtitle">PKZM0 &amp; PKZM4 rotary motor starters up to 65A</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(eatonFilter === 'all' || eatonFilter === 'contactors') && (
                <Link to="/about-eaton" className="brand-photo-card" data-cat="contactors">
                  <img src="/images/eaton-dilm.jpg" alt="DILM Power Contactors" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">DILM®</span>
                    <h3 className="brand-card-title">Power Contactors &amp; Relays</h3>
                    <p className="brand-card-subtitle">DILM 3-pole &amp; 4-pole contactors 7A to 1000A</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(eatonFilter === 'all' || eatonFilter === 'mccb') && (
                <Link to="/about-eaton" className="brand-photo-card" data-cat="mccb">
                  <img src="/images/eaton-nzm.jpg" alt="NZM Molded Case Circuit Breakers" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">NZM®</span>
                    <h3 className="brand-card-title">Molded Case Circuit Breakers</h3>
                    <p className="brand-card-subtitle">NZM1 to NZM4 compact MCCB up to 1600A</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(eatonFilter === 'all' || eatonFilter === 'mcb') && (
                <Link to="/about-eaton" className="brand-photo-card" data-cat="mcb">
                  <img src="/images/eaton-faz.jpg" alt="FAZ Miniature Circuit Breakers" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">FAZ®</span>
                    <h3 className="brand-card-title">Miniature Circuit Breakers</h3>
                    <p className="brand-card-subtitle">FAZ industrial DIN-rail MCB 0.5A to 63A 15kA</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(eatonFilter === 'all' || eatonFilter === 'pilot-devices') && (
                <Link to="/about-eaton" className="brand-photo-card" data-cat="pilot-devices">
                  <img src="/images/eaton-rmq.jpg" alt="RMQ-TITAN Push Buttons" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">RMQ-TITAN®</span>
                    <h3 className="brand-card-title">Push Buttons &amp; Pilot Lights</h3>
                    <p className="brand-card-subtitle">M22 22mm pilot lights, selectors &amp; e-stops</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(eatonFilter === 'all' || eatonFilter === 'drives') && (
                <Link to="/about-eaton" className="brand-photo-card" data-cat="drives">
                  <img src="/images/eaton-drives.jpg" alt="PowerXL Variable Speed Drives" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">POWERXL®</span>
                    <h3 className="brand-card-title">Variable Speed Drives</h3>
                    <p className="brand-card-subtitle">DC1 &amp; DA1 high performance AC frequency inverters</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARTEX SWEDEN PORTFOLIO */}
      <section className="brand-portfolio-section brand-partex" id="partexPortfolioSection">
        <div className="container">
          <div className="lapp-header-row">
            <div>
              <div className="brand-header-title-wrap">
                <Link to="/about-partex" className="brand-header-logo-box" title="View Partex Profile">
                  <img src="/images/logo-partex.png" alt="Partex" className="brand-header-logo-img" />
                </Link>
                <h2 className="section-title">Products</h2>
                <Link
                  to="/about-partex"
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#eab308',
                    textDecoration: 'none',
                    background: '#fefce8',
                    border: '1px solid #fef08a',
                    padding: '3px 9px',
                    borderRadius: '12px',
                    marginLeft: '6px'
                  }}
                >
                  About Partex &rarr;
                </Link>
              </div>
              <p className="section-desc" style={{ textAlign: 'left', margin: '6px 0 0', fontSize: '13.5px', color: '#64748b', maxWidth: 'none', width: '100%', whiteSpace: 'nowrap' }}>
                Swedish wire &amp; cable marking systems: Closed chevron markers, clip-on markers, printable sleeves, and ProMark printers.
              </p>
            </div>
          </div>

          <div className="lapp-tabs-bar">
            <button className={`brand-tab-btn ${partexFilter === 'all' ? 'active' : ''}`} onClick={() => setPartexFilter('all')}>All Partex Products (6)</button>
            <button className={`brand-tab-btn ${partexFilter === 'pa' ? 'active' : ''}`} onClick={() => setPartexFilter('pa')}>Closed Wire Markers</button>
            <button className={`brand-tab-btn ${partexFilter === 'pc' ? 'active' : ''}`} onClick={() => setPartexFilter('pc')}>Clip-on Markers</button>
            <button className={`brand-tab-btn ${partexFilter === 'po' ? 'active' : ''}`} onClick={() => setPartexFilter('po')}>Printable Sleeves</button>
            <button className={`brand-tab-btn ${partexFilter === 'pks' ? 'active' : ''}`} onClick={() => setPartexFilter('pks')}>Stainless Steel Markers</button>
            <button className={`brand-tab-btn ${partexFilter === 'promark' ? 'active' : ''}`} onClick={() => setPartexFilter('promark')}>ProMark Printers</button>
            <button className={`brand-tab-btn ${partexFilter === 'ties' ? 'active' : ''}`} onClick={() => setPartexFilter('ties')}>Cable Ties</button>
          </div>

          <div className="lapp-carousel-container">
            <div className="lapp-cards-grid brand-cards-grid" id="partexCardsGrid">
              {(partexFilter === 'all' || partexFilter === 'pa') && (
                <Link to="/about-partex" className="brand-photo-card" data-cat="pa">
                  <img src="/images/partex-pa.jpg" alt="PA Closed Wire Markers" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">PA®</span>
                    <h3 className="brand-card-title">Closed Chevron Markers</h3>
                    <p className="brand-card-subtitle">PA02, PA1, PA2 interlocking pre-printed sleeves</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(partexFilter === 'all' || partexFilter === 'pc') && (
                <Link to="/about-partex" className="brand-photo-card" data-cat="pc">
                  <img src="/images/partex-pc.jpg" alt="PC Snap-on Open Markers" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">PC®</span>
                    <h3 className="brand-card-title">Snap-on Open Markers</h3>
                    <p className="brand-card-subtitle">PC10, PC20, PC30 snap-on markers for installed cables</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(partexFilter === 'all' || partexFilter === 'po') && (
                <Link to="/about-partex" className="brand-photo-card" data-cat="po">
                  <img src="/images/partex-po.jpg" alt="PO Printable Marker Sleeves" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">PO / POZ®</span>
                    <h3 className="brand-card-title">Printable Marker Tubing</h3>
                    <p className="brand-card-subtitle">PO profile oval tubing &amp; POZ zero-halogen sleeves</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(partexFilter === 'all' || partexFilter === 'pks') && (
                <Link to="/about-partex" className="brand-photo-card" data-cat="pks">
                  <img src="/images/partex-pks.jpg" alt="PKS Stainless Steel Markers" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">PKS®</span>
                    <h3 className="brand-card-title">Stainless Steel 316 Markers</h3>
                    <p className="brand-card-subtitle">Acid-proof stainless markers for harsh marine environments</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(partexFilter === 'all' || partexFilter === 'promark') && (
                <Link to="/about-partex" className="brand-photo-card" data-cat="promark">
                  <img src="/images/partex-promark.jpg" alt="ProMark Thermal Printers" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">PROMARK®</span>
                    <h3 className="brand-card-title">T-1000 Thermal Printers</h3>
                    <p className="brand-card-subtitle">High-speed portable thermal transfer marking machine</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(partexFilter === 'all' || partexFilter === 'ties') && (
                <Link to="/about-partex" className="brand-photo-card" data-cat="ties">
                  <img src="/images/partex-ties.jpg" alt="Partex Cable Ties" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">PARTEX®</span>
                    <h3 className="brand-card-title">Cable Ties &amp; Fasteners</h3>
                    <p className="brand-card-subtitle">Nylon 6.6 UV-resistant &amp; stainless steel cable ties</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MENNEKES GERMANY PORTFOLIO */}
      <section className="brand-portfolio-section brand-mennekes" id="mennekesPortfolioSection">
        <div className="container">
          <div className="lapp-header-row">
            <div>
              <div className="brand-header-title-wrap">
                <Link to="/about-mennekes" className="brand-header-logo-box" title="View Mennekes Profile">
                  <img src="/images/logo-mennekes.png" alt="Mennekes" className="brand-header-logo-img" />
                </Link>
                <h2 className="section-title">Products</h2>
                <Link
                  to="/about-mennekes"
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#c32125',
                    textDecoration: 'none',
                    background: '#fbebee',
                    border: '1px solid #fecdd3',
                    padding: '3px 9px',
                    borderRadius: '12px',
                    marginLeft: '6px'
                  }}
                >
                  About Mennekes &rarr;
                </Link>
              </div>
              <p className="section-desc" style={{ textAlign: 'left', margin: '6px 0 0', fontSize: '13.5px', color: '#64748b', maxWidth: 'none', width: '100%', whiteSpace: 'nowrap' }}>
                Plugs for the world: Industrial CEE plugs, interlocked sockets, phase inverters, EverGUM boxes, and AMAXX units.
              </p>
            </div>
          </div>

          <div className="lapp-tabs-bar">
            <button className={`brand-tab-btn ${mennekesFilter === 'all' ? 'active' : ''}`} onClick={() => setMennekesFilter('all')}>All Mennekes Products (6)</button>
            <button className={`brand-tab-btn ${mennekesFilter === 'plugs' ? 'active' : ''}`} onClick={() => setMennekesFilter('plugs')}>Industrial CEE Plugs</button>
            <button className={`brand-tab-btn ${mennekesFilter === 'duo' ? 'active' : ''}`} onClick={() => setMennekesFilter('duo')}>Interlocked Sockets</button>
            <button className={`brand-tab-btn ${mennekesFilter === 'panel' ? 'active' : ''}`} onClick={() => setMennekesFilter('panel')}>Panel Sockets</button>
            <button className={`brand-tab-btn ${mennekesFilter === 'phase' ? 'active' : ''}`} onClick={() => setMennekesFilter('phase')}>Phase Inverters</button>
            <button className={`brand-tab-btn ${mennekesFilter === 'evergum' ? 'active' : ''}`} onClick={() => setMennekesFilter('evergum')}>EverGUM Combinations</button>
            <button className={`brand-tab-btn ${mennekesFilter === 'amaxx' ? 'active' : ''}`} onClick={() => setMennekesFilter('amaxx')}>AMAXX Enclosures</button>
          </div>

          <div className="lapp-carousel-container">
            <div className="lapp-cards-grid brand-cards-grid" id="mennekesCardsGrid">
              {(mennekesFilter === 'all' || mennekesFilter === 'plugs') && (
                <Link to="/about-mennekes" className="brand-photo-card" data-cat="plugs">
                  <img src="/images/menn-powertop.jpg" alt="PowerTOP Xtra Plugs" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">POWERTOP® XTRA</span>
                    <h3 className="brand-card-title">Industrial CEE Plugs IP44/67</h3>
                    <p className="brand-card-subtitle">Ergonomic rubberized grip plugs 16A to 125A</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(mennekesFilter === 'all' || mennekesFilter === 'duo') && (
                <Link to="/about-mennekes" className="brand-photo-card" data-cat="duo">
                  <img src="/images/menn-duo.jpg" alt="DUO Switched Interlocked Sockets" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">DUO®</span>
                    <h3 className="brand-card-title">Switched Interlocked Sockets</h3>
                    <p className="brand-card-subtitle">Mechanical interlock safety sockets 16A, 32A, 63A</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(mennekesFilter === 'all' || mennekesFilter === 'panel') && (
                <Link to="/about-mennekes" className="brand-photo-card" data-cat="panel">
                  <img src="/images/menn-panel.jpg" alt="Mennekes Panel Sockets" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">MENNEKES®</span>
                    <h3 className="brand-card-title">Panel Mounted Sockets</h3>
                    <p className="brand-card-subtitle">Straight and angled flange sockets IP44 / IP67</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(mennekesFilter === 'all' || mennekesFilter === 'phase') && (
                <Link to="/about-mennekes" className="brand-photo-card" data-cat="phase">
                  <img src="/images/menn-phase.jpg" alt="Phase Inverter Plugs" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">PHASE INVERTER</span>
                    <h3 className="brand-card-title">Phase Inverter Reversal Plugs</h3>
                    <p className="brand-card-subtitle">Quick rotary motor direction change without rewire</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(mennekesFilter === 'all' || mennekesFilter === 'evergum') && (
                <Link to="/about-mennekes" className="brand-photo-card" data-cat="evergum">
                  <img src="/images/menn-evergum.jpg" alt="EverGUM Distribution Units" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">EVERGUM®</span>
                    <h3 className="brand-card-title">Solid Rubber Distro Units</h3>
                    <p className="brand-card-subtitle">Unbreakable mobile power distribution boxes IP44</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}

              {(mennekesFilter === 'all' || mennekesFilter === 'amaxx') && (
                <Link to="/about-mennekes" className="brand-photo-card" data-cat="amaxx">
                  <img src="/images/menn-amaxx.jpg" alt="AMAXX Receptacle Combinations" className="lapp-photo-card-bg" />
                  <div className="lapp-photo-card-overlay" />
                  <div className="brand-photo-card-content">
                    <span className="brand-card-brand-tag">AMAXX®</span>
                    <h3 className="brand-card-title">AMAXX Modular Combinations</h3>
                    <p className="brand-card-subtitle">Custom configured industrial power outlet assemblies</p>
                    <span className="brand-card-arrow">&rarr;</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
