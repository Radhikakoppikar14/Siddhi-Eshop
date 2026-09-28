import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  FileText,
  ShoppingCart,
  Headphones,
  Building2,
  Grid,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

export const Header: React.FC = () => {
  const {
    currentUser,
    openAuthModal,
    openAccountModal,
    openSearch,
    openSupport,
    openAbout,
    openRfq,
  } = useAuth();

  const { totalItems, isCartOpen, openCartDrawer, closeCartDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  const handleAuthAction = () => {
    if (currentUser) {
      openAccountModal();
    } else {
      openAuthModal("login");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#6b1620] to-[#450a11] backdrop-blur-md border-b border-[#851e2b]/50 shadow-xl transition-all select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group" aria-label="Siddhi Kabel Home">
            <div className="h-11 px-2.5 py-1 bg-white rounded-2xl border border-white/20 shadow-md group-hover:shadow-lg flex items-center transition-all duration-300">
              <img
                src="/images/siddhi-kabel-lockup.png"
                alt="Siddhi Kabel Corporation"
                className="h-7 sm:h-8 w-auto max-w-[150px] sm:max-w-[200px] object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/siddhi-kabel-logo.png";
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/catalog"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Grid size={14} className="text-amber-400" />
              <span>Catalog</span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
            >
              <a
                href="/#brandPortfolios"
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-rose-100 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span>Brands</span>
                <ChevronDown
                  size={12}
                  className={`text-amber-400 transition-transform ${brandsOpen ? "rotate-180 text-white" : ""}`}
                />
              </a>

              {brandsOpen && (
                <div className="absolute top-full left-0 w-64 pt-1.5 z-50 animate-fade-in shadow-2xl">
                  <div className="bg-[#2a0a0f] rounded-2xl border border-white/20 p-2 shadow-2xl space-y-1 text-slate-900">
                    <Link
                      to="/about-lapp"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-white">LAPP Kabel</span>
                        <span className="text-[10px] text-rose-200/80 font-mono">ÖLFLEX® Cables & Glands</span>
                      </div>
                    </Link>

                    <Link
                      to="/about-eaton"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-white">EATON Moeller</span>
                        <span className="text-[10px] text-rose-200/80 font-mono">Motor Starters & Switchgear</span>
                      </div>
                    </Link>

                    <Link
                      to="/about-partex"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-white">PARTEX Sweden</span>
                        <span className="text-[10px] text-rose-200/80 font-mono">Wire Marking & Printers</span>
                      </div>
                    </Link>

                    <Link
                      to="/about-mennekes"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-white">MENNEKES</span>
                        <span className="text-[10px] text-rose-200/80 font-mono">CEE Plugs & AMAXX</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={openAbout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Building2 size={14} className="text-amber-400" />
              <span>Company</span>
            </button>

            <button
              type="button"
              onClick={openSupport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
            >
              <Headphones size={14} className="text-amber-400" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            
            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title="Search Products (⌘K)"
            >
              <Search size={16} />
            </button>

            {/* Bulk Enquiry Button */}
            <button
              type="button"
              onClick={() => openRfq("Website Bulk Enquiry Requirement")}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-2xs"
            >
              <FileText size={14} className="text-amber-400" />
              <span>Bulk Enquiry</span>
            </button>

            {/* RFQ Cart Trigger */}
            <button
              onClick={() => (isCartOpen ? closeCartDrawer() : openCartDrawer())}
              className="relative flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md cursor-pointer border border-amber-400"
            >
              <ShoppingCart size={15} />
              <span className="hidden sm:inline">RFQ Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-slate-950 text-white border border-amber-400 text-[10px] font-mono font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account Button */}
            <button
              type="button"
              onClick={handleAuthAction}
              className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer relative shadow-2xs"
              title={currentUser ? `Account: ${currentUser.companyName}` : "Sign In / Register"}
            >
              <User size={16} />
              {currentUser && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#501c18]" />
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-white/15 space-y-1.5 animate-fade-in bg-[#450a11] rounded-b-2xl px-2">
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-100 hover:bg-white/10"
            >
              <Grid size={14} className="text-amber-400" />
              <span>Catalog</span>
            </Link>

            <a
              href="/#brandPortfolios"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-100 hover:bg-white/10"
            >
              <span>Brands</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAbout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-100 hover:bg-white/10 text-left cursor-pointer"
            >
              <Building2 size={14} className="text-amber-400" />
              <span>Company</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openSupport();
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs text-left border border-white/20 cursor-pointer"
            >
              <Headphones size={14} className="text-amber-400" />
              <span>Contact</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openRfq("Website Bulk Enquiry Requirement");
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 cursor-pointer"
            >
              <FileText size={14} />
              <span>Bulk Enquiry (RFQ Form)</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};