import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroBanner } from "../assets/components/home/HeroBanner";
import { PromoCards } from "../assets/components/home/PromoCards";
import { BrandPortfolio } from "../assets/components/home/BrandPortfolio";
import { AboutSection } from "../assets/components/home/AboutSection";
import { BrandsShowcase } from "../assets/components/home/BrandsShowcase";
import { RFQSection } from "../assets/components/home/RFQSection";
import { ContactSection } from "../assets/components/home/ContactSection";

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
      <HeroBanner />
      <PromoCards />
      <BrandPortfolio />
      <AboutSection />
      <BrandsShowcase />
      <RFQSection />
      <ContactSection />
    </main>
  );
};
