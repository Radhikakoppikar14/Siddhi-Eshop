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

export const RFQSection: React.FC<RFQSectionProps> = ({
  initialNotes = "",
}) => {
  const { currentUser, addOffer } = useAuth();
  const { showToast } = useToast();
  const { cart, subtotal, openCartDrawer } = useCart();

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
        notes: `${notes}\n\n[Buyer GSTIN: ${gstin || "Not provided"}] [Site: ${city}] [Est Qty: ${quantity}]`,
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
    <section className="py-12 sm:py-16 select-none bg-transparent" id="rfqSection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MASTER DUAL-TONE HIGH-CONTRAST CONTAINER: DEEP MAROON & ARCHITECTURAL PORCELAIN */}
        <div className="rounded-3xl shadow-[0_24px_60px_-15px_rgba(77,14,22,0.14),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/90 overflow-hidden bg-white text-slate-900 relative">
          
          {/* ========================================================
              PART 1: TOP CHAMBER (DEEP MAROON PROCUREMENT DESK)
              ======================================================== */}
          <div className="bg-gradient-to-br from-[#4d0c15] via-[#3a0810] to-[#26040a] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden border-b border-[#5e121c]">
            
            {/* Fine Technical Grid Texture */}
            <div 
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#fcdbb0] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <FileText size={15} className="text-[#fce4c4]" />
                <span>B2B COMMERCIAL PROCUREMENT DESK</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Request a Bulk Project Quotation (
                <span className="text-[#fcdbb0]">
                  RFQ
                </span>
                )
              </h2>

              <p className="text-xs sm:text-sm text-slate-200/90 mt-2 max-w-3xl leading-relaxed">
                Submit your project schedule, cable sizing requirements, or upload an Excel Bill of Materials (BOM). Our engineering sales desk generates official GST quotations with delivery timeline commitments.
              </p>
            </div>

            {/* LIVE QUOTATION CART SNAPSHOT (Inside Deep Maroon Chamber) */}
            {cart.length > 0 && (
              <div className="relative z-10 mt-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 shadow-inner animate-fade-in text-white">
                {/* Snapshot Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#fcdbb0]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#fcdbb0] font-bold">
                      QUOTATION CART SNAPSHOT
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </span>
                </div>

                {/* Snapshot Item Rows */}
                <div className="divide-y divide-white/10 space-y-3 pb-3">
                  {cart.map((item) => {
                    const lineTotal = item.price * item.qty;
                    return (
                      <div key={item.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4 text-xs font-mono">
                        <div className="min-w-0">
                          <span className="text-[10px] text-[#fcdbb0] uppercase tracking-wider block font-semibold">
                            {item.brand} · {item.partNo}
                          </span>
                          <h4 className="font-bold text-white text-xs sm:text-sm truncate mt-0.5 font-sans">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-slate-300 block mt-0.5">
                            Qty: {item.qty} {item.unit}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm sm:text-base font-bold text-[#fcdbb0] font-mono">
                            ₹{lineTotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Snapshot Financial Summary */}
                <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Catalog Subtotal:</span>
                    <span className="text-white font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>GST (18% ITC Pass-Through):</span>
                    <span className="text-emerald-400 font-bold">+₹{gstAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-baseline font-bold text-white pt-2 text-sm sm:text-base border-t border-white/10">
                    <span className="font-sans font-black text-white">Estimated Total:</span>
                    <span className="text-[#fcdbb0] text-base sm:text-lg font-mono font-black">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* View/Edit trigger */}
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-mono">
                    Items automatically linked to this project quotation
                  </span>
                  <button
                    type="button"
                    onClick={openCartDrawer}
                    className="text-[#fcdbb0] hover:text-white font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Edit in Cart Popup</span>
                    <ExternalLink size={11} />
                  </button>
                </div>
              </div>
            )}

            {/* Quick Assurance Badges when cart is empty */}
            {cart.length === 0 && (
              <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs font-mono">
                <span className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-[#fcdbb0] flex items-center gap-1.5 font-semibold">
                  <ShieldCheck size={13} className="text-[#fcdbb0]" />
                  Official OEM Factory Authorization
                </span>
                <span className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-slate-200 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  18% GST Input Tax Credit Pass-Through
                </span>
                <span className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-[#fcdbb0] flex items-center gap-1.5 font-semibold">
                  <Sparkles size={13} className="text-amber-300" />
                  Bangalore Warehouse Direct Dispatch
                </span>
              </div>
            )}

          </div>

          {/* ========================================================
              PART 2: APPLICATION FORM STUDIO (CRISP ARCHITECTURAL CANVAS)
              ======================================================== */}
          <div className="bg-[#fafaf9] text-slate-900 p-6 sm:p-10 lg:p-12 relative border-t border-slate-200/90">
            
            {submittedOffer ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center space-y-5 animate-scale-up max-w-xl mx-auto shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-[#6b1620] border border-[#6b1620]/20 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 size={32} />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                    Quotation Request Registered
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                    Your RFQ has been logged into our technical quotation queue. A sales engineer will contact you shortly with an official GST proforma.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono text-left space-y-1.5 max-w-sm mx-auto shadow-2xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reference No:</span>
                    <strong className="text-[#6b1620] font-bold">{submittedOffer.refNo}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date:</span>
                    <span className="text-slate-800">{submittedOffer.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Company:</span>
                    <span className="text-slate-800">{submittedOffer.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Total:</span>
                    <span className="text-[#6b1620] font-bold">₹{submittedOffer.totalEst.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleExportSummary}
                    className="px-5 py-3 bg-[#6b1620] hover:bg-[#540f17] text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-[#6b1620]/25 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download Official RFQ (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedOffer(null)}
                    className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition-colors border border-slate-300 cursor-pointer shadow-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                
                {/* Form Section Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6b1620]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                      Procurement Officer & Corporate Contact Details
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    <span className="text-[#8b1e2b] font-bold">*</span> Required Fields
                  </span>
                </div>

                {/* Row 1: 3 Columns (Company Name *, Contact Officer *, Corporate Email *) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Company Name <span className="text-[#8b1e2b]">*</span>
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Apex Automation Pvt Ltd"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.company
                          ? "border-rose-500 bg-rose-50/50 text-slate-900"
                          : "border-slate-300 hover:border-slate-400 focus:border-[#6b1620] focus:ring-4 focus:ring-[#6b1620]/10 bg-white text-slate-900 placeholder:text-slate-400 shadow-xs"
                      }`}
                    />
                    {fieldErrors.company && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.company}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Contact Officer <span className="text-[#8b1e2b]">*</span>
                    </label>
                    <input
                      type="text"
                      value={contactOfficer}
                      onChange={(e) => setContactOfficer(e.target.value)}
                      placeholder="Purchasing / Project Engineer"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.contactOfficer
                          ? "border-rose-500 bg-rose-50/50 text-slate-900"
                          : "border-slate-300 hover:border-slate-400 focus:border-[#6b1620] focus:ring-4 focus:ring-[#6b1620]/10 bg-white text-slate-900 placeholder:text-slate-400 shadow-xs"
                      }`}
                    />
                    {fieldErrors.contactOfficer && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.contactOfficer}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Corporate Email <span className="text-[#8b1e2b]">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@company.com"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.email
                          ? "border-rose-500 bg-rose-50/50 text-slate-900"
                          : "border-slate-300 hover:border-slate-400 focus:border-[#6b1620] focus:ring-4 focus:ring-[#6b1620]/10 bg-white text-slate-900 placeholder:text-slate-400 shadow-xs"
                      }`}
                    />
                    {fieldErrors.email && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: 3 Columns (Phone / WhatsApp *, Buyer GSTIN, Delivery Site City *) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Phone / WhatsApp <span className="text-[#8b1e2b]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 99000 48877"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.phone
                          ? "border-rose-500 bg-rose-50/50 text-slate-900"
                          : "border-slate-300 hover:border-slate-400 focus:border-[#6b1620] focus:ring-4 focus:ring-[#6b1620]/10 bg-white text-slate-900 placeholder:text-slate-400 shadow-xs"
                      }`}
                    />
                    {fieldErrors.phone && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Buyer GSTIN (For ITC 18%)
                    </label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="29AABCU9603R1ZM"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-[#6b1620] focus:ring-4 focus:ring-[#6b1620]/10 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-mono font-medium outline-none uppercase shadow-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Delivery Site City <span className="text-[#8b1e2b]">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bangalore"
                      className={`w-full h-11 px-3.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                        fieldErrors.city
                          ? "border-rose-500 bg-rose-50/50 text-slate-900"
                          : "border-slate-300 hover:border-slate-400 focus:border-[#6b1620] focus:ring-4 focus:ring-[#6b1620]/10 bg-white text-slate-900 placeholder:text-slate-400 shadow-xs"
                      }`}
                    />
                    {fieldErrors.city && (
                      <span className="text-[10px] text-rose-600 font-medium mt-1 block">
                        {fieldErrors.city}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 3: 2 Columns (Primary Product Line, Estimated Meters / Quantity) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                  <div className="md:col-span-8">
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Primary Product Line
                    </label>
                    <select
                      value={productLine}
                      onChange={(e) => setProductLine(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-[#6b1620] focus:ring-4 focus:ring-[#6b1620]/10 bg-white text-slate-900 text-xs sm:text-sm font-medium outline-none cursor-pointer shadow-xs transition-all"
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
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Estimated Meters / Quantity
                    </label>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="500"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-[#6b1620] focus:ring-4 focus:ring-[#6b1620]/10 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-mono font-medium outline-none shadow-xs transition-all"
                    />
                  </div>
                </div>

                {/* Row 4: Bill of Materials (BOM) Details & Specifications */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    Bill of Materials (BOM) Details & Specifications
                  </label>
                  <textarea
                    id="rfqNotes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Mention exact part numbers, cable sizes (e.g. 3G1.5, 4G4.0, 7G1.0), required drum cutting lengths, and site delivery dates..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 hover:border-slate-400 focus:border-[#6b1620] focus:ring-4 focus:ring-[#6b1620]/10 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-mono leading-relaxed outline-none shadow-xs transition-all"
                  />
                </div>

                {/* Row 5: Attach Excel BOM / Drawing / RFQ Schedule (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800">
                      Attach Excel BOM / Drawing / RFQ Schedule (Optional)
                    </label>
                    <span className="text-[11px] font-mono text-[#6b1620] font-semibold">
                      Max 25MB each
                    </span>
                  </div>

                  {/* Modern Precision Dropzone */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-[#6b1620] bg-white hover:bg-rose-50/20 rounded-2xl p-6 sm:p-7 text-center transition-all cursor-pointer relative group">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#6b1620] flex items-center justify-center mx-auto mb-2.5 group-hover:scale-105 transition-transform border border-[#6b1620]/15">
                      <Upload size={22} />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-900 font-bold block">
                      Drop BOM spreadsheet or click to browse
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                      Excel (.xlsx, .csv), PDF, CAD, ZIP (up to 25MB)
                    </span>
                  </div>

                  {/* Attached Files Pills */}
                  {files.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 shadow-2xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Paperclip size={13} className="text-[#6b1620] shrink-0" />
                            <span className="truncate font-semibold">{file.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">
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

                {/* Row 6: Submit CTA Button in Bold Rich Deep Maroon */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#6b1620] via-[#7d1926] to-[#540f17] hover:from-[#7d1926] hover:to-[#6b1620] text-white rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-xl shadow-[#6b1620]/25 hover:shadow-2xl hover:shadow-[#6b1620]/30 hover:scale-[1.004] active:scale-[0.99] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2 border border-[#8b212e]/50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING OFFICIAL RFQ...</span>
                    ) : (
                      <>
                        <span>SUBMIT REQUEST FOR QUOTATION</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                {/* Micro Trust Indicators Below Form */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 font-mono pt-2 text-center border-t border-slate-200">
                  <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <ShieldCheck size={14} className="text-[#6b1620]" />
                    100% Genuine European OEM Warranty
                  </span>
                  <span className="text-slate-300 hidden sm:inline">·</span>
                  <span className="text-slate-800 font-semibold">GST Proforma Within 2 Hours</span>
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

