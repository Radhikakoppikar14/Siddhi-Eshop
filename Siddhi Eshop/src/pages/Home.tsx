import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroBanner } from '../components/home/HeroBanner';
import { PromoCards } from '../components/home/PromoCards';
import { BrandPortfolio } from '../components/home/BrandPortfolio';
import { CatalogGrid } from '../components/home/CatalogGrid';
import { AboutSection } from '../components/home/AboutSection';
import { BrandsShowcase } from '../components/home/BrandsShowcase';
import { RFQSection } from '../components/home/RFQSection';
import { ContactSection } from '../components/home/ContactSection';

export const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
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
      <CatalogGrid />
      <AboutSection />
      <BrandsShowcase />
      <RFQSection />
      <ContactSection />
    </main>
  );
};
