import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const AboutPartex: React.FC = () => {
  const navigate = useNavigate();

  const scrollToRfqTopic = (topic: string) => {
    navigate('/#rfqSection');
    setTimeout(() => {
      const el = document.getElementById('rfqSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      const notes = document.getElementById('rfqNotes') as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Official RFQ for Partex Sweden Marking Systems: ${topic}. Please provide bulk box rates and sample delivery.`;
        notes.focus();
      }
    }, 200);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px 0 60px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '14px' }}>
          <Link to="/" style={{ color: '#ca8a04', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>About PARTEX Sweden</span>
        </div>

        {/* Hero Card */}
        <div className="sheet-hero-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 12px rgba(15, 23, 42, 0.04)', marginBottom: '20px', borderLeft: '5px solid #eab308' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src="/images/logo-partex.png" alt="Partex Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>PARTEX MARKING SYSTEMS SWEDEN</span>
                <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>PARTEX INDUSTRIAL MARKING SOLUTIONS</h1>
              </div>
            </div>
            <span style={{ background: '#fefce8', border: '1px solid #fef08a', color: '#854d0e', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '16px', textTransform: 'uppercase' }}>
              AUTHORIZED DISTRIBUTOR
            </span>
          </div>

          <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#475569', margin: '0 0 16px' }}>
            Originating in Gullspång, Sweden, <strong>Partex</strong> has been the global benchmark in cable, wire, and panel identification for over 70 years. Siddhi Kabel Corporation Private Limited is an authorized stockist and distributor in India, delivering genuine <strong>PA®</strong> closed chevron wire markers, <strong>PC®</strong> snap-on markers, <strong>PO / POZ®</strong> printable sleeves, acid-proof <strong>PKS®</strong> stainless steel 316 tags, and <strong>ProMark T-1000</strong> high-speed thermal transfer printers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ca8a04' }}>UL94-V0</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Self-Extinguishing Flame Rating</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Chevron Cut</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Twist-Lock Alignment Grip</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ca8a04' }}>SS 316</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Marine &amp; Chemical Proof PKS</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>T-1000 Kits</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Portable 40mm/sec Printers</div>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          Partex Sweden Product Catalog
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {/* Card 1 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <img src="/images/partex-pa.jpg" alt="PA Wire Markers" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#ca8a04', textTransform: 'uppercase' }}>PA® SERIES</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px' }}>Closed Chevron Wire Markers</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                Interlocking chevron cut ensures markers stay straight on wire. PA02, PA1, PA2 covers 0.2 to 70 sq mm. High resistance to oils, acids, and UV.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => scrollToRfqTopic('Partex PA Wire Markers')}>
                Request PA Markers Quote
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <img src="/images/partex-promark.jpg" alt="ProMark T-1000 Printer" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#ca8a04', textTransform: 'uppercase' }}>PROMARK T-1000</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px' }}>Thermal Transfer Marker Printer</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                Portable industrial marking machine prints PVC sleeves, self-adhesive labels, and cable profiles with 300 dpi high resolution at 40 mm/sec.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => scrollToRfqTopic('Partex ProMark T-1000 Printer')}>
                Request T-1000 Printer Quote
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <img src="/images/partex-pks.jpg" alt="PKS Stainless Steel Markers" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#ca8a04', textTransform: 'uppercase' }}>PKS® STAINLESS 316</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px' }}>Stainless Steel Cable Markers</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                Acid-proof AISI 316 stainless steel markers for extreme marine, offshore, oil &amp; gas, and aggressive chemical processing plants.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => scrollToRfqTopic('Partex PKS Stainless Steel Markers')}>
                Request Stainless PKS Quote
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#fefce8', border: '2px solid #fef08a', borderRadius: '10px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#854d0e', marginBottom: '8px' }}>
            Request Partex Wire Marking Sample Kit &amp; Bulk Price List
          </h3>
          <p style={{ fontSize: '13.5px', color: '#713f12', maxWidth: '650px', margin: '0 auto 16px' }}>
            We provide free evaluation sample cards for control panel builders and switchgear OEMs across India.
          </p>
          <button className="btn btn-primary" onClick={() => scrollToRfqTopic('PARTEX SAMPLE PACK & BOM')}>
            Request Partex Sample Kit &amp; Quote
          </button>
        </div>
      </div>
    </div>
  );
};
