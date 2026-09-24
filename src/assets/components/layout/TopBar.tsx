import React from 'react';
import { Phone, Mail } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <style>{`
        @media (max-width: 768px) {
          .top-bar {
            padding: 12px 16px !important;
          }
          .top-bar .container {
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .top-bar-inner {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .top-tagline {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
            width: 100% !important;
            gap: 1px !important; /* Tightens the space between the two lines */
          }
          .badge-live {
            display: inline-block !important;
            margin-bottom: 4px !important;
          }
          .top-links {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left !important;
            width: 100% !important;
            margin: 0 !important;
            gap: 10px !important;
          }
          .top-contact-item {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-start !important;
            text-align: left !important;
            width: 100% !important;
            gap: 8px !important;
          }
        }
      `}</style>
      <div className="container">
        <div className="top-bar-inner">
          <div className="top-tagline">
            <span className="badge-live">Official</span>
            <span>Siddhi Kabel Corporation Private Limited</span>
            <span>Dependable Electrical Solutions</span>
          </div>
          <div className="top-links">
            <a href="tel:09620000947" className="top-contact-item" title="Call Support">
              <Phone size={14} />
              <span>096200 00947 / 098860 58511</span>
            </a>
            <a href="mailto:sales@siddhikabel.com" className="top-contact-item" title="Sales Email">
              <Mail size={14} />
              <span>sales@siddhikabel.com</span>
            </a>
            <a href="mailto:Enquiry@siddhikabel.com" className="top-contact-item" title="Enquiry Email">
              <Mail size={14} />
              <span>Enquiry@siddhikabel.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};