import React from 'react';
import { Phone, Mail } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <style>{`
        @media (max-width: 768px) {
          .top-bar-inner {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .top-links {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            width: 100% !important;
            margin-top: 8px !important;
          }
          .top-contact-item {
            justify-content: flex-start !important;
            text-align: left !important;
          }
        }
      `}</style>
      <div className="container">
        <div className="top-bar-inner">
          <div className="top-tagline">
            <span className="badge-live">Official</span>
            <span>Siddhi Kabel Corporation Private Limited | Dependable Electrical Solutions</span>
          </div>
          <div className="top-links">
            <a href="tel:09620000947" className="top-contact-item" title="Call Support">
              <Phone size={13} />
              <span>096200 00947 / 098860 58511</span>
            </a>
            <a href="mailto:sales@siddhikabel.com" className="top-contact-item" title="Sales Email">
              <Mail size={13} />
              <span>sales@siddhikabel.com</span>
            </a>
            <a href="mailto:Enquiry@siddhikabel.com" className="top-contact-item" title="Enquiry Email">
              <Mail size={13} />
              <span>Enquiry@siddhikabel.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};