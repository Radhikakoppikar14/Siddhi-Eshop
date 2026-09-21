import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section className="trust-bar" id="contactSection" style={{ padding: '50px 0', background: '#ffffff' }}>
      <div className="container">
        <div className="section-title-wrap" style={{ marginBottom: '30px' }}>
          <span className="section-subtitle">Official Head Office</span>
          <h2 className="section-title" style={{ fontSize: '26px' }}>Get in Touch With Us</h2>
          <p className="section-desc">Get in touch with us for any questions about our products or industrial electrical solutions.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {/* Head Office Card */}
          <div style={{ background: 'var(--bg-light)', border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '24px', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Registered Office
            </div>
            <h3 style={{ fontSize: '17px', marginBottom: '12px' }}>Head Office</h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '3px' }} />
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--gray-800)', margin: 0 }}>
                <strong>Siddhi Kabel Corporation Private Limited</strong><br />
                No.3, 1st Main Road, 1st Block,<br />
                Banashankari 3rd Stage,<br />
                Bangalore 560 085, Karnataka, India.
              </p>
            </div>
          </div>

          {/* Email Us Card */}
          <div style={{ background: 'var(--bg-light)', border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '24px', borderLeft: '4px solid var(--secondary)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Direct Electronic Mail
            </div>
            <h3 style={{ fontSize: '17px', marginBottom: '12px' }}>Email Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <a href="mailto:sales@siddhikabel.com" style={{ color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} /> sales@siddhikabel.com
              </a>
              <a href="mailto:Enquiry@siddhikabel.com" style={{ color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} /> Enquiry@siddhikabel.com
              </a>
              <a href="mailto:info@siddhikabel.com" style={{ color: 'var(--gray-700)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} /> info@siddhikabel.com
              </a>
              <a href="mailto:guru@siddhikabel.com" style={{ color: 'var(--gray-700)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} /> guru@siddhikabel.com
              </a>
            </div>
          </div>

          {/* Call Support Card */}
          <div style={{ background: 'var(--bg-light)', border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '24px', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Customer Desk
            </div>
            <h3 style={{ fontSize: '17px', marginBottom: '12px' }}>Call Support</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)' }}>
              <a href="tel:09620000947" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} /> <span>096200 00947</span>
              </a>
              <a href="tel:09886058511" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} /> <span>098860 58511</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
