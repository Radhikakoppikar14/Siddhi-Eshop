import React from "react";
import { X, FileText, Paperclip, Trash2, LogOut, Plus } from "lucide-react";
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAccountModal}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header Profile Banner */}
        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {currentUser.contactPerson}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Verified B2B
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {currentUser.companyName}
              </p>
              {currentUser.gstNo && (
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  GSTIN: {currentUser.gstNo}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              closeAccountModal();
            }}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Company Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Business Email</span>
              <span className="font-semibold text-slate-800 truncate block mt-0.5">{currentUser.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Phone</span>
              <span className="font-mono font-semibold text-slate-800 block mt-0.5">{currentUser.phone}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Location</span>
              <span className="font-semibold text-slate-800 truncate block mt-0.5">
                {currentUser.city ? `${currentUser.city}, ${currentUser.state}` : currentUser.state}
              </span>
            </div>
          </div>

          {/* Quotations & RFQ History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-red-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Commercial RFQ Quotation History
                </h4>
              </div>
              <button
                onClick={handleSendNewOffer}
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
              >
                <Plus size={13} />
                <span>New RFQ Inquiry</span>
              </button>
            </div>

            {userOffers.length > 0 ? (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                {userOffers.map((off) => (
                  <div key={off.refNo} className="p-3.5 hover:bg-slate-50 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-red-600">
                          {off.refNo}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{off.date}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px] uppercase">
                          {off.category}
                        </span>
                      </div>
                      <p className="text-slate-600 line-clamp-1 mt-1 text-[11px]">
                        {off.notes || "Standard catalog BOM RFQ requested"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {off.filesCount > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Paperclip size={12} />
                          <span>{off.filesCount} file(s)</span>
                        </span>
                      )}
                      <button
                        onClick={() => deleteOffer(off.refNo)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete reference"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border border-dashed border-slate-200 rounded-2xl text-center">
                <FileText size={24} className="text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">
                  You haven't submitted any commercial RFQs yet in this session.
                </p>
                <button
                  onClick={handleSendNewOffer}
                  className="px-4 py-2 bg-slate-900 hover:bg-red-600 text-white rounded-xl text-xs font-semibold transition-colors"
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
