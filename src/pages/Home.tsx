import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSlider } from "../assets/components/home/HeroSlider";
import { BrandPortfoliosSection } from "../assets/components/home/BrandPortfoliosSection";
import { CompanyProfileSection } from "../assets/components/home/CompanyProfileSection";
import { SalesDeskSection } from "../assets/components/home/SalesDeskSection";
import { CatalogGrid } from "../assets/components/home/CatalogGrid";
import { RFQSection } from "../assets/components/home/RFQSection";

export const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      {/* 1. Hero Showcase Slider Matching Image 1 */}
      <HeroSlider />

      {/* 2. Authorized Brand Portfolios 4-Card Grid Matching Image 1 */}
      <BrandPortfoliosSection />

      {/* 3. Inventory Catalog Grid */}
      <CatalogGrid />

      {/* 4. Quick RFQ Quotation Console */}
      <RFQSection />

      {/* 5. Company Profile 3-Pillar Section Matching Image 2 (About at end after RFQ) */}
      <CompanyProfileSection />

      {/* 6. Direct Sales & Dispatch Desk Matching Image 2 (Contact at end after RFQ) */}
      <SalesDeskSection />
    </main>
  );
};
