import React, { useState, useEffect } from "react";
import { 
  Activity, AlertTriangle, BadgeCheck, Bell, Building, 
  Check, CheckCircle2, Cpu, Database, Edit3, KeyRound, 
  Lock, RefreshCw, Save, Server, Shield, ShieldAlert, 
  UserCheck, UserRound, Users, Wifi, X 
} from "lucide-react";

export function ProfilePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'admin'
  const [isEditing, setIsEditing] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Officer Profile State
  const [officerName, setOfficerName] = useState("Inspector A. Sharma");
  const [officerRank, setOfficerRank] = useState("Inspector · Cyber Crime Investigation Unit");
  const [stationCode, setStationCode] = useState("Cyber Crime PS · I4C Operations Division");
  const [badgeId, setBadgeId] = useState("I4C-IND-88219");
  const [email, setEmail] = useState("a.sharma@i4c.gov.in");
  const [clearanceTier, setClearanceTier] = useState("Tier 2 - National Attribution");
  const [surveillanceInterval, setSurveillanceInterval] = useState("25s (High Velocity)");
  const [slaWindow, setSlaWindow] = useState("< 4 Hours (Sec 91 Window)");

  // Admin Panel States
  const [polygonRpc, setPolygonRpc] = useState("https://polygon-mainnet.g.alchemy.com/v2/live-node");
  const [tronRpc, setTronRpc] = useState("https://api.trongrid.io/jsonrpc");
  const [mlEndpoint, setMlEndpoint] = useState("http://localhost:8000/api/v1/ml-risk-score");
  const [autoFreezeThreshold, setAutoFreezeThreshold] = useState("95% VASP Confidence");
  const [activeOfficers, setActiveOfficers] = useState([
    { id: "off-1", name: "Inspector A. Sharma", role: "Primary Investigator", clearance: "Tier 2", station: "CYBER-PS-DELHI", status: "ONLINE" },
    { id: "off-2", name: "Sub-Inspector R. Verma", role: "Forensic Analyst", clearance: "Tier 2", station: "CID-CYBER-MUMBAI", status: "ACTIVE" },
    { id: "off-3", name: "Nodal Officer V. Nair", role: "FIU-IND Compliance", clearance: "Tier 1 - Executive", station: "FIU-NODAL-HQ", status: "STANDBY" },
  ]);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chakravyuh_officer_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setOfficerName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.badgeId) setBadgeId(parsed.badgeId);
        if (parsed.stationCode) setStationCode(parsed.stationCode);
        if (parsed.clearance) setClearanceTier(parsed.clearance);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const handleSaveProfile = (e) => {
    e?.preventDefault();
    const updated = {
      name: officerName,
      email,
      badgeId,
      stationCode,
      clearance: clearanceTier,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("chakravyuh_officer_session", JSON.stringify(updated));
    setIsEditing(false);
    showToast("✓ Officer credentials & clearance profile updated successfully!");
  };

  const handleSaveAdminSettings = (e) => {
    e?.preventDefault();
    showToast("✓ Admin telemetry & ML Risk model RPC endpoints updated!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ── Top Hero Segment with Tab Switcher ── */}
      <div className="rounded-3xl border border-white/10 bg-[#07130b]/90 p-6 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d8b84d]/40 to-emerald-950 border border-[#d8b84d]/60 text-[#d8b84d] font-bold text-xl shadow-[0_4px_20px_rgba(216,184,77,0.3)]">
              {officerName.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#d8b84d] uppercase tracking-wider">
                  {badgeId}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Officer
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                {officerName}
              </h1>
              <p className="text-xs text-slate-400">
                {stationCode}
              </p>
            </div>
          </div>

          {/* Action Tabs & Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-xl bg-black/50 border border-white/10 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "profile"
                    ? "bg-[#d8b84d] text-black shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <UserRound size={13} />
                <span>Officer Profile</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("admin")}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "admin"
                    ? "bg-[#d8b84d] text-black shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Server size={13} />
                <span>Admin & Node Panel</span>
              </button>
            </div>

            {activeTab === "profile" && (
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 transition cursor-pointer"
              >
                {isEditing ? <X size={13} /> : <Edit3 size={13} />}
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/80 px-4 py-2 text-xs font-semibold text-emerald-200">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}
      </div>

      {/* ── Tab: Officer Profile (View / Edit) ── */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Info / Edit Form */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#06110a]/90 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck size={16} className="text-[#d8b84d]" /> 
                {isEditing ? "Modify Officer Credentials" : "Law Enforcement Identification"}
              </h2>
              <span className="text-[10px] font-mono text-slate-500">I4C DEPLOYMENT TIER 2</span>
            </div>

            {isEditing ? (
              /* Edit Profile Form */
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Officer Full Name</label>
                    <input
                      type="text"
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-slate-200 outline-none focus:border-[#d8b84d]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Badge / Service Number</label>
                    <input
                      type="text"
                      value={badgeId}
                      onChange={(e) => setBadgeId(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-slate-200 font-mono outline-none focus:border-[#d8b84d]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Official Agency Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-slate-200 font-mono outline-none focus:border-[#d8b84d]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Clearance Level</label>
                    <select
                      value={clearanceTier}
                      onChange={(e) => setClearanceTier(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#05140c] p-3 text-slate-200 outline-none focus:border-[#d8b84d]"
                    >
                      <option value="Tier 1 - Standard Investigator">Tier 1 - Standard Investigator</option>
                      <option value="Tier 2 - National Attribution">Tier 2 - National Attribution</option>
                      <option value="Tier 3 - Senior FIU / Joint Director">Tier 3 - Senior FIU / Joint Director</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Police Station / Command Unit</label>
                  <input
                    type="text"
                    value={stationCode}
                    onChange={(e) => setStationCode(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-slate-200 outline-none focus:border-[#d8b84d]"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-semibold text-slate-300 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold text-black transition hover:brightness-110 shadow-lg cursor-pointer"
                    style={{ background: "#d8b84d" }}
                  >
                    <Save size={14} />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Profile Readout */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <span className="text-[10px] uppercase font-semibold text-slate-500">Designation & Unit</span>
                    <strong className="block text-sm font-semibold text-slate-200 mt-1">{officerRank}</strong>
                    <span className="text-xs text-slate-400 mt-0.5 block">{stationCode}</span>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <span className="text-[10px] uppercase font-semibold text-slate-500">Security Clearance</span>
                    <div className="flex items-center gap-2 mt-1">
                      <strong className="text-sm font-semibold text-[#d8b84d]">{clearanceTier}</strong>
                      <BadgeCheck size={16} className="text-[#d8b84d]" />
                    </div>
                    <span className="text-xs text-slate-400 mt-0.5 block">FIU-IND PMLA Interoperability Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <span className="text-[10px] uppercase font-semibold text-slate-500">Official Secure Channel</span>
                    <strong className="block text-xs font-mono text-slate-200 mt-1">{email}</strong>
                    <span className="text-[10px] text-emerald-400 mt-0.5 block">● 256-bit Hardware Attested</span>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <span className="text-[10px] uppercase font-semibold text-slate-500">Preservation SLA Target</span>
                    <strong className="block text-xs font-mono text-slate-200 mt-1">{slaWindow}</strong>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Section 94 BNSS Notice Cadence</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Last session attestation: Today at 09:42 IST</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    ● Hardware Key Attested (I4C Sec-Ops)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Side Operational Snapshot */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#06110a]/90 p-5 backdrop-blur-xl shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Activity size={13} className="text-[#d8b84d]" /> Investigator Velocity
              </span>
              <div className="mt-3 space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Traces Run (30d)</span>
                  <span className="font-mono font-bold text-white">48 Cases</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Section 91 Notices</span>
                  <span className="font-mono font-bold text-white">19 Issued</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Average Attribution</span>
                  <span className="font-mono font-bold text-emerald-400">1.4s</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400">Watchlist Loop</span>
                  <span className="font-mono font-bold text-[#d8b84d]">Active (24/7)</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#06110a]/90 p-5 backdrop-blur-xl shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Shield size={13} className="text-emerald-400" /> Cryptographic Custody
              </span>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                All generated dossiers and notices are digitally stamped with the Officer's private key hash under Section 65B of the Indian Evidence Act.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Admin & Node Management Console ── */}
      {activeTab === "admin" && (
        <div className="space-y-6">
          {/* Telemetry & ML Risk Model Config */}
          <div className="rounded-2xl border border-white/10 bg-[#06110a]/90 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu size={16} className="text-[#d8b84d]" /> ML Risk Scoring & On-Chain RPC Configuration
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure real-time Graph Neural Network (GNN) inference & node endpoints.
                </p>
              </div>
              <span className="rounded-full bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                SYSTEM HEALTH: OPTIMAL
              </span>
            </div>

            <form onSubmit={handleSaveAdminSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">ML Risk Detection Model API Endpoint</label>
                  <input
                    type="text"
                    value={mlEndpoint}
                    onChange={(e) => setMlEndpoint(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-slate-200 font-mono outline-none focus:border-[#d8b84d]"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Target FastAPI / PyTorch Geometric risk scoring microservice
                  </span>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Auto-Freeze Directive Threshold</label>
                  <select
                    value={autoFreezeThreshold}
                    onChange={(e) => setAutoFreezeThreshold(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#05140c] p-3 text-slate-200 outline-none focus:border-[#d8b84d]"
                  >
                    <option value="90% VASP Confidence">90% VASP Confidence</option>
                    <option value="95% VASP Confidence">95% VASP Confidence (Recommended)</option>
                    <option value="98% VASP Confidence">98% VASP Confidence (Strict)</option>
                  </select>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Confidence required to trigger automated Section 91 drafting
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Polygon PoS Archive RPC</label>
                  <input
                    type="text"
                    value={polygonRpc}
                    onChange={(e) => setPolygonRpc(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-slate-200 font-mono outline-none focus:border-[#d8b84d]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">TRON TRC-20 Full Node RPC</label>
                  <input
                    type="text"
                    value={tronRpc}
                    onChange={(e) => setTronRpc(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-slate-200 font-mono outline-none focus:border-[#d8b84d]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold text-black transition hover:brightness-110 shadow-lg cursor-pointer"
                  style={{ background: "#d8b84d" }}
                >
                  <Save size={14} />
                  <span>Update System Telemetry</span>
                </button>
              </div>
            </form>
          </div>

          {/* Officer Clearances Management Table */}
          <div className="rounded-2xl border border-white/10 bg-[#06110a]/90 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Users size={16} className="text-[#d8b84d]" /> Registered Investigation Officers ({activeOfficers.length})
              </h2>
              <span className="text-[11px] text-slate-400">Role-Based Access Control</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-bold uppercase text-slate-500">
                    <th className="py-2.5 px-3">Officer Name</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Clearance</th>
                    <th className="py-2.5 px-3">Unit Code</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {activeOfficers.map((off) => (
                    <tr key={off.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-3 font-semibold text-slate-200">{off.name}</td>
                      <td className="py-3 px-3 text-slate-400">{off.role}</td>
                      <td className="py-3 px-3">
                        <span className="rounded bg-[#d8b84d]/15 px-2 py-0.5 text-[10px] font-bold text-[#d8b84d]">
                          {off.clearance}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400">{off.station}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                          ● {off.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
