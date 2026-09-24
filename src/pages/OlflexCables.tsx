import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  RotateCcw,
  Download,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { OLFLEX_110_PRODUCTS, ALL_OLFLEX_PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import type { OlflexProduct } from "../types";
import { isValidPositiveNumber } from "../utils/validation";
import { RFQModal } from "../assets/components/ui/RFQModal.tsx";

export const OlflexCables: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Capture search query from URL parameters if passed from the header search bar
  const urlSearchQuery = searchParams.get("search") || "";

  const [subgroup, setSubgroup] = useState<
    "all" | "110" | "110sy" | "110cy" | "100"
  >("all");
  const [searchTerm, setSearchTerm] = useState(urlSearchQuery);
  const [selectedCore, setSelectedCore] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Ref to target product results for auto-scrolling
  const resultsRef = useRef<HTMLDivElement>(null);

  const { addCustomItem } = useCart();
  const { showToast } = useToast();

  // Keep search state synchronized if URL search parameter changes
  useEffect(() => {
    const query = searchParams.get("search");
    if (query !== null) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const handleQtyChange = (partNo: string, val: number) => {
    setQuantities((prev) => ({
      ...prev,
      [partNo]: isValidPositiveNumber(val) ? Math.floor(val) : 1,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    
    // Automatically smooth-scroll down to results when user types a search query
    if (val.trim().length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredProducts = useMemo(() => {
    let list: OlflexProduct[] =
      ALL_OLFLEX_PRODUCTS && ALL_OLFLEX_PRODUCTS.length > 0
        ? ALL_OLFLEX_PRODUCTS
        : OLFLEX_110_PRODUCTS;

    if (subgroup === "110") {
      list = list.filter(
        (p) =>
          !p.name.includes("SY") &&
          !p.name.includes("CY") &&
          !p.name.includes("100"),
      );
    } else if (subgroup === "110sy") {
      list = list.filter((p) => p.name.includes("SY"));
    } else if (subgroup === "110cy") {
      list = list.filter((p) => p.name.includes("CY"));
    } else if (subgroup === "100") {
      list = list.filter((p) => p.name.includes("100"));
    }

    if (selectedCore !== "all") {
      list = list.filter((p) => p.core.toString() === selectedCore);
    }

    if (selectedSize !== "all") {
      list = list.filter((p) => p.size.toString() === selectedSize);
    }

    if (searchTerm.trim()) {
      const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/);
      list = list.filter((p) => {
        const searchableText = `
          ${p.partNo || ""} 
          ${p.name || ""} 
          ${p.desc || ""} 
          ${p.subCategory || ""}
          ${p.category || ""}
        `.toLowerCase();
        return searchTerms.every((term) => searchableText.includes(term));
      });
    }

    return list;
  }, [subgroup, selectedCore, selectedSize, searchTerm]);

  const handleAddToCart = (product: OlflexProduct) => {
    const qty = quantities[product.partNo] || 100;
    addCustomItem(
      {
        id: `lapp-${product.partNo}`,
        name: product.name,
        partNo: product.partNo,
        brand: "LAPP KABEL",
        price: product.price,
        unit: "meter",
      },
      qty,
    );
  };

  const handleExportCSV = () => {
    const headers = [
      "Part No",
      "Product Name",
      "Cores",
      "Size (sq mm)",
      "Basic Price (INR)",
      "GST (INR)",
      "MRP (INR)",
    ];
    const rows = filteredProducts.map((p) => [
      p.partNo,
      `"${p.name}"`,
      p.core,
      p.size,
      p.price,
      p.gst,
      p.mrp,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Siddhi_Lapp_Olflex_Catalog_${Date.now()}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported catalog CSV successfully!");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCore("all");
    setSelectedSize("all");
    setSubgroup("all");
  };

  const groups = [
    {
      key: "110",
      title: "1. ÖLFLEX® CLASSIC 110",
      pill: "PVC outer sheath and numbered cores",
      description:
        "The benchmark oil-resistant flexible control cable for universal installation in electrical engineering, automation, and machine tooling.",
      specs:
        "Conductor: Bare copper wire, Class 5 fine strand | Outer Sheath: Special PVC, Silver-grey (RAL 7001), Oil-resistant | Cores: Black with continuous white numbers | Voltage: U0/U: 300/500 V",
      filter: (item: OlflexProduct) =>
        !item.name.includes("SY") &&
        !item.name.includes("CY") &&
        !item.name.includes("100"),
    },
    {
      key: "110sy",
      title: "2. ÖLFLEX® CLASSIC 110 SY",
      pill: "Steel wire braid · Mechanically protected",
      description:
        "Reinforced flexible control cable with galvanised steel wire braid for superior mechanical protection against crush, tensile forces, and rodents.",
      specs:
        "Protection: Galvanised steel wire braid (SY) | Outer Sheath: Transparent PVC | Cores: Black cores with white numbers | Application: Heavy machinery and production lines",
      filter: (item: OlflexProduct) => item.name.includes("SY"),
    },
    {
      key: "110cy",
      title: "3. ÖLFLEX® CLASSIC 110 CY",
      pill: "Copper wire braid · EMC Screened",
      description:
        "Screened flexible control cable with tinned copper wire braid offering high electromagnetic compatibility against interference in automation, PLC, and drive systems.",
      specs:
        "Screening: Tinned copper wire braid (CY) approx. 85% | Outer Sheath: Special PVC | Cores: Black with white numbers | Primary Use: Plant engineering and EMC environments",
      filter: (item: OlflexProduct) => item.name.includes("CY"),
    },
    {
      key: "100",
      title: "4. ÖLFLEX® 100 I",
      pill: "PVC outer sheath · Colour coded as per IS 694 cores",
      description:
        "Engineered for the Indian industrial and infrastructure market in compliance with BIS IS 694, with vivid colour-coded cores for intuitive identification.",
      specs:
        "Standard: IS 694:2010 (ISI Mark) & Flame Retardant (FR) | Outer Sheath: Premium FR PVC | Cores: Colour coded as per IS 694 | Voltage: Up to 1100 V",
      filter: (item: OlflexProduct) => item.name.includes("100"),
    },
  ] as const;

  const baseFilteredProducts = filteredProducts;

  const renderProductCard = (item: OlflexProduct) => {
    const qty = quantities[item.partNo] || 100;
    return (
      <article
        className="olflex-reference-card"
        key={item.partNo}
        style={{
          transition: "all 0.25s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div
          className="olflex-reference-image"
          onClick={() => navigate(`/product/${item.partNo}`)}
        >
          <img src="/images/cable-olflex-thumb.png" alt={item.name} />
        </div>
        <div className="olflex-reference-card-body">
          <span className="olflex-card-category">
            {item.category || "Power and control cables"}
          </span>
          <span className="olflex-card-subcategory">
            {item.desc ||
              item.subCategory ||
              "PVC outer sheath and numbered cores"}
          </span>

          <h3
            onClick={() => navigate(`/product/${item.partNo}`)}
            style={{
              color: "#0f172a",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#0f172a")}
          >
            {item.name}
          </h3>

          <p>
            Part No: <strong>{item.partNo}</strong>
          </p>
          <span className="olflex-card-spec">
            {item.core} Cores · {item.size} mm² (
            {item.pe === "G" ? "With Earth" : "Numbered"})
          </span>
          <div className="olflex-card-price">
            <strong>₹ {item.price.toFixed(2)}</strong>
            <span>+ ₹{item.gst.toFixed(2)} GST</span>
            <small>
              MRP ₹{item.mrp.toFixed(2)} <b>45% OFF</b>
            </small>
          </div>
          <div className="olflex-card-actions">
            <input
              type="number"
              min="1"
              step="50"
              value={qty}
              aria-label={`Order length for ${item.name}`}
              onChange={(event) =>
                handleQtyChange(item.partNo, Number(event.target.value))
              }
            />
            <button type="button" onClick={() => handleAddToCart(item)}>
              <ShoppingCart size={13} /> Add to Enquiry
            </button>
            <button
              type="button"
              className="olflex-quote-button"
              onClick={() =>
                setSelectedProduct(`${item.name} (${item.partNo})`)
              }
            >
              Request Quote
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div
      className="olflex-page"
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "20px 0 60px",
      }}
    >
      <div className="container">
        {/* Breadcrumbs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "14px",
          }}
        >
          <Link to="/" style={{ color: "#0284c7", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <Link
            to="/about-lapp"
            style={{ color: "#0284c7", textDecoration: "none" }}
          >
            Lapp Kabel Germany
          </Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>
            ÖLFLEX® Power &amp; Control Cables
          </span>
        </div>

        <section className="olflex-compact-hero">
          <div className="olflex-compact-copy">
            <div className="olflex-compact-title">
              <span>ÖLFLEX®</span>
              <h1>Power and Control Cables</h1>
            </div>
            <p>
              ÖLFLEX® is used in machinery, machine tools, system and appliance
              engineering, measuring, control, heating and air conditioning
              technologies.
            </p>
            <div className="olflex-compact-tags">
              <span>✓ Machinery &amp; Machine Tools</span>
              <span>✓ System &amp; Appliance Engineering</span>
              <span>✓ Measuring &amp; Control Systems</span>
              <span>✓ Heating &amp; Air Conditioning (HVAC)</span>
            </div>
          </div>
          <strong>LAPP GERMANY INDUSTRIAL CABLING</strong>
        </section>

        {/* Top Hero Card */}
        <div
          className="sheet-hero-card"
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "6px",
                }}
              >
                <span
                  className="badge-orange"
                  style={{
                    background: "#ff6600",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  LAPP INDIA OFFICIAL
                </span>
                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  VDE Reg. No. 7030 Certified
                </span>
              </div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: "0 0 8px",
                }}
              >
                ÖLFLEX® Power &amp; Control Cables Master Directory
              </h1>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#475569",
                  margin: 0,
                  maxWidth: "850px",
                }}
              >
                Complete price list, technical dimensions, copper weights, and
                electrical specifications for ÖLFLEX® CLASSIC 110, 110 SY (Steel
                Wire Braided), 110 CY (Screened EMC), and 100 I Series.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleExportCSV}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Download size={14} />
                Export CSV Schedule
              </button>
              <Link
                to="/product/1119003"
                className="btn btn-primary btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                View 110 Technical Specs &rarr;
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            <span className="sheet-app-tag">
              <CheckCircle2 size={12} style={{ color: "#16a34a" }} /> 300/500V
              Rated
            </span>
            <span className="sheet-app-tag">
              <CheckCircle2 size={12} style={{ color: "#16a34a" }} /> Bare
              Copper Class 5 Strands
            </span>
            <span className="sheet-app-tag">
              <CheckCircle2 size={12} style={{ color: "#16a34a" }} /> High Oil
              Resistance
            </span>
            <span className="sheet-app-tag">
              <CheckCircle2 size={12} style={{ color: "#16a34a" }} /> Bangalore
              Site Ready Stock
            </span>
            <span className="sheet-app-tag">
              <CheckCircle2 size={12} style={{ color: "#16a34a" }} /> Mill Test
              Certificate Included
            </span>
          </div>
        </div>

        {/* Subgroups Jump Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            background: "#ffffff",
            padding: "12px 18px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            marginBottom: "16px",
          }}
        >
          <span
            style={{ fontSize: "12.5px", fontWeight: 700, color: "#334155" }}
          >
            Jump to:
          </span>
          <button
            className={`subgroup-jump-btn ${subgroup === "all" ? "active" : ""}`}
            onClick={() => setSubgroup("all")}
          >
            All{" "}
            <span className="count-badge">
              {ALL_OLFLEX_PRODUCTS?.length || OLFLEX_110_PRODUCTS.length}
            </span>
          </button>
          <button
            className={`subgroup-jump-btn ${subgroup === "110" ? "active" : ""}`}
            onClick={() => setSubgroup("110")}
          >
            ÖLFLEX® CLASSIC 110 (Unshielded){" "}
            <span className="count-badge">113</span>
          </button>
          <button
            className={`subgroup-jump-btn ${subgroup === "110sy" ? "active" : ""}`}
            onClick={() => setSubgroup("110sy")}
          >
            ÖLFLEX® CLASSIC 110 SY (Steel Braided){" "}
            <span className="count-badge">26</span>
          </button>
          <button
            className={`subgroup-jump-btn ${subgroup === "110cy" ? "active" : ""}`}
            onClick={() => setSubgroup("110cy")}
          >
            ÖLFLEX® CLASSIC 110 CY (Screened EMC){" "}
            <span className="count-badge">32</span>
          </button>
          <button
            className={`subgroup-jump-btn ${subgroup === "100" ? "active" : ""}`}
            onClick={() => setSubgroup("100")}
          >
            ÖLFLEX® 100 I (Color Coded) <span className="count-badge">25</span>
          </button>
        </div>

        {/* Master Filter Controls */}
        <div
          style={{
            background: "#ffffff",
            border: "2px solid #fed7aa",
            borderRadius: "10px",
            padding: "16px 20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: 800,
                fontSize: "14px",
                color: "#0f172a",
              }}
            >
              <Filter size={16} style={{ color: "#ff6600" }} />
              <span>Master Cable Filter (Filters in All Groups Below)</span>
            </div>
            <div
              style={{
                fontSize: "12px",
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                color: "#c2410c",
                padding: "4px 12px",
                borderRadius: "20px",
                fontWeight: 600,
              }}
            >
              {filteredProducts.length} Total Matches
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 250px", position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />
              <input
                type="text"
                placeholder="Search by Part No (e.g. 1119003, 1125003)..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  width: "100%",
                  height: "38px",
                  paddingLeft: "36px",
                  paddingRight: "12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "13px",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <select
                value={selectedCore}
                onChange={(e) => setSelectedCore(e.target.value)}
                style={{
                  height: "38px",
                  padding: "0 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "13px",
                  background: "#fff",
                }}
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
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{
                  height: "38px",
                  padding: "0 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "13px",
                  background: "#fff",
                }}
              >
                <option value="all">All Sizes</option>
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  height: "38px",
                }}
              >
                <RotateCcw size={14} /> Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results section reference container for auto-scrolling */}
        <div ref={resultsRef}>
          {groups.map((group) => {
            const products = baseFilteredProducts
              .filter(group.filter)
              .slice(0, 150);
            return (
              <section
                className="olflex-reference-section"
                id={`section-${group.key}`}
                key={group.key}
              >
                <div className="olflex-subgroup-info">
                  <div className="olflex-subgroup-heading">
                    <h2>{group.title}</h2>
                    <span>{group.pill}</span>
                    <em>{products.length} Items</em>
                  </div>
                  <p>{group.description}</p>
                  <div className="olflex-subgroup-specs">{group.specs}</div>
                </div>
                <div className="olflex-products-heading">
                  <strong>
                    {group.title.replace(/^\d\. /, "")} Products:{" "}
                    {products.length}
                  </strong>
                  <span>Scroll horizontally →</span>
                </div>
                <div className="olflex-reference-track">
                  {products.map(renderProductCard)}
                </div>
              </section>
            );
          })}
        </div>

        <div className="olflex-comparison-card">
          <h2>▧ Technical Comparison · Lapp Control Cable Sub-Groups</h2>
          <div className="olflex-comparison-scroll">
            <table>
              <thead>
                <tr>
                  <th>Product Group</th>
                  <th>Core Coding Scheme</th>
                  <th>Internal Protection / Screening</th>
                  <th>Outer Sheath Type</th>
                  <th>Standard / Certification</th>
                  <th>Primary Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ÖLFLEX® CLASSIC 110</td>
                  <td>Black cores with white numbers</td>
                  <td>None (Standard Flexible)</td>
                  <td>Special Oil-Resistant PVC</td>
                  <td>VDE Reg. No. 7030, CE</td>
                  <td>General machine tools &amp; control cabinets</td>
                </tr>
                <tr>
                  <td>ÖLFLEX® CLASSIC 110 SY</td>
                  <td>Black cores with white numbers</td>
                  <td>
                    <b>Galvanised Steel Wire Braid (SY)</b>
                  </td>
                  <td>Transparent PVC</td>
                  <td>VDE-based, CE</td>
                  <td>Heavy mechanical duty &amp; cable trays</td>
                </tr>
                <tr>
                  <td>ÖLFLEX® CLASSIC 110 CY</td>
                  <td>Black cores with white numbers</td>
                  <td>
                    <b>Tinned Copper Wire Braid (CY)</b>
                  </td>
                  <td>Special PVC (EMC)</td>
                  <td>VDE-based, CE, EMC</td>
                  <td>Plant engineering and EMC environments</td>
                </tr>
                <tr>
                  <td>ÖLFLEX® 100 I</td>
                  <td>
                    <b>Colour coded as per IS 694</b>
                  </td>
                  <td>Unshielded</td>
                  <td>Flame Retardant PVC</td>
                  <td>
                    <b>BIS IS 694:2010</b>
                  </td>
                  <td>Indian plant engineering &amp; infrastructure</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <RFQModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};