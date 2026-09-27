import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  X,
  Send,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Cpu,
  FileSpreadsheet,
  Truck,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { useToast } from "../../../context/ToastContext";

type InquiryType = "quote" | "technical" | "logistics";

interface SupportModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  const { showToast } = useToast();

  const [inquiryType, setInquiryType] = useState<InquiryType>("quote");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast("Please fill in your name, phone, and message.");
      return;
    }
    setSubmitted(true);
    showToast(`Support ticket lodged (${inquiryType.toUpperCase()})! Bangalore desk notified.`);
    setTimeout(() => {
      setSubmitted(false);
      if (onClose) onClose();
    }, 2000);
  };

  const handleWhatsAppChat = () => {
    window.open("https://wa.me/919620000947?text=Hello%20Siddhi%20Kabel%20Sales%20Desk,%20I%20would%20like%20to%20inquire%20about%20industrial%20cables%20and%20switchgear.", "_blank");
  };

  const getPlaceholder = () => {
    switch (inquiryType) {
      case "quote":
        return "Mention part numbers, quantities, or project bill of materials (BOM)...";
      case "technical":
        return "Specify cable standards (VDE/IEC), core sizing, or voltage ratings required...";
      case "logistics":
        return "Inquire about Peenya warehouse stock, same-day dispatch, or freight to site...";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl flex flex-col bg-gradient-to-br from-[#2a1b3d] via-[#1a1226] to-[#0f0a17] rounded-[2.5rem] shadow-2xl border border-purple-900/50 overflow-hidden text-white my-auto relative p-6 sm:p-10 space-y-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* TOP HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-purple-900/40 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-extrabold uppercase tracking-widest">BANGALORE HEADQUARTERS & TRADE COUNTER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Direct Sales & Dispatch Desk
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 font-sans max-w-2xl leading-relaxed">
              Connect directly with our senior application engineers for cable sizing assistance, factory batch certificates, or immediate warehouse pickups.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-white shadow-sm">
              Live Dispatch Ready Today
            </span>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
              aria-label="Close dialog"
              type="button"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* THREE CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          
          {/* Card 1: Main Showroom */}
          <div className="bg-white rounded-3xl p-5 text-slate-900 shadow-xl space-y-3 border border-purple-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700">
                <MapPin size={18} />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-mono font-bold">
                BANGALORE
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                MAIN SHOWROOM & COUNTER
              </span>
              <h4 className="text-sm font-black text-slate-950">Siddhi Kabel Corporation</h4>
              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                No. 42/1, 2nd Main, Banashankari 3rd Stage / Peenya Industrial Area, Bangalore - 560058
              </p>
            </div>
          </div>

          {/* Card 2: Direct Sales Hotline */}
          <div className="bg-white rounded-3xl p-5 text-slate-900 shadow-xl space-y-3 border border-purple-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Phone size={18} />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                INSTANT CHAT
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                DIRECT SALES HOTLINE
              </span>
              <a href="tel:+919620000947" className="text-sm font-black font-mono text-slate-950 hover:text-emerald-700 block">
                +91 96200 00947
              </a>
              <span className="text-[10px] text-slate-500 font-mono block">
                Landline: +91 80 2221 4455 / 4456
              </span>
            </div>
            <button
              type="button"
              onClick={handleWhatsAppChat}
              className="w-full py-2 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <MessageSquare size={14} />
              <span>Open WhatsApp Chat</span>
            </button>
          </div>

          {/* Card 3: Official Quotations */}
          <div className="bg-white rounded-3xl p-5 text-slate-900 shadow-xl space-y-3 border border-purple-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700">
                <Mail size={18} />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-bold">
                EST. 2-HR
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                OFFICIAL QUOTATIONS
              </span>
              <a href="mailto:sales@siddhikabel.com" className="text-xs font-black font-mono text-slate-950 hover:text-amber-700 block truncate">
                sales@siddhikabel.com
              </a>
              <span className="text-[10px] text-slate-500 font-mono block truncate">
                enquiry@siddhikabel.com
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono pt-1">
              Corporate annual contracts & batch certificates.
            </div>
          </div>

        </div>

        {/* LOGISTICS & TIMINGS BANNER */}
        <div className="bg-white rounded-3xl p-6 text-slate-900 shadow-xl space-y-4 border border-purple-100 relative z-10">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-950">
              <Truck size={16} className="text-purple-700" />
              <span>CENTRAL LOGISTICS HUB & TIMINGS</span>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-semibold">
              Ready Warehouse Drum Stock
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <h4 className="text-base font-black text-slate-950">Bangalore Central Stocking Warehouse</h4>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Equipped for high-velocity bulk dispatch to Peenya Industrial Estate, Electronic City, Whitefield, Hosur, Chennai, and Hyderabad manufacturing corridors.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono py-1 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Monday - Friday:</span>
                <span className="font-bold text-slate-950">9:30 AM - 7:00 PM</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono py-1 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Saturday:</span>
                <span className="font-bold text-slate-950">9:30 AM - 5:30 PM</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono py-1">
                <span className="text-slate-600 font-medium">Sunday:</span>
                <span className="font-bold text-emerald-700">Emergency Dispatch On-Call</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE INQUIRY FORM SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xl space-y-6 relative z-10">
          
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
              Select Inquiry Type:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setInquiryType("quote")}
                className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  inquiryType === "quote"
                    ? "bg-[#0B0F17] text-white border-[#0B0F17] shadow-md"
                    : "bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-400"
                }`}
              >
                <FileSpreadsheet size={18} className={inquiryType === "quote" ? "text-white" : "text-sky-600"} />
                <div>
                  <span className="text-xs font-black block">Urgent Quote</span>
                  <span className={`text-[10px] font-mono block ${inquiryType === "quote" ? "text-slate-300" : "text-slate-500"}`}>
                    BOM Pricing
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setInquiryType("technical")}
                className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  inquiryType === "technical"
                    ? "bg-[#0B0F17] text-white border-[#0B0F17] shadow-md"
                    : "bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-400"
                }`}
              >
                <Cpu size={18} className={inquiryType === "technical" ? "text-white" : "text-emerald-600"} />
                <div>
                  <span className="text-xs font-black block">Technical Specs</span>
                  <span className={`text-[10px] font-mono block ${inquiryType === "technical" ? "text-slate-300" : "text-slate-500"}`}>
                    Datasheets & Standards
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setInquiryType("logistics")}
                className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 cursor-pointer border ${
                  inquiryType === "logistics"
                    ? "bg-[#0B0F17] text-white border-[#0B0F17] shadow-md"
                    : "bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-400"
                }`}
              >
                <Truck size={18} className={inquiryType === "logistics" ? "text-white" : "text-amber-600"} />
                <div>
                  <span className="text-xs font-black block">Logistics</span>
                  <span className={`text-[10px] font-mono block ${inquiryType === "logistics" ? "text-slate-300" : "text-slate-500"}`}>
                    Peenya Warehouse
                  </span>
                </div>
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="py-10 text-center space-y-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
              <h4 className="text-lg font-black text-slate-950">Support Ticket Lodged Successfully!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your <strong className="text-slate-950">{inquiryType.toUpperCase()}</strong> inquiry has been dispatched to our senior application engineers in Bangalore.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs outline-none bg-slate-50/50 transition-colors font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 block mb-1.5">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs outline-none bg-slate-50/50 transition-colors font-mono font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs outline-none bg-slate-50/50 transition-colors font-medium text-slate-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 block">
                    {inquiryType === "quote" ? "Project Bill of Materials / Quote Details *" : inquiryType === "technical" ? "Technical Specifications Required *" : "Logistics & Delivery Requirements *"}
                  </label>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <Sparkles size={11} /> {inquiryType.toUpperCase()} MODE ACTIVE
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="w-full p-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs outline-none bg-slate-50/50 font-sans resize-none transition-colors font-medium text-slate-900"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-4 bg-[#0B0F17] hover:bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send size={15} />
                  <span>Call Sales Desk Now & Send Enquiry</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};