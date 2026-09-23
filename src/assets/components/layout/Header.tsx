import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, FileText, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

export const Header: React.FC = () => {
  const {
    currentUser,
    openAuthModal,
    openAccountModal,
    openOrdersModal,
    logout,
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
  } = useAuth();

  const { totalItems, subtotal, openCartDrawer, isCartOpen } = useCart();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Completely hide header when the cart drawer is open[cite: 14]
  if (isCartOpen) return null;

  const handleAccountClick = () => {
    if (currentUser) {
      setIsDropdownOpen((prev) => !prev);
    } else {
      openAuthModal("login");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetSection =
      searchCategory !== "all"
        ? document.getElementById(`${searchCategory}PortfolioSection`) ||
          document.getElementById("brandPortfolioSection")
        : document.getElementById("brandPortfolioSection") ||
          document.getElementById("productsSection");

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el =
          document.getElementById("brandPortfolioSection") ||
          document.getElementById("productsSection");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSearchCategory(val);
    if (val === "lapp") {
      document
        .getElementById("lappPortfolioSection")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (val === "eaton") {
      document
        .getElementById("eatonPortfolioSection")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (val === "partex") {
      document
        .getElementById("partexPortfolioSection")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (val === "mennekes") {
      document
        .getElementById("mennekesPortfolioSection")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToRfq = () => {
    if (window.location.pathname !== "/") {
      navigate("/#rfqSection");
    } else {
      document
        .getElementById("rfqSection")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link
            to="/"
            className="brand-logo-wrap"
            title="Siddhi Kabel Corporation Private Limited"
          >
            <img
              src="/images/siddhi-kabel-lockup.png"
              alt="Siddhi Kabel Corporation Private Limited"
              className="brand-lockup-img"
              width="220"
              height="52"
              style={{
                height: "52px",
                maxHeight: "52px",
                width: "auto",
                maxWidth: "260px",
                objectFit: "contain",
                display: "block",
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
              style={{ cursor: "pointer", position: "relative" }}
            >
              <div className="action-icon-wrap" id="headerAuthIconWrap">
                <User size={18} strokeWidth={2} />
              </div>
              <div className="action-text">
                <span className="action-label" id="headerAuthLabel">
                  {currentUser ? "Welcome," : "Sign In / Register"}
                </span>
                <span className="action-val" id="headerAuthVal">
                  {currentUser
                    ? `${currentUser.contactPerson.split(" ")[0]} (${currentUser.companyName ? currentUser.companyName.slice(0, 12) : ""}...)`
                    : "Customer Account"}
                </span>
              </div>

              {/* Profile → Orders → Sign Out Dropdown Menu */}
              {currentUser && isDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                  style={{ top: "100%", left: 0, right: "auto", marginTop: "8px", width: "100%", minWidth: "200px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2.5 font-semibold"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        openAccountModal();
                      }}
                    >
                      <User size={15} className="text-slate-500" /> My Profile Details
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2.5 font-semibold border-t border-slate-100"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        openOrdersModal();
                      }}
                    >
                      <FileText size={15} className="text-slate-500" /> Orders
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 pb-1">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5 font-bold"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                    >
                      <LogOut size={15} className="text-red-600" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick RFQ */}
            <div
              className="action-item"
              onClick={scrollToRfq}
              style={{ cursor: "pointer" }}
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
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
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
                  ₹
                  {subtotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};