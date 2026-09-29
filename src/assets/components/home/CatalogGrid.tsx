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

  // Dynamic configuration state for table row
  const [selectedCores, setSelectedCores] = useState<string>(getProductCores(product) || "3 Cores");
  const [selectedSize, setSelectedSize] = useState<string>(getProductSize(product) || "1.5 mm²");

  // Dynamic price calculation
  const calculatedPrice = useMemo(() => {
    let baseRate = product.price || 145.00;
    if (selectedSize.includes("2.5")) baseRate *= 1.35;
    else if (selectedSize.includes("4.0")) baseRate *= 1.75;
    else if (selectedSize.includes("6.0") || selectedSize.includes("10")) baseRate *= 2.15;

    if (selectedCores.includes("4")) baseRate *= 1.1;
    else if (selectedCores.includes("5") || selectedCores.includes("6")) baseRate *= 1.25;

    return Number(baseRate.toFixed(2));
  }, [product.price, selectedSize, selectedCores]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    setAdded(true);
    showToast(`Added ${product.name} (${selectedCores}, ${selectedSize}) to RFQ Cart!`);
    setTimeout(() => setAdded(false), 1600);
  };

  const getBrandBadge = () => {
    const b = product.brand.toLowerCase();
    if (b.includes("lapp")) return "bg-amber-100 text-amber-950 border-amber-300";
    if (b.includes("eaton")) return "bg-sky-100 text-sky-950 border-sky-300";
    if (b.includes("partex")) return "bg-emerald-100 text-emerald-950 border-emerald-300";
    if (b.includes("menn")) return "bg-purple-100 text-purple-950 border-purple-300";
    return "bg-slate-100 text-slate-800 border-slate-300";
  };

  const color = getProductColor(product);

  return (
    <tr
      onClick={() => onSelect(product)}
      className={`border-b border-stone-200 hover:bg-stone-100/80 transition-colors cursor-pointer group whitespace-nowrap ${
        isSelected ? "bg-pink-50/50" : ""
      }`}
    >
      <td className="py-3.5 px-4 align-middle">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white border border-stone-300 p-1 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform shadow-2xs">
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
            <div className="font-bold text-stone-900 group-hover:text-pink-700 transition-colors text-xs truncate max-w-xs sm:max-w-sm" title={product.name}>
              {getShortProductName(product.name)}
            </div>
            <div className="text-[11px] text-stone-500 font-sans truncate max-w-xs">
              {product.application}
            </div>
          </div>
        </div>
      </td>

      <td className="py-3.5 px-3 align-middle font-mono text-xs">
        <span className="font-semibold text-stone-800 bg-stone-100 px-2 py-1 rounded-md border border-stone-300">
          {product.partNo}
        </span>
      </td>

      <td className="py-3.5 px-3 align-middle" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1.5">
          <select
            value={selectedCores}
            onChange={(e) => setSelectedCores(e.target.value)}
            className="px-2 py-1 rounded-md bg-stone-100 text-stone-900 font-mono text-[11px] font-bold border border-stone-300 outline-none cursor-pointer"
          >
            <option value="3 Cores">3 Cores</option>
            <option value="4 Cores">4 Cores</option>
            <option value="5 Cores">5 Cores</option>
          </select>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="px-2 py-1 rounded-md bg-sky-50 text-sky-900 font-mono text-[11px] font-bold border border-sky-200 outline-none cursor-pointer"
          >
            <option value="1.5 mm²">1.5 mm²</option>
            <option value="2.5 mm²">2.5 mm²</option>
            <option value="4.0 mm²">4.0 mm²</option>
            <option value="6.0 mm²">6.0 mm²</option>
          </select>
        </div>
      </td>

      <td className="py-3.5 px-3 align-middle">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full border shrink-0"
            style={{ backgroundColor: color.dotColor, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <span className="text-[11px] font-medium text-stone-700 font-mono truncate" title={color.label}>
            {color.label.split("(")[0].trim()}
          </span>
        </div>
      </td>

      <td className="py-3.5 px-3 align-middle">
        <div className="flex items-center gap-1.5">
          {product.voltage && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-pink-50 text-pink-900 font-mono text-[10px] border border-pink-200 font-semibold">
              {product.voltage}
            </span>
          )}
          {product.specs[0] && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-mono text-[10px] border border-stone-300 truncate max-w-[140px]">
              {product.specs[0]}
            </span>
          )}
        </div>
      </td>

      <td className="py-3.5 px-4 align-middle">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{product.stock || "Ready Stock"}</span>
        </span>
      </td>

      <td className="py-3.5 px-4 align-middle">
        <div className="font-mono font-black text-emerald-700 text-xs sm:text-sm">
          ₹{calculatedPrice.toFixed(2)}
          <span className="text-[10px] text-stone-400 font-normal ml-1">/{product.unit}</span>
        </div>
        <span className="text-[9px] text-stone-400 font-mono block">Excl. 18% GST</span>
      </td>

      <td className="py-3.5 px-4 align-middle text-right">
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors border border-stone-300 cursor-pointer"
            title="Quick view product specs"
          >
            <Eye size={13} />
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs hover:scale-102 cursor-pointer bg-stone-950 hover:bg-stone-800 text-white"
          >
            <ShoppingCart size={12} />
            <span>+ RFQ</span>
          </button>

          <Link
            to={`/product/${product.id}`}
            className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors border border-stone-300"
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
  if (!isFullPage) return null;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [internalSelectedBrand, setInternalSelectedBrand] = useState("all");
  const selectedBrand = controlledBrand !== undefined ? controlledBrand : internalSelectedBrand;
  const [brandSubFilter, setBrandSubFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "details">("grid");
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
    { id: "all", label: "All Categories", activeClass: "bg-stone-900 text-white font-black shadow-md border-stone-800" },
    { id: "cables", label: "Power & Control Cables", activeClass: "bg-pink-600 text-white font-black shadow-md border-pink-500" },
    { id: "switchgear", label: "Industrial Switchgear", activeClass: "bg-stone-700 text-white font-black shadow-md border-stone-600" },
    { id: "data", label: "Data Cables & Marking", activeClass: "bg-pink-700 text-white font-black shadow-md border-pink-600" },
    { id: "plugs", label: "CEE Plugs & Enclosures", activeClass: "bg-stone-800 text-white font-black shadow-md border-stone-700" },
    { id: "accessories", label: "Cable Glands & Earthing", activeClass: "bg-pink-500 text-slate-950 font-black shadow-md border-pink-400" },
  ];

  const brands = [
    { id: "all", label: "All Brands", activeClass: "bg-stone-900 text-white font-black border-stone-900" },
    { id: "LAPP KABEL", label: "Lapp Kabel", activeClass: "bg-pink-600 text-white font-black border-pink-700 shadow-md" },
    { id: "EATON - MOELLER", label: "Eaton Moeller", activeClass: "bg-stone-700 text-white font-black border-stone-800 shadow-md" },
    { id: "PARTEX SWEDEN", label: "Partex Sweden", activeClass: "bg-pink-700 text-white font-black border-pink-800 shadow-md" },
    { id: "MENNEKES", label: "Mennekes Germany", activeClass: "bg-stone-800 text-white font-black border-stone-900 shadow-md" },
  ];

  const brandSpotlights: Record<string, { logo: string; origin: string; partnerTag: string; headline: string; description: string; themeBg: string; borderColor: string; makeSheetUrl: string; subFilters: { id: string; label: string; match: string }[]; }> = {
    "LAPP KABEL": {
      logo: "/images/logo-lapp.png",
      origin: "Stuttgart, Germany · Jigani (Bangalore)",
      partnerTag: "OFFICIAL DIRECT AUTHORIZED CHANNEL PARTNER",
      headline: "LAPP Kabel — German Benchmark in Flexible Industrial Cables",
      description: "Direct warehouse drum stock of ÖLFLEX® Classic 110, 110 SY (Steel Wire Braided), 110 CY (Tinned Copper EMC Screened), UNITRONIC® Data lines, and IP68 SKINTOP® nickel-plated brass cable glands.",
      themeBg: "from-[#261820] via-[#140c10] to-[#0a0608]",
      borderColor: "border-pink-500/30",
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
      description: "PKZM0 motor-protective circuit breakers with up to 150 kA breaking capacity, DILM power contactors with electronic wide-range coils, and NZM compact MCCBs up to 1600A for modern automated panels.",
      themeBg: "from-[#1a1a1a] via-[#111111] to-[#080808]",
      borderColor: "border-stone-700/50",
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
      description: "Precision PA closed chevron wire sleeves (UL94-V0), ProMark T-1000 300dpi thermal transfer marker printers, and AISI 316 acid-proof stainless steel tags for harsh marine and chemical environments.",
      themeBg: "from-[#261820] via-[#140c10] to-[#0a0608]",
      borderColor: "border-pink-500/30",
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
      description: "16A to 125A CEE industrial plugs with IP67 PowerTOP® Xtra technology, switched interlocked panel receptacles, and modular AMAPLAST AMAXX power distribution assemblies.",
      themeBg: "from-[#1a1a1a] via-[#111111] to-[#080808]",
      borderColor: "border-stone-700/50",
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
    if (selectedCategory !== "all") {
      if (selectedCategory === "accessories") {
        list = list.filter((p) => p.category === "accessories" || p.category === "earthing");
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }
    if (selectedBrand !== "all") {
      list = list.filter((p) => p.brand === selectedBrand);
    }
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
    if (searchCategory !== "all") {
      if (searchCategory === "lapp") list = list.filter((p) => p.brand.toLowerCase().includes("lapp"));
      else if (searchCategory === "eaton") list = list.filter((p) => p.brand.toLowerCase().includes("eaton"));
      else if (searchCategory === "partex") list = list.filter((p) => p.brand.toLowerCase().includes("partex"));
      else if (searchCategory === "mennekes") list = list.filter((p) => p.brand.toLowerCase().includes("menn"));
    }
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
    const sorted = [...list];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [selectedCategory, selectedBrand, brandSubFilter, searchCategory, searchQuery, sortBy]);

  const displayedProducts = filteredProducts;

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
    <section className="py-10 sm:py-14 select-none bg-[#faf8f5]" id="productsSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="bg-gradient-to-br from-white via-[#fcfbfa] to-[#f4efe6] rounded-3xl p-6 sm:p-8 border border-stone-300 shadow-md mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-stone-500 font-bold uppercase tracking-wider">
                  LIVE INVENTORY MATRIX · 214+ VERIFIED SKUS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                Verified Inventory & Live Specifications
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
                Switch between Grid and Details views to compare live technical specifications, drum stock availability, and commercial rates.
              </p>
            </div>

            {/* Engineering Control Dock */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center p-1 bg-stone-900 border border-stone-800 rounded-2xl shadow-md">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "grid" ? "bg-pink-600 text-white shadow-xs" : "text-stone-400 hover:text-white"
                  }`}
                >
                  <LayoutGrid size={13} />
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("details")}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "details" ? "bg-pink-600 text-white shadow-xs" : "text-stone-400 hover:text-white"
                  }`}
                >
                  <List size={14} />
                  <span>Details</span>
                </button>
              </div>

              <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-2xl px-4 py-2 text-xs text-stone-900 shadow-2xs">
                <ArrowUpDown size={13} className="text-pink-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold outline-none cursor-pointer text-stone-900 font-mono"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-950 text-xs font-bold rounded-2xl transition-colors border border-pink-300 shadow-2xs cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

          {/* Categories Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-6 mt-6 border-t border-stone-300/80 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all border cursor-pointer font-mono ${
                  selectedCategory === cat.id
                    ? cat.activeClass
                    : "bg-white hover:bg-stone-100 text-stone-700 border-stone-300 font-medium shadow-2xs"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Brand Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 text-xs scrollbar-none font-mono">
            <span className="text-stone-500 font-bold shrink-0 text-[11px] uppercase tracking-wider mr-1">
              Filter Brand:
            </span>
            {brands.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleBrandChange(b.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all border cursor-pointer ${
                  selectedBrand === b.id
                    ? b.activeClass
                    : "bg-white hover:bg-stone-100 text-stone-700 border-stone-300 font-medium shadow-2xs"
                }`}
              >
                {b.label}
              </button>
            ))}

            <span className="ml-auto text-xs text-stone-500 tabular-nums shrink-0 font-bold">
              Showing <strong className="text-stone-950 font-black">{filteredProducts.length}</strong> items
            </span>
          </div>
        </div>

        {/* Brand Spotlight Bento Banner */}
        {activeSpotlight && (
          <div
            className={`mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${activeSpotlight.themeBg} text-white border ${activeSpotlight.borderColor} shadow-2xl animate-fade-in relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-3xl">
                
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="h-10 px-3 bg-white rounded-xl border border-stone-200 shadow-2xs flex items-center justify-center">
                    <img
                      src={activeSpotlight.logo}
                      alt={selectedBrand}
                      className="h-5 w-auto object-contain max-w-[85px]"
                    />
                  </div>

                  <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-white/10 text-white border border-white/20 flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-pink-300" />
                    {activeSpotlight.partnerTag}
                  </span>

                  <span className="text-[11px] text-stone-300 font-mono">
                    · {activeSpotlight.origin}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                  {activeSpotlight.headline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {activeSpotlight.description}
                </p>

                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  <span className="text-[11px] font-mono font-semibold text-stone-400">
                    Quick Series:
                  </span>
                  {activeSpotlight.subFilters.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setBrandSubFilter(sub.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer font-mono ${
                        brandSubFilter === sub.id
                          ? "bg-white text-stone-950 border-white shadow-xs font-bold"
                          : "bg-black/30 hover:bg-black/50 text-slate-200 border-white/10"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 self-start lg:self-center">
                <Link
                  to={activeSpotlight.makeSheetUrl}
                  className="px-5 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-102"
                >
                  <FileText size={14} />
                  <span>View OEM Make Sheet</span>
                  <ArrowRight size={14} />
                </Link>

                <button
                  type="button"
                  onClick={() => handleBrandChange("all")}
                  className="px-5 py-2.5 bg-black/40 hover:bg-black/60 text-slate-300 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer border border-white/10"
                >
                  <X size={13} />
                  <span>Clear Brand Filter</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Product Display (Grid or Details Table) */}
        {displayedProducts.length > 0 ? (
          viewMode === "grid" ? (
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
            <div className="space-y-4 animate-fade-in">
              <div className="hidden md:block bg-white rounded-3xl border border-stone-300 shadow-xl overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-300 text-stone-600 font-mono text-[11px] uppercase tracking-wider whitespace-nowrap">
                      <th className="py-4 px-4 font-bold">Item & Brand</th>
                      <th className="py-4 px-3 font-bold">Part No / SKU</th>
                      <th className="py-4 px-3 font-bold">Technical Specs</th>
                      <th className="py-4 px-3 font-bold">Color / Sheath</th>
                      <th className="py-4 px-3 font-bold">Voltage & Highlights</th>
                      <th className="py-4 px-4 font-bold">Stock Status</th>
                      <th className="py-4 px-4 font-bold">Rate</th>
                      <th className="py-4 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-sans">
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

              <div className="space-y-3.5 md:hidden">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="p-4 bg-white text-stone-900 rounded-2xl border border-stone-300 transition-all cursor-pointer shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-xl bg-stone-50 border border-stone-200 p-1 flex items-center justify-center shrink-0">
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
                          <span className="text-[10px] font-mono font-bold text-pink-900 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                            {product.brand.split(" ")[0]} · {product.partNo}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                            Ready Stock
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-stone-950 truncate" title={product.name}>
                          {getShortProductName(product.name)}
                        </h4>
                        <p className="text-[11px] text-stone-500 truncate mt-0.5 font-sans">
                          {product.application}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 p-2 bg-stone-50 rounded-2xl border border-stone-200 text-[10px] font-mono grid grid-cols-2 gap-1.5 text-stone-800">
                      <div className="bg-white p-1.5 rounded-lg border border-stone-200 truncate">
                        <span className="text-stone-400 block text-[9px] uppercase font-sans">Specification</span>
                        <span className="font-semibold text-stone-900 truncate block">
                          {product.specs[0] || "Standard"}
                        </span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-stone-200 truncate">
                        <span className="text-stone-400 block text-[9px] uppercase font-sans">Voltage / Class</span>
                        <span className="font-semibold text-stone-900 truncate block">
                          {product.voltage || (product.specs[1] ? product.specs[1].split(",")[0] : "Industrial OEM")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-stone-400 block uppercase font-mono">Basic Rate</span>
                        <span className="text-sm font-black font-mono text-emerald-700">
                          ₹{product.price.toFixed(2)}
                          <span className="text-[10px] font-normal text-stone-400 ml-1">/{product.unit}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleSelectProduct(product)}
                          className="px-2.5 py-1.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-semibold hover:bg-stone-200 transition-colors border border-stone-300"
                        >
                          Inspect
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          className="p-1.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors border border-stone-300"
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
          <div className="bg-white rounded-3xl border border-stone-300 p-12 text-center max-w-lg mx-auto shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
              <Search size={20} />
            </div>
            <h3 className="text-base font-bold text-stone-950 mb-1">
              No matching products found
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              We couldn't find any products matching your active filters. Try clearing filters or submit a custom RFQ note below.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};