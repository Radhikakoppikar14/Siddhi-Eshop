import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const AboutEaton: React.FC = () => {
  const navigate = useNavigate();

  const scrollToRfqTopic = (topic: string) => {
    navigate('/#rfqSection');
    setTimeout(() => {
      const el = document.getElementById('rfqSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      const notes = document.getElementById('rfqNotes') as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Official RFQ for Eaton Moeller Products: ${topic}. Please provide bulk pricing, availability, and delivery lead time.`;
        notes.focus();
      }
    }, 200);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px 0 60px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '14px' }}>
          <Link to="/" style={{ color: '#005ea6', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>About EATON Moeller</span>
        </div>

        {/* Hero Card */}
        <div className="sheet-hero-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 12px rgba(15, 23, 42, 0.04)', marginBottom: '20px', borderLeft: '5px solid #005ea6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src="/images/logo-eaton.png" alt="Eaton Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>EATON POWER QUALITY PVT LTD</span>
                <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>EATON MOELLER INDUSTRIAL ELECTRICAL</h1>
              </div>
            </div>
            <span style={{ background: '#e0f2fe', border: '1px solid #bae6fd', color: '#0369a1', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '16px', textTransform: 'uppercase' }}>
              OFFICIAL INDUSTRIAL DISTRIBUTOR
            </span>
          </div>

          <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#475569', margin: '0 0 16px' }}>
            <strong>Eaton</strong> is a global power management leader helping businesses manage electrical, hydraulic, and mechanical power safely and efficiently. Through the legacy of <strong>Moeller Germany</strong>, Eaton delivers industry-leading motor protection circuit breakers (<strong>PKZM0® / PKZM4®</strong>), power contactors (<strong>DILM®</strong>), molded case circuit breakers (<strong>NZM®</strong>), miniature breakers (<strong>FAZ®</strong>), command and signaling devices (<strong>RMQ-Titan®</strong>), and variable speed drives (<strong>PowerXL®</strong>).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#005ea6' }}>150 kA</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>PKZM0 Short-Circuit Breaking</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>SmartWire-DT</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Intelligent Panel Wiring</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#005ea6' }}>Bangalore Hub</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Panel Builder Ready Stock</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Global Certs</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>IEC/EN 60947, UL, CSA, CE</div>
            </div>
          </div>
        </div>

        {/* Product Series Directory */}
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          Eaton Moeller Key Product Lines
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {/* Card 1 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <img src="/images/eaton-pkzm0.jpg" alt="PKZM0 Motor Breakers" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#005ea6', textTransform: 'uppercase' }}>PKZM0® / PKZM4®</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px' }}>Motor-Protective Circuit Breakers</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                Rotary handle motor starter protectors up to 65A with 150 kA short circuit breaking capacity, phase failure sensitivity, and snap-on accessories.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => scrollToRfqTopic('Eaton PKZM0 Motor Breakers')}>
                Request PKZM0 Quote
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <img src="/images/eaton-dilm.jpg" alt="DILM Power Contactors" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#005ea6', textTransform: 'uppercase' }}>DILM®</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px' }}>Power Contactors &amp; Overload Relays</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                3-pole and 4-pole contactors from 7A up to 1000A AC-3, featuring low coil consumption, electronic actuation, and ultra-high mechanical lifespan.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => scrollToRfqTopic('Eaton DILM Contactors')}>
                Request DILM Quote
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <img src="/images/eaton-nzm.jpg" alt="NZM Breakers" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#005ea6', textTransform: 'uppercase' }}>NZM® &amp; FAZ®</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px' }}>MCCBs &amp; Industrial MCBs</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                NZM molded case circuit breakers up to 1600A with electronic trip units and FAZ industrial DIN rail MCBs with 15kA breaking capacity.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => scrollToRfqTopic('Eaton NZM / FAZ Breakers')}>
                Request Breaker Quote
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#e0f2fe', border: '2px solid #bae6fd', borderRadius: '10px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0369a1', marginBottom: '8px' }}>
            Panel Builders: Get Formal Eaton Moeller Project Pricing
          </h3>
          <p style={{ fontSize: '13.5px', color: '#075985', maxWidth: '650px', margin: '0 auto 16px' }}>
            Send us your switchgear schedule. We arrange direct supply from our Bangalore warehouse with factory compliance certs.
          </p>
          <button className="btn btn-primary" onClick={() => scrollToRfqTopic('EATON SWITCHGEAR FULL BOM')}>
            Submit Eaton Quotation Request
          </button>
        </div>
      </div>
    </div>
  );
};
