import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Bell, BookOpen, ChevronDown, Clock3, Command, 
  FileText, LogOut, Menu, Moon, Search, Shield, Sparkles, 
  Sun, User, Wifi, X, Zap 
} from "lucide-react";
import { CommandPaletteModal } from "./CommandPaletteModal.jsx";

const links = [
  { id: "workspace", label: "Live Attribution", icon: Activity },
  { id: "watchlist", label: "Watchlist", icon: Shield },
  { id: "dossier", label: "Legal Dossier", icon: FileText },
  { id: "evidence", label: "Evidence Ledger", icon: BookOpen },
];

const notifications = [
  { title: "New attribution match", body: "95% VASP confidence signal detected.", time: "2 min ago" },
  { title: "Evidence window reminder", body: "Section 91 window closes in 3 hours.", time: "18 min ago" },
  { title: "Node sync complete", body: "All 12 chains re-synced successfully.", time: "1 hr ago" },
];

export function WorkspaceNav({ activeRoute, onNavigate }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* Backdrop for mobile menu */}
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

      {/* ── Apple / macOS Dynamic Floating Dock Navbar ── */}
      <header className="cv-dock-navbar">
        {/* Left: Brand Lockup */}
        <div className="flex items-center justify-start min-w-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            className="cv-brand-button"
            onClick={() => onNavigate("landing")}
            aria-label="Go to landing page"
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
          </motion.button>
        </div>

        {/* Center: Floating Dock Pill Menu */}
        <div className="flex items-center justify-center">
          <nav className="cv-dock-pill relative" aria-label="Primary navigation">
            {links.map(({ id, label, icon: Icon }) => {
              const isActive = activeRoute === id;
              return (
                <motion.button
                  type="button"
                  key={id}
                  whileTap={{ scale: 0.94 }}
                  className={`cv-dock-link relative z-10 ${isActive ? "cv-dock-link--active" : "text-slate-400 hover:text-slate-200"}`}
                  onClick={() => { onNavigate(id); setMobileOpen(false); }}
                  title={label}
                >
                  <div className={`cv-dock-icon-tile ${isActive ? "cv-dock-icon-tile--active" : ""}`}>
                    <Icon size={14} strokeWidth={2.2} />
                  </div>
                  <span className="cv-dock-label">{label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="cv-dock-active-pill"
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

        {/* Right: Dock Utilities & Actions */}
        <div className="flex items-center justify-end">
          <div className="cv-dock-actions">
            {/* Quick Search Launcher (⌘K) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="cv-action-button cv-search-dock-btn"
              aria-label="Quick Command Palette"
              onClick={() => setIsSearchOpen(true)}
              title="Quick Intelligence Search (⌘K)"
            >
              <Search size={15} />
              <span className="cv-shortcut-badge hidden xl:inline-block">⌘K</span>
            </motion.button>

          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`cv-action-button ${notifOpen ? "cv-action-button--open" : ""}`}
              aria-label="Notifications"
              aria-expanded={notifOpen}
              onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
            >
              <Bell size={16} strokeWidth={2} />
              <motion.span 
                initial={{ scale: 0.8 }} 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }} 
                className="cv-badge-count" 
                aria-label="3 new notifications"
              >
                3
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="cv-ios-popover cv-notif-popover"
                  role="dialog"
                  aria-label="Notifications"
                >
                  <div className="cv-popover-header">
                    <span className="flex items-center gap-1.5">
                      <Zap size={13} className="text-[#d8b84d]" /> Operations Signals
                    </span>
                    <span className="cv-popover-badge">03 UNREAD</span>
                  </div>
                  <div className="divide-y divide-white/5 max-h-[300px] overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.title} className="p-3.5 hover:bg-white/[0.04] transition flex items-start gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                          <Bell size={12} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <strong className="block text-xs font-semibold text-slate-200">{n.title}</strong>
                          <p className="mt-0.5 text-[11px] text-slate-400">{n.body}</p>
                          <small className="mt-1 flex items-center gap-1 text-[9px] text-slate-500 font-mono">
                            <Clock3 size={10} /> {n.time}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="w-full border-t border-white/10 p-3 text-center text-xs font-semibold text-[#d8b84d] hover:bg-[#d8b84d]/10 transition"
                    onClick={() => { setNotifOpen(false); onNavigate("notifications"); }}
                  >
                    View all intelligence alerts →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Chip */}
          <div ref={profileRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              className={`cv-profile-button ${profileOpen ? "cv-profile-button--open" : ""}`}
              aria-label="Profile menu"
              aria-expanded={profileOpen}
              onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
            >
              <div className="cv-avatar-tile">AS</div>
              <span className="cv-user-label hidden sm:inline-block">Insp. A. Sharma</span>
              <ChevronDown size={12} strokeWidth={2.5} className="text-slate-400" />
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="cv-ios-popover cv-user-popover"
                  role="dialog"
                  aria-label="Profile menu"
                >
                  <div className="p-4 border-b border-white/10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d8b84d]/30 to-emerald-900 border border-[#d8b84d]/40 text-[#d8b84d] font-bold text-xs">
                      AS
                    </div>
                    <div>
                      <strong className="block text-xs font-bold text-white">Inspector A. Sharma</strong>
                      <p className="text-[10px] text-slate-400">Cyber Crime PS · I4C Operations</p>
                    </div>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    <button 
                      type="button" 
                      className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-300 hover:bg-white/10 hover:text-white transition"
                      onClick={() => { onNavigate("profile"); setProfileOpen(false); }}
                    >
                      Officer Clearance & Profile
                    </button>
                    <button 
                      type="button" 
                      className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-300 hover:bg-white/10 hover:text-white transition"
                      onClick={() => { onNavigate("notifications"); setProfileOpen(false); }}
                    >
                      Live Operations Alerts
                    </button>
                  </div>
                  <div className="p-2 border-t border-white/10">
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-300 hover:bg-rose-950/40 transition"
                      onClick={() => { onNavigate("landing"); setProfileOpen(false); }}
                    >
                      <LogOut size={13} /> Sign Out Session
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="cv-mobile-btn lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="cv-mobile-dropdown lg:hidden"
            >
              {links.map(({ id, label, icon: Icon }) => (
                <button
                  type="button"
                  key={id}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl text-xs font-semibold transition ${
                    activeRoute === id 
                      ? "bg-[#d8b84d]/15 text-[#d8b84d] border border-[#d8b84d]/30" 
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                  onClick={() => { onNavigate(id); setMobileOpen(false); }}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
              <div className="border-t border-white/10 pt-2 mt-2">
                <button
                  type="button"
                  className="flex items-center gap-2 w-full p-3 rounded-xl text-xs font-medium text-rose-300 hover:bg-rose-950/40 transition"
                  onClick={() => { onNavigate("landing"); setMobileOpen(false); }}
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Command Palette Quick Search Modal (⌘K) ── */}
      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}

