import React from "react";
import { X, FileText, Paperclip, Send, Trash2 } from "lucide-react";
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
      document
        .getElementById("rfqSection")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="modal-overlay open"
      id="customerAccountModal"
      onClick={closeAccountModal}
    >
      <div
        className="modal-card account-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={closeAccountModal}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="account-modal-header">
          <div className="account-avatar" id="accountAvatarText">
            {initials}
          </div>
          <div className="account-header-info">
            <h3
              id="accountModalCompanyName"
              style={{ margin: "0 0 4px", fontSize: "18px", color: "#1e293b" }}
            >
              {currentUser.companyName}
            </h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
              <span id="accountModalContact">{currentUser.contactPerson}</span>{" "}
              • GSTIN:{" "}
              <strong id="accountModalGst" style={{ color: "#0f172a" }}>
                {currentUser.gstNo}
              </strong>
            </p>
          </div>
        </div>

        <div className="account-modal-body">
          <div className="account-info-grid">
            <div className="account-info-card">
              <span className="info-label">Contact Person</span>
              <span className="info-value" id="accountInfoContact">
                {currentUser.contactPerson}
              </span>
            </div>
            <div className="account-info-card">
              <span className="info-label">Registered Phone (Login ID)</span>
              <span className="info-value" id="accountInfoPhone">
                {currentUser.phone}
              </span>
            </div>
            <div className="account-info-card">
              <span className="info-label">Email ID (Login ID)</span>
              <span className="info-value" id="accountInfoEmail">
                {currentUser.email}
              </span>
            </div>
            <div className="account-info-card">
              <span className="info-label">GST Number</span>
              <span className="info-value" id="accountInfoGst">
                {currentUser.gstNo}
              </span>
            </div>
            <div className="account-info-card full-width">
              <span className="info-label">Registered Address &amp; State</span>
              <span className="info-value" id="accountInfoAddress">
                {currentUser.address}, {currentUser.city}, {currentUser.state}
              </span>
            </div>
          </div>

          <div className="account-offers-section">
            <h4
              style={{
                fontSize: "15px",
                marginBottom: "12px",
                color: "var(--gray-900)",
              }}
            >
              Your Sent Commercial Offers &amp; RFQs
            </h4>
            <div id="accountOffersList">
              {userOffers.length === 0 ? (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    margin: "6px 0",
                  }}
                >
                  No offers or RFQs sent yet. Use the RFQ form to send a
                  commercial offer.
                </p>
              ) : (
                userOffers.map((o) => (
                  <div className="offer-item-card" key={o.refNo}>
                    <div
                      className="offer-item-top"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <span className="offer-ref">
                        <FileText
                          size={12}
                          style={{ display: "inline", marginRight: "4px" }}
                        />
                        {o.refNo}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span className="offer-date">{o.date}</span>
                        <button
                          type="button"
                          onClick={() => deleteOffer(o.refNo)}
                          aria-label={`Delete offer ${o.refNo}`}
                          title="Delete offer"
                          style={{
                            border: "none",
                            background: "none",
                            color: "var(--primary)",
                            cursor: "pointer",
                            padding: "2px",
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: "13px", marginTop: "4px" }}>
                      <strong>Category:</strong> {o.category}
                    </div>
                    {o.notes && (
                      <div
                        style={{
                          color: "#475569",
                          marginTop: "3px",
                          fontSize: "12.5px",
                        }}
                      >
                        "{o.notes.slice(0, 85)}..."
                      </div>
                    )}
                    {o.filesCount > 0 && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#16a34a",
                          marginTop: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Paperclip size={12} /> {o.filesCount} file(s) attached
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="account-actions-row">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSendNewOffer}
            >
              <Send size={14} style={{ marginRight: "6px" }} />
              Send New Offer / RFQ
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
