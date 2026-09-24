import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, FileText, ShoppingCart, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

const MASTER_CATEGORIES = [
  { name: "Lapp ÖLFLEX® Power & Control Cables", brand: "Lapp Kabel Germany", path: "/olflex-cables", keyword: "olflex" },
  { name: "Lapp UNITRONIC® Data Communication", brand: "Lapp Kabel Germany", path: "/about-lapp", keyword: "unitronic" },
  { name: "Eaton Moeller PKZM0 Motor Breakers", brand: "Eaton Moeller Germany", path: "/about-eaton", keyword: "eaton" },
  { name: "Eaton DILM Contactors & Starters", brand: "Eaton Moeller Germany", path: "/about-eaton", keyword: "contactor" },
  { name: "Mennekes CEE Industrial Plugs & Sockets", brand: "Mennekes Germany", path: "/about-mennekes", keyword: "socket" },
  { name: "Partex Wire & Cable Marking Systems", brand: "Partex Sweden", path: "/about-partex", keyword: "marker" },
];

export const Header: React.FC = () => {
  const {
    currentUser,
    openAuthModal,
    openAccountModal,
    openOrdersModal,
    logout,
    searchQuery = "",
    setSearchQuery = () => {},
    searchCategory = "all",
    setSearchCategory = () => {},
  } = useAuth() || {};

  const { totalItems = 0, subtotal = 0, openCartDrawer = () => {} } = useCart() || {};
  const navigate = useNavigate();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchSuggestionsOpen, setIsSearchSuggestionsOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAccountClick = () => {
    if (currentUser) {
      setIsDropdownOpen((prev) => !prev);
    } else if (openAuthModal) {
      openAuthModal("login");
    }
  };

  // Robust live suggestions filter matching any typed query against names, brands, or keywords
  const liveSuggestions = searchQuery.trim().length > 0 
    ? MASTER_CATEGORIES.filter(cat => {
        const query = searchQuery.toLowerCase().trim();
        return (
          cat.name.toLowerCase().includes(query) || 
          cat.brand.toLowerCase().includes(query) ||
          cat.keyword.toLowerCase().includes(query)
        );
      }).slice(0, 5)
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearchSuggestionsOpen(e.target.value.trim().length > 0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchSuggestionsOpen(false);
    const term = searchQuery.trim().toLowerCase();
    if (!term && searchCategory === "all") return;

    if (searchCategory === "eaton" || term.includes("eaton")) {
      navigate("/about-eaton");
    } else if (searchCategory === "mennekes" || term.includes("mennekes")) {
      navigate("/about-mennekes");
    } else if (searchCategory === "partex" || term.includes("partex")) {
      navigate("/about-partex");
    } else if (searchCategory === "lapp" || term.includes("lapp") || term.includes("olflex")) {
      navigate("/olflex-cables");
    } else {
      navigate("/about-lapp");
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSearchCategory(val);
    if (val === "lapp") navigate("/olflex-cables");
    else if (val === "eaton") navigate("/about-eaton");
    else if (val === "partex") navigate("/about-partex");
    else if (val === "mennekes") navigate("/about-mennekes");
  };

  const scrollToRfq = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("rfqSection")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      document.getElementById("rfqSection")?.scrollIntoView({ behavior: "smooth" });
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

          {/* Search with Category Filter & Live Brand Suggestions */}
          <div className="header-search-wrap" ref={searchRef} style={{ position: "relative" }}>
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
                placeholder="Search Brands, Categories, Part No., Lapp, Eaton, Mennekes..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => { if (searchQuery.trim().length > 0) setIsSearchSuggestionsOpen(true); }}
              />
              <button type="submit" className="search-btn" title="Search">
                <Search size={18} strokeWidth={2.5} />
              </button>
            </form>

            {/* Live Brand/Category Suggestion Dropdown */}
            {isSearchSuggestionsOpen && liveSuggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  zIndex: 2000,
                  overflow: "hidden",
                  padding: "4px 0",
                }}
              >
                {liveSuggestions.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setIsSearchSuggestionsOpen(false);
                      setSearchQuery("");
                      navigate(item.path);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          margin: "0 0 2px 0",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ fontSize: "11px", color: "#64748b", margin: 0, fontWeight: 500 }}>
                        Brand: <span style={{ color: "#ff6600", fontWeight: 600 }}>{item.brand}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            
            {/* 1. Customer Account / Sign In */}
            <div
              className="action-item action-auth-item"
              id="headerAuthAction"
              ref={dropdownRef}
              onClick={handleAccountClick}
              title="Customer Account / Sign In"
              style={{ cursor: "pointer", position: "relative" }}
            >
              <div className="action-icon-wrap" id="headerAuthIconWrap">
                <User size={18} strokeWidth={2} />
              </div>
              <div className="action-text" style={{ maxWidth: "150px", overflow: "hidden" }}>
                <span className="action-label" id="headerAuthLabel">
                  {currentUser ? "Welcome," : "Sign In / Register"}
                </span>
                <span
                  className="action-val"
                  id="headerAuthVal"
                  style={{
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {currentUser
                    ? currentUser.contactPerson || currentUser.companyName || "Radhika"
                    : "Customer Account"}
                </span>
              </div>
              <ChevronDown size={14} style={{ color: "#64748b", marginLeft: "2px" }} />

              {/* Professional Dropdown Menu */}
              {currentUser && isDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: "auto",
                    marginTop: "6px",
                    width: "210px",
                    background: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
                    border: "1px solid #e2e8f0",
                    zIndex: 99999,
                    fontSize: "12px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9" }}>
                    <p style={{ fontSize: "10.5px", color: "#64748b", margin: 0 }}>Signed in as</p>
                    <p style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a", margin: "2px 0 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {currentUser.contactPerson || currentUser.companyName || "Radhika"}
                    </p>
                  </div>
                  <div style={{ padding: "4px 0" }}>
                    <button
                      type="button"
                      style={{ width: "100%", padding: "8px 12px", background: "none", border: "none", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", color: "#0f172a", fontWeight: 600, fontSize: "12px" }}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        openAccountModal?.();
                      }}
                    >
                      <User size={14} style={{ color: "#64748b" }} /> My Profile Details
                    </button>
                    <button
                      type="button"
                      style={{ width: "100%", padding: "8px 12px", background: "none", border: "none", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", color: "#0f172a", fontWeight: 600, fontSize: "12px", borderTop: "1px solid #f1f5f9" }}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        openOrdersModal?.();
                      }}
                    >
                      <FileText size={14} style={{ color: "#64748b" }} /> Orders
                    </button>
                  </div>

                  <div style={{ borderTop: "1px solid #f1f5f9", padding: "4px 0" }}>
                    <button
                      type="button"
                      style={{ width: "100%", padding: "8px 12px", background: "none", border: "none", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", color: "#dc2626", fontWeight: 700, fontSize: "12px" }}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout?.();
                      }}
                    >
                      <LogOut size={14} style={{ color: "#dc2626" }} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Quick RFQ */}
            <div
              className="action-item"
              onClick={scrollToRfq}
              style={{ cursor: "pointer" }}
              title="Bulk Inquiry / Quick RFQ"
            >
              <div className="action-icon-wrap">
                <FileText size={18} strokeWidth={2} />
              </div>
              <div className="action-text">
                <span className="action-label">Bulk Inquiry</span>
                <span className="action-val">Quick RFQ</span>
              </div>
            </div>

            {/* 3. Cart Button */}
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