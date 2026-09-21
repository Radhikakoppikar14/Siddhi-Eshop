import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const AboutMennekes: React.FC = () => {
  const navigate = useNavigate();

  const scrollToRfqTopic = (topic: string) => {
    navigate('/#rfqSection');
    setTimeout(() => {
      const el = document.getElementById('rfqSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      const notes = document.getElementById('rfqNotes') as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Official RFQ for Mennekes Germany Products: ${topic}. Please provide tiered OEM box rates and dispatch schedule.`;
        notes.focus();
      }
    }, 200);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px 0 60px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '14px' }}>
          <Link to="/" style={{ color: '#c32125', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>About MENNEKES Germany</span>
        </div>

        {/* Hero Card */}
        <div className="sheet-hero-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 12px rgba(15, 23, 42, 0.04)', marginBottom: '20px', borderLeft: '5px solid #c32125' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src="/images/logo-mennekes.png" alt="Mennekes Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>MENNEKES ELEKTROTECHNIK GERMANY</span>
                <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>MENNEKES PLUGS FOR THE WORLD</h1>
              </div>
            </div>
            <span style={{ background: '#fbebee', border: '1px solid #fecdd3', color: '#9f1239', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '16px', textTransform: 'uppercase' }}>
              AUTHORIZED INDUSTRIAL DISTRIBUTOR
            </span>
          </div>

          <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#475569', margin: '0 0 16px' }}>
            Founded in Kirchhundem, Germany in 1935, <strong>MENNEKES</strong> is the world's leading specialist in industrial CEE plugs and receptacles. Siddhi Kabel Corporation Private Limited is an authorized distributor in Bangalore, supplying authentic <strong>PowerTOP® Xtra</strong> rubberized grip industrial plugs (16A to 125A, IP44 / IP67), <strong>DUO®</strong> mechanically switched interlocked sockets, panel-mounted straight and angled sockets, <strong>EverGUM®</strong> unbreakable solid rubber distribution boxes, and <strong>AMAXX®</strong> custom modular receptacle combinations.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#c32125' }}>IP67 / IP44</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Watertight Washdown Certified</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Polyamide 6</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>High Impact Strength Enclosure</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#c32125' }}>EverGUM®</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Solid Rubber Heavy Distro</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Bangalore Stock</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Factory Sealed OEM Boxes</div>
            </div>
          </div>
        </div>

        {/* Product Series Directory */}
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          Mennekes Industrial Product Families
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {/* Card 1 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <img src="/images/menn-powertop.jpg" alt="PowerTOP Xtra" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#c32125', textTransform: 'uppercase' }}>POWERTOP® XTRA</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px' }}>Industrial CEE Plugs &amp; Connectors</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                Ergonomic rubberized grip plugs (16A, 32A, 63A, 125A) in 3P, 4P, and 5P configurations with highly nickel-plated brass contacts.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => scrollToRfqTopic('Mennekes PowerTOP Xtra Plugs')}>
                Request PowerTOP Quote
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <img src="/images/menn-duo.jpg" alt="DUO Sockets" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#c32125', textTransform: 'uppercase' }}>DUO® SAFETY</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px' }}>Switched Interlocked Receptacles</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                Mechanical interlock prevents plugging or unplugging while energized. Padlockable rotary switch prevents accidental connection.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => scrollToRfqTopic('Mennekes DUO Sockets')}>
                Request DUO Quote
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <img src="/images/menn-evergum.jpg" alt="EverGUM Units" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#c32125', textTransform: 'uppercase' }}>EVERGUM® &amp; AMAXX®</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px' }}>Power Distribution Enclosures</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
                Unbreakable solid rubber and modular industrial power outlets, engineered to withstand vehicle roll-over and harsh industrial washdown.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => scrollToRfqTopic('Mennekes EverGUM & AMAXX')}>
                Request EverGUM Quote
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#fbebee', border: '2px solid #fecdd3', borderRadius: '10px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#9f1239', marginBottom: '8px' }}>
            Request Mennekes OEM Box Tiered Quotation
          </h3>
          <p style={{ fontSize: '13.5px', color: '#881337', maxWidth: '650px', margin: '0 auto 16px' }}>
            We stock genuine factory-sealed boxes of 16A and 32A 3-pin and 5-pin plugs for fast site dispatch in Bangalore and across India.
          </p>
          <button className="btn btn-primary" onClick={() => scrollToRfqTopic('MENNEKES BULK BOX ORDER')}>
            Submit Mennekes RFQ
          </button>
        </div>
      </div>
    </div>
  );
};
