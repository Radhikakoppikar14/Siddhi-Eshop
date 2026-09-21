import React from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2, Download } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCartDrawer, updateQty, removeFromCart, subtotal } = useCart();
  const { currentUser, openAuthModal } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutRfq = () => {
    if (cart.length === 0) {
      showToast('Your RFQ Cart is empty. Please add items before requesting a quotation.');
      return;
    }

    if (!currentUser) {
      showToast('Customer Account Required: Please Sign In or Create an Account to request formal quotation.');
      closeCartDrawer();
      openAuthModal('login');
      return;
    }

    closeCartDrawer();
    const prepareRfq = () => {
      const rfqSec = document.getElementById('rfqSection');
      if (rfqSec) {
        rfqSec.scrollIntoView({ behavior: 'smooth' });
        const notesField = document.getElementById('rfqNotes') as HTMLTextAreaElement;
        if (notesField) {
          const summaryList = cart
            .map(item => `• ${item.brand} | ${item.name} (${item.partNo}): ${item.qty} ${item.unit}`)
            .join('\n');
          notesField.value = `Official GST Quotation Request for Cart Items:\n\n${summaryList}\n\nPlease provide formal GST quote with freight to site and delivery lead times.`;
          notesField.focus();
        }
      }
      showToast('Cart items transferred to RFQ form below!');
    };

    if (window.location.pathname !== '/') {
      navigate('/#rfqSection');
      setTimeout(prepareRfq, 200);
    } else {
      prepareRfq();
    }
  };

  const handleDownloadQuote = () => {
    if (cart.length === 0) {
      showToast('Your quotation cart is empty.');
      return;
    }

    const itemsHtml = cart.map((item, idx) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${idx + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">
          <strong>${item.name}</strong><br>
          <span style="font-size: 11px; color: #666;">Brand: ${item.brand} | Part No: ${item.partNo}</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.qty} ${item.unit}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${(item.price * item.qty).toFixed(2)}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Siddhi Kabel - Official Quotation</title>
        <style>
          body { font-family: Arial, sans-serif; color: #333; padding: 30px; max-width: 800px; margin: auto; }
          .header { border-bottom: 3px solid #c32125; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 22px; font-weight: bold; color: #c32125; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #f4f6f9; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; font-size: 12px; }
          .total-box { margin-top: 20px; text-align: right; font-size: 16px; font-weight: bold; }
          .footer { margin-top: 40px; font-size: 11px; color: #777; text-align: center; border-top: 1px solid #ddd; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">SIDDHI KABEL & ESHOP</div>
            <div style="font-size: 12px; color: #666;">Official B2B Industrial Quotation Summary</div>
          </div>
          <div style="text-align: right; font-size: 12px;">
            <strong>Date:</strong> ${new Date().toLocaleString()}<br>
            <strong>Customer:</strong> ${currentUser?.companyName || 'Guest / Unverified'}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th style="text-align: center;">#</th>
              <th>Item Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price (excl. GST)</th>
              <th style="text-align: right;">Total (excl. GST)</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <div class="total-box">
          Estimated Subtotal (excl. GST): ₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div class="footer">
          Siddhi Kabel Corporation Private Limited | Email: sales@siddhikabel.com | Phone: 096200 00947<br>
          <em>Note: This is a system-generated quotation summary sheet for internal review and site estimation.</em>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Siddhi_Quotation_${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Quotation sheet downloaded successfully!');
  };

  return (
    <>
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={closeCartDrawer} />
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} id="cartDrawer">
        <div className="cart-drawer-header">
          <h3>
            <ShoppingCart size={18} style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
            Quotation Cart
          </h3>
          <button className="btn-close-drawer" onClick={closeCartDrawer} aria-label="Close Cart">
            <X size={18} />
          </button>
        </div>

        <div className="cart-drawer-items" id="cartItemsList">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingCart size={48} strokeWidth={1.2} style={{ color: 'var(--gray-500)', marginBottom: '16px' }} />
              <p>Your industrial quotation cart is empty.</p>
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: '15px' }}
                onClick={closeCartDrawer}
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item-row" key={item.id}>
                <div className="cart-item-info">
                  <div style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 700 }}>
                    {item.brand} | {item.partNo}
                  </div>
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">
                    ₹{item.price.toFixed(2)} / {item.unit}
                  </div>
                </div>
                <div className="cart-qty-ctrl">
                  <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease">
                    <Minus size={12} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} aria-label="Increase">
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer-footer">
          <div className="cart-subtotal-row">
            <span>Estimated Subtotal (excl. GST):</span>
            <span id="cartDrawerSubtotal">
              ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="cart-checkout-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="btn btn-primary" onClick={handleCheckoutRfq}>
              Request Official GST Quotation
            </button>
            {cart.length > 0 && (
              <button 
                className="btn btn-outline-secondary btn-sm" 
                onClick={handleDownloadQuote}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Download size={14} /> Download Quote Sheet
              </button>
            )}
            <button className="btn btn-outline-primary btn-sm" onClick={closeCartDrawer}>
              Continue Browsing
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};