import React from "react";
import { X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const AccountModal: React.FC = () => {
  const {
    currentUser,
    accountModalOpen,
    closeAccountModal,
  } = useAuth();

  if (!accountModalOpen || !currentUser) return null;

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
      id="customerAccountModal"
      onClick={closeAccountModal}
    >
      <div
        className="modal-card account-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "650px" }}
      >
        <button
          className="modal-close"
          onClick={closeAccountModal}
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

        {/* Profile Details Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto text-xs">
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
        </div>
      </div>
    </div>
  );
};