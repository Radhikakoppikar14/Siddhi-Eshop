import React, { useState, useMemo, useEffect } from "react";
import { PRODUCTS_DATA } from "../../../data/products";
import { ProductCard } from "../products/ProductCard";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";
import {
  getShortProductName,
  getProductCores,
  getProductSize,
  getProductColor,
} from "../../../utils/formatters";
import {
  RotateCcw,
  ArrowUpDown,
  Search,
  ArrowRight,
  ShieldCheck,
  X,
  FileText,
  LayoutGrid,
  List,
  Check,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../../types";

interface CatalogGridProps {
  selectedBrand?: string;
  onBrandChange?: (brand: string) => void;
  isFullPage?: boolean;
}

interface ProductDetailsRowProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
}

const ProductDetailsRow: React.FC<ProductDetailsRowProps> = ({
  product,
  isSelected,
  onSelect,
}) => {
  const { addToCart } = useCart();
  const { openQuickView } = useAuth();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    setAdded(true);
    showToast(`Added ${product.name} to RFQ Cart!`);
    setTimeout(() => setAdded(false), 1600);
  };

  const getBrandBadge = () => {
    const b = product.brand.toLowerCase();
    if (b.includes("lapp")) return "bg-red-50 text-red-800 border-red-200";
    if (b.includes("eaton")) return "bg-sky-50 text-sky-800 border-sky-200";
    if (b.includes("partex")) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    if (b.includes("menn")) return "bg-purple-50 text-purple-800 border-purple-200";
    return "bg-slate-100 text-slate-800 border-slate-200";
  };

  return (
    <tr
      onClick={() => onSelect(product)}
      className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors cursor-pointer group ${
        isSelected ? "bg-amber-50/50" : ""
      }`}
    >
      {/* 1. Item & Thumbnail */}
      <td className="py-3 px-4 align-middle">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform shadow-2xs">
            <img
              src={product.image || "/images/card-cables.jpg"}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/card-cables.jpg";
              }}
            />
          </div>
          <div className="min-w-0">
            <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border mb-0.5 ${getBrandBadge()}`}>
              {product.brand}
            </span>
            <div className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors text-xs truncate max-w-xs sm:max-w-sm" title={product.name}>
              {getShortProductName(product.name)}
            </div>
            <div className="text-[11px] text-slate-500 font-sans truncate max-w-xs">
              {product.application}
            </div>
          </div>
        </div>
      </td>

      {/* 2. Part No / SKU */}
      <td className="py-3 px-3 align-middle font-mono text-xs whitespace-nowrap">
        <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
          {product.partNo}
        </span>
      </td>

      {/* 3. Cores & Size */}
      <td className="py-3 px-3 align-middle whitespace-nowrap">
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 font-mono text-[11px] font-bold border border-slate-200 w-fit">
            {getProductCores(product)}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-mono text-[11px] font-bold border border-sky-200 w-fit">
            {getProductSize(product)}
          </span>
        </div>
      </td>

      {/* 4. Color / Sheath */}
      <td className="py-3 px-3 align-middle whitespace-nowrap">
        {(() => {
          const color = getProductColor(product);
          return (
            <div className="flex items-center gap-1.5 max-w-[150px]">
              <span
                className="w-2.5 h-2.5 rounded-full border shrink-0 shadow-2xs"
                style={{ backgroundColor: color.dotColor, borderColor: "rgba(0,0,0,0.2)" }}
              />
              <span className="text-[11px] font-medium text-slate-700 font-mono truncate" title={color.label}>
                {color.label.split("(")[0].trim()}
              </span>
            </div>
          );
        })()}
      </td>

      {/* 5. Rating & Specifications */}
      <td className="py-3 px-3 align-middle">
        <div className="flex flex-wrap items-center gap-1.5 max-w-xs">
          {product.voltage && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-mono text-[10px] border border-amber-200 font-semibold">
              {product.voltage}
            </span>
          )}
          {product.specs.slice(0, 2).map((spec, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200/60 truncate max-w-[180px]"
            >
              {spec}
            </span>
          ))}
        </div>
      </td>

      {/* 4. Availability */}
      <td className="py-3 px-4 align-middle whitespace-nowrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{product.stock || "Ready Stock"}</span>
        </span>
      </td>

      {/* 5. Rate */}
      <td className="py-3 px-4 align-middle whitespace-nowrap">
        <div className="font-mono font-black text-emerald-700 text-xs sm:text-sm">
          ₹{product.price.toFixed(2)}
          <span className="text-[10px] text-slate-400 font-normal ml-1">/{product.unit}</span>
        </div>
        <span className="text-[9px] text-slate-400 font-mono block">Excl. 18% GST</span>
      </td>

      {/* 6. Actions */}
      <td className="py-3 px-4 align-middle text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
            title="Quick view product specs"
          >
            <Eye size={13} />
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs hover:scale-102 cursor-pointer ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-slate-950 hover:bg-slate-800 text-white"
            }`}
          >
            {added ? (
              <>
                <Check size={12} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={12} />
                <span>+ RFQ</span>
              </>
            )}
          </button>

          <Link
            to={`/product/${product.id}`}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
            title="View full datasheet"
          >
            <ArrowRight size={13} />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export const CatalogGrid: React.FC<CatalogGridProps> = ({
  selectedBrand: controlledBrand,
  onBrandChange: controlledSetBrand,
  isFullPage = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [internalSelectedBrand, setInternalSelectedBrand] = useState("all");
  const selectedBrand = controlledBrand !== undefined ? controlledBrand : internalSelectedBrand;
  const [brandSubFilter, setBrandSubFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  
  // View mode switcher: "grid" (visual cards) vs "details" (technical data sheet view)
  const [viewMode, setViewMode] = useState<"grid" | "details">("grid");

  // Home page view limiter: keep a curated preview on Home, full on catalog page
  const [showAllOnHome, setShowAllOnHome] = useState(false);

  // Selected product displayed in the 21st Century Inspector below
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS_DATA[0]);
  
  const { searchQuery, setSearchQuery, searchCategory, setSearchCategory, openQuickView } = useAuth();

  const handleBrandChange = (brand: string) => {
    if (controlledSetBrand) controlledSetBrand(brand);
    setInternalSelectedBrand(brand);
    setBrandSubFilter("all");
    setSelectedCategory("all");
  };

  useEffect(() => {
    const handleSelectBrandEvent = (e: any) => {
      const b = e.detail?.brand || e.detail?.brandId;
      if (!b) return;
      let mapped = "all";
      const lower = b.toLowerCase();
      if (lower.includes("lapp")) mapped = "LAPP KABEL";
      else if (lower.includes("eaton")) mapped = "EATON - MOELLER";
      else if (lower.includes("partex")) mapped = "PARTEX SWEDEN";
      else if (lower.includes("menn")) mapped = "MENNEKES";
      handleBrandChange(mapped);
    };
    window.addEventListener("select-brand-catalog", handleSelectBrandEvent);
    return () => window.removeEventListener("select-brand-catalog", handleSelectBrandEvent);
  }, [controlledSetBrand]);

  const categories = [
    { id: "all", label: "All Categories", activeClass: "bg-slate-950 text-white font-bold shadow-sm" },
    { id: "cables", label: "Power & Control Cables", activeClass: "bg-amber-100 text-amber-900 border-amber-400 font-bold shadow-xs" },
    { id: "switchgear", label: "Industrial Switchgear", activeClass: "bg-sky-100 text-sky-900 border-sky-400 font-bold shadow-xs" },
    { id: "data", label: "Data Cables & Marking", activeClass: "bg-emerald-100 text-emerald-900 border-emerald-400 font-bold shadow-xs" },
    { id: "plugs", label: "CEE Plugs & Enclosures", activeClass: "bg-purple-100 text-purple-900 border-purple-400 font-bold shadow-xs" },
    { id: "accessories", label: "Cable Glands & Earthing", activeClass: "bg-rose-100 text-rose-900 border-rose-400 font-bold shadow-xs" },
  ];

  const brands = [
    { id: "all", label: "All Brands", activeClass: "bg-slate-950 text-white font-bold" },
    { id: "LAPP KABEL", label: "Lapp Kabel", activeClass: "bg-red-600 text-white font-black border-red-600 shadow-md shadow-red-500/25" },
    { id: "EATON - MOELLER", label: "Eaton Moeller", activeClass: "bg-[#1864f7] text-white font-black border-blue-600 shadow-md shadow-blue-500/25" },
    { id: "PARTEX SWEDEN", label: "Partex Sweden", activeClass: "bg-emerald-600 text-white font-black border-emerald-600 shadow-md shadow-emerald-500/25" },
    { id: "MENNEKES", label: "Mennekes Germany", activeClass: "bg-red-600 text-white font-black border-red-600 shadow-md shadow-red-500/25" },
  ];

  // Brand spotlight definitions with modern colors & authentic details
  const brandSpotlights: Record<
    string,
    {
      logo: string;
      origin: string;
      partnerTag: string;
      headline: string;
      description: string;
      themeBg: string;
      borderColor: string;
      accentColor: string;
      badgeStyle: string;
      makeSheetUrl: string;
      subFilters: { id: string; label: string; match: string }[];
    }
  > = {
    "LAPP KABEL": {
      logo: "/images/logo-lapp.png",
      origin: "Stuttgart, Germany · Jigani (Bangalore)",
      partnerTag: "OFFICIAL DIRECT AUTHORIZED CHANNEL PARTNER",
      headline: "LAPP Kabel — German Benchmark in Flexible Industrial Cables",
      description:
        "Direct warehouse drum stock of ÖLFLEX® Classic 110, 110 SY (Steel Wire Braided), 110 CY (Tinned Copper EMC Screened), UNITRONIC® Data lines, and IP68 SKINTOP® nickel-plated brass cable glands. Full EN 10204 3.1 MTC certificates provided.",
      themeBg: "from-red-500/15 via-orange-500/10 to-red-50/70",
      borderColor: "border-red-300",
      accentColor: "text-red-950",
      badgeStyle: "bg-red-100 text-red-900 border-red-300",
      makeSheetUrl: "/about-lapp",
      subFilters: [
        { id: "all", label: "All LAPP Products", match: "" },
        { id: "110", label: "ÖLFLEX® 110 Control", match: "110" },
        { id: "sy", label: "110 SY (Steel Braid)", match: "SY" },
        { id: "cy", label: "110 CY (Screened EMC)", match: "CY" },
        { id: "skintop", label: "SKINTOP® Glands", match: "SKINTOP" },
      ],
    },
    "EATON - MOELLER": {
      logo: "/images/logo-eaton.png",
      origin: "Bonn, Germany · Cleveland, USA",
      partnerTag: "AUTHORIZED INDUSTRIAL SWITCHGEAR STOCKIST",
      headline: "EATON Moeller — Industrial Motor Control & Power Distribution",
      description:
        "PKZM0 motor-protective circuit breakers with up to 150 kA breaking capacity, DILM power contactors with electronic wide-range coils, and NZM compact MCCBs up to 1600A for modern automated panels.",
      themeBg: "from-sky-400/15 via-blue-500/10 to-sky-50/70",
      borderColor: "border-sky-300",
      accentColor: "text-sky-900",
      badgeStyle: "bg-sky-100 text-sky-900 border-sky-300",
      makeSheetUrl: "/about-eaton",
      subFilters: [
        { id: "all", label: "All EATON Switchgear", match: "" },
        { id: "pkzm0", label: "PKZM0 Breakers", match: "PKZM" },
        { id: "dilm", label: "DILM Contactors", match: "DILM" },
        { id: "nzm", label: "NZM Compact MCCB", match: "NZM" },
      ],
    },
    "PARTEX SWEDEN": {
      logo: "/images/logo-partex.png",
      origin: "Gullspång, Sweden",
      partnerTag: "DIRECT AUTHORIZED IDENTIFICATION SYSTEMS DISTRIBUTOR",
      headline: "PARTEX Sweden — Industrial Wire & Cable Marking Systems",
      description:
        "Precision PA closed chevron wire sleeves (UL94-V0), ProMark T-1000 300dpi thermal transfer marker printers, and AISI 316 acid-proof stainless steel tags for harsh marine and chemical environments.",
      themeBg: "from-emerald-400/15 via-teal-500/10 to-emerald-50/70",
      borderColor: "border-emerald-300",
      accentColor: "text-emerald-900",
      badgeStyle: "bg-emerald-100 text-emerald-900 border-emerald-300",
      makeSheetUrl: "/about-partex",
      subFilters: [
        { id: "all", label: "All PARTEX Systems", match: "" },
        { id: "pa", label: "PA Chevron Sleeves", match: "PA" },
        { id: "t1000", label: "ProMark T-1000 Printer", match: "T-1000" },
        { id: "ss316", label: "PKS Stainless Steel 316", match: "PKS" },
      ],
    },
    "MENNEKES": {
      logo: "/images/logo-mennekes.png",
      origin: "Kirchhundem, Germany",
      partnerTag: "AUTHORIZED INDUSTRIAL CEE DISTRIBUTOR",
      headline: "MENNEKES — Heavy-Duty Industrial Plugs, Sockets & AMAXX",
      description:
        "16A to 125A CEE industrial plugs with IP67 PowerTOP® Xtra technology, switched interlocked panel receptacles, and modular AMAPLAST AMAXX power distribution assemblies.",
      themeBg: "from-red-500/15 via-rose-500/10 to-red-50/70",
      borderColor: "border-red-300",
      accentColor: "text-red-950",
      badgeStyle: "bg-red-100 text-red-900 border-red-300",
      makeSheetUrl: "/about-mennekes",
      subFilters: [
        { id: "all", label: "All MENNEKES Range", match: "" },
        { id: "powertop", label: "PowerTOP® Xtra", match: "PowerTOP" },
        { id: "cee", label: "CEE 16A-32A Sockets", match: "CEE" },
        { id: "amaxx", label: "AMAXX® Combinations", match: "AMAXX" },
      ],
    },
  };

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS_DATA;

    // Filter by Category
    if (selectedCategory !== "all") {
      if (selectedCategory === "accessories") {
        list = list.filter((p) => p.category === "accessories" || p.category === "earthing");
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    // Filter by Brand
    if (selectedBrand !== "all") {
      list = list.filter((p) => p.brand === selectedBrand);
    }

    // Filter by Brand Sub-Filter if active
    if (brandSubFilter !== "all" && selectedBrand !== "all") {
      const bInfo = brandSpotlights[selectedBrand];
      if (bInfo) {
        const sub = bInfo.subFilters.find((s) => s.id === brandSubFilter);
        if (sub && sub.match) {
          const matchLower = sub.match.toLowerCase();
          list = list.filter(
            (p) =>
              p.name.toLowerCase().includes(matchLower) ||
              p.partNo.toLowerCase().includes(matchLower) ||
              p.specs.some((s) => s.toLowerCase().includes(matchLower))
          );
        }
      }
    }

    // Filter by Header Search Category if set
    if (searchCategory !== "all") {
      if (searchCategory === "lapp") {
        list = list.filter((p) => p.brand.toLowerCase().includes("lapp"));
      } else if (searchCategory === "eaton") {
        list = list.filter((p) => p.brand.toLowerCase().includes("eaton"));
      } else if (searchCategory === "partex") {
        list = list.filter((p) => p.brand.toLowerCase().includes("partex"));
      } else if (searchCategory === "mennekes") {
        list = list.filter((p) => p.brand.toLowerCase().includes("menn"));
      }
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.partNo.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q)) ||
          p.application.toLowerCase().includes(q)
      );
    }

    // Sorting
    const sorted = [...list];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [selectedCategory, selectedBrand, brandSubFilter, searchCategory, searchQuery, sortBy]);

  const previewLimit = 8;
  const displayedProducts = (isFullPage || showAllOnHome) ? filteredProducts : filteredProducts.slice(0, previewLimit);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    handleBrandChange("all");
    setSearchQuery("");
    setSearchCategory("all");
    setSortBy("featured");
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    openQuickView(product);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    brandSubFilter !== "all" ||
    searchQuery.trim() !== "" ||
    searchCategory !== "all" ||
    sortBy !== "featured";

  const activeSpotlight = selectedBrand !== "all" ? brandSpotlights[selectedBrand] : null;

  return (
    <section className="py-10 sm:py-14 select-none bg-slate-50/60 relative" id="productsSection">
      {/* Anchor for direct scrolls to catalog */}
      <div id="catalog" className="absolute -top-16 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                {isFullPage ? "LIVE INVENTORY MATRIX · 214+ VERIFIED SKUS" : "BANGALORE CENTRAL LOGISTICS INVENTORY"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {isFullPage ? "Verified Inventory & Live Specifications" : "Industrial Product Catalog"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              {isFullPage
                ? "Switch between Grid and Details views to compare live technical specifications, drum stock availability, and commercial rates."
                : "Click any product to inspect live technical specifications, core configurations, and real-time commercial pricing below."}
            </p>
          </div>

          {/* Controls: View Mode (Grid vs Details), Sort Dropdown & Quick Reset */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
            {/* View Mode Toggle: Grid vs Details */}
            <div className="flex items-center p-1 bg-white border border-slate-200/90 rounded-2xl shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
                title="Grid View (Visual Cards)"
              >
                <LayoutGrid size={13} />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("details")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "details"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
                title="Details View (Technical Specifications & Data Sheet)"
              >
                <List size={14} />
                <span>Details</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 rounded-2xl px-3 py-1.5 text-xs text-slate-700 shadow-2xs">
              <ArrowUpDown size={13} className="text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium outline-none cursor-pointer text-slate-900"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-2xl transition-colors border border-slate-200 shadow-2xs cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Minimalist Multi-Pastel Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat.id
                  ? cat.activeClass
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 font-medium shadow-2xs"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Brand Filter Pills with Vibrant Colorful Active Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs scrollbar-none">
          <span className="text-slate-500 font-semibold shrink-0 font-mono text-[11px]">
            Filter Brand:
          </span>
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => handleBrandChange(b.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all border cursor-pointer ${
                selectedBrand === b.id
                  ? b.activeClass
                  : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200/90 font-medium shadow-2xs"
              }`}
            >
              {b.label}
            </button>
          ))}

          <span className="ml-auto text-xs text-slate-500 font-mono tabular-nums shrink-0">
            Showing <strong className="text-slate-950 font-bold">{filteredProducts.length}</strong> items
          </span>
        </div>

        {/* VIBRANT MODERN BRAND SPOTLIGHT BANNER (Displayed when a particular brand is clicked) */}
        {activeSpotlight && (
          <div
            className={`mb-8 p-5 sm:p-7 rounded-3xl bg-gradient-to-r ${activeSpotlight.themeBg} border ${activeSpotlight.borderColor} shadow-sm animate-fade-in relative overflow-hidden`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
              <div className="space-y-2.5 max-w-3xl">
                
                {/* Header Row: Logo + Origin Badge */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="h-10 px-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-center">
                    <img
                      src={activeSpotlight.logo}
                      alt={selectedBrand}
                      className="h-5 w-auto object-contain max-w-[85px]"
                    />
                  </div>

                  <span
                    className={`px-3 py-0.5 rounded-full font-mono text-[11px] font-bold border ${activeSpotlight.badgeStyle} flex items-center gap-1.5`}
                  >
                    <ShieldCheck size={13} />
                    {activeSpotlight.partnerTag}
                  </span>

                  <span className="text-[11px] text-slate-600 font-mono hidden sm:inline">
                    · {activeSpotlight.origin}
                  </span>
                </div>

                {/* Headline & Description */}
                <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">
                  {activeSpotlight.headline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeSpotlight.description}
                </p>

                {/* Brand Sub-Filter Chips for One-Click Category Narrowing */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[11px] font-mono font-semibold text-slate-600">
                    Quick Series:
                  </span>
                  {activeSpotlight.subFilters.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setBrandSubFilter(sub.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                        brandSubFilter === sub.id
                          ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                          : "bg-white/90 hover:bg-white text-slate-800 border-slate-300/80 shadow-2xs"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Right Side Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 self-start lg:self-center">
                <Link
                  to={activeSpotlight.makeSheetUrl}
                  className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 hover:scale-102"
                >
                  <FileText size={13} className="text-slate-600" />
                  <span>View OEM Make Sheet</span>
                  <ArrowRight size={13} />
                </Link>

                <button
                  type="button"
                  onClick={() => handleBrandChange("all")}
                  className="px-4 py-2 bg-slate-200/80 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <X size={13} />
                  <span>Clear Brand Filter</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Product Cards Listing: Grid View or Details / Specification Table View */}
        {displayedProducts.length > 0 ? (
          viewMode === "grid" ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct?.id === product.id}
                  onSelect={handleSelectProduct}
                />
              ))}
            </div>
          ) : (
            /* DETAILS SPECIFICATION VIEW */
            <div className="space-y-4 animate-fade-in">
              {/* Desktop / Tablet Details Table */}
              <div className="hidden md:block bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                        <th className="py-3.5 px-4 font-bold">Item & Brand</th>
                        <th className="py-3.5 px-4 font-bold">Part No / SKU</th>
                        <th className="py-3.5 px-4 font-bold">Technical Specifications</th>
                        <th className="py-3.5 px-4 font-bold">Stock Status</th>
                        <th className="py-3.5 px-4 font-bold">Rate</th>
                        <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {displayedProducts.map((product) => (
                        <ProductDetailsRow
                          key={product.id}
                          product={product}
                          isSelected={selectedProduct?.id === product.id}
                          onSelect={handleSelectProduct}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Details Specification Cards */}
              <div className="space-y-3.5 md:hidden">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer shadow-2xs ${
                      selectedProduct?.id === product.id
                        ? "border-amber-500 ring-2 ring-amber-100"
                        : "border-slate-200/90 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200/70 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={product.image || "/images/card-cables.jpg"}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/card-cables.jpg";
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {product.brand.split(" ")[0]} · {product.partNo}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                            Ready Stock
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 truncate" title={product.name}>
                          {getShortProductName(product.name)}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 font-sans">
                          {product.application}
                        </p>
                      </div>
                    </div>

                    {/* Structured 2-Column Technical Specs Grid */}
                    <div className="mt-3 p-2 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-mono grid grid-cols-2 gap-1.5">
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200/60 truncate">
                        <span className="text-slate-400 block text-[9px] uppercase font-sans">Specification</span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {product.specs[0] || "Standard"}
                        </span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200/60 truncate">
                        <span className="text-slate-400 block text-[9px] uppercase font-sans">Voltage / Class</span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {product.voltage || (product.specs[1] ? product.specs[1].split(",")[0] : "Industrial OEM")}
                        </span>
                      </div>
                    </div>

                    {/* Price & Actions on Mobile */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-mono">Basic Rate</span>
                        <span className="text-sm font-black font-mono text-emerald-700">
                          ₹{product.price.toFixed(2)}
                          <span className="text-[10px] font-normal text-slate-400 ml-1">/{product.unit}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleSelectProduct(product)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors border border-slate-200"
                        >
                          Inspect
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          className="p-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
                        >
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-950 mb-1">
              No matching products found
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              We couldn't find any products matching your active filters. Try clearing filters or submit a custom RFQ note below.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* EXPLORE MORE COMPLETE CATALOG BANNER (Shown on Home page preview) — 2-Color Minimalist Light Theme */}
        {!isFullPage && filteredProducts.length > 0 && (
          <div className="mt-10 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-slate-900">
            <div className="relative z-10 text-center md:text-left space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#6b1620] font-mono text-[11px] font-bold uppercase tracking-wider border border-[#6b1620]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6b1620]"></span>
                <span>Verified Inventory Preview</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                {showAllOnHome
                  ? `Displaying all ${filteredProducts.length} verified products on Home`
                  : `Showing ${displayedProducts.length} of ${filteredProducts.length} products on Home`}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Looking for more configurations, technical datasheets, and specialized German industrial switchgear? Explore our full catalog page or expand all items.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to={selectedBrand !== "all" ? `/catalog?brand=${encodeURIComponent(selectedBrand)}` : "/catalog"}
                className="px-6 py-3.5 bg-[#6b1620] hover:bg-[#540f17] text-white rounded-xl text-xs sm:text-sm font-black transition-all shadow-md shadow-[#6b1620]/20 flex items-center gap-2 hover:scale-102 cursor-pointer border border-[#831e2b]/40"
              >
                <span>Explore Full Catalog ({filteredProducts.length}+ Items)</span>
                <ArrowRight size={16} />
              </Link>

              {filteredProducts.length > previewLimit && (
                <button
                  type="button"
                  onClick={() => setShowAllOnHome(!showAllOnHome)}
                  className="px-5 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer"
                >
                  {showAllOnHome ? "Collapse back to 8 items" : `Show All ${filteredProducts.length} on Home`}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
