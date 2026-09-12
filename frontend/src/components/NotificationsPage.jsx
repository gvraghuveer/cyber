import { ArrowRight, Bell, CheckCircle2, Clock3 } from "lucide-react";

const notifications = [
  ["New attribution match", "Wallet TX7sK...victim has a 95% VASP confidence signal.", "2 min ago"],
  ["Evidence window reminder", "Section 91 preservation window closes in 3 hours.", "18 min ago"],
  ["Watchlist pulse", "One monitored wallet moved through a new intermediary.", "1 hour ago"],
];

export function NotificationsPage({ onNavigate }) {
  return (
    <div className="notifications-page route-page-animated">
      <div className="sidebar-page-hero"><div><div className="eyebrow"><Bell size={14} /> Operations centre</div><h1>Notifications</h1><p>Stay ahead of attribution signals, evidence windows, and watchlist movement.</p></div><button type="button" className="primary-btn" onClick={() => onNavigate("workspace")}>Open live attribution <ArrowRight size={15} /></button></div>
      <div className="notification-list glass-panel">
        {notifications.map(([title, description, time]) => <article className="notification-row" key={title}><span className="notification-icon"><CheckCircle2 size={16} /></span><div><strong>{title}</strong><p>{description}</p><small><Clock3 size={11} /> {time}</small></div><ArrowRight size={14} className="notification-arrow" /></article>)}
      </div>
    </div>
  );
}
