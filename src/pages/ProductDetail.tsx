import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, CheckCircle2, FileText, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useCart } from "../context/CartContext";
import { isValidPositiveNumber } from "../utils/validation";
import { RFQModal } from "../assets/components/ui/RFQModal";

export const ProductDetail: React.FC = () => {
  const { id: _id } = useParams<{ id: string }>();
  const { addCustomItem } = useCart();

  // Interactive selectors state
  const [selectedCore, setSelectedCore] = useState("3 Core");
  const [selectedSize, setSelectedSize] = useState("0.5 Sqmm");
  const [selectedConductor, setSelectedConductor] = useState("With Earth (Yellow/Green - G)");
  const [qty, setQty] = useState(50);
  const [selectedImg, setSelectedImg] = useState("/images/cable-olflex-thumb.png");
  
  // Zoom functionality state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // State to manage RFQ Modal pop-up
  const [selectedProductForRFQ, setSelectedProductForRFQ] = useState<string | null>(null);

  const coreOptions = [
    "2 Core", "3 Core", "4 Core", "5 Core", "6 Core", "7 Core", "8 Core",
    "10 Core", "12 Core", "14 Core", "15 Core", "16 Core", "18 Core",
    "20 Core", "21 Core", "25 Core", "30 Core", "32 Core", "34 Core",
    "35 Core", "36 Core", "40 Core", "41 Core", "50 Core", "52 Core"
  ];

  const sizeOptions = [
    "0.5 Sqmm", "0.75 Sqmm", "1 Sqmm", "1.5 Sqmm", "2.5 Sqmm",
    "4 Sqmm", "6 Sqmm", "10 Sqmm", "16 Sqmm", "25 Sqmm", "35 Sqmm"
  ];

  const conductorOptions = [
    "With Earth (Yellow/Green - G)",
    "Without Earth (Numbered - X)",
  ];

  const galleryImages = [
    { src: "/images/cable-olflex-thumb.png", label: "Main Profile" },
    { src: "/images/cable-olflex-angle.png", label: "Angle View" },
    { src: "/images/cable-olflex-cores.png", label: "Numbered Cores" },
    { src: "/images/cable-olflex-drum.png", label: "Wooden Drum" },
  ];

  // Zoom control handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.4, 3.0));
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.4, 1.0);
      if (next === 1) setIsZoomed(false);
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setIsZoomed(false);
    setMousePos({ x: 50, y: 50 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // Dynamic Part Number & Specs generation based on selections
  const getDynamicPartData = () => {
    const coreNum = parseInt(selectedCore) || 1;
    const sizeNum = parseFloat(selectedSize) || 0.5;
    
    const baseSku = 1119000;
    const generatedPartNo = (baseSku + (coreNum * 17) + Math.round(sizeNum * 10)).toString();

    const outerDia = Number((4.2 + Math.sqrt(coreNum) * sizeNum * 0.9).toFixed(1));
    const copperKg = Number((coreNum * sizeNum * 9.6).toFixed(1));
    const totalWeight = Number((copperKg * 3.8 + coreNum * 15).toFixed(0));

    return {
      partNo: generatedPartNo,
      outerDia,
      copperKg,
      totalWeight,
    };
  };

  const currentPartData = getDynamicPartData();

  // Dynamic price calculation based on selected core and size
  const calculateDynamicPrice = () => {
    const coreNum = parseInt(selectedCore) || 1;
    const sizeNum = parseFloat(selectedSize) || 0.5;

    const baseUnitPrice = 35; 
    const calculatedPrice = baseUnitPrice * Math.pow(coreNum, 0.45) * Math.pow(sizeNum, 0.75) + 15;
    
    const finalPrice = Math.max(25, Number(calculatedPrice.toFixed(2)));
    const gstPrice = Number((finalPrice * 0.18).toFixed(2));
    const mrpPrice = Number((finalPrice * 1.82).toFixed(2));

    return {
      price: finalPrice,
      gst: gstPrice,
      mrp: mrpPrice,
    };
  };

  const currentPricing = calculateDynamicPrice();

  const handleAddToCart = () => {
    if (!isValidPositiveNumber(qty)) return;
    
    const uniqueVariationId = `${currentPartData.partNo}-${selectedCore}-${selectedSize}-${selectedConductor}`;

    addCustomItem(
      {
        id: uniqueVariationId,
        name: `ÖLFLEX® CLASSIC 110 ${selectedCore} ${selectedSize} (${selectedConductor})`,
        partNo: currentPartData.partNo,
        brand: "LAPP KABEL",
        price: currentPricing.price,
        unit: "meter",
      },
      qty
    );
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "20px 0 60px" }}>
      <style>{`
        .cfg-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          margin: 0 0 10px;
        }
        .cfg-label {
          font-size: 13px;
          font-weight: 700;
          line-height: 1.3;
          color: #0f172a;
        }
        .cfg-value {
          flex: 0 0 auto;
          font-size: 12.5px;
          font-weight: 700;
          line-height: 1.3;
          color: #f97316;
          white-space: nowrap;
        }
        .cfg-options {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          margin: 0 0 20px;
        }
        .cfg-group:last-child .cfg-options {
          margin-bottom: 0;
        }
        .cfg-opt {
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          min-height: 40px;
          margin: 0;
          padding: 8px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 600;
          line-height: 1.2;
          white-space: nowrap;
          color: #1e293b;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
        }
        .cfg-opt:hover {
          border-color: #94a3b8;
        }
        .cfg-opt.is-active {
          color: #c32125;
          background: #fff5f5;
          border-color: #c32125;
          box-shadow: 0 0 0 1px #c32125;
        }
        .cfg-options--stack {
          grid-template-columns: 1fr;
        }
        .cfg-options--stack .cfg-opt {
          white-space: normal;
          padding: 10px 12px;
        }
        .cfg-options--stack .cfg-opt.is-active {
          color: #ffffff;
          background: #0f172a;
          border-color: #0f172a;
          box-shadow: none;
        }
      `}</style>

      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "#64748b", marginBottom: "20px", flexWrap: "wrap" }}>
          <Link to="/" style={{ color: "#0284c7", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link to="/about-lapp" style={{ color: "#0284c7", textDecoration: "none" }}>LAPP India</Link>
          <span>/</span>
          <Link to="/olflex-cables" style={{ color: "#0284c7", textDecoration: "none" }}>ÖLFLEX® Power & Control Cables</Link>
          <span>/</span>
          <strong style={{ color: "#c32125" }}>ÖLFLEX® CLASSIC 110 {selectedCore} {selectedSize} (Part: {currentPartData.partNo})</strong>
        </div>

        {/* Main 3-Column Layout */}
        <div className="product-detail-grid" style={{ alignItems: "start" }}>        
          
          {/* Column 1: Image Gallery & Zoom Preview */}
          <div>
            <div 
              style={{ 
                background: "#ffffff", 
                border: "1px solid #e2e8f0", 
                borderRadius: "8px", 
                padding: "16px", 
                textAlign: "center", 
                marginBottom: "12px", 
                height: "340px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                position: "relative",
                overflow: "hidden",
                cursor: isZoomed ? "zoom-out" : "zoom-in"
              }}
              onMouseMove={handleMouseMove}
              onClick={() => {
                if (!isZoomed) {
                  setIsZoomed(true);
                  setZoomLevel(2.2);
                } else {
                  handleResetZoom();
                }
              }}
            >
              {/* Zoom Percentage Badge */}
              <div style={{ position: "absolute", top: "10px", right: "10px", background: "#ff6600", color: "#fff", fontSize: "10px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", zIndex: 10 }}>
                Zoom: {Math.round(zoomLevel * 100)}%
              </div>

              {/* Floating Toolbar Controls */}
              <div 
                style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "4px", zIndex: 10 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  type="button" 
                  onClick={handleZoomIn} 
                  title="Zoom In"
                  style={{ background: "rgba(15, 23, 42, 0.75)", color: "#fff", border: "none", borderRadius: "4px", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <ZoomIn size={15} />
                </button>
                <button 
                  type="button" 
                  onClick={handleZoomOut} 
                  title="Zoom Out"
                  style={{ background: "rgba(15, 23, 42, 0.75)", color: "#fff", border: "none", borderRadius: "4px", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <ZoomOut size={15} />
                </button>
                <button 
                  type="button" 
                  onClick={handleResetZoom} 
                  title="Reset Zoom"
                  style={{ background: "rgba(15, 23, 42, 0.75)", color: "#fff", border: "none", borderRadius: "4px", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <RotateCcw size={15} />
                </button>
              </div>

              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img 
                  src={selectedImg} 
                  alt="ÖLFLEX CLASSIC 110" 
                  style={{ 
                    maxHeight: "100%", 
                    maxWidth: "100%", 
                    objectFit: "contain",
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transition: isZoomed ? "transform 0.1s ease-out" : "transform 0.3s ease"
                  }} 
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedImg(img.src);
                    handleResetZoom();
                  }}
                  style={{
                    width: "60px",
                    height: "60px",
                    border: selectedImg === img.src ? "2px solid #ff6600" : "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#fff",
                    cursor: "pointer",
                    padding: "4px",
                    flexShrink: 0
                  }}
                >
                  <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Product Titles, Description & Interactive Selectors */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px" }}>
            <span style={{ color: "#ff6600", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>LAPP KABEL GERMANY</span>
            <h1 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: "4px 0 4px" }}>
              ÖLFLEX® CLASSIC 110 {selectedCore} {selectedSize}
            </h1>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "12px" }}>
              PVC Copper Insulated Number coded cables
            </p>
            <div style={{ fontSize: "12px", color: "#334155", marginBottom: "16px" }}>
              Part No: <strong style={{ color: "#0284c7" }}>{currentPartData.partNo}</strong>
            </div>

            {/* Info Box */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #ff6600", padding: "12px 14px", borderRadius: "6px", marginBottom: "20px" }}>
              <strong style={{ fontSize: "12.5px", color: "#0f172a", display: "block", marginBottom: "3px" }}>
                Oil-resistant PVC control cable with numbered cores
              </strong>
              <p style={{ margin: 0, color: "#64748b", fontSize: "11.5px", lineHeight: "1.4" }}>
                ÖLFLEX® CLASSIC 110 ({selectedCore}, {selectedSize}) - VDE registered, flexible control cable with {selectedConductor.toLowerCase()}, U0/U: 300/500V
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", color: "#16a34a", fontSize: "11.5px", fontWeight: 700 }}>
                <CheckCircle2 size={13} /> VDE certificate of conformity with factory surveillance
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px", color: "#c32125", fontSize: "11.5px", fontWeight: 700 }}>
                <FileText size={13} /> product information (PDF)
              </div>
            </div>

            {/* 1. Number of Core Selector */}
            <div className="cfg-group">
              <div className="cfg-head">
                <span className="cfg-label">1. Number of core</span>
                <span className="cfg-value">{selectedCore}</span>
              </div>
              <div className="cfg-options">
                {coreOptions.map((core) => (
                  <button
                    key={core}
                    type="button"
                    className={`cfg-opt${selectedCore === core ? " is-active" : ""}`}
                    aria-pressed={selectedCore === core}
                    onClick={() => setSelectedCore(core)}
                  >
                    {core}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Size (Sqmm) Selector */}
            <div className="cfg-group">
              <div className="cfg-head">
                <span className="cfg-label">2. Size (Sqmm)</span>
                <span className="cfg-value">{selectedSize}</span>
              </div>
              <div className="cfg-options">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`cfg-opt${selectedSize === size ? " is-active" : ""}`}
                    aria-pressed={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Protective Conductor Selector */}
            <div className="cfg-group">
              <div className="cfg-head">
                <span className="cfg-label">3. Protective conductor (with/without Yellow/Green)</span>
                <span className="cfg-value">
                  {selectedConductor.startsWith("With Earth") ? "With Earth (G)" : "Without (X)"}
                </span>
              </div>
              <div className="cfg-options cfg-options--stack">
                {conductorOptions.map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    className={`cfg-opt${selectedConductor === cond ? " is-active" : ""}`}
                    aria-pressed={selectedConductor === cond}
                    onClick={() => setSelectedConductor(cond)}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Pricing & Summary Boxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "sticky", top: "20px" }}>
            
            {/* Dynamic Price Box */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "2px" }}>₹{(currentPricing.price + currentPricing.gst).toFixed(2)} (incl. of all taxes) / mtr</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a" }}>₹{currentPricing.price}</span>
                <span style={{ fontSize: "11.5px", color: "#16a34a", fontWeight: 700 }}>+ ₹{currentPricing.gst} GST</span>
              </div>
              <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "16px" }}>
                MRP <span style={{ textDecoration: "line-through" }}>₹{currentPricing.mrp}</span> <strong style={{ color: "#c32125" }}>45% OFF</strong>
              </div>

              {/* Quantity Controller */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", background: "#f8fafc", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>Update Qty (Mtrs)</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: "26px", height: "26px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>-</button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                    style={{ width: "45px", textAlign: "center", border: "none", background: "transparent", fontWeight: "bold", fontSize: "13px" }}
                  />
                  <button onClick={() => setQty(qty + 1)} style={{ width: "26px", height: "26px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>+</button>
                </div>
              </div>
              <div style={{ fontSize: "10.5px", color: "#d97706", marginBottom: "16px", lineHeight: "1.3" }}>
                ⚠️ Caution: order Multiple of 10 Mtrs or 25 mtrs for all multicore
              </div>

              {/* Unified Add to Enquiry Button */}
              <button className="btn btn-primary" onClick={handleAddToCart} style={{ width: "100%", background: "#2563eb", justifyContent: "center", cursor: "pointer" }}>
                <ShoppingCart size={15} /> ADD TO ENQUIRY
              </button>
            </div>

            {/* Bulk Order Box */}
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "16px" }}>
              <strong style={{ fontSize: "12px", color: "#166534", display: "block", marginBottom: "4px" }}>Bulk Order?</strong>
              <p style={{ fontSize: "11px", color: "#475569", margin: "0 0 10px", lineHeight: "1.4" }}>
                Need a large quantity? Raise an RFQ to get our best custom B2B pricing for your project.
              </p>
              <button 
                className="btn btn-sm" 
                onClick={() => setSelectedProductForRFQ(`Bulk Order RFQ: ÖLFLEX® CLASSIC 110 ${selectedCore} ${selectedSize} (${selectedConductor}) (Part: ${currentPartData.partNo}) - Qty: ${qty}m`)} 
                style={{ background: "#16a34a", color: "#fff", width: "100%", fontWeight: 800, cursor: "pointer" }}
              >
                RAISE RFQ
              </button>
            </div>

            {/* Technical Data Summary Box */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px" }}>
              <strong style={{ fontSize: "12px", textTransform: "uppercase", color: "#0f172a", display: "block", marginBottom: "10px", letterSpacing: "0.5px" }}>
                Technical Data Summary
              </strong>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", textAlign: "center" }}>
                <div style={{ background: "#f8fafc", padding: "8px 4px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ display: "block", fontSize: "10px", color: "#64748b" }}>Outer dia</span>
                  <strong style={{ fontSize: "12px", color: "#0f172a" }}>{currentPartData.outerDia} mm</strong>
                </div>
                <div style={{ background: "#f8fafc", padding: "8px 4px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ display: "block", fontSize: "10px", color: "#64748b" }}>Copper</span>
                  <strong style={{ fontSize: "12px", color: "#0f172a" }}>{currentPartData.copperKg} kg/km</strong>
                </div>
                <div style={{ background: "#f8fafc", padding: "8px 4px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ display: "block", fontSize: "10px", color: "#64748b" }}>Weight</span>
                  <strong style={{ fontSize: "12px", color: "#0f172a" }}>{currentPartData.totalWeight} kg/km</strong>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* RFQ Modal Popup */}
      {selectedProductForRFQ && (
        <RFQModal
          product={selectedProductForRFQ}
          onClose={() => setSelectedProductForRFQ(null)}
        />
      )}
    </div>
  );
};