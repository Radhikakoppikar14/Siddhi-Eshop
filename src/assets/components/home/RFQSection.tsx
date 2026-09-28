import React, { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  Paperclip,
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Download,
  ExternalLink,
  Sparkles,
  Layers,
  SlidersHorizontal,
  Package,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useCart } from "../../../context/CartContext";
import {
  isNotEmptyString,
  isValidEmail,
  isValidPhone,
} from "../../../utils/validation";
import { generateRFQPDF } from "../../../utils/pdfGenerator";

interface RFQSectionProps {
  initialNotes?: string;
}

type ProcurementMode = "cables" | "switchgear" | "custom";

export const RFQSection: React.FC<RFQSectionProps> = ({
  initialNotes = "",
}) => {
  const { currentUser, addOffer } = useAuth();
  const { showToast } = useToast();
  const { cart, subtotal, openCartDrawer } = useCart();

  // Interactive Mode
  const [mode, setMode] = useState<ProcurementMode>("cables");

  // Form Fields
  const [company, setCompany] = useState("");
  const [contactOfficer, setContactOfficer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gstin, setGstin] = useState("");
  const [city, setCity] = useState("Bangalore");
  const [productLine, setProductLine] = useState("LAPP Kabel Flexible Cables & Wires");
  const [quantity, setQuantity] = useState("500");
  const [notes, setNotes] = useState(initialNotes);
  const [files, setFiles] = useState<File[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success state tracking
  const [submittedOffer, setSubmittedOffer] = useState<{
    refNo: string;
    date: string;
    company: string;
    contact: string;
    productLine: string;
    totalEst: number;
  } | null>(null);

  // Sync with current user profile if logged in
  useEffect(() => {
    if (currentUser) {
      setCompany(currentUser.companyName || "");
      setContactOfficer(currentUser.contactPerson || "");
      setEmail(currentUser.email || "");
      setPhone(currentUser.phone || "");
      setGstin(currentUser.gstNo || "");
      setCity(currentUser.city || "Bangalore");
    }
  }, [currentUser]);

  // Handle mode switches
  const handleModeChange = (newMode: ProcurementMode) => {
    setMode(newMode);
    if (newMode === "cables") {
      setProductLine("LAPP Kabel Flexible Cables & Wires");
      setQuantity("500");
    } else if (newMode === "switchgear") {
      setProductLine("EATON Moeller Industrial Switchgear");
      setQuantity("50");
    } else {
      setProductLine("Complete Multi-Brand Industrial Bill of Materials (BOM)");
      setQuantity("1000");
    }
    showToast(`Switched to ${newMode.toUpperCase()} procurement mode`);
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).filter(
        (file) => file.size <= 25 * 1024 * 1024
      );
      setFiles((prev) => {
        const combined = [...prev];
        selected.forEach((file) => {
          if (!combined.some((f) => f.name === file.name && f.size === file.size)) {
            combined.push(file);
          }
        });
        return combined;
      });
      showToast(`Attached ${selected.length} file(s)`);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Validation and Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!isNotEmptyString(company)) errors.company = "Company Name is required.";
    if (!isNotEmptyString(contactOfficer)) errors.contactOfficer = "Contact Officer is required.";
    if (!isValidEmail(email)) errors.email = "Valid corporate email is required.";
    if (!isValidPhone(phone)) errors.phone = "Valid 10-digit phone / WhatsApp number is required.";
    if (!isNotEmptyString(city)) errors.city = "Delivery site city is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      showToast("Please complete the required fields in the RFQ form.");
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    setTimeout(() => {
      const refNo = `RFQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const dateStr = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const totalEst = Math.round(subtotal * 1.18);

      addOffer({
        refNo,
        customerId: currentUser?.id || "GUEST",
        company,
        name: contactOfficer,
        email,
        phone,
        category: productLine,
        notes: `${notes}\n\n[Procurement Mode: ${mode}] [Buyer GSTIN: ${gstin || "Not provided"}] [Site: ${city}] [Est Qty: ${quantity}]`,
        filesCount: files.length,
      });

      setSubmittedOffer({
        refNo,
        date: dateStr,
        company,
        contact: contactOfficer,
        productLine,
        totalEst,
      });

      setIsSubmitting(false);
      showToast(`RFQ ${refNo} successfully registered!`);
    }, 600);
  };

  const handleExportSummary = async () => {
    if (!submittedOffer) return;
    try {
      showToast("Generating official RFQ PDF with Siddhi Kabel credentials...");
      await generateRFQPDF({
        refNo: submittedOffer.refNo,
        date: submittedOffer.date,
        company: submittedOffer.company,
        contact: submittedOffer.contact,
        email: email,
        phone: phone,
        gstin: gstin,
        city: city,
        productLine: submittedOffer.productLine,
        quantity: quantity,
        totalEst: submittedOffer.totalEst,
        notes: notes,
        filesCount: files.length,
        cartItems: cart.map((i) => ({
          brand: i.brand,
          partNo: i.partNo,
          name: i.name,
          qty: i.qty,
          unit: i.unit,
          price: i.price,
        })),
      });
      showToast("Official RFQ (PDF) downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      showToast("Failed to generate PDF. Retrying...");
    }
  };

  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  return (
    <section className="py-14 lg:py-20 hybrid-light-bg select-none" id="rfqSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MASTER EXECUTIVE PROCUREMENT CONTAINER */}
        <div className="rounded-[2.5rem] shadow-2xl border border-[#CBD5E1] overflow-hidden bg-white text-[#0B0F17] relative">
          
          {/* TOP EXECUTIVE CHAMBER */}
          <div className="bg-gradient-to-r from-[#2c0c1b] via-[#0d1633] to-[#070b14] p-6 sm:p-10 lg:p-12 relative overflow-hidden border-b border-white/10 text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <FileText size={15} />
                <span>EXECUTIVE B2B COMMERCIAL PROCUREMENT STUDIO</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Request a Bulk Project Quotation (<span className="text-red-500">RFQ</span>)
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Configure your procurement parameters or upload a Bill of Materials (BOM). Our Bangalore engineering desk generates official GST quotations with guaranteed compliance certificates.
              </p>

              {/* PROCUREMENT MODE SELECTOR */}
              <div className="pt-4 flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block w-full mb-1">
                  Select Procurement Category:
                </span>
                
                <button
                  type="button"
                  onClick={() => handleModeChange("cables")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                    mode === "cables"
                      ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/50 scale-[1.02]"
                      : "bg-white/10 text-slate-300 border-white/15 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <Package size={14} className={mode === "cables" ? "text-white" : "text-blue-400"} />
                  <span>Flexible Cables & Wires</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange("switchgear")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                    mode === "switchgear"
                      ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/50 scale-[1.02]"
                      : "bg-white/10 text-slate-300 border-white/15 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <SlidersHorizontal size={14} className={mode === "switchgear" ? "text-white" : "text-blue-400"} />
                  <span>Industrial Switchgear & Breakers</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange("custom")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                    mode === "custom"
                      ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/50 scale-[1.02]"
                      : "bg-white/10 text-slate-300 border-white/15 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <Layers size={14} className={mode === "custom" ? "text-white" : "text-blue-400"} />
                  <span>Complete Project BOM</span>
                </button>
              </div>
            </div>

            {/* LIVE QUOTATION CART SNAPSHOT */}
            {cart.length > 0 && (
              <div className="relative z-10 mt-8 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-white/15 p-5 sm:p-6 shadow-2xl animate-fade-in text-white">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                      ACTIVE QUOTATION CART SNAPSHOT
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 border border-slate-700 px-3 py-0.5 rounded-full">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="divide-y divide-slate-800/80 space-y-3 pb-3">
                  {cart.map((item) => {
                    const lineTotal = item.price * item.qty;
                    return (
                      <div key={item.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4 text-xs font-mono">
                        <div className="min-w-0">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                            {item.brand} · {item.partNo}
                          </span>
                          <h4 className="font-bold text-white text-xs sm:text-sm truncate mt-0.5 font-sans">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            Qty: {item.qty} {item.unit}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm sm:text-base font-bold text-white font-mono">
                            ₹{lineTotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Catalog Subtotal:</span>
                    <span className="text-white font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (18% ITC Pass-Through):</span>
                    <span className="text-emerald-400 font-bold">+₹{gstAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-baseline font-bold text-white pt-2 text-sm sm:text-base border-t border-slate-800">
                    <span className="font-sans font-black text-white">Estimated Total:</span>
                    <span className="text-red-500 text-base sm:text-lg font-mono font-black">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">
                    Items automatically linked to this project quotation
                  </span>
                  <button
                    type="button"
                    onClick={openCartDrawer}
                    className="text-red-400 hover:text-white font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Edit in Cart Drawer</span>
                    <ExternalLink size={11} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* APPLICATION FORM / SUCCESS STUDIO */}
          <div className="bg-slate-50 text-[#0B0F17] p-6 sm:p-10 lg:p-12 relative border-t border-[#CBD5E1]">
            
            {submittedOffer ? (
              /* LUXURY BLUE GRADIENT & FLOATING SUCCESS CARD */
              <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-[2.5rem] border border-blue-400/40 p-8 sm:p-10 text-center space-y-6 animate-scale-up max-w-xl mx-auto shadow-2xl text-white relative overflow-hidden">
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 border border-blue-400/30">
                  <CheckCircle2 size={32} />
                </div>

                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Quotation Request Registered
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-md mx-auto leading-relaxed">
                    Your RFQ has been logged into our technical quotation queue. An executive sales engineer will contact you shortly with an official proforma.
                  </p>
                </div>

                <div className="relative z-10 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs font-mono text-left space-y-2 max-w-sm mx-auto shadow-inner">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Reference No:</span>
                    <strong className="text-amber-400 font-bold">{submittedOffer.refNo}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Date:</span>
                    <span className="text-white font-medium">{submittedOffer.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Company:</span>
                    <span className="text-white font-medium">{submittedOffer.company}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/10">
                    <span className="text-slate-300">Estimated Total:</span>
                    <span className="text-emerald-400 font-bold">₹{submittedOffer.totalEst.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleExportSummary}
                    className="px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
                  >
                    <Download size={14} className="text-amber-300" />
                    <span>Download Official RFQ (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedOffer(null)}
                    className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold transition-colors border border-white/20 cursor-pointer backdrop-blur-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#CBD5E1]">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B0F17]">
                      Procurement Officer & Corporate Contact Details ({mode.toUpperCase()} MODE)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    <span className="text-red-600 font-bold">*</span> Required Fields
                  </span>
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className="text-xs font-bold text-[#0B0F17] block mb-1.5">
                      Company Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Apex Automation Pvt Ltd"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.company
                          ? "border-rose-500 bg-rose-50 text-slate-900"
                          : "border-[#CBD5E1] hover:border-[#64748B] focus:border-[#0B0F17] focus:ring-4 focus:ring-[#0B0F17]/10 bg-white text-[#0B0F17] placeholder:text-slate-400 shadow-2xs"
                      }`}
                    />
                    {fieldErrors.company && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.company}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0B0F17] block mb-1.5">
                      Contact Officer <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={contactOfficer}
                      onChange={(e) => setContactOfficer(e.target.value)}
                      placeholder="Purchasing / Project Engineer"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.contactOfficer
                          ? "border-rose-500 bg-rose-50 text-slate-900"
                          : "border-[#CBD5E1] hover:border-[#64748B] focus:border-[#0B0F17] focus:ring-4 focus:ring-[#0B0F17]/10 bg-white text-[#0B0F17] placeholder:text-slate-400 shadow-2xs"
                      }`}
                    />
                    {fieldErrors.contactOfficer && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.contactOfficer}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0B0F17] block mb-1.5">
                      Corporate Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@company.com"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.email
                          ? "border-rose-500 bg-rose-50 text-slate-900"
                          : "border-[#CBD5E1] hover:border-[#64748B] focus:border-[#0B0F17] focus:ring-4 focus:ring-[#0B0F17]/10 bg-white text-[#0B0F17] placeholder:text-slate-400 shadow-2xs"
                      }`}
                    />
                    {fieldErrors.email && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className="text-xs font-bold text-[#0B0F17] block mb-1.5">
                      Phone / WhatsApp <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 99000 48877"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.phone
                          ? "border-rose-500 bg-rose-50 text-slate-900"
                          : "border-[#CBD5E1] hover:border-[#64748B] focus:border-[#0B0F17] focus:ring-4 focus:ring-[#0B0F17]/10 bg-white text-[#0B0F17] placeholder:text-slate-400 shadow-2xs"
                      }`}
                    />
                    {fieldErrors.phone && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0B0F17] block mb-1.5">
                      Buyer GSTIN (For ITC 18%)
                    </label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="29AABCU9603R1ZM"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] hover:border-[#64748B] focus:border-[#0B0F17] focus:ring-4 focus:ring-[#0B0F17]/10 bg-white text-[#0B0F17] placeholder:text-slate-400 text-xs sm:text-sm font-mono font-medium outline-none uppercase shadow-2xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0B0F17] block mb-1.5">
                      Delivery Site City <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bangalore"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.city
                          ? "border-rose-500 bg-rose-50 text-slate-900"
                          : "border-[#CBD5E1] hover:border-[#64748B] focus:border-[#0B0F17] focus:ring-4 focus:ring-[#0B0F17]/10 bg-white text-[#0B0F17] placeholder:text-slate-400 shadow-2xs"
                      }`}
                    />
                    {fieldErrors.city && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.city}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                  <div className="md:col-span-8">
                    <label className="text-xs font-bold text-[#0B0F17] block mb-1.5">
                      Primary Product Line
                    </label>
                    <select
                      value={productLine}
                      onChange={(e) => setProductLine(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] hover:border-[#64748B] focus:border-[#0B0F17] focus:ring-4 focus:ring-[#0B0F17]/10 bg-white text-[#0B0F17] text-xs sm:text-sm font-medium outline-none cursor-pointer shadow-2xs transition-all"
                    >
                      <option value="LAPP Kabel Flexible Cables & Wires">
                        LAPP Kabel Flexible Cables & Wires (ÖLFLEX, UNITRONIC, SKINTOP)
                      </option>
                      <option value="EATON Moeller Industrial Switchgear">
                        EATON Moeller Industrial Switchgear (PKZM0, DILM Contactors, NZM MCCB)
                      </option>
                      <option value="PARTEX Wire Identification & Marking">
                        PARTEX Wire Identification & Marking (ProMark T-1000, Chevron Sleeves)
                      </option>
                      <option value="MENNEKES CEE Plugs & Enclosures">
                        MENNEKES CEE Plugs & Enclosures (PowerTOP Xtra, AMAXX Distributors)
                      </option>
                      <option value="Complete Multi-Brand Industrial Bill of Materials (BOM)">
                        Complete Multi-Brand Industrial Bill of Materials (BOM)
                      </option>
                    </select>
                  </div>

                  <div className="md:col-span-4">
                    <label className="text-xs font-bold text-[#0B0F17] block mb-1.5">
                      Estimated Quantity / Volume
                    </label>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="500"
                      className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] hover:border-[#64748B] focus:border-[#0B0F17] focus:ring-4 focus:ring-[#0B0F17]/10 bg-white text-[#0B0F17] placeholder:text-slate-400 text-xs sm:text-sm font-mono font-medium outline-none shadow-2xs transition-all"
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div>
                  <label className="text-xs font-bold text-[#0B0F17] block mb-1.5">
                    Bill of Materials (BOM) Details & Specifications
                  </label>
                  <textarea
                    id="rfqNotes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Mention exact part numbers, cable sizes (e.g. 3G1.5, 4G4.0, 7G1.0), required drum cutting lengths, and site delivery dates..."
                    className="w-full p-3.5 rounded-xl border border-[#CBD5E1] hover:border-[#64748B] focus:border-[#0B0F17] focus:ring-4 focus:ring-[#0B0F17]/10 bg-white text-[#0B0F17] placeholder:text-slate-400 text-xs sm:text-sm font-mono leading-relaxed outline-none shadow-2xs transition-all"
                  />
                </div>

                {/* Row 5: Dropzone */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#0B0F17]">
                      Attach Excel BOM / Drawing / RFQ Schedule (Optional)
                    </label>
                    <span className="text-[11px] font-mono text-red-600 font-semibold">
                      Max 25MB each
                    </span>
                  </div>

                  <div className="border-2 border-dashed border-[#CBD5E1] hover:border-[#0B0F17] bg-white hover:bg-slate-50 rounded-2xl p-6 sm:p-7 text-center transition-all cursor-pointer relative group">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0B0F17] flex items-center justify-center mx-auto mb-2.5 group-hover:scale-105 transition-transform border border-[#CBD5E1]">
                      <Upload size={22} />
                    </div>
                    <span className="text-xs sm:text-sm text-[#0B0F17] font-bold block">
                      Drop BOM spreadsheet or click to browse
                    </span>
                    <span className="text-[11px] text-[#64748B] font-mono mt-0.5 block">
                      Excel (.xlsx, .csv), PDF, CAD, ZIP (up to 25MB)
                    </span>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs text-[#0B0F17] shadow-2xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Paperclip size={13} className="text-red-600 shrink-0" />
                            <span className="truncate font-semibold">{file.name}</span>
                            <span className="text-[10px] text-[#64748B] font-mono">
                              ({(file.size / 1024).toFixed(0)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                            title="Remove file"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#0B0F17] hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl hover:scale-[1.004] active:scale-[0.99] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2 border border-slate-800"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING OFFICIAL RFQ...</span>
                    ) : (
                      <>
                        <span>SUBMIT REQUEST FOR QUOTATION</span>
                        <ArrowRight size={16} className="text-red-500" />
                      </>
                    )}
                  </button>
                </div>

                {/* Micro Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#64748B] font-mono pt-2 text-center border-t border-[#CBD5E1]">
                  <span className="flex items-center gap-1.5 text-[#0B0F17] font-bold">
                    <ShieldCheck size={14} className="text-red-600" />
                    100% Genuine European OEM Warranty
                  </span>
                  <span className="text-slate-300 hidden sm:inline">·</span>
                  <span className="text-[#0B0F17] font-semibold">GST Proforma Within 2 Hours</span>
                  <span className="text-slate-300 hidden sm:inline">·</span>
                  <span>Bangalore Central Hub Immediate Dispatch</span>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};