import React from 'react';

export const AnnouncementTicker: React.FC = () => {
  return (
    <div className="announcement-ticker">
      <div className="ticker-content">
        <div className="ticker-item"><span className="ticker-star">★</span> Siddhi Kabel Corporation Private Limited - Bangalore Head Office</div>
        <div className="ticker-item"><img src="/images/logo-lapp.png" alt="Lapp Logo" className="ticker-brand-logo" /> Authorized Channel Partner for <span className="highlight-lapp">LAPP KABEL Germany</span></div>
        <div className="ticker-item"><img src="/images/logo-eaton.png" alt="Eaton Logo" className="ticker-brand-logo" /> Official Industrial Distributor: <span className="highlight-eaton">EATON MOELLER Switchgear</span></div>
        <div className="ticker-item"><img src="/images/logo-partex.png" alt="Partex Logo" className="ticker-brand-logo" /> Authorized Distributor: <span className="highlight-partex">PARTEX SWEDEN Marking Systems</span></div>
        <div className="ticker-item"><img src="/images/logo-mennekes.png" alt="Mennekes Logo" className="ticker-brand-logo" /> Genuine <span className="highlight-mennekes">MENNEKES Germany</span> CEE Industrial Plugs &amp; Sockets</div>
        <div className="ticker-item"><span className="ticker-star">★</span> Direct Quotations: <span className="highlight">sales@siddhikabel.com</span> / <span className="highlight">Enquiry@siddhikabel.com</span></div>
        <div className="ticker-item"><span className="ticker-star">★</span> Phone Support: 096200 00947 / 098860 58511</div>

        {/* Duplicate for seamless infinite loop */}
        <div className="ticker-item"><span className="ticker-star">★</span> Siddhi Kabel Corporation Private Limited - Bangalore Head Office</div>
        <div className="ticker-item"><img src="/images/logo-lapp.png" alt="Lapp Logo" className="ticker-brand-logo" /> Authorized Channel Partner for <span className="highlight-lapp">LAPP KABEL Germany</span></div>
        <div className="ticker-item"><img src="/images/logo-eaton.png" alt="Eaton Logo" className="ticker-brand-logo" /> Official Industrial Distributor: <span className="highlight-eaton">EATON MOELLER Switchgear</span></div>
        <div className="ticker-item"><img src="/images/logo-partex.png" alt="Partex Logo" className="ticker-brand-logo" /> Authorized Distributor: <span className="highlight-partex">PARTEX SWEDEN Marking Systems</span></div>
        <div className="ticker-item"><img src="/images/logo-mennekes.png" alt="Mennekes Logo" className="ticker-brand-logo" /> Genuine <span className="highlight-mennekes">MENNEKES Germany</span> CEE Industrial Plugs &amp; Sockets</div>
        <div className="ticker-item"><span className="ticker-star">★</span> Direct Quotations: <span className="highlight">sales@siddhikabel.com</span> / <span className="highlight">Enquiry@siddhikabel.com</span></div>
        <div className="ticker-item"><span className="ticker-star">★</span> Phone Support: 096200 00947 / 098860 58511</div>
      </div>
    </div>
  );
};
