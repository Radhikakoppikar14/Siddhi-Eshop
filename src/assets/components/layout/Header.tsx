import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  FileText,
  ShoppingCart,
  Headphones,
  Info,
  Home,
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
  } = useAuth();

  const { totalItems, subtotal, isCartOpen, openCartDrawer, closeCartDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8dfd3] shadow-xs transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Authentic Brand Identity / Logo in High-Contrast Crisp Dock */}
          <Link to="/" className="flex items-center shrink-0 group" aria-label="Siddhi Kabel Home">
            <div className="h-12 px-3 py-1 bg-white rounded-2xl border border-[#e2d8cb] shadow-2xs group-hover:shadow-md group-hover:border-[#cfc2b0] flex items-center transition-all duration-300">
              <img
                src="/images/siddhi-kabel-lockup.png"
                alt="Siddhi Kabel Corporation Private Limited"
                className="h-8 sm:h-9 w-auto max-w-[170px] sm:max-w-[220px] object-contain group-hover:scale-102 transition-transform duration-200"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/siddhi-kabel-logo.png";
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links — Exact Sequence: Home -> Catalog -> Brands -> About -> Contact */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            
            {/* 1. Home Link */}
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:text-[#6b1620] hover:bg-[#f1eae0] transition-colors"
            >
              <Home size={14} className="text-[#8c7467]" />
              <span>Home</span>
            </Link>

            {/* 2. Catalog Link */}
            <Link
              to="/catalog"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:text-[#6b1620] hover:bg-[#f1eae0] transition-colors"
            >
              <Grid size={14} className="text-[#8c7467]" />
              <span>Catalog</span>
            </Link>

            {/* 3. Brands Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
            >
              <a
                href="/#brandPortfolios"
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:text-[#6b1620] hover:bg-[#f1eae0] transition-colors"
              >
                <span>Brands</span>
                <ChevronDown
                  size={12}
                  className={`text-[#8c7467] transition-transform ${brandsOpen ? "rotate-180 text-[#6b1620]" : ""}`}
                />
              </a>

              {brandsOpen && (
                <div className="absolute top-full left-0 w-64 pt-1.5 z-50 animate-fade-in shadow-2xl">
                  <div className="bg-[#fcfaf7] rounded-2xl border border-[#e2d8cb] p-2 shadow-2xl space-y-1">
                    <Link
                      to="/about-lapp"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-amber-50 text-slate-800 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-slate-950">LAPP Kabel</span>
                        <span className="text-[10px] text-slate-500 font-mono">ÖLFLEX® Cables & Glands</span>
                      </div>
                    </Link>

                    <Link
                      to="/about-eaton"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-sky-50 text-slate-800 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-slate-950">EATON Moeller</span>
                        <span className="text-[10px] text-slate-500 font-mono">Motor Starters & Switchgear</span>
                      </div>
                    </Link>

                    <Link
                      to="/about-partex"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-50 text-slate-800 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-slate-950">PARTEX Sweden</span>
                        <span className="text-[10px] text-slate-500 font-mono">Wire Marking & Printers</span>
                      </div>
                    </Link>

                    <Link
                      to="/about-mennekes"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-purple-50 text-slate-800 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0"></span>
                      <div>
                        <span className="font-bold text-xs block text-slate-950">MENNEKES</span>
                        <span className="text-[10px] text-slate-500 font-mono">CEE Plugs & AMAXX</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. About — Pops up the About Modal on click */}
            <button
              type="button"
              onClick={openAbout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:text-[#6b1620] hover:bg-[#f1eae0] transition-colors cursor-pointer"
              title="About Siddhi Kabel Corporation"
            >
              <Info size={14} className="text-[#8c7467]" />
              <span>About</span>
            </button>

            {/* 5. Contact / Support */}
            <button
              type="button"
              onClick={openSupport}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#6b1620] bg-[#f4ebe0] hover:bg-[#ede0cf] border border-[#dfd0be] transition-colors whitespace-nowrap cursor-pointer"
              title="Contact Engineering Desk & Technical Support"
            >
              <Headphones size={14} className="text-[#7a1a26]" />
              <span>Contact</span>
            </button>

          </nav>

          {/* Right Action Tools: Search Icon THEN RFQ (Submit RFQ / RFQ Cart) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* 6. SEARCH ICON — Immediately follows Contact */}
            <button
              type="button"
              onClick={openSearch}
              className="h-10 w-10 rounded-xl bg-[#f4ebe0]/80 hover:bg-[#ede0cf] text-[#6b1620] border border-[#dfd0be] shadow-2xs flex items-center justify-center transition-all group hover:scale-105 cursor-pointer"
              title="Search SKU, Part No, Conductor, Brand (⌘K)"
              aria-label="Search products"
            >
              <Search size={18} className="text-[#6b1620] group-hover:scale-110 transition-transform" />
            </button>

            {/* 7. AFTER THAT THE RFQ: Submit RFQ & RFQ Cart in Maroon & Light Beige */}
            <a
              href="/#rfqSection"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#6b1620] bg-[#f4ebe0] hover:bg-[#ede0cf] border border-[#dfd0be] transition-colors whitespace-nowrap"
            >
              <FileText size={14} className="text-[#6b1620]" />
              <span>Submit RFQ</span>
            </a>

            {/* RFQ Cart Button in Deep Maroon with Light Beige Contrast */}
            <button
              onClick={() => (isCartOpen ? closeCartDrawer() : openCartDrawer())}
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-2 bg-[#6b1620] hover:bg-[#540f17] text-white rounded-xl text-xs font-black transition-all shadow-md shadow-[#6b1620]/25 group hover:scale-102 cursor-pointer border border-[#851e2b]/50"
              title="Open RFQ Quotation Cart"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingCart size={15} className="group-hover:scale-110 transition-transform text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#faf5ec] text-[#6b1620] border border-[#dfd2be] text-[10px] font-mono font-bold flex items-center justify-center shadow-xs">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-white">RFQ Cart</span>
              {subtotal > 0 && (
                <span className="hidden md:inline pl-1.5 border-l border-[#8b2330] font-mono text-[11px] text-[#fce4c4] font-bold">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              )}
            </button>

            {/* Account Trigger */}
            <button
              onClick={() => {
                if (currentUser) {
                  openAccountModal();
                } else {
                  openAuthModal("login");
                }
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-[#f1eae0] rounded-xl border border-[#e2d8cb] transition-colors cursor-pointer"
              title="Customer Account"
            >
              <User size={15} className="text-[#8c7467]" />
              <span className="hidden sm:inline">
                {currentUser ? currentUser.companyName.split(" ")[0] : "Account"}
              </span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-[#6b1620] hover:bg-[#f1eae0] border border-[#e2d8cb] transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu — Exact Sequence: Home -> Catalog -> Brands -> About -> Contact -> Search -> RFQ */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#e8dfd3] space-y-1.5 animate-fade-in bg-[#faf8f5]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-900 hover:bg-[#efe7dc]"
            >
              <Home size={14} className="text-[#8c7467]" />
              <span>Home</span>
            </Link>

            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-900 hover:bg-[#efe7dc]"
            >
              <Grid size={14} className="text-[#8c7467]" />
              <span>Catalog</span>
            </Link>

            <a
              href="/#brandPortfolios"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-900 hover:bg-[#efe7dc]"
            >
              <span>Brands</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAbout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-900 hover:bg-[#efe7dc] text-left cursor-pointer"
            >
              <Info size={14} className="text-[#8c7467]" />
              <span>About</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openSupport();
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#efe7dc] text-[#6b1620] font-bold text-xs text-left border border-[#d8c9b6] cursor-pointer"
            >
              <Headphones size={14} />
              <span>Contact</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openSearch();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-900 hover:bg-[#efe7dc] text-left cursor-pointer"
            >
              <Search size={14} className="text-[#8c7467]" />
              <span>Search Products</span>
            </button>

            <a
              href="/#rfqSection"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#faf6f0] bg-[#6b1620] hover:bg-[#581018]"
            >
              <FileText size={14} className="text-[#faf6f0]" />
              <span>Submit RFQ</span>
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
