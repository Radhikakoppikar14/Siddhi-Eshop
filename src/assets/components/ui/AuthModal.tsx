import React, { useState } from "react";
import {
  X,
  Building,
  ShieldCheck,
  ArrowRight,
  Sparkles,
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

  const fillDemoCredentials = () => {
    setLoginId("engineer@company.com");
    setLoginPass("secure123");
    setLoginError("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in select-none">
      <div
        className="relative bg-white rounded-[2.5rem] shadow-2xl border border-[#7a3d37]/20 w-full max-w-lg overflow-hidden transition-all transform animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Animated Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-stone-100 hover:bg-[#7a3d37] hover:text-white text-stone-600 transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header in 5% lighter Wine/Burgundy (#7a3d37) with Animated Ambient Glow */}
        <div className="relative p-6 sm:p-8 bg-[#7a3d37] text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center gap-3.5 mb-5">
            <div className="p-3 bg-white/10 border border-white/20 text-white rounded-2xl shadow-inner backdrop-blur-xs transition-transform duration-300 hover:rotate-6">
              <Building size={22} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                Enterprise B2B Customer Portal
              </h3>
              <span className="text-xs text-rose-200/90 font-mono font-medium tracking-wide">
                Siddhi Kabel Corporation Private Limited
              </span>
            </div>
          </div>

          {/* Smooth Animated Tab Switcher */}
          <div className="relative z-10 grid grid-cols-2 gap-2 p-1.5 bg-black/25 backdrop-blur-md rounded-2xl border border-white/10 text-xs font-bold">
            <button
              onClick={() => {
                setAuthModalTab("login");
                setLoginError("");
                setRegError("");
              }}
              className={`py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                authModalTab === "login"
                  ? "bg-white text-[#7a3d37] shadow-lg font-extrabold scale-[1.02]"
                  : "text-stone-300 hover:text-white hover:bg-white/5"
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
              className={`py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                authModalTab === "register"
                  ? "bg-white text-[#7a3d37] shadow-lg font-extrabold scale-[1.02]"
                  : "text-stone-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Register Enterprise Profile
            </button>
          </div>
        </div>

        {/* Body Content with Smooth Transition */}
        <div className="p-6 sm:p-8 bg-stone-50/60 transition-all duration-300">
          {authModalTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fade-in">
              {loginError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 leading-snug font-medium animate-fade-in">
                  {loginError}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-700 font-mono uppercase tracking-wider">
                    Registered Business Email or Mobile Number
                  </label>
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="text-[10px] font-mono font-bold text-[#7a3d37] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles size={11} /> Load Demo Access
                  </button>
                </div>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="engineer@company.com or 10-digit phone"
                  className={`w-full px-4 py-3 rounded-2xl border text-xs text-stone-900 bg-white outline-none transition-all duration-200 ${
                    loginFieldErrors.loginId
                      ? "border-red-500 bg-red-50"
                      : "border-stone-200 focus:border-[#7a3d37] focus:ring-4 focus:ring-[#7a3d37]/10 shadow-2xs"
                  }`}
                />
                {loginFieldErrors.loginId && (
                  <span className="text-[11px] text-red-600 mt-1 block font-medium animate-fade-in">
                    {loginFieldErrors.loginId}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-mono uppercase tracking-wider">
                  Account Password
                </label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-2xl border text-xs text-stone-900 bg-white outline-none transition-all duration-200 ${
                    loginFieldErrors.loginPass
                      ? "border-red-500 bg-red-50"
                      : "border-stone-200 focus:border-[#7a3d37] focus:ring-4 focus:ring-[#7a3d37]/10 shadow-2xs"
                  }`}
                />
                {loginFieldErrors.loginPass && (
                  <span className="text-[11px] text-red-600 mt-1 block font-medium animate-fade-in">
                    {loginFieldErrors.loginPass}
                  </span>
                )}
              </div>

              <div className="p-3.5 bg-white border border-stone-200 rounded-2xl text-[11px] text-stone-600 flex items-center gap-2.5 shadow-2xs transition-all hover:border-stone-300">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>Default demo access: Any valid registered email or password is preserved in local session.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-5 bg-[#7a3d37] hover:bg-[#68332e] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In to Account</span>
                <ArrowRight size={14} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-stone-500 font-medium">
                  New corporate client?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthModalTab("register")}
                    className="font-bold text-[#7a3d37] hover:underline cursor-pointer transition-colors"
                  >
                    Register GST Profile
                  </button>
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1 animate-fade-in">
              {regError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 leading-snug font-medium animate-fade-in">
                  {regError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-mono uppercase tracking-wider">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={regData.companyName}
                    onChange={(e) => setRegData({ ...regData, companyName: e.target.value })}
                    placeholder="e.g. Apex Engineering Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 outline-none focus:border-[#7a3d37] focus:ring-2 focus:ring-[#7a3d37]/10 transition-all shadow-2xs"
                  />
                  {regFieldErrors.companyName && (
                    <span className="text-[10px] text-red-600 font-medium">{regFieldErrors.companyName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-mono uppercase tracking-wider">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    value={regData.contactPerson}
                    onChange={(e) => setRegData({ ...regData, contactPerson: e.target.value })}
                    placeholder="e.g. Anand Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 outline-none focus:border-[#7a3d37] focus:ring-2 focus:ring-[#7a3d37]/10 transition-all shadow-2xs"
                  />
                  {regFieldErrors.contactPerson && (
                    <span className="text-[10px] text-red-600 font-medium">{regFieldErrors.contactPerson}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-mono uppercase tracking-wider">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    placeholder="procurement@apex.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 outline-none focus:border-[#7a3d37] focus:ring-2 focus:ring-[#7a3d37]/10 transition-all shadow-2xs"
                  />
                  {regFieldErrors.email && (
                    <span className="text-[10px] text-red-600 font-medium">{regFieldErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-mono uppercase tracking-wider">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 outline-none focus:border-[#7a3d37] focus:ring-2 focus:ring-[#7a3d37]/10 transition-all shadow-2xs"
                  />
                  {regFieldErrors.phone && (
                    <span className="text-[10px] text-red-600 font-medium">{regFieldErrors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-mono uppercase tracking-wider">
                    Company GSTIN (Optional)
                  </label>
                  <input
                    type="text"
                    value={regData.gstNo}
                    onChange={(e) => setRegData({ ...regData, gstNo: e.target.value })}
                    placeholder="e.g. 29AAAAA0000A1Z5"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 font-mono outline-none focus:border-[#7a3d37] focus:ring-2 focus:ring-[#7a3d37]/10 transition-all shadow-2xs uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-mono uppercase tracking-wider">
                    City / Industrial Area
                  </label>
                  <input
                    type="text"
                    value={regData.city}
                    onChange={(e) => setRegData({ ...regData, city: e.target.value })}
                    placeholder="e.g. Bangalore Peenya"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 outline-none focus:border-[#7a3d37] focus:ring-2 focus:ring-[#7a3d37]/10 transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-mono uppercase tracking-wider">
                  Password (min 6 characters) *
                </label>
                <input
                  type="password"
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  placeholder="Create secure password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 outline-none focus:border-[#7a3d37] focus:ring-2 focus:ring-[#7a3d37]/10 transition-all shadow-2xs"
                />
                {regFieldErrors.password && (
                  <span className="text-[10px] text-red-600 font-medium">{regFieldErrors.password}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-5 bg-[#7a3d37] hover:bg-[#68332e] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-3 cursor-pointer"
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