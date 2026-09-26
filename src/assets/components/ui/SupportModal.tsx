import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";

export const SupportModal: React.FC = () => {
  const { isSupportOpen, closeSupport } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isSupportOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast("Please fill in your name, phone, and message.");
      return;
    }
    setSubmitted(true);
    showToast("Support ticket lodged! Our Bangalore engineering desk will reach you.");
    setTimeout(() => {
      setSubmitted(false);
      closeSupport();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
      onClick={closeSupport}
    >
      <div
        className="w-full max-w-lg sm:max-w-xl max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 transition-all my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="shrink-0 px-4 py-3 sm:px-6 sm:py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
              <Phone size={17} />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-sky-600 font-mono tracking-wider block">
                Technical Helpdesk & Enquiries
              </span>
              <h3 className="text-sm sm:text-base md:text-lg font-black text-slate-950 leading-tight">
                Contact Engineering Support
              </h3>
            </div>
          </div>
          <button
            onClick={closeSupport}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body - Perfectly fitted with auto scroll if screen is compact */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 sm:px-6 space-y-3 sm:space-y-3.5 overscroll-contain">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-2xl space-y-0.5">
              <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px] sm:text-[11px]">
                <Phone size={11} className="text-sky-600" />
                <span>Direct Technical Desk</span>
              </div>
              <a
                href="tel:09620000947"
                className="font-bold text-xs sm:text-sm font-mono text-slate-950 hover:text-sky-600 block"
              >
                +91 96200 00947
              </a>
              <span className="text-[10px] text-slate-400 block">Mon - Sat · 9am - 7pm IST</span>
            </div>

            <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-2xl space-y-0.5">
              <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px] sm:text-[11px]">
                <Mail size={11} className="text-rose-600" />
                <span>Email RFP & Inquiries</span>
              </div>
              <a
                href="mailto:sales@siddhikabel.com"
                className="font-bold text-xs sm:text-sm font-mono text-slate-950 hover:text-rose-600 block truncate"
              >
                sales@siddhikabel.com
              </a>
              <span className="text-[10px] text-slate-400 block">&lt;2h response for RFQs</span>
            </div>
          </div>

          {/* Central Hub Address & Logistics */}
          <div className="p-2.5 sm:p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs space-y-0.5">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold font-mono text-[10.5px] sm:text-[11px]">
              <MapPin size={12} className="text-emerald-600 shrink-0" />
              <span>Bangalore Central Hub & Stocking Warehouse</span>
            </div>
            <p className="text-slate-600 text-[10.5px] sm:text-[11px] leading-relaxed">
              No. 42/1, 2nd Main, Peenya Industrial Area, Bangalore, Karnataka 560058. Same-day pan-India freight dispatches.
            </p>
          </div>

          {/* Quick Message Form */}
          {submitted ? (
            <div className="py-6 sm:py-8 text-center space-y-2 animate-fade-in">
              <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-950">Thank you!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your message has been assigned to our application engineering desk.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3 pt-0.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div>
                  <label className="text-[10.5px] sm:text-[11px] font-semibold text-slate-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full h-8.5 sm:h-9 px-3 rounded-xl border border-slate-200 focus:border-sky-500 text-xs outline-none bg-slate-50/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] sm:text-[11px] font-semibold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-8.5 sm:h-9 px-3 rounded-xl border border-slate-200 focus:border-sky-500 text-xs outline-none bg-slate-50/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] sm:text-[11px] font-semibold text-slate-700 block mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full h-8.5 sm:h-9 px-3 rounded-xl border border-slate-200 focus:border-sky-500 text-xs outline-none bg-slate-50/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10.5px] sm:text-[11px] font-semibold text-slate-700 block mb-1">
                  How can our technical team help you? *
                </label>
                <textarea
                  rows={2}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Need cable datasheet, stock availability, or urgent quote..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-sky-500 text-xs outline-none bg-slate-50/50 font-sans resize-none transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-99 hover:scale-100.5 cursor-pointer"
              >
                <Send size={13} />
                <span>Send Support Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
