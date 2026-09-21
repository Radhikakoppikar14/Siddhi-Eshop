import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const handleCustomQuote = () => {
    const part = quickViewProduct.partNo;
    closeQuickView();
    if (window.location.pathname !== '/') {
      navigate('/#rfqSection');
      setTimeout(() => {
        const notes = document.getElementById('rfqNotes') as HTMLTextAreaElement;
        if (notes) {
          notes.value = `Inquiry regarding Part No: ${part}. Please share formal quote with bulk quantity discounts and delivery lead time to our location.`;
          notes.focus();
        }
      }, 200);
    } else {
      const el = document.getElementById('rfqSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      const notes = document.getElementById('rfqNotes') as HTMLTextAreaElement;
      if (notes) {
        notes.value = `Inquiry regarding Part No: ${part}. Please share formal quote with bulk quantity discounts and delivery lead time to our location.`;
        notes.focus();
      }
    }
  };

  const renderIcon = (type: string) => {
    if (type === 'cable') {
      return (
        <svg className="product-icon-art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
          <circle cx="6" cy="6" r="2" fill="currentColor" />
          <circle cx="6" cy="12" r="2" fill="currentColor" />
          <circle cx="6" cy="18" r="2" fill="currentColor" />
          <path d="M14 6c0 3-4 3-4 6s4 3 4 6" />
        </svg>
      );
    } else if (type === 'ethernet') {
      return (
        <svg className="product-icon-art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="12" rx="2" />
          <path d="M6 16v4h12v-4M9 20h6" />
          <path d="M7 8h2m2 0h2m2 0h2" />
        </svg>
      );
    } else if (type === 'plug') {
      return (
        <svg className="product-icon-art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
          <circle cx="16" cy="10" r="1.5" fill="currentColor" />
          <circle cx="15" cy="15" r="1.5" fill="currentColor" />
          <circle cx="9" cy="15" r="1.5" fill="currentColor" />
          <circle cx="8" cy="10" r="1.5" fill="currentColor" />
        </svg>
      );
    } else if (type === 'switchgear') {
      return (
        <svg className="product-icon-art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="3" />
          <rect x="8" y="6" width="8" height="6" rx="1" />
          <line x1="12" y1="14" x2="12" y2="18" />
          <circle cx="12" cy="16" r="2" fill="currentColor" />
        </svg>
      );
    } else {
      return (
        <svg className="product-icon-art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="14" />
          <path d="M6 14h12M8 17h8M10 20h4M11 23h2" />
        </svg>
      );
    }
  };

  return (
    <div className="modal-overlay open" id="quickViewModal" onClick={closeQuickView}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeQuickView} aria-label="Close">
          <X size={18} />
        </button>
        <div className="modal-body" id="quickViewContent">
          <div className="modal-img-col">
            {renderIcon(quickViewProduct.icon)}
          </div>
          <div className="modal-content-col">
            <span className="modal-badge">
              {quickViewProduct.brand} | {quickViewProduct.partNo}
            </span>
            <h3 className="modal-title">{quickViewProduct.name}</h3>
            <div className="modal-price">
              ₹{quickViewProduct.price.toFixed(2)}{' '}
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--gray-600)' }}>
                / {quickViewProduct.unit}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '15px' }}>
              <strong>Application:</strong> {quickViewProduct.application}
            </p>

            <table className="modal-specs-table">
              <tbody>
                <tr>
                  <td>Voltage Rating</td>
                  <td>{quickViewProduct.voltage || 'N/A'}</td>
                </tr>
                <tr>
                  <td>Temp Range</td>
                  <td>{quickViewProduct.tempRange || 'Standard industrial'}</td>
                </tr>
                <tr>
                  <td>Conductor Spec</td>
                  <td>{quickViewProduct.conductor || 'Standard high conductivity'}</td>
                </tr>
                <tr>
                  <td>Stock Availability</td>
                  <td>
                    <strong style={{ color: 'var(--success)' }}>{quickViewProduct.stock}</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  addToCart(quickViewProduct.id);
                  closeQuickView();
                }}
              >
                Add To RFQ Cart
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCustomQuote}
              >
                Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
