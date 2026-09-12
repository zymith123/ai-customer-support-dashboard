import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  Bot,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/conversations", label: "Conversations", icon: MessageSquare },
  { to: "/analytics", label: "Analytics", icon: LineChart },
  { to: "/agents", label: "AI Agents", icon: Bot },
  { to: "/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-brand)] text-white">
          <Sparkles size={18} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink-primary">Aria Support</p>
          <p className="text-[11px] text-ink-muted">AI Dashboard</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  : "text-ink-secondary hover:bg-[var(--color-surface-sunken)] hover:text-ink-primary",
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="rounded-xl bg-[var(--color-surface-sunken)] p-4">
        <p className="text-xs font-semibold text-ink-primary">AI autonomy this week</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-brand)]">88%</p>
        <p className="mt-1 text-[11px] text-ink-muted">of tickets resolved without a human</p>
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--color-border)] bg-surface px-4 py-6 md:flex">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={clsx(
          "absolute left-0 top-0 flex h-full w-72 flex-col bg-surface px-4 py-6 shadow-xl transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-ink-secondary hover:bg-[var(--color-surface-sunken)]"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <SidebarContent onNavigate={onClose} />
      </aside>
    </div>
  );
}
