import React, { useState } from "react";
import { 
  ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, 
  Eye, EyeOff, Fingerprint, KeyRound, Lock, Shield, 
  Sparkles, User, Building, Radio 
} from "lucide-react";

export function AuthPage({ initialMode = "login" }) {
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
      };
      localStorage.setItem("chakravyuh_officer_session", JSON.stringify(userProfile));
      window.location.href = "/dashboard";
    }, 1000);
  };

  const handleBiometricAuth = () => {
    setBiometricLoading(true);
    setTimeout(() => {
      handleAuth();
    }, 800);
  };

  return (
    <div className="min-h-[100dvh] bg-[#05140c] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#d8b84d]/10 blur-[120px] pointer-events-none" />

      {/* Top Bar */}
      <header className="px-6 py-5 flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
        <a href="/" className="flex items-center gap-3 text-white no-underline group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d8b84d]/30 to-emerald-950 border border-[#d8b84d]/50 text-[#d8b84d] shadow-lg group-hover:scale-105 transition-transform">
            <Shield size={19} strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-wider font-['Chakra_Petch'] text-white">CHAKRAVYUH</span>
              <span className="rounded bg-[#d8b84d]/20 px-1.5 py-0.2 text-[8px] font-bold text-[#d8b84d] border border-[#d8b84d]/40 font-mono">I4C</span>
            </div>
            <span className="text-[9px] text-[#4a6859] tracking-widest font-mono block">NATIONAL ATTRIBUTION</span>
          </div>
        </a>

        <a 
          href="/" 
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#d8b84d] transition font-medium"
        >
          <ArrowLeft size={14} /> Back to Overview
        </a>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <div 
          className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#06180f]/90 p-7 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
          style={{
            boxShadow: "0 25px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.22)"
          }}
        >
          {/* Header Segment */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-[10px] font-bold text-emerald-300 mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Secured Law Enforcement Gateway · I4C CIS Division
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isSignup ? "Request Agency Access" : "Investigator Sign In"}
            </h1>
            <p className="mt-1.5 text-xs text-slate-400">
              {isSignup 
                ? "Provision credentials for certified Cyber Crime Units & FIU Officers" 
                : "Authenticate terminal session with your official credentials"}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-black/40 border border-white/10 p-1 mb-6">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
                !isSignup 
                  ? "bg-[#d8b84d] text-black shadow-md" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
                isSignup 
                  ? "bg-[#d8b84d] text-black shadow-md" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Request Access
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4 text-xs">
            {isSignup && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Officer Full Name</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 focus-within:border-[#d8b84d] transition">
                      <User size={14} className="text-slate-500" />
                      <input
                        required
                        type="text"
                        placeholder="Inspector A. Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-transparent text-slate-200 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Badge / Service ID</label>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 focus-within:border-[#d8b84d] transition">
                      <BadgeCheck size={14} className="text-slate-500" />
                      <input
                        required
                        type="text"
                        placeholder="I4C-IND-88219"
                        value={badgeId}
                        onChange={(e) => setBadgeId(e.target.value)}
                        className="w-full bg-transparent text-slate-200 font-mono outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Police Station / Unit Code</label>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 focus-within:border-[#d8b84d] transition">
                    <Building size={14} className="text-slate-500" />
                    <select
                      value={stationCode}
                      onChange={(e) => setStationCode(e.target.value)}
                      className="w-full bg-transparent text-slate-200 outline-none"
                    >
                      <option value="CYBER-PS-I4C-DELHI" className="bg-[#05140c]">CYBER-PS-I4C-DELHI</option>
                      <option value="CID-CYBER-MUMBAI" className="bg-[#05140c]">CID-CYBER-MUMBAI</option>
                      <option value="FIU-IND-NODAL-CELL" className="bg-[#05140c]">FIU-IND-NODAL-CELL</option>
                      <option value="STF-CYBER-BENGALURU" className="bg-[#05140c]">STF-CYBER-BENGALURU</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Official Government / Agency Email</label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 focus-within:border-[#d8b84d] transition">
                <User size={14} className="text-slate-500" />
                <input
                  required
                  type="email"
                  placeholder="officer.sharma@i4c.mha.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-slate-200 outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-slate-400 font-medium">Terminal Password / Token Key</label>
                {!isSignup && (
                  <span className="text-[10px] text-[#d8b84d] cursor-pointer hover:underline">
                    Reset Token
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 focus-within:border-[#d8b84d] transition">
                <Lock size={14} className="text-slate-500" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-slate-200 outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-xs font-bold text-black transition hover:brightness-110 shadow-xl cursor-pointer"
              style={{ background: "#d8b84d" }}
            >
              {loading ? (
                <span>Authenticating Agency Clearance...</span>
              ) : (
                <>
                  <span>{isSignup ? "Submit Access Request" : "Authenticate & Enter Workspace"}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            {/* Quick Biometric Login */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleBiometricAuth}
                disabled={biometricLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 px-3 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:border-[#d8b84d]/40 transition cursor-pointer"
              >
                <Fingerprint size={16} className={biometricLoading ? "text-[#d8b84d] animate-pulse" : "text-emerald-400"} />
                <span>{biometricLoading ? "Verifying Biometric Key..." : "Biometric Quick Clearance (FaceID / YubiKey)"}</span>
              </button>
            </div>
          </form>

          {/* Footer Clearance Notice */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-[10px] text-slate-500 flex items-center justify-center gap-2">
            <KeyRound size={12} className="text-[#d8b84d]" />
            <span>Official Government Cyber Forensics Network · 256-bit Hardware Encrypted</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/10 text-center text-[10px] text-slate-500 font-mono">
        CHAKRAVYUH · I4C NATIONAL ATTRIBUTION · MINISTRY OF HOME AFFAIRS · GOVT OF INDIA
      </footer>
    </div>
  );
}
