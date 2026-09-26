import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { Header } from "./assets/components/layout/Header";
import { Footer } from "./assets/components/layout/Footer";

import { CartDrawer } from "./assets/components/ui/CartDrawer";
import { AuthModal } from "./assets/components/ui/AuthModal";
import { AccountModal } from "./assets/components/ui/AccountModal";
import { QuickViewModal } from "./assets/components/ui/QuickViewModal";
import { SearchModal } from "./assets/components/ui/SearchModal";
import { SupportModal } from "./assets/components/ui/SupportModal";
import { AboutModal } from "./assets/components/ui/AboutModal";

import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductDetail } from "./pages/ProductDetail";
import { AboutLapp } from "./pages/AboutLapp";
import { AboutEaton } from "./pages/AboutEaton";
import { AboutPartex } from "./pages/AboutPartex";
import { AboutMennekes } from "./pages/AboutMennekes";

// Helper component to reset scroll position on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <div
              className="siddhi-app-wrapper hybrid-light-bg"
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Header />

              <div style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  {/* Dynamic route supporting individual product IDs */}
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/about-lapp" element={<AboutLapp />} />
                  <Route path="/about-eaton" element={<AboutEaton />} />
                  <Route path="/about-partex" element={<AboutPartex />} />
                  <Route path="/about-mennekes" element={<AboutMennekes />} />
                  <Route path="/olflex-cables" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>

              <Footer />

              {/* Global Modals & Slide-overs */}
              <CartDrawer />
              <AuthModal />
              <AccountModal />
              <QuickViewModal />
              <SearchModal />
              <SupportModal />
              <AboutModal />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
