import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Avatar } from "./ui";

export function Topbar({ title, onMenuClick }: { title: string; onMenuClick: () => void }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] bg-surface px-4 py-4 md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-secondary hover:bg-[var(--color-surface-sunken)] md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-ink-primary">{title}</h1>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
        <div className="relative hidden max-w-xs flex-1 sm:block">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            placeholder="Search conversations, customers…"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-sunken)] py-2 pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-[var(--color-brand)] focus:outline-none"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-ink-secondary hover:bg-[var(--color-surface-sunken)]"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="relative rounded-lg p-2 text-ink-secondary hover:bg-[var(--color-surface-sunken)]" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full" style={{ background: "var(--status-critical)" }} />
        </button>

        <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-3">
          <Avatar name="Jamie Reyes" color="var(--color-series-7)" size={32} />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-ink-primary">Jamie Reyes</p>
            <p className="text-[11px] text-ink-muted">Support Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
}
