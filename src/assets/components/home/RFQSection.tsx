import React, { useState, useEffect } from "react";
import { Check, Upload, Paperclip, X, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import {
  isNotEmptyString,
  isValidEmail,
  isValidPhone,
  isValidPositiveNumber,
  sanitizeInput,
} from "../../../utils/validation";

interface RFQSectionProps {
  initialNotes?: string;
}

export const RFQSection: React.FC<RFQSectionProps> = ({
  initialNotes = "",
}) => {
  const { currentUser, openAuthModal, addOffer } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cat, setCat] = useState("lapp");
  const [quantity, setQuantity] = useState("1");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [files, setFiles] = useState<File[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success state tracking for confirmation banner/card
  const [submittedOffer, setSubmittedOffer] = useState<{
    refNo: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.contactPerson);
      setCompany(currentUser.companyName);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
      setCity(`${currentUser.city}, ${currentUser.state}`);
    }
  }, [currentUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).filter(
        (file) => file.size <= 25 * 1024 * 1024,
      );
      setFiles((prev) => {
        const combined = [...prev];
        selected.forEach((file) => {
          if (
            !combined.some((f) => f.name === file.name && f.size === file.size)
          ) {
            combined.push(file);
          }
        });
        return combined;
      });
      e.target.value = "";
    }
  };

  const removeFile = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors: Record<string, string> = {};
    const cleanName = sanitizeInput(name);
    const cleanCompany = sanitizeInput(company);
    const cleanEmail = sanitizeInput(email).toLowerCase();
    const cleanPhone = sanitizeInput(phone);
    const cleanNotes = sanitizeInput(notes);
    if (!isNotEmptyString(cleanName)) errors.name = "Name is required.";
    if (!isNotEmptyString(cleanEmail)) errors.email = "Email is required.";
    else if (!isValidEmail(cleanEmail))
      errors.email = "Please enter a valid email.";
    if (!isNotEmptyString(cleanPhone))
      errors.phone = "Phone number is required.";
    else if (!isValidPhone(cleanPhone))
      errors.phone = "Please enter a valid phone number.";
    if (!cat) errors.cat = "Product is required.";
    if (!isValidPositiveNumber(quantity))
      errors.quantity = "Quantity must be greater than 0.";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!currentUser) {
      showToast(
        "Customer Account Required: Please Sign In or Create an Account to send this offer.",
      );
      openAuthModal("login");
      return;
    }

    const refNo = "SK-OFFER-" + Math.floor(100000 + Math.random() * 900000);
    const catLabelMap: Record<string, string> = {
      lapp: "Lapp Kabel Cables & Wires",
      eaton: "Eaton Moeller Switchgear",
      partex: "Partex Cable Marking Systems",
      mennekes: "Mennekes CEE Plugs & Sockets",
      multiple: "Complete Project BOM / Mixed Schedule",
    };

    setIsSubmitting(true);
    addOffer({
      refNo,
      customerId: currentUser.id,
      company: cleanCompany || currentUser.companyName,
      name: cleanName || currentUser.contactPerson,
      email: cleanEmail || currentUser.email,
      phone: cleanPhone || currentUser.phone,
      category: catLabelMap[cat] || "Electrical Products",
      notes: `${cleanNotes}${cleanNotes ? "\n\n" : ""}Requested quantity: ${quantity}`,
      filesCount: files.length,
    });

    let msg = `Commercial Offer & RFQ (${refNo}) dispatched successfully for ${company || currentUser.companyName}!`;
    if (files.length > 0) {
      msg += ` (${files.length} file attachment(s) sent)`;
    }
    showToast(msg);

    // Set success state to show confirmation card
    setSubmittedOffer({
      refNo,
      date: new Date().toLocaleString(),
    });

    setNotes("");
    setQuantity("1");
    setFiles([]);
    setIsSubmitting(false);
  };

  const renderError = (field: string) =>
    fieldErrors[field] ? (
      <div
        className="auth-alert"
        role="alert"
        aria-live="polite"
        style={{ display: "block", marginTop: "6px" }}
      >
        {fieldErrors[field]}
      </div>
    ) : null;

  return (
    <section className="rfq-section" id="rfqSection">
      <div className="container">
        <div className="rfq-wrapper">
          {/* Left Column */}
          <div className="rfq-info-col">
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#ff8589",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Direct Procurement Portal
              </span>
              <h3>Request a Bulk Quotation (RFQ)</h3>
              <p>
                Send us your Bill of Materials (BOM), cable schedule, or
                switchgear project specifications. Our industrial sales
                engineers provide guaranteed pricing and delivery schedules
                within 2 to 4 business hours.
              </p>

              <div className="rfq-highlights">
                <div className="rfq-hl-item">
                  <Check
                    size={16}
                    strokeWidth={2.5}
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <span>
                    Direct OEM / Panel Builder Volume Tiered Discounts
                  </span>
                </div>
                <div className="rfq-hl-item">
                  <Check
                    size={16}
                    strokeWidth={2.5}
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <span>
                    Manufacturer Test Certificates &amp; Mill Compliance Reports
                  </span>
                </div>
                <div className="rfq-hl-item">
                  <Check
                    size={16}
                    strokeWidth={2.5}
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <span>
                    Dedicated Bangalore Central Warehouse &amp; Logistics
                  </span>
                </div>
              </div>
            </div>

            <div className="rfq-direct-help">
              <span>Direct Sales &amp; RFQ Inquiries:</span>
              <strong style={{ display: "block", marginTop: "4px" }}>
                sales@siddhikabel.com
              </strong>
              <strong>Enquiry@siddhikabel.com</strong>
              <span style={{ marginTop: "8px" }}>
                Phone: 096200 00947 / 098860 58511
              </span>
            </div>
          </div>

          {/* Right Column: Form or Success Confirmation Card */}
          <div className="rfq-form-col">
            {submittedOffer ? (
              <div
                className="rfq-success-card"
                style={{
                  background: "#f8fafc",
                  border: "2px solid #22c55e",
                  borderRadius: "12px",
                  padding: "32px 24px",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.1)",
                }}
              >
                <div
                  style={{
                    color: "#22c55e",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <CheckCircle2 size={56} strokeWidth={2} />
                </div>
                <h3
                  style={{
                    color: "#0f172a",
                    fontSize: "22px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  RFQ Dispatched Successfully!
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}
                >
                  Thank you,{" "}
                  <strong style={{ color: "#0f172a" }}>{name}</strong>. Your
                  formal commercial inquiry has been registered with reference:
                </p>
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px dashed #cbd5e1",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#b91c1c",
                    display: "inline-block",
                    marginBottom: "20px",
                  }}
                >
                  {submittedOffer.refNo}
                </div>
                <p
                  style={{
                    color: "#475569",
                    fontSize: "13px",
                    marginBottom: "24px",
                  }}
                >
                  Our sales engineering team will review your specifications and
                  email your tiered quotation to{" "}
                  <strong style={{ color: "#0f172a" }}>{email}</strong> within
                  2–4 business hours.
                </p>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setSubmittedOffer(null)}
                    style={{ padding: "10px 24px" }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form className="rfq-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="rfqName">Full Name *</label>
                  <input
                    type="text"
                    id="rfqName"
                    required
                    aria-invalid={Boolean(fieldErrors.name)}
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setFieldErrors((current) => ({ ...current, name: "" }));
                    }}
                  />
                  {renderError("name")}
                </div>

                <div className="form-group">
                  <label htmlFor="rfqCompany">Company / Enterprise Name</label>
                  <input
                    type="text"
                    id="rfqCompany"
                    placeholder="e.g. Acme Automation Pvt Ltd"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rfqEmail">Business Email *</label>
                  <input
                    type="email"
                    id="rfqEmail"
                    required
                    aria-invalid={Boolean(fieldErrors.email)}
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFieldErrors((current) => ({ ...current, email: "" }));
                    }}
                  />
                  {renderError("email")}
                </div>

                <div className="form-group">
                  <label htmlFor="rfqPhone">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    id="rfqPhone"
                    required
                    aria-invalid={Boolean(fieldErrors.phone)}
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      setFieldErrors((current) => ({ ...current, phone: "" }));
                    }}
                  />
                  {renderError("phone")}
                </div>

                <div className="form-group">
                  <label htmlFor="rfqCat">Primary Product of Interest</label>
                  <select
                    id="rfqCat"
                    aria-invalid={Boolean(fieldErrors.cat)}
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                  >
                    <option value="lapp">Lapp Kabel Cables &amp; Wires</option>
                    <option value="eaton">Eaton Moeller Switchgear</option>
                    <option value="partex">Partex Cable Marking Systems</option>
                    <option value="mennekes">
                      Mennekes CEE Plugs &amp; Sockets
                    </option>
                    <option value="multiple">
                      Complete Project BOM / Mixed Schedule
                    </option>
                  </select>
                  {renderError("cat")}
                </div>

                <div className="form-group">
                  <label htmlFor="rfqQuantity">Quantity *</label>
                  <input
                    type="number"
                    id="rfqQuantity"
                    min="1"
                    step="1"
                    aria-invalid={Boolean(fieldErrors.quantity)}
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setFieldErrors((current) => ({
                        ...current,
                        quantity: "",
                      }));
                    }}
                  />
                  {renderError("quantity")}
                </div>

                <div className="form-group">
                  <label htmlFor="rfqCity">Delivery City / Site Location</label>
                  <input
                    type="text"
                    id="rfqCity"
                    placeholder="e.g. Bangalore, Chennai, Pune"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="rfqNotes">
                    Requirement Details / Bill of Materials (BOM)
                  </label>
                  <textarea
                    id="rfqNotes"
                    rows={4}
                    placeholder="Mention part numbers, sizes (e.g. 4x1.5 sq mm), quantities in meters or units, and required dispatch dates..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* File Attachment Dropzone */}
                <div className="form-group full-width">
                  <label
                    htmlFor="rfqAttachment"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "4px",
                    }}
                  >
                    <span>Attach File / BOM / Drawing (Optional)</span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: "normal",
                      }}
                    >
                      Excel (.xlsx, .csv), PDF, Images, CAD, ZIP (Any Format)
                    </span>
                  </label>
                  <div
                    className={`file-upload-box ${files.length > 0 ? "has-files" : ""}`}
                    id="fileUploadDropzone"
                    onClick={() =>
                      document.getElementById("rfqAttachment")?.click()
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="file"
                      id="rfqAttachment"
                      name="rfqAttachment"
                      multiple
                      accept="*/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <div className="file-upload-content">
                      <div className="file-upload-icon">
                        <Upload size={22} strokeWidth={2.2} />
                      </div>
                      <div className="file-upload-text">
                        <span className="file-upload-main">
                          <strong>Click to upload</strong> or drag and drop
                          files here
                        </span>
                        <span className="file-upload-sub">
                          Attach Excel BOM, PDF schedules, drawings, photos, or
                          spec sheets (Up to 25MB each)
                        </span>
                      </div>
                    </div>

                    {files.length > 0 && (
                      <div
                        className="file-selected-list"
                        id="fileSelectedList"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginTop: "12px",
                        }}
                      >
                        {files.map((file, idx) => (
                          <div
                            className="file-chip"
                            title={file.name}
                            key={idx}
                          >
                            <Paperclip size={14} />
                            <span className="file-chip-name">{file.name}</span>
                            <span className="file-chip-size">
                              ({formatFileSize(file.size)})
                            </span>
                            <button
                              type="button"
                              className="file-chip-remove"
                              onClick={(e) => removeFile(idx, e)}
                              title="Remove file"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group full-width">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    style={{ width: "100%", height: "46px" }}
                  >
                    {isSubmitting
                      ? "Submitting Request..."
                      : "Submit Request for Quotation"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
