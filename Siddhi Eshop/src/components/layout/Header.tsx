import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, FileText, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const {
    currentUser,
    openAuthModal,
    openAccountModal,
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory
  } = useAuth();

  const { totalItems, subtotal, openCartDrawer } = useCart();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (currentUser) {
      openAccountModal();
    } else {
      openAuthModal('login');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('productsSection');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('productsSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSearchCategory(val);
    if (val === 'lapp') {
      document.getElementById('lappPortfolioSection')?.scrollIntoView({ behavior: 'smooth' });
    } else if (val === 'eaton') {
      document.getElementById('eatonPortfolioSection')?.scrollIntoView({ behavior: 'smooth' });
    } else if (val === 'partex') {
      document.getElementById('partexPortfolioSection')?.scrollIntoView({ behavior: 'smooth' });
    } else if (val === 'mennekes') {
      document.getElementById('mennekesPortfolioSection')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRfq = () => {
    if (window.location.pathname !== '/') {
      navigate('/#rfqSection');
    } else {
      document.getElementById('rfqSection')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="brand-logo-wrap" title="Siddhi Kabel Corporation Private Limited">
            <img
              src="/images/siddhi-kabel-lockup.png"
              alt="Siddhi Kabel Corporation Private Limited"
              className="brand-lockup-img"
              width="220"
              height="52"
              style={{
                height: '52px',
                maxHeight: '52px',
                width: 'auto',
                maxWidth: '260px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </Link>

          {/* Search with Category Filter */}
          <div className="header-search-wrap">
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <select
                className="search-cat-select"
                id="searchCategorySelect"
                value={searchCategory}
                onChange={handleCategoryChange}
              >
                <option value="all">All Brands (4)</option>
                <option value="lapp">Lapp Kabel Germany</option>
                <option value="eaton">Eaton Moeller Germany</option>
                <option value="partex">Partex Sweden</option>
                <option value="mennekes">Mennekes Germany</option>
              </select>
              <input
                type="text"
                id="headerSearchInput"
                className="search-input"
                placeholder="Search Part No., Lapp ÖLFLEX, Eaton, Partex, Mennekes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn" title="Search">
                <Search size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Customer Account / Sign In */}
            <div
              className="action-item action-auth-item"
              id="headerAuthAction"
              onClick={handleAccountClick}
              title="Customer Account / Sign In"
              style={{ cursor: 'pointer' }}
            >
              <div className="action-icon-wrap" id="headerAuthIconWrap">
                <User size={18} strokeWidth={2} />
              </div>
              <div className="action-text">
                <span className="action-label" id="headerAuthLabel">
                  {currentUser ? 'Welcome,' : 'Sign In / Register'}
                </span>
                <span className="action-val" id="headerAuthVal">
                  {currentUser
                    ? `${currentUser.contactPerson.split(' ')[0]} (${currentUser.companyName.slice(0, 12)}...)`
                    : 'Customer Account'}
                </span>
              </div>
            </div>

            {/* Quick RFQ */}
            <div
              className="action-item"
              onClick={scrollToRfq}
              style={{ cursor: 'pointer' }}
              title="Bulk Inquiry / RFQ"
            >
              <div className="action-icon-wrap">
                <FileText size={18} strokeWidth={2} />
              </div>
              <div className="action-text">
                <span className="action-label">Bulk Inquiry</span>
                <span className="action-val">Quick RFQ</span>
              </div>
            </div>

            {/* Cart Drawer Button */}
            <button
              className="action-item"
              onClick={openCartDrawer}
              title="View RFQ Cart"
              style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <div className="action-icon-wrap">
                <ShoppingCart size={18} strokeWidth={2} />
                <span className="action-badge" id="cartCountBadge">
                  {totalItems}
                </span>
              </div>
              <div className="action-text">
                <span className="action-label">Quotation Cart</span>
                <span className="action-val" id="cartSubtotalHeader">
                  ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
