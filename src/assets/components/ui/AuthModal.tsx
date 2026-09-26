import React, { useState } from "react";
import {
  X,
  Building,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import {
  isNotEmptyString,
  isValidEmail,
  isValidPhone,
} from "../../../utils/validation";

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
  const [loginFieldErrors, setLoginFieldErrors] = useState<Record<string, string>>({});

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
  const [regFieldErrors, setRegFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!isNotEmptyString(loginId)) errors.loginId = "Please enter your Email or Phone number.";
    if (!isNotEmptyString(loginPass)) errors.loginPass = "Please enter your password.";

    if (Object.keys(errors).length > 0) {
      setLoginFieldErrors(errors);
      return;
    }

    setLoginFieldErrors({});
    setIsSubmitting(true);
    const res = login(loginId, loginPass);
    setIsSubmitting(false);

    if (res.success) {
      closeAuthModal();
    } else {
      setLoginError(res.message || "Invalid credentials. Please verify or register an enterprise account.");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!isNotEmptyString(regData.companyName)) errors.companyName = "Company name is required.";
    if (!isNotEmptyString(regData.contactPerson)) errors.contactPerson = "Contact person name is required.";
    if (!isValidEmail(regData.email)) errors.email = "Please enter a valid business email.";
    if (!isValidPhone(regData.phone)) errors.phone = "Please enter a valid 10-digit mobile number.";
    if (!isNotEmptyString(regData.password) || regData.password.length < 6)
      errors.password = "Password must be at least 6 characters.";

    if (Object.keys(errors).length > 0) {
      setRegFieldErrors(errors);
      return;
    }

    setRegFieldErrors({});
    setIsSubmitting(true);
    const res = register(regData);
    setIsSubmitting(false);

    if (res.success) {
      closeAuthModal();
    } else {
      setRegError(res.message || "An account with this email/phone already exists.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-2 bg-slate-900 text-white rounded-xl">
              <Building size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Enterprise B2B Customer Portal
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                Siddhi Kabel Corporation Private Limited
              </span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200/80 rounded-xl mt-4 text-xs font-bold">
            <button
              onClick={() => {
                setAuthModalTab("login");
                setLoginError("");
                setRegError("");
              }}
              className={`py-2 rounded-lg transition-all ${
                authModalTab === "login"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign In to Account
            </button>
            <button
              onClick={() => {
                setAuthModalTab("register");
                setLoginError("");
                setRegError("");
              }}
              className={`py-2 rounded-lg transition-all ${
                authModalTab === "register"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Register Enterprise Profile
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8">
          {authModalTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 leading-snug">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registered Business Email or Mobile Number
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="engineer@company.com or 10-digit phone"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 outline-none ${
                    loginFieldErrors.loginId
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                  }`}
                />
                {loginFieldErrors.loginId && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {loginFieldErrors.loginId}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Account Password
                </label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 outline-none ${
                    loginFieldErrors.loginPass
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                  }`}
                />
                {loginFieldErrors.loginPass && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {loginFieldErrors.loginPass}
                  </span>
                )}
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>Default demo access: Any valid registered email or password is preserved in local session.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Sign In to Account</span>
                <ArrowRight size={14} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">
                  New corporate client?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthModalTab("register")}
                    className="font-bold text-red-600 hover:underline"
                  >
                    Register GST Profile
                  </button>
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              {regError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 leading-snug">
                  {regError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={regData.companyName}
                    onChange={(e) => setRegData({ ...regData, companyName: e.target.value })}
                    placeholder="e.g. Apex Engineering Ltd"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-red-500"
                  />
                  {regFieldErrors.companyName && (
                    <span className="text-[10px] text-red-600">{regFieldErrors.companyName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    value={regData.contactPerson}
                    onChange={(e) => setRegData({ ...regData, contactPerson: e.target.value })}
                    placeholder="e.g. Anand Sharma"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-red-500"
                  />
                  {regFieldErrors.contactPerson && (
                    <span className="text-[10px] text-red-600">{regFieldErrors.contactPerson}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    placeholder="procurement@apex.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-red-500"
                  />
                  {regFieldErrors.email && (
                    <span className="text-[10px] text-red-600">{regFieldErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-red-500"
                  />
                  {regFieldErrors.phone && (
                    <span className="text-[10px] text-red-600">{regFieldErrors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company GSTIN (Optional)
                  </label>
                  <input
                    type="text"
                    value={regData.gstNo}
                    onChange={(e) => setRegData({ ...regData, gstNo: e.target.value })}
                    placeholder="e.g. 29AAAAA0000A1Z5"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 font-mono outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Industrial Area
                  </label>
                  <input
                    type="text"
                    value={regData.city}
                    onChange={(e) => setRegData({ ...regData, city: e.target.value })}
                    placeholder="e.g. Bangalore Peenya"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password (min 6 characters) *
                </label>
                <input
                  type="password"
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  placeholder="Create secure password"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-red-500"
                />
                {regFieldErrors.password && (
                  <span className="text-[10px] text-red-600">{regFieldErrors.password}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-900/20 flex items-center justify-center gap-2 mt-2"
              >
                <span>Create Enterprise Account</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
