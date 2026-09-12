import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, BookOpen, Clock3, Download, FileSpreadsheet, 
  FileText, Fingerprint, GitBranch, Shield, Sparkles, Zap 
} from "lucide-react";
import SearchPanel from "./SearchPanel.jsx";
import GraphVisualizer from "./GraphVisualizer.jsx";
import { WorkspaceNav } from "./WorkspaceNav.jsx";
import { EvidenceLedgerPage } from "./EvidenceLedgerPage.jsx";
import { WorkspaceCollectionPage } from "./WorkspaceCollectionPage.jsx";
import { NotificationsPage } from "./NotificationsPage.jsx";
import { ProfilePage } from "./ProfilePage.jsx";
import { NodeDetailDrawer } from "./NodeDetailDrawer.jsx";
import { traceFunds, buildNotice, buildDossier } from "../lib/api.js";
import { EVIDENCE_RECORDS } from "../lib/evidenceData.js";

const emptyMetrics = [
  ["Traced volume", "--", "₹0 INR"],
  ["Attribution velocity", "0 Records", "Live RPC"],
  ["Identified VASP", "-", "Deposit endpoint"],
  ["FIU-IND status", "Standby", "PMLA jurisdiction"],
  ["Preservation SLA", "< 4 Hours", "Sec 91 window"],
];

