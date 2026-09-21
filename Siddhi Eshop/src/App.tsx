import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import { TopBar } from "./assets/components/layout/TopBar";
import { Header } from "./assets/components/layout/Header";
import { Navigation } from "./assets/components/layout/Navigation";
import { AnnouncementTicker } from "./assets/components/layout/AnnouncementTicker";
import { Footer } from "./assets/components/layout/Footer";

import { CartDrawer } from "./assets/components/ui/CartDrawer";
import { AuthModal } from "./assets/components/ui/AuthModal";
import { AccountModal } from "./assets/components/ui/AccountModal";
import { QuickViewModal } from "./assets/components/ui/QuickViewModal";

import { Home } from "./pages/Home";
import { OlflexCables } from "./pages/OlflexCables";
import { ProductDetail } from "./pages/ProductDetail";
import { AboutLapp } from "./pages/AboutLapp";
import { AboutEaton } from "./pages/AboutEaton";
import { AboutPartex } from "./pages/AboutPartex";
import { AboutMennekes } from "./pages/AboutMennekes";

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div
              className="siddhi-app-wrapper"
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TopBar />
              <Header />
              <Navigation />
              <AnnouncementTicker />

              <div style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/olflex-cables" element={<OlflexCables />} />
                  <Route path="/product-detail" element={<ProductDetail />} />
                  <Route path="/about-lapp" element={<AboutLapp />} />
                  <Route path="/about-eaton" element={<AboutEaton />} />
                  <Route path="/about-partex" element={<AboutPartex />} />
                  <Route path="/about-mennekes" element={<AboutMennekes />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>

              <Footer />

              {/* Global Modals & Slide-overs */}
              <CartDrawer />
              <AuthModal />
              <AccountModal />
              <QuickViewModal />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
