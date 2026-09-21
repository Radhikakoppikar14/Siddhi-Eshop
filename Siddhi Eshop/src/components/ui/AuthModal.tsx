import React, { useState } from "react";
import {
  X,
  Lock,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    register,
  } = useAuth();

  // Login form state
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register form state
  const [regData, setRegData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    gstNo: "",
    state: "Karnataka",
    city: "Bangalore",
    password: "",
    address: "",
  });
  const [regError, setRegError] = useState("");

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!loginId || !loginPass) {
      setLoginError("Please enter your Phone No / Email and password.");
      return;
    }

    const res = login(loginId, loginPass);
    if (!res.success) {
      setLoginError(res.message || "Login failed.");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    const {
      companyName,
      contactPerson,
      phone,
      email,
      gstNo,
      state,
      city,
      password,
      address,
    } = regData;

    if (
      !companyName ||
      !contactPerson ||
      !phone ||
      !email ||
      !gstNo ||
      !state ||
      !city ||
      !password ||
      !address
    ) {
      setRegError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setRegError("Password must be at least 6 characters long.");
      return;
    }

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/`~]/.test(password);
    if (!hasSpecialChar) {
      setRegError(
        "Password must contain at least one special character (e.g. @, #, $, %, &, *).",
      );
      return;
    }

    const res = register(regData);
    if (!res.success) {
      setRegError(res.message || "Registration failed.");
    }
  };

  return (
    <div className="modal-overlay open" id="authModal" onClick={closeAuthModal}>
      <div
        className="modal-card auth-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={closeAuthModal}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="auth-modal-header">
          <div className="auth-modal-badge">Siddhi Eshop Customer Portal</div>
          <h3 className="auth-modal-title" id="authModalTitle">
            {authModalTab === "register"
              ? "Create Customer Account"
              : "Sign In to Your Account"}
          </h3>
          <p className="auth-modal-desc">
            Login or create an account to dispatch official commercial offers
            &amp; project RFQs
          </p>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${authModalTab === "login" ? "active" : ""}`}
              onClick={() => {
                setAuthModalTab("login");
                setLoginError("");
              }}
            >
              Sign In (Login)
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${authModalTab === "register" ? "active" : ""}`}
              onClick={() => {
                setAuthModalTab("register");
                setRegError("");
              }}
            >
              Create Customer Account
            </button>
          </div>
        </div>

        <div className="auth-modal-body">
          {/* LOGIN FORM */}
          {authModalTab === "login" && (
            <form className="auth-form active" onSubmit={handleLoginSubmit}>
              {loginError && (
                <div className="auth-alert" style={{ display: "block" }}>
                  {loginError}
                </div>
              )}

              <div className="auth-field-group">
                <label>Phone Number or Business Email ID *</label>
                <div className="auth-input-wrap">
                  <Phone size={16} className="auth-field-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 98920000947 or name@company.com"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field-group auth-inline-caption">
                <div className="auth-subtext">
                  Login using your registered Phone No. or Email ID
                </div>
              </div>

              <div className="auth-field-group">
                <label>Password *</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-field-icon" />
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  <input type="checkbox" defaultChecked /> Remember login on
                  this device
                </label>
              </div>

              <button type="submit" className="auth-primary-btn">
                SIGN IN &amp; CONTINUE
              </button>

              <div
                className="auth-form-switch"
                style={{ marginTop: "12px", textAlign: "center" }}
              >
                <span>New customer or industrial enterprise? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalTab("register");
                    setRegError("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Create Account Now &rarr;
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {authModalTab === "register" && (
            <form className="auth-form active" onSubmit={handleRegisterSubmit}>
              {regError && (
                <div className="auth-alert" style={{ display: "block" }}>
                  {regError}
                </div>
              )}

              <div className="auth-section-divider">
                <span className="auth-section-tag">
                  1. Company details &amp; tax information
                </span>
              </div>

              <div className="auth-grid-company-top">
                <div className="auth-field-group">
                  <label>Company Name *</label>
                  <div className="auth-input-wrap">
                    <Building size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Automation Pvt Ltd"
                      value={regData.companyName}
                      onChange={(e) =>
                        setRegData({ ...regData, companyName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="auth-field-group">
                  <label>Address * (Building, Street, Industrial Area)</label>
                  <div className="auth-input-wrap">
                    <MapPin size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot No. 42, Peenya Industrial Area 2nd Phase"
                      value={regData.address}
                      onChange={(e) =>
                        setRegData({ ...regData, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="auth-grid-company-bottom">
                <div className="auth-field-group">
                  <label>City *</label>
                  <div className="auth-input-wrap">
                    <MapPin size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangalore, Chennai, Pune"
                      value={regData.city}
                      onChange={(e) =>
                        setRegData({ ...regData, city: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="auth-field-group">
                  <label>State *</label>
                  <select
                    className="auth-select"
                    value={regData.state}
                    onChange={(e) =>
                      setRegData({ ...regData, state: e.target.value })
                    }
                  >
                    <option value="Karnataka">-- Select State / UT --</option>
                    <option value="Karnataka">Karnataka (29)</option>
                    <option value="Tamil Nadu">Tamil Nadu (33)</option>
                    <option value="Maharashtra">Maharashtra (27)</option>
                    <option value="Telangana">Telangana (36)</option>
                    <option value="Andhra Pradesh">Andhra Pradesh (37)</option>
                    <option value="Gujarat">Gujarat (24)</option>
                    <option value="Delhi">Delhi (07)</option>
                    <option value="Haryana">Haryana (06)</option>
                    <option value="Other">Other States</option>
                  </select>
                </div>

                <div className="auth-field-group col-gst">
                  <label>GST No *</label>
                  <div className="auth-input-wrap">
                    <ShieldCheck size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      maxLength={15}
                      placeholder="E.g. 29ABCDEF1234F1Z5"
                      value={regData.gstNo}
                      onChange={(e) =>
                        setRegData({
                          ...regData,
                          gstNo: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="auth-section-divider">
                <span className="auth-section-tag">
                  2. Authorized contact person &amp; login details
                </span>
              </div>

              <div className="auth-grid-3col">
                <div className="auth-field-group">
                  <label>Contact Person Name *</label>
                  <div className="auth-input-wrap">
                    <User size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={regData.contactPerson}
                      onChange={(e) =>
                        setRegData({
                          ...regData,
                          contactPerson: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="auth-field-group">
                  <label>Phone Number * (Login ID)</label>
                  <div className="auth-input-wrap">
                    <Phone size={16} className="auth-field-icon" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 09820000947"
                      value={regData.phone}
                      onChange={(e) =>
                        setRegData({ ...regData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="auth-field-group">
                  <label>Email ID * (Login ID)</label>
                  <div className="auth-input-wrap">
                    <Mail size={16} className="auth-field-icon" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={regData.email}
                      onChange={(e) =>
                        setRegData({ ...regData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="auth-section-divider">
                <span className="auth-section-tag">
                  3. Account security password
                </span>
              </div>

              <div className="auth-grid-password">
                <div className="auth-field-group">
                  <label>Set Password *</label>
                  <div className="auth-input-wrap">
                    <Lock size={16} className="auth-field-icon" />
                    <input
                      type="password"
                      required
                      placeholder="Enter a secure password"
                      value={regData.password}
                      onChange={(e) =>
                        setRegData({ ...regData, password: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="password-note-box">
                  <ShieldCheck size={16} />
                  <span>
                    Requires min. 6 characters &amp; 1 special character. Use
                    Phone No or Email to login.
                  </span>
                </div>
              </div>

              <button type="submit" className="auth-primary-btn">
                CREATE ACCOUNT
              </button>

              <div
                className="auth-form-switch"
                style={{ marginTop: "10px", textAlign: "center" }}
              >
                <span>Already registered? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalTab("login");
                    setLoginError("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign In &rarr;
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
