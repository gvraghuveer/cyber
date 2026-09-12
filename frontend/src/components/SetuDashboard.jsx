import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, LogIn, Menu, Shield, Sparkles, X, Activity, Layers, Cpu, Compass,
  Database, GitBranch, FileText, Lock, ShieldAlert, AlertTriangle, Coins, Network,
  Shuffle, Building2, BellRing, CheckCircle2, Clock3, Zap, Eye, Terminal, Fingerprint,
  TrendingDown, FileCheck, ShieldCheck, Search
} from "lucide-react";

const fraudTypes = [
  { title: "Investment Scams", icon: TrendingDown, desc: "High-yield bogus crypto investment platforms & Ponzi schemes", code: "TYPE_01", color: "from-rose-500/20 to-amber-500/20 text-rose-400 border-rose-500/30" },
  { title: "Task-Based Fraud", icon: Layers, desc: "Telegram/WhatsApp commission schemes & prepaid rating traps", code: "TYPE_02", color: "from-amber-500/20 to-yellow-500/20 text-[#d8b84d] border-[#d8b84d]/30" },
  { title: "Sextortion & Extortion", icon: ShieldAlert, desc: "Targeted digital blackmail demanding instant crypto transfers", code: "TYPE_03", color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30" },
  { title: "Ransomware Operations", icon: Lock, desc: "Enterprise infrastructure hijacking & double-extortion payouts", code: "TYPE_04", color: "from-red-500/20 to-rose-500/20 text-red-400 border-red-500/30" },
  { title: "Phishing & Drainers", icon: AlertTriangle, desc: "Malicious approval sweeps and permit2 smart contract drainers", code: "TYPE_05", color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30" },
];

const pipeline = [
  {
    step: "01",
    title: "Ingest the reported wallet",
    desc: "Address comes in from NCRP, SAHYOG, or direct investigator entry — along with case metadata and fraud typology.",
    tag: "INPUT: WALLET_ADDR + CASE_ID",
    icon: Database,
    color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-300"
  },
  {
    step: "02",
    title: "Trace the transaction graph",
    desc: "Automated multi-chain graph traversal follows fund flow through intermediary and burner wallets, flagging mixers, tumblers, and bridge hops along the way.",
    tag: "GRAPH_DEPTH: N-HOPS",
    icon: GitBranch,
    color: "from-amber-500/20 to-yellow-500/20 border-[#d8b84d]/40 text-[#d8b84d]"
  },
  {
    step: "03",
    title: "Cluster and attribute",
    desc: "Wallet clustering heuristics identify which cluster belongs to a known exchange or VASP, and score the confidence of that match.",
    tag: "OUTPUT: VASP_ID + CONFIDENCE",
    icon: Cpu,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300"
  },
  {
    step: "04",
    title: "Generate investigator report",
    desc: "A standardized report with fund-flow visualization, risk category, and recommended next action is ready for the investigating officer.",
    tag: "EXPORT: PDF / API",
    icon: FileCheck,
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300"
  },
];

const capabilities = [
  { title: "Cross-chain tracing", icon: Network, desc: "Automated tracking across Ethereum, Bitcoin, TRON, Polygon, Arbitrum & BSC." },
  { title: "Mixer & tumbler detection", icon: Shuffle, desc: "Heuristic de-anonymization of Tornado, Railgun, ChipMixer & peeling chains." },
  { title: "Exchange wallet clustering", icon: Building2, desc: "Attribution to verified Indian & offshore VASP deposit clusters with 94%+ confidence." },
  { title: "Risk categorization", icon: ShieldCheck, desc: "Machine-assisted node scoring and Section 65B audit readiness indicators." },
  { title: "Real-time alerting", icon: BellRing, desc: "Continuous 24/7 mempool and block surveillance loop for suspect wallet sweeps." },
  { title: "API-first architecture", icon: Terminal, desc: "Native integration with NCRP, CCTNS, and automated Section 91 CrPC notice generation." }
];

const stats = [
  { value: "6–9", label: "DAYS: AVG. MANUAL TRACE TIME", icon: Clock3 },
  { value: "<4", label: "MIN: CHAKRAVYUH AUTOMATED TRACE", icon: Zap },
  { value: "70%+", label: "CASES INVOLVE LAYERED WALLETS", icon: Layers },
  { value: "12", label: "CHAINS COVERED AT LAUNCH", icon: Network }
];

/* ── Hero page nav links (scroll targets) ── */
const heroLinks = [
  { id: "setu-about", label: "About", href: "#setu-about", icon: Shield },
  { id: "setu-how", label: "How it works", href: "#setu-how", icon: Layers },
  { id: "setu-features", label: "Capabilities", href: "#setu-features", icon: Cpu },
  { id: "setu-dashboard", label: "Platform", href: "#setu-dashboard", icon: Compass },
];

/* Smooth scroll helper accounting for floating dock navbar */
function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) {
    const navOffset = 88;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

export function SetuDashboard() {
  const [engineOn, setEngineOn] = useState(true);
  const [autoFreeze, setAutoFreeze] = useState(true);
  const [chain, setChain] = useState("All chains");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("setu-about");
  const stagesRef = useRef([]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const handleNavClick = (id, href) => {
    setActiveSection(id);
    isProgrammaticScroll.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTo(href);

    // Keep active section locked to clicked target until smooth scroll settles
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);
  };

  // High-performance scroll spy with bottom-of-page detection & programmatic lock
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (isProgrammaticScroll.current) return;

        // Bottom of page detection (activates Platform / last section when at bottom)
        const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 90;
        if (isNearBottom) {
          setActiveSection(heroLinks[heroLinks.length - 1].id);
          return;
        }

        const scrollPosition = window.scrollY + 180;
        const sections = heroLinks.map(l => document.getElementById(l.id)).filter(Boolean);

        let current = heroLinks[0].id;
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          if (section.offsetTop <= scrollPosition) {
            current = section.id;
          }
        }
        setActiveSection(prev => (prev === current ? prev : current));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    const stages = stagesRef.current.filter(Boolean);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      stages.forEach((stage) => stage.classList.add("setu-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      entry.target.classList.toggle("setu-visible", entry.isIntersecting);
      entry.target.classList.toggle("setu-receding", !entry.isIntersecting && entry.boundingClientRect.top < 0);
    }), { threshold: [0, 0.18], rootMargin: "-8% 0px -8% 0px" });
    stages.forEach((stage) => observer.observe(stage));
    return () => observer.disconnect();
  }, []);

  function stage(node) {
    if (node && !stagesRef.current.includes(node)) stagesRef.current.push(node);
  }

  return (
    <div className="setu-shell min-h-[100dvh] text-slate-100 antialiased selection:bg-[#d8b84d]/30 selection:text-white">
      <div className="setu-scanline" /><div className="setu-vignette" />

      {/* ── Apple iOS Liquid Glass Navbar on Landing Page ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" 
            onClick={() => setMobileOpen(false)} 
            aria-hidden="true" 
          />
        )}
      </AnimatePresence>

      <header className="cv-ios-navbar" role="banner">
        {/* Left: Brand Lockup */}
        <div className="flex items-center justify-start min-w-0">
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            href="/" 
            className="cv-brand-button" 
            style={{ textDecoration: "none" }}
            aria-label="CHAKRAVYUH Home"
          >
            <div className="cv-squircle-mark">
              <Shield size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="cv-brand-title">CHAKRAVYUH</span>
                <span className="rounded bg-[#d8b84d]/15 px-1.5 py-0.2 text-[8px] font-bold text-[#d8b84d] border border-[#d8b84d]/30 font-mono">
                  I4C
                </span>
              </div>
              <span className="cv-brand-subtitle">NATIONAL ATTRIBUTION</span>
            </div>
          </motion.a>
        </div>

        {/* Center: Dynamic Active Section Highlight Indicator */}
        <div className="flex items-center justify-center">
          <nav className="cv-pill-nav relative" aria-label="Page sections">
            {heroLinks.map(({ id, label, href, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <motion.button
                  key={href}
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  className={`cv-pill-link relative z-10 ${isActive ? "cv-pill-link--active" : ""}`}
                  onClick={() => handleNavClick(id, href)}
                >
                  <div className={`cv-squircle-icon ${isActive ? "cv-squircle-icon--active" : ""}`}>
                    <Icon size={13} strokeWidth={2} />
                  </div>
                  <span>{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="hero-dock-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[#d8b84d] shadow-[0_4px_18px_rgba(216,184,77,0.45)]"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Right: Sign in + Open Console */}
        <div className="flex items-center justify-end">
          <div className="cv-nav-actions">
            <motion.a 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="/login" 
              className="cv-signin-btn" 
              aria-label="Sign in"
            >
              <LogIn size={13} strokeWidth={2} />
              <span>Sign in</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="/dashboard" 
              className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-black transition duration-200 hover:brightness-110 shadow-lg cursor-pointer"
              style={{ 
                background: "linear-gradient(180deg, #e5c96a 0%, #d8b84d 100%)",
                boxShadow: "0 4px 18px rgba(216, 184, 77, 0.4)"
              }}
            >
              <span>Open Console</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </motion.a>

            {/* Mobile toggle */}
            <button
              type="button"
              className="cv-mobile-btn md:hidden"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="cv-mobile-dropdown md:hidden"
            >
              {heroLinks.map(({ id, label, href, icon: Icon }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={href}
                    type="button"
                    className={`flex items-center gap-3 w-full p-3 rounded-xl text-xs font-semibold transition ${
                      isActive 
                        ? "bg-[#d8b84d]/15 text-[#d8b84d] border border-[#d8b84d]/30 font-bold" 
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                    onClick={() => {
                      handleNavClick(id, href);
                      setMobileOpen(false);
                    }}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </button>
                );
              })}
              <div className="border-t border-white/10 pt-2 mt-2 flex flex-col gap-2">
                <a
                  href="/login"
                  className="flex items-center gap-2 w-full p-3 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/5 transition"
                >
                  <LogIn size={15} /> Sign in
                </a>
                <a
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-xl text-xs font-bold text-black bg-[#d8b84d] shadow-lg"
                >
                  Open Console →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero Section ── */}
      <section id="setu-about" className="setu-section setu-hero setu-flow-stage" ref={stage}>
        <div>
          <button 
            type="button" 
            className={`setu-toggle setu-glass ${engineOn ? "setu-toggle-on" : ""}`} 
            aria-pressed={engineOn} 
            onClick={() => setEngineOn((value) => !value)}
          >
            <span className="setu-switch"><span /></span>
            <span>{engineOn ? "LIVE TRACE ENGINE ACTIVE" : "ENGINE PAUSED"}</span>
          </button>
          <h1>From a reported wallet to the <span>exchange holding the funds</span> — traced automatically.</h1>
          <p className="setu-sub">Report a wallet. Chakravyuh follows the funds across chains and mixers, and tells you which exchange is holding them — in minutes, not weeks.</p>
          <div className="setu-hero-cta">
            <a href="/dashboard" className="setu-btn setu-btn-primary shadow-xl">
              Open investigation dashboard <ArrowRight size={15} className="ml-1" />
            </a>
            <a href="#setu-how" className="setu-btn setu-btn-ghost" onClick={e => { e.preventDefault(); scrollTo("#setu-how"); }}>
              How the tracing works
            </a>
          </div>
        </div>

        <div className="setu-radar-outer">
          <div className="setu-segmented">
            {["ALL", "ETH", "BTC", "TRON"].map((item) => {
              const chainKey = item === "ALL" ? "All chains" : item === "ETH" ? "Ethereum" : item === "BTC" ? "Bitcoin" : "TRON";
              const isActive = chain === chainKey;
              return (
                <button 
                  type="button" 
                  className={`relative z-10 ${isActive ? "active" : ""}`} 
                  key={item} 
                  onClick={() => setChain(chainKey)}
                >
                  <span className="relative z-20">{item}</span>
                  {isActive && (
                    <motion.div
                      layoutId="radar-chain-pill-active"
                      className="absolute inset-0 rounded-full bg-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.55),0_2px_10px_rgba(245,158,11,0.4)] z-10"
                      transition={{
                        type: "spring",
                        stiffness: 480,
                        damping: 32,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="setu-radar">
            <div className="setu-radar-frame" />
            <div className="setu-radar-ring r1" />
            <div className="setu-radar-ring r2" />
            <div className="setu-radar-ring r3" />
            <div className="setu-radar-ring r4" />
            <div className="setu-radar-crosshair" />
            <div className="setu-radar-sweep" />
            <svg viewBox="0 0 100 100">
              <path d="M20 78L38 60L55 52L70 34" className="resolved" />
              <path d="M20 30L38 44L55 52" />
            </svg>
            <span className="setu-radar-node wallet" style={{ top: "78%", left: "20%" }} />
            <span className="setu-radar-node wallet" style={{ top: "60%", left: "38%" }} />
            <span className="setu-radar-node" style={{ top: "52%", left: "55%" }} />
            <span className="setu-radar-node target" style={{ top: "34%", left: "70%" }} />
            <label style={{ top: "82%", left: "20%" }}>SUSPECT_WALLET</label>
            <label style={{ top: "46%", left: "53%" }}>MIXER_HOP</label>
            <label className="hi" style={{ top: "26%", left: "63%" }}>VASP IDENTIFIED</label>
            <div className="setu-radar-readout">
              <span>SWEEP: 360°</span>
              <span>NODES: {chain === "All chains" ? 5 : 3}</span>
              <span>STATUS: {engineOn ? "RESOLVED" : "PAUSED"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="setu-section setu-caption setu-flow-stage" ref={stage}>
        In plain terms: a victim reports one wallet. <span>Chakravyuh follows the money through every hop</span> until it lands at a real exchange — the one place with a name attached to it.
      </section>

      {/* ── Stats Strip with iOS Squircle Badges ── */}
      <section className="setu-section setu-flow-stage" ref={stage}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl hover:bg-white/[0.06] hover:border-[#d8b84d]/30 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d8b84d]/10 border border-[#d8b84d]/30 text-[#d8b84d]">
                  <Icon size={16} />
                </div>
                <Sparkles size={12} className="text-slate-600" />
              </div>
              <div className="mt-4">
                <strong className="block text-3xl font-bold font-mono text-white tracking-tight">{value}</strong>
                <span className="block mt-1 text-[11px] font-mono text-slate-400 uppercase tracking-wider">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 01 THE PROBLEM: Fraud Typologies with iOS Icons ── */}
      <SetuSection refCallback={stage} kicker="// 01 THE PROBLEM" title="Every fraud typology ends the same way — funds move through wallets faster than investigators can trace them." text="Different scams, same headache: by the time police get the wallet address, the money has already moved several times.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {fraudTypes.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.07] hover:border-[#d8b84d]/40 transition-all group flex flex-col justify-between min-h-[160px]">
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} border shadow-inner`}>
                    <Icon size={18} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 font-semibold">{item.code}</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-[#d8b84d] transition-colors">{item.title}</h3>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SetuSection>

      {/* ── 02 THE PIPELINE: Step-by-Step with iOS Squircle Icons ── */}
      <SetuSection refCallback={stage} id="setu-how" kicker="// 02 THE PIPELINE" title="One reported address in. One actionable lead out." text="Chakravyuh runs the full trace autonomously — no manual graph-walking, no chain-hopping by hand.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pipeline.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-[#d8b84d]/30 transition-all flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} border shadow-lg`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[#d8b84d]">STEP {item.step}</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-400">{item.tag}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SetuSection>

      {/* ── 03 CAPABILITIES: Rich iOS Features Grid with Icons ── */}
      <SetuSection refCallback={stage} id="setu-features" kicker="// 03 CAPABILITIES" title="Built for how laundering actually happens.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.07] hover:border-[#d8b84d]/40 transition-all group">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#d8b84d]/20 to-emerald-950 border border-[#d8b84d]/40 text-[#d8b84d] group-hover:scale-110 transition-transform">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-100 group-hover:text-[#d8b84d] transition-colors">{feature.title}</h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
              </article>
            );
          })}
        </div>
      </SetuSection>

      {/* ── 04 INVESTIGATOR VIEW ── */}
      <SetuSection refCallback={stage} id="setu-dashboard" kicker="// 04 INVESTIGATOR VIEW" title="What the officer sees." text="A single screen: trace path on the left, resolved attribution on the right.">
        <div className="setu-dash-frame">
          <div className="setu-dash-title flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Terminal size={14} className="text-[#d8b84d]" /> CASE_2026_0091 — CHAKRAVYUH TRACE CONSOLE
            </span>
            <span className="flex items-center gap-1.5 text-[#d8b84d]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE AUDIT STREAM
            </span>
          </div>
          <div className="setu-dash-body">
            <div>
              <h4 className="flex items-center gap-2">
                <GitBranch size={13} className="text-slate-400" /> Fund flow path
              </h4>
              {[
                "bc1q...suspect wallet (reported)", "0x7a2...intermediary #1", 
                "tumbler.protocol / mix hop", "0x9f1...bridge contract (ETH→TRON)", 
                "TXk4...exchange deposit wallet"
              ].map((address, index) => (
                <div className="setu-flow-row" key={address}>
                  <span>{address}</span>
                  <i className={`risk-${index > 3 ? "low" : index > 1 ? "med" : "high"}`}>
                    {index > 3 ? "RESOLVED" : index > 1 ? "FLAGGED" : "HIGH"}
                  </i>
                </div>
              ))}
            </div>
            <div>
              <h4 className="flex items-center gap-2">
                <Building2 size={13} className="text-slate-400" /> Attribution result
              </h4>
              <div className="setu-vasp">
                <small className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" /> IDENTIFIED VASP
                </small>
                <strong>Exchange Cluster #E-1147 (Binance)</strong>
                <span>CONFIDENCE: 94% · 4 HOPS · 2 CHAINS</span>
              </div>
              <p className="setu-action">
                Issue freeze request to identified exchange compliance desk. Fund flow indicates active balance as of last trace.
              </p>
              <button 
                type="button" 
                className={`setu-toggle ${autoFreeze ? "setu-toggle-on" : ""}`} 
                onClick={() => setAutoFreeze((value) => !value)}
              >
                <span className="setu-switch"><span /></span>
                <span>AUTO-FREEZE ALERT: {autoFreeze ? "ON" : "OFF"}</span>
              </button>
            </div>
          </div>
        </div>
      </SetuSection>

      <section className="setu-section setu-footer-cta setu-flow-stage" ref={stage}>
        <small className="flex items-center gap-1.5 text-emerald-400">
          <Sparkles size={13} /> // READY FOR DEPLOYMENT
        </small>
        <h2>Built for the investigator who has an address and needs an answer.</h2>
        <p>Chakravyuh — Real-Time Identification of Fraud-Linked Cryptocurrency Exchanges for MHA / I4C.</p>
        <a href="/dashboard" className="setu-btn setu-btn-primary shadow-xl mt-6 inline-flex items-center gap-2">
          Open investigation dashboard <ArrowRight size={15} />
        </a>
        <footer>
          <span>PS ID: 26183</span>
          <span>THEME: BLOCKCHAIN &amp; CYBERSECURITY</span>
          <span>ORG: MINISTRY OF HOME AFFAIRS / I4C</span>
        </footer>
      </section>
    </div>
  );
}

function SetuSection({ id, kicker, title, text, children, refCallback }) {
  return (
    <section id={id} className="setu-section setu-flow-stage" ref={refCallback}>
      <div className="setu-section-head">
        <small>{kicker}</small>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {children}
    </section>
  );
}
