import React from "react";
import { X, FileText, Paperclip } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const OrdersModal: React.FC = () => {
  const { currentUser, ordersModalOpen, closeOrdersModal, userOffers } = useAuth();

  if (!ordersModalOpen || !currentUser) return null;

  const initials =
    currentUser.contactPerson
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "SK";

  return (
    <div
      className="modal-overlay open"
      id="customerOrdersModal"
      onClick={closeOrdersModal}
    >
      <div
        className="modal-card account-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "680px" }}
      >
        <button
          className="modal-close"
          onClick={closeOrdersModal}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="account-modal-header" style={{ paddingBottom: "16px" }}>
          <div className="account-avatar" id="accountAvatarText">
            {initials}
          </div>
          <div className="account-header-info">
            <h3
              style={{ margin: "0 0 4px", fontSize: "18px", color: "#1e293b" }}
            >
              Orders &amp; RFQ History
            </h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
              <span>{currentUser.companyName}</span> • Total Dispatched:{" "}
              <strong style={{ color: "#0f172a" }}>{userOffers.length}</strong>
            </p>
          </div>
        </div>

        {/* Orders Body Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto text-xs space-y-3">
          {userOffers.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText size={40} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium text-slate-700">No orders or RFQs placed yet.</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Your submitted quotation requests and project inquiries will appear here.
              </p>
            </div>
          ) : (
            userOffers.map((o) => (
              <div
                key={o.refNo}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: "#dc2626",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                    }}
                  >
                    <FileText size={15} /> {o.refNo}
                  </span>
                  <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>
                    {o.date}
                  </span>
                </div>

                <div style={{ color: "#334155", fontSize: "12px" }}>
                  <strong style={{ color: "#0f172a" }}>Category:</strong> {o.category}
                </div>

                {o.notes && (
                  <div
                    style={{
                      background: "#ffffff",
                      border: "1px solid #f1f5f9",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      color: "#475569",
                      fontFamily: "monospace",
                      fontSize: "11px",
                      lineHeight: "1.4",
                    }}
                  >
                    {o.notes}
                  </div>
                )}

                {o.filesCount > 0 && (
                  <div
                    style={{
                      color: "#047857",
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 500,
                    }}
                  >
                    <Paperclip size={13} /> {o.filesCount} file(s) attached
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};