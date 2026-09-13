import React, { useState } from "react";
import { 
  ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, 
  Eye, EyeOff, Fingerprint, KeyRound, Lock, Shield, 
  Sparkles, User, Building, Radio
} from "lucide-react";
import { WorkspaceNav } from "./WorkspaceNav.jsx";
import { useTheme } from "../lib/ThemeContext.jsx";

export function AuthPage({ initialMode = "login" }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("officer.sharma@i4c.mha.gov.in");
  const [password, setPassword] = useState("••••••••••••");
  const [fullName, setFullName] = useState("Inspector A. Sharma");
  const [badgeId, setBadgeId] = useState("I4C-IND-88219");
  const [stationCode, setStationCode] = useState("CYBER-PS-I4C-DELHI");
  const [clearanceTier, setClearanceTier] = useState("Tier 2 - National Attribution");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState("");

  const isSignup = mode === "signup";

  const handleAuth = (e) => {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Save profile session to local storage
      const userProfile = {
        name: isSignup ? fullName : "Inspector A. Sharma",
        email: email,
        badgeId: isSignup ? badgeId : "I4C-IND-88219",
        stationCode: isSignup ? stationCode : "CYBER-PS-I4C-DELHI",
        clearance: isSignup ? clearanceTier : "Tier 2 - National Attribution",
        authenticatedAt: new Date().toISOString(),
        authProvider: "agency_token",
      };
      localStorage.setItem("chakravyuh_officer_session", JSON.stringify(userProfile));
      window.location.href = "/dashboard";
    }, 900);
  };

  const handleOAuth = (provider) => {
    setOauthLoading(provider);
    setTimeout(() => {
      const userProfile = {
        name: isSignup ? fullName : (provider === "Google" ? "Inspector A. Sharma (Google Auth)" : "Inspector A. Sharma (Microsoft Entra)"),
        email: provider === "Google" ? "a.sharma.i4c@gmail.com" : "officer.sharma@police.gov.in",
        badgeId: isSignup ? badgeId : "I4C-IND-88219",
        stationCode: isSignup ? stationCode : "CYBER-PS-I4C-DELHI",
        clearance: isSignup ? clearanceTier : "Tier 2 - National Attribution",
        authenticatedAt: new Date().toISOString(),
        authProvider: provider.toLowerCase(),
      };
      localStorage.setItem("chakravyuh_officer_session", JSON.stringify(userProfile));
      window.location.href = "/dashboard";
    }, 850);
  };

  const handleBiometricAuth = () => {
    setBiometricLoading(true);
    setTimeout(() => {
      handleAuth();
    }, 800);
  };

  const handleNav = (route) => {
    if (route === "landing") {
      window.location.href = "/";
    } else {
      window.location.href = `/${route}`;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] dark:bg-[#05140c] text-slate-900 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[540px] h-[540px] rounded-full bg-emerald-500/10 dark:bg-emerald-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[540px] h-[540px] rounded-full bg-emerald-400/10 dark:bg-emerald-500/10 blur-[130px] pointer-events-none" />

      {/* Floating Glassmorphism Dock Navbar (Auth Variant) */}
      <WorkspaceNav variant="auth" onNavigate={handleNav} />

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10 my-4 sm:my-8">
        <div 
          className="w-full max-w-lg rounded-3xl border border-slate-200/90 dark:border-white/12 bg-white/90 dark:bg-[#06180f]/85 p-7 sm:p-9 shadow-[0_24px_70px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl"
        >
          {/* Header Segment */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-950/60 px-3.5 py-1 text-[11px] font-extrabold text-emerald-800 dark:text-emerald-300 mb-3 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Secured Law Enforcement Gateway · I4C CIS Division
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {isSignup ? "Request Agency Access" : "Investigator Sign In"}
            </h1>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 font-bold">
              {isSignup 
                ? "Provision credentials for certified Cyber Crime Units & FIU Officers" 
                : "Authenticate terminal session with your official agency credentials"}
            </p>
          </div>

          {/* Mode Switcher Tabs (Teal-Green Cohesive Styling) */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-1 mb-6 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg py-2.5 text-xs font-extrabold transition cursor-pointer ${
                !isSignup 
                  ? "bg-[#059669] text-white shadow-md dark:bg-[#10B981] dark:text-[#04120C]" 
                  : "text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-lg py-2.5 text-xs font-extrabold transition cursor-pointer ${
                isSignup 
                  ? "bg-[#059669] text-white shadow-md dark:bg-[#10B981] dark:text-[#04120C]" 
                  : "text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              }`}
            >
              Request Access
            </button>
          </div>

          {/* Social OAuth Sign In Options (Google & Microsoft) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => handleOAuth("Google")}
              disabled={!!oauthLoading}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-200/90 dark:border-white/12 bg-white dark:bg-white/5 py-2.5 px-3 text-xs font-extrabold text-slate-800 dark:text-slate-100 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 hover:border-emerald-500/40 hover:text-emerald-800 dark:hover:text-emerald-300 transition shadow-xs cursor-pointer backdrop-blur-md"
            >
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{oauthLoading === "Google" ? "Authenticating..." : `${isSignup ? "Sign up" : "Sign in"} with Google`}</span>
            </button>

            {/* Microsoft Entra ID Sign In */}
            <button
              type="button"
              onClick={() => handleOAuth("Microsoft")}
              disabled={!!oauthLoading}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-200/90 dark:border-white/12 bg-white dark:bg-white/5 py-2.5 px-3 text-xs font-extrabold text-slate-800 dark:text-slate-100 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 hover:border-emerald-500/40 hover:text-emerald-800 dark:hover:text-emerald-300 transition shadow-xs cursor-pointer backdrop-blur-md"
            >
              <svg width="14" height="14" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
              </svg>
              <span>{oauthLoading === "Microsoft" ? "Authenticating..." : `${isSignup ? "Sign up" : "Sign in"} with Microsoft`}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-slate-200 dark:border-white/10 w-full" />
            <span className="bg-white/95 dark:bg-[#06180f] px-3 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest absolute">
              or agency credentials
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4 text-xs">
            {isSignup && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-800 dark:text-slate-200 mb-1 font-bold">Officer Full Name</label>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-300/80 dark:border-white/10 bg-slate-50/80 dark:bg-black/40 px-3 py-2.5 focus-within:border-[#059669] dark:focus-within:border-[#10B981] focus-within:bg-white dark:focus-within:bg-black/60 focus-within:ring-2 focus-within:ring-[#10B981]/25 transition backdrop-blur-md">
                      <User size={14} className="text-slate-500 dark:text-slate-400 font-bold" />
                      <input
                        required
                        type="text"
                        placeholder="Inspector A. Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-transparent text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-800 dark:text-slate-200 mb-1 font-bold">Badge / Service ID</label>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-300/80 dark:border-white/10 bg-slate-50/80 dark:bg-black/40 px-3 py-2.5 focus-within:border-[#059669] dark:focus-within:border-[#10B981] focus-within:bg-white dark:focus-within:bg-black/60 focus-within:ring-2 focus-within:ring-[#10B981]/25 transition backdrop-blur-md">
                      <BadgeCheck size={14} className="text-slate-500 dark:text-slate-400 font-bold" />
                      <input
                        required
                        type="text"
                        placeholder="I4C-IND-88219"
                        value={badgeId}
                        onChange={(e) => setBadgeId(e.target.value)}
                        className="w-full bg-transparent text-slate-900 dark:text-slate-100 font-mono outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-800 dark:text-slate-200 mb-1 font-bold">Police Station / Unit Code</label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-300/80 dark:border-white/10 bg-slate-50/80 dark:bg-black/40 px-3 py-2.5 focus-within:border-[#059669] dark:focus-within:border-[#10B981] focus-within:bg-white dark:focus-within:bg-black/60 focus-within:ring-2 focus-within:ring-[#10B981]/25 transition backdrop-blur-md">
                    <Building size={14} className="text-slate-500 dark:text-slate-400 font-bold" />
                    <select
                      value={stationCode}
                      onChange={(e) => setStationCode(e.target.value)}
                      className="w-full bg-transparent text-slate-900 dark:text-slate-100 outline-none cursor-pointer font-bold"
                    >
                      <option value="CYBER-PS-I4C-DELHI" className="bg-white dark:bg-[#05140c] text-slate-900 dark:text-slate-100 font-bold">CYBER-PS-I4C-DELHI</option>
                      <option value="CID-CYBER-MUMBAI" className="bg-white dark:bg-[#05140c] text-slate-900 dark:text-slate-100 font-bold">CID-CYBER-MUMBAI</option>
                      <option value="FIU-IND-NODAL-CELL" className="bg-white dark:bg-[#05140c] text-slate-900 dark:text-slate-100 font-bold">FIU-IND-NODAL-CELL</option>
                      <option value="STF-CYBER-BENGALURU" className="bg-white dark:bg-[#05140c] text-slate-900 dark:text-slate-100 font-bold">STF-CYBER-BENGALURU</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-800 dark:text-slate-200 mb-1 font-bold">Official Government / Agency Email</label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300/80 dark:border-white/10 bg-slate-50/80 dark:bg-black/40 px-3.5 py-2.5 focus-within:border-[#059669] dark:focus-within:border-[#10B981] focus-within:bg-white dark:focus-within:bg-black/60 focus-within:ring-2 focus-within:ring-[#10B981]/25 transition backdrop-blur-md">
                <User size={14} className="text-slate-500 dark:text-slate-400 font-bold" />
                <input
                  required
                  type="email"
                  placeholder="officer.sharma@i4c.mha.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-slate-900 dark:text-slate-100 outline-none font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-slate-800 dark:text-slate-200 font-bold">Terminal Password / Token Key</label>
                {!isSignup && (
                  <span className="text-[11px] text-[#059669] dark:text-[#10B981] font-extrabold cursor-pointer hover:underline">
                    Reset Token
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300/80 dark:border-white/10 bg-slate-50/80 dark:bg-black/40 px-3.5 py-2.5 focus-within:border-[#059669] dark:focus-within:border-[#10B981] focus-within:bg-white dark:focus-within:bg-black/60 focus-within:ring-2 focus-within:ring-[#10B981]/25 transition backdrop-blur-md">
                <Lock size={14} className="text-slate-500 dark:text-slate-400 font-bold" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-slate-900 dark:text-slate-100 outline-none font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Primary Submit Button (Rolex Luxury Gold Gradient) */}
            <button
              type="submit"
              disabled={loading}
              className="rolex-gold-btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-xs font-extrabold cursor-pointer tracking-wider"
            >
              {loading ? (
                <span className="text-[#150F00]">Authenticating Agency Clearance...</span>
              ) : (
                <>
                  <span className="text-[#150F00]">{isSignup ? "Submit Access Request" : "Authenticate & Enter Workspace"}</span>
                  <ArrowRight size={15} strokeWidth={2.5} className="text-[#150F00]" />
                </>
              )}
            </button>

            {/* Quick Biometric Login */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleBiometricAuth}
                disabled={biometricLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/90 dark:border-white/12 bg-white/70 dark:bg-white/5 py-2.5 px-3 text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 hover:border-emerald-500/40 hover:text-emerald-800 dark:hover:text-emerald-300 transition cursor-pointer backdrop-blur-md"
              >
                <Fingerprint size={16} className={biometricLoading ? "text-emerald-600 dark:text-[#10B981] animate-pulse" : "text-emerald-600 dark:text-emerald-400"} />
                <span>{biometricLoading ? "Verifying Biometric Key..." : "Biometric Quick Clearance (FaceID / YubiKey)"}</span>
              </button>
            </div>
          </form>

          {/* Footer Clearance Notice */}
          <div className="mt-6 pt-4 border-t border-slate-200/90 dark:border-white/10 text-center text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <KeyRound size={12} className="text-emerald-600 dark:text-[#10B981]" />
            <span>Official Government Cyber Forensics Network · 256-bit Hardware Encrypted</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-200/80 dark:border-white/10 text-center text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
        CHAKRAVYUH · I4C NATIONAL ATTRIBUTION · MINISTRY OF HOME AFFAIRS · GOVT OF INDIA
      </footer>
    </div>
  );
}

export default AuthPage;