const tabVariants = {
  initial: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
    scale: 0.995,
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: "blur(6px)",
    scale: 0.995,
    transition: {
      duration: 0.22,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const cardItemVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } 
  },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("workspace");
  const [graph, setGraph] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firNo, setFirNo] = useState("SIH/2026/00412");
  const [selectedEntity, setSelectedEntity] = useState(null);

  const attribution = graph?.attribution;

  async function runTrace(address, chain, fir) {
    setLoading(true);
    setError(null);
    setFirNo(fir);
    try {
      const data = await traceFunds({ address, chain, complaintDate: fir });
      setGraph(data);
    } catch (traceError) {
      setError(traceError.message ?? "Trace failed");
    } finally {
      setLoading(false);
    }
  }

  function download(content, filename, type) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const metrics = attribution
    ? [
        ["Traced volume", `${attribution.hops} hops`, `${attribution.exchange_name} route`],
        ["Attribution velocity", `${(attribution.time_to_attribution_ms / 1000).toFixed(1)}s`, "Direct on-chain RPC"],
        ["Identified VASP", attribution.exchange_name, "Deposit endpoint"],
        ["FIU-IND status", `${(attribution.confidence * 100).toFixed(0)}%`, "PMLA jurisdiction"],
        ["Preservation SLA", "< 4 Hours", "Sec 91 window"],
      ]
    : emptyMetrics;

  const handleNav = (route) => {
    if (route === "landing") {
      window.location.href = "/";
    } else {
      setActiveTab(route);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="workspace-shell min-h-[100dvh] text-slate-200">
      <WorkspaceNav activeRoute={activeTab} onNavigate={handleNav} />

      <main className="workspace-main mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {/* ── Tab: Live Attribution (Workspace) ── */}
          {activeTab === "workspace" && (
            <motion.div
              key="workspace"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              {/* Hero Banner */}
              <motion.section variants={cardItemVariants} className="hero-grid">
                <div className="hero-copy">
                  <div className="eyebrow">
                    <Sparkles size={13} /> National cyber crime reporting portal integrated
                  </div>
                  <h1>See the money.<br /><span>Stop the fraud.</span></h1>
                  <p>
                    Input any suspect cryptocurrency wallet to autonomously trace transactional flow, uncover receiving VASPs, and issue Section 91 freeze directives in real-time.
                  </p>
                </div>
                <div className="latency-card glass-panel">
                  <Clock3 size={19} className="text-[#d8b84d]" />
                  <div>
                    <div className="eyebrow">Real-time attribution latency</div>
                    <div className="mt-1 text-2xl font-bold text-white">
                      {attribution ? `${(attribution.time_to_attribution_ms / 1000).toFixed(2)}s` : "0.00s"}{" "}
                      <span className="text-xs font-normal text-slate-400">
                        {loading ? "Scanning" : "Standby"}
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400">Direct on-chain node execution</div>
                  </div>
                </div>
              </motion.section>

              {/* Ingestion & Auto-detection Search Panel */}
              <motion.div variants={cardItemVariants}>
                <SearchPanel onTrace={runTrace} loading={loading} />
              </motion.div>
              {error && <div className="glass-panel rounded-xl p-3 text-sm text-red-300 border border-red-500/30">{error}</div>}

              {/* Metrics Grid */}
              <motion.section variants={cardItemVariants} className="metric-grid">
                {metrics.map(([label, value, meta]) => (
                  <div className="metric-card glass-panel" key={label}>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{label}</div>
                    <div className="mt-2 text-lg font-bold text-slate-100">{value}</div>
                    <div className="mt-1 text-[10px] text-slate-400">{meta}</div>
                  </div>
                ))}
              </motion.section>

              {/* Multi-Hop Traversal Chain */}
              <motion.section variants={cardItemVariants} className="glass-panel overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <div className="section-heading p-5 pb-3">
                  <div>
                    <h2 className="flex items-center gap-2 text-base font-bold text-white">
                      <GitBranch size={16} className="text-[#d8b84d]" /> Multi-hop traversal chain
                    </h2>
                    <p className="text-xs text-slate-400">
                      Click any node in the traversal chain to open the side popup dossier
                    </p>
                  </div>
                  <span className="badge rounded-full px-3 py-1 text-xs font-semibold">
                    {graph ? `${graph.nodes.length} nodes loaded` : "Standby · awaiting wallet ingestion"}
                  </span>
                </div>
                <div className="graph-wrap" style={{ minHeight: "440px" }}>
                  <GraphVisualizer
                    graph={graph}
                    loading={loading}
                    onSelect={(node) => setSelectedEntity(node)}
                  />
                </div>
              </motion.section>

              {/* Cryptographic Evidence Ledger Section Preview */}
              <motion.section variants={cardItemVariants} className="glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="section-heading mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="flex items-center gap-2 text-base font-bold text-white">
                        <BookOpen size={16} className="text-[#d8b84d]" /> Cryptographic evidence ledger
                      </h2>
                      <span className="rounded-full bg-[#d8b84d]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#d8b84d] border border-[#d8b84d]/30">
                        49 On-Chain Records
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Verified on-chain audit trail ready for Section 65B Indian Evidence Act court certification.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("evidence")}
                      className="action-btn flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#d8b84d] border border-[#d8b84d]/40 bg-[#d8b84d]/10 hover:bg-[#d8b84d]/20 transition rounded-xl"
                    >
                      <FileSpreadsheet size={13} />
                      <span>View Full Ledger (49 Hops)</span>
                      <ArrowRight size={13} />
                    </button>
                    <button
                      type="button"
                      className="action-btn flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl"
                      disabled={!attribution}
                      onClick={() => download(buildNotice(graph, firNo), "bnss-s94-notice.txt", "text/plain")}
                    >
                      <Download size={13} /> Section 91 notice
                    </button>
                    <button
                      type="button"
                      className="action-btn flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl"
                      disabled={!graph}
                      onClick={() => download(buildDossier(graph, firNo), "forensic-attribution-dossier.html", "text/html")}
                    >
                      <FileText size={13} /> Forensic dossier
                    </button>
                  </div>
                </div>

                {/* Quick Ledger Preview Strip */}
                <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {EVIDENCE_RECORDS.slice(0, 3).map((rec) => (
                      <div
                        key={rec.hop}
                        onClick={() => setSelectedEntity(rec)}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-3 hover:bg-white/[0.07] hover:border-[#d8b84d]/40 cursor-pointer transition flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-bold text-slate-300">Hop #{rec.hop}</span>
                          <span className="text-[10px] text-slate-500">{rec.datetime_ist}</span>
                        </div>
                        <div className="text-xs font-mono text-slate-200 truncate">
                          {rec.origin_sender.slice(0, 8)}... → {rec.counterparty.slice(0, 8)}...
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-400">₹{rec.value_inr.toLocaleString()} INR</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                            rec.classification_type === "sweep"
                              ? "text-[#d8b84d] border-[#d8b84d]/30 bg-[#d8b84d]/10"
                              : "text-cyan-300 border-cyan-500/30 bg-cyan-950/40"
                          }`}>
                            {rec.classification}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Fingerprint size={14} className="text-[#d8b84d]" />
                      49 on-chain records indexed and cryptographically hashed for Section 65B compliance.
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("evidence")}
                      className="text-[#d8b84d] hover:underline font-semibold flex items-center gap-1"
                    >
                      Open Complete Ledger →
                    </button>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          )}

          {/* ── Tab: Evidence Ledger Page ── */}
          {activeTab === "evidence" && (
            <motion.div
              key="evidence"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <EvidenceLedgerPage onNavigate={handleNav} />
            </motion.div>
          )}

          {/* ── Tab: Watchlist or Legal Dossier ── */}
          {(activeTab === "watchlist" || activeTab === "dossier") && (
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <WorkspaceCollectionPage view={activeTab} graph={graph} />
            </motion.div>
          )}

          {/* ── Tab: Notifications ── */}
          {activeTab === "notifications" && (
            <motion.div
              key="notifications"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <NotificationsPage onNavigate={handleNav} />
            </motion.div>
          )}

          {/* ── Tab: Profile ── */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProfilePage onNavigate={handleNav} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Side Popup Drawer (Opens when user clicks on any node or transaction) ── */}
      <AnimatePresence>
        {selectedEntity && (
          <NodeDetailDrawer
            entity={selectedEntity}
            onClose={() => setSelectedEntity(null)}
            onAddToWatchlist={() => {}}
            onGenerateNotice={() => {}}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

