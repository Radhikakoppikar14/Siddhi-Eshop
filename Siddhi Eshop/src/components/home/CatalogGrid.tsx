import React, { useState, useMemo } from 'react';
import { PRODUCTS_DATA } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { useAuth } from '../../context/AuthContext';

export const CatalogGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { searchQuery, searchCategory } = useAuth();

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS_DATA;

    // Tab filter
    if (activeTab !== 'all') {
      list = list.filter(p => p.category === activeTab);
    }

    // Header category select filter
    if (searchCategory !== 'all') {
      if (searchCategory === 'lapp') {
        list = list.filter(p => p.brand.toLowerCase().includes('lapp'));
      } else if (searchCategory === 'eaton') {
        list = list.filter(p => p.brand.toLowerCase().includes('eaton'));
      } else if (searchCategory === 'partex') {
        list = list.filter(p => p.brand.toLowerCase().includes('partex'));
      } else if (searchCategory === 'mennekes') {
        list = list.filter(p => p.brand.toLowerCase().includes('menn'));
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.partNo.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.some(s => s.toLowerCase().includes(q)) ||
          p.application.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeTab, searchCategory, searchQuery]);

  return (
    <section className="products-section" id="productsSection" style={{ padding: '50px 0', background: '#ffffff' }}>
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-subtitle">Verified Industrial Inventory</span>
          <h2 className="section-title">Direct Procurement Catalog</h2>
          <p className="section-desc">
            Explore certified industrial electrical and automation components in ready stock with official manufacturer test certificates.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="tabs-bar" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '25px' }}>
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Products ({PRODUCTS_DATA.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'cables' ? 'active' : ''}`}
            onClick={() => setActiveTab('cables')}
          >
            Power &amp; Control Cables
          </button>
          <button
            className={`tab-btn ${activeTab === 'switchgear' ? 'active' : ''}`}
            onClick={() => setActiveTab('switchgear')}
          >
            Switchgear &amp; Breakers
          </button>
          <button
            className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            Data &amp; Marking Systems
          </button>
          <button
            className={`tab-btn ${activeTab === 'plugs' ? 'active' : ''}`}
            onClick={() => setActiveTab('plugs')}
          >
            CEE Industrial Plugs
          </button>
          <button
            className={`tab-btn ${activeTab === 'earthing' ? 'active' : ''}`}
            onClick={() => setActiveTab('earthing')}
          >
            Earthing Electrodes
          </button>
        </div>

        {/* Product Cards Grid */}
        <div 
          className="products-grid" 
          id="productsGrid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredProducts.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 20px', color: 'var(--gray-500)' }}>
              <h3>No products match your search or filter criteria.</h3>
              <p style={{ marginTop: '8px' }}>Try clearing the search or switching back to "All Products".</p>
            </div>
          ) : (
            filteredProducts.map(prod => (
              <ProductCard product={prod} key={prod.id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
