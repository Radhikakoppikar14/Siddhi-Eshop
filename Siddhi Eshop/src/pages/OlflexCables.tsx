import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, RotateCcw, Download, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { OLFLEX_110_PRODUCTS, ALL_OLFLEX_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import type { OlflexProduct } from '../types';

export const OlflexCables: React.FC = () => {
  const [subgroup, setSubgroup] = useState<'all' | '110' | '110sy' | '110cy' | '100'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCore, setSelectedCore] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { addCustomItem } = useCart();
  const { showToast } = useToast();

  const handleQtyChange = (partNo: string, val: number) => {
    setQuantities(prev => ({ ...prev, [partNo]: Math.max(1, val) }));
  };

  const filteredProducts = useMemo(() => {
    let list: OlflexProduct[] = ALL_OLFLEX_PRODUCTS && ALL_OLFLEX_PRODUCTS.length > 0 ? ALL_OLFLEX_PRODUCTS : OLFLEX_110_PRODUCTS;

    if (subgroup === '110') {
      list = list.filter(p => !p.name.includes('SY') && !p.name.includes('CY') && !p.name.includes('100'));
    } else if (subgroup === '110sy') {
      list = list.filter(p => p.name.includes('SY'));
    } else if (subgroup === '110cy') {
      list = list.filter(p => p.name.includes('CY'));
    } else if (subgroup === '100') {
      list = list.filter(p => p.name.includes('100'));
    }

    if (selectedCore !== 'all') {
      list = list.filter(p => p.core.toString() === selectedCore);
    }

    if (selectedSize !== 'all') {
      list = list.filter(p => p.size.toString() === selectedSize);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        p =>
          p.partNo.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          (p.desc && p.desc.toLowerCase().includes(q))
      );
    }

    return list;
  }, [subgroup, selectedCore, selectedSize, searchTerm]);

  const handleAddToCart = (product: OlflexProduct) => {
    const qty = quantities[product.partNo] || 100;
    addCustomItem({
      id: `lapp-${product.partNo}`,
      name: product.name,
      partNo: product.partNo,
      brand: 'LAPP KABEL',
      price: product.price,
      unit: 'meter'
    }, qty);
  };

  const handleExportCSV = () => {
    const headers = ['Part No', 'Product Name', 'Cores', 'Size (sq mm)', 'Basic Price (INR)', 'GST (INR)', 'MRP (INR)'];
    const rows = filteredProducts.map(p => [
      p.partNo,
      `"${p.name}"`,
      p.core,
      p.size,
      p.price,
      p.gst,
      p.mrp
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Siddhi_Lapp_Olflex_Catalog_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported catalog CSV successfully!');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCore('all');
    setSelectedSize('all');
    setSubgroup('all');
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px 0 60px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '14px' }}>
          <Link to="/" style={{ color: '#0284c7', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/about-lapp" style={{ color: '#0284c7', textDecoration: 'none' }}>Lapp Kabel Germany</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>ÖLFLEX® Power &amp; Control Cables</span>
        </div>

        {/* Top Hero Card */}
        <div className="sheet-hero-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span className="badge-orange" style={{ background: '#ff6600', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                  LAPP INDIA OFFICIAL
                </span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>VDE Reg. No. 7030 Certified</span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                ÖLFLEX® Power &amp; Control Cables Master Directory
              </h1>
              <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, maxWidth: '850px' }}>
                Complete price list, technical dimensions, copper weights, and electrical specifications for ÖLFLEX® CLASSIC 110, 110 SY (Steel Wire Braided), 110 CY (Screened EMC), and 100 I Series.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleExportCSV}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={14} />
                Export CSV Schedule
              </button>
              <Link
                to="/product-detail"
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                View 110 Technical Specs &rarr;
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
            <span className="sheet-app-tag"><CheckCircle2 size={12} style={{ color: '#16a34a' }} /> 300/500V Rated</span>
            <span className="sheet-app-tag"><CheckCircle2 size={12} style={{ color: '#16a34a' }} /> Bare Copper Class 5 Strands</span>
            <span className="sheet-app-tag"><CheckCircle2 size={12} style={{ color: '#16a34a' }} /> High Oil Resistance</span>
            <span className="sheet-app-tag"><CheckCircle2 size={12} style={{ color: '#16a34a' }} /> Bangalore Site Ready Stock</span>
            <span className="sheet-app-tag"><CheckCircle2 size={12} style={{ color: '#16a34a' }} /> Mill Test Certificate Included</span>
          </div>
        </div>

        {/* Subgroups Jump Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', background: '#ffffff', padding: '12px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>Sub-Groups:</span>
          <button
            className={`subgroup-jump-btn ${subgroup === 'all' ? 'active' : ''}`}
            onClick={() => setSubgroup('all')}
          >
            All Lapp Cables <span className="count-badge">{ALL_OLFLEX_PRODUCTS?.length || OLFLEX_110_PRODUCTS.length}</span>
          </button>
          <button
            className={`subgroup-jump-btn ${subgroup === '110' ? 'active' : ''}`}
            onClick={() => setSubgroup('110')}
          >
            ÖLFLEX® CLASSIC 110 (Unshielded) <span className="count-badge">113</span>
          </button>
          <button
            className={`subgroup-jump-btn ${subgroup === '110sy' ? 'active' : ''}`}
            onClick={() => setSubgroup('110sy')}
          >
            ÖLFLEX® CLASSIC 110 SY (Steel Braided) <span className="count-badge">26</span>
          </button>
          <button
            className={`subgroup-jump-btn ${subgroup === '110cy' ? 'active' : ''}`}
            onClick={() => setSubgroup('110cy')}
          >
            ÖLFLEX® CLASSIC 110 CY (Screened EMC) <span className="count-badge">32</span>
          </button>
          <button
            className={`subgroup-jump-btn ${subgroup === '100' ? 'active' : ''}`}
            onClick={() => setSubgroup('100')}
          >
            ÖLFLEX® 100 I (Color Coded) <span className="count-badge">25</span>
          </button>
        </div>

        {/* Master Filter Controls */}
        <div style={{ background: '#ffffff', border: '2px solid #fed7aa', borderRadius: '10px', padding: '16px 20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '14px', color: '#0f172a' }}>
              <Filter size={16} style={{ color: '#ff6600' }} />
              <span>Catalog Filter &amp; Search Engine</span>
            </div>
            <div style={{ fontSize: '12px', background: '#fff7ed', border: '1px solid #fed7aa', color: '#c2410c', padding: '4px 12px', borderRadius: '20px', fontWeight: 600 }}>
              Showing {filteredProducts.length} Verified Cable Configurations
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 250px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search Part No. (e.g. 1119752) or Dimension (e.g. 3G1.5)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', height: '38px', paddingLeft: '36px', paddingRight: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select
                value={selectedCore}
                onChange={e => setSelectedCore(e.target.value)}
                style={{ height: '38px', padding: '0 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', background: '#fff' }}
              >
                <option value="all">All Cores</option>
                <option value="2">2 Cores</option>
                <option value="3">3 Cores</option>
                <option value="4">4 Cores</option>
                <option value="5">5 Cores</option>
                <option value="7">7 Cores</option>
                <option value="10">10 Cores</option>
                <option value="12">12 Cores</option>
                <option value="18">18 Cores</option>
                <option value="25">25 Cores</option>
              </select>

              <select
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
                style={{ height: '38px', padding: '0 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', background: '#fff' }}
              >
                <option value="all">All Sizes (sq mm)</option>
                <option value="0.5">0.5 sq mm</option>
                <option value="0.75">0.75 sq mm</option>
                <option value="1">1.0 sq mm</option>
                <option value="1.5">1.5 sq mm</option>
                <option value="2.5">2.5 sq mm</option>
                <option value="4">4.0 sq mm</option>
                <option value="6">6.0 sq mm</option>
                <option value="10">10.0 sq mm</option>
              </select>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={resetFilters}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '38px' }}
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflowX: 'auto', boxShadow: '0 1px 6px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Part No</th>
                <th style={{ padding: '12px 16px' }}>Dimension &amp; Spec</th>
                <th style={{ padding: '12px 16px' }}>Cores x mm²</th>
                <th style={{ padding: '12px 16px' }}>Outer Dia</th>
                <th style={{ padding: '12px 16px' }}>Copper Wt</th>
                <th style={{ padding: '12px 16px' }}>Basic Price / m</th>
                <th style={{ padding: '12px 16px' }}>GST (18%)</th>
                <th style={{ padding: '12px 16px' }}>List Price</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Order Length (m)</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.slice(0, 150).map(item => {
                const qty = quantities[item.partNo] || 100;
                return (
                  <tr key={item.partNo} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)' }}>
                      {item.partNo}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1e293b' }}>
                      {item.name}
                      {item.desc && <div style={{ fontSize: '11px', color: '#64748b' }}>{item.desc}</div>}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>
                      {item.core} {item.pe} {item.size}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>
                      {item.outerDia ? `${item.outerDia} mm` : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>
                      {item.copperIndex ? `${item.copperIndex} kg` : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>
                      ₹{item.gst.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#e11d48' }}>
                      ₹{item.mrp.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <input
                        type="number"
                        min="1"
                        step="50"
                        value={qty}
                        onChange={e => handleQtyChange(item.partNo, parseInt(e.target.value) || 1)}
                        style={{ width: '70px', padding: '4px 6px', textAlign: 'center', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12.5px' }}
                      />
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddToCart(item)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 12px' }}
                      >
                        <ShoppingCart size={13} />
                        Add RFQ
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
