import React from "react";
import { X, FileText, Paperclip, Trash2, LogOut, Plus, ShieldCheck, Building2, MapPin } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AccountModal: React.FC = () => {
  const {
    currentUser,
    accountModalOpen,
    closeAccountModal,
    logout,
    userOffers,
    deleteOffer,
  } = useAuth();
  const navigate = useNavigate();

  if (!accountModalOpen || !currentUser) return null;

  const initials =
    currentUser.contactPerson
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "SK";

  const handleSendNewOffer = () => {
    closeAccountModal();
    if (window.location.pathname !== "/") {
      navigate("/#rfqSection");
    } else {
      document.getElementById("rfqSection")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0F17]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in select-none">
      <div
        className="relative bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] w-full max-w-2xl overflow-hidden transition-all transform animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Minimalist Close Button */}
        <button
          onClick={closeAccountModal}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-[#0B0F17] transition-all cursor-pointer backdrop-blur-xs shadow-2xs"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header Profile Banner in Obsidian Midnight with Subtle Glow */}
        <div className="relative p-6 sm:p-8 bg-[#0B0F17] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5 overflow-hidden border-b border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9262E]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center gap-4.5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D9262E] to-[#b51d24] text-white font-black text-xl flex items-center justify-center shadow-lg font-mono tracking-wider border border-red-500/30">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  {currentUser.contactPerson}
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 font-mono">
                  <ShieldCheck size={11} />
                  <span>VERIFIED B2B</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-1.5">
                <Building2 size={13} className="text-[#D9262E]" />
                <span>{currentUser.companyName}</span>
              </p>
              {currentUser.gstNo && (
                <div className="text-[11px] text-[#64748B] font-mono mt-1">
                  GSTIN: <span className="text-slate-200 font-semibold">{currentUser.gstNo}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              closeAccountModal();
            }}
            className="relative z-10 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-[#D9262E] text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-all border border-slate-700/80 cursor-pointer shadow-2xs"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Body Content with Alabaster Snow Canvas */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#F8FAFC]">
          
          {/* Company Details Glass Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-4 bg-white border border-[#E2E8F0] rounded-2xl text-xs shadow-2xs">
            <div>
              <span className="text-[10px] text-[#64748B] uppercase font-bold block font-mono tracking-wider">Business Email</span>
              <span className="font-semibold text-[#0B0F17] truncate block mt-1">{currentUser.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] uppercase font-bold block font-mono tracking-wider">Phone</span>
              <span className="font-mono font-semibold text-[#0B0F17] block mt-1">{currentUser.phone}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] uppercase font-bold block font-mono tracking-wider">Location</span>
              <span className="font-semibold text-[#0B0F17] truncate block mt-1 flex items-center gap-1">
                <MapPin size={12} className="text-[#D9262E]" />
                <span>{currentUser.city ? `${currentUser.city}, ${currentUser.state}` : currentUser.state}</span>
              </span>
            </div>
          </div>

          {/* Quotations & RFQ History */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <FileText size={17} className="text-[#D9262E]" />
                <h4 className="text-sm font-extrabold text-[#0B0F17] tracking-tight">
                  Commercial RFQ Quotation History
                </h4>
              </div>
              <button
                onClick={handleSendNewOffer}
                className="text-xs font-bold text-[#D9262E] hover:text-[#b51d24] inline-flex items-center gap-1.5 cursor-pointer transition-colors bg-red-50 px-3 py-1.5 rounded-lg border border-red-100"
              >
                <Plus size={13} />
                <span>New RFQ Inquiry</span>
              </button>
            </div>

            {userOffers.length > 0 ? (
              <div className="divide-y divide-slate-100 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden max-h-60 overflow-y-auto shadow-2xs">
                {userOffers.map((off) => (
                  <div key={off.refNo} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-[#D9262E] bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                          {off.refNo}
                        </span>
                        <span className="text-[#64748B]">·</span>
                        <span className="text-[#64748B] font-mono text-[11px]">{off.date}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] uppercase font-mono tracking-wider">
                          {off.category}
                        </span>
                      </div>
                      <p className="text-slate-600 line-clamp-1 mt-1.5 text-[11px] font-medium">
                        {off.notes || "Standard catalog BOM RFQ requested"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {off.filesCount > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-[#64748B] font-mono bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                          <Paperclip size={12} className="text-slate-500" />
                          <span>{off.filesCount} file(s)</span>
                        </span>
                      )}
                      <button
                        onClick={() => deleteOffer(off.refNo)}
                        className="p-2 text-slate-400 hover:text-[#D9262E] hover:bg-red-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-100"
                        title="Delete reference"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-white border border-dashed border-[#E2E8F0] rounded-2xl text-center shadow-2xs">
                <FileText size={28} className="text-[#64748B] mx-auto mb-2.5 opacity-50" />
                <p className="text-xs text-[#64748B] mb-4 font-medium">
                  You haven't submitted any commercial RFQs yet in this session.
                </p>
                <button
                  onClick={handleSendNewOffer}
                  className="px-5 py-3 bg-[#0B0F17] hover:bg-[#D9262E] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Create First Project Quotation
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};