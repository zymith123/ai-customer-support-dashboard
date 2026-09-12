import type { ReactNode } from "react";
import clsx from "clsx";
import type { Channel, ConvoStatus, Sentiment } from "../data/mockData";
import { Mail, MessageCircle, Phone, Share2 } from "lucide-react";

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-[var(--color-border)] bg-surface shadow-[var(--shadow-card)]",
        padded && "p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-sm font-semibold text-ink-primary">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatTile({
  label,
  value,
  delta,
  deltaDir,
  sub,
}: {
  label: string;
  value: string;
  delta: string;
  deltaDir: "up" | "down";
  sub: string;
}) {
  const positive = deltaDir === "up";
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight text-ink-primary tabular-nums">{value}</span>
        <span
          className={clsx(
            "flex items-center gap-0.5 text-xs font-medium",
            positive ? "text-[var(--color-status-good-text,var(--status-good))]" : "text-[var(--status-critical)]",
          )}
          style={{ color: positive ? "var(--color-brand)" : "var(--status-critical)" }}
        >
          {positive ? "▲" : "▼"} {delta}
        </span>
      </div>
      <span className="text-xs text-ink-muted">{sub}</span>
    </Card>
  );
}

const statusStyles: Record<ConvoStatus, { bg: string; fg: string; label: string }> = {
  open: { bg: "rgba(42,120,214,0.12)", fg: "var(--color-brand)", label: "Open" },
  pending: { bg: "rgba(250,178,25,0.16)", fg: "#a86a00", label: "Pending" },
  resolved: { bg: "rgba(12,163,12,0.14)", fg: "var(--status-good-text, #0ca30c)", label: "Resolved" },
  escalated: { bg: "rgba(208,59,59,0.14)", fg: "var(--status-critical)", label: "Escalated" },
};

export function StatusBadge({ status }: { status: ConvoStatus }) {
  const s = statusStyles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ background: s.bg, color: s.fg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.fg }} />
      {s.label}
    </span>
  );
}

const sentimentStyles: Record<Sentiment, { fg: string; label: string }> = {
  positive: { fg: "var(--status-good-text, #0ca30c)", label: "Positive" },
  neutral: { fg: "var(--color-ink-muted)", label: "Neutral" },
  negative: { fg: "var(--status-critical)", label: "Negative" },
};

export function SentimentTag({ sentiment }: { sentiment: Sentiment }) {
  const s = sentimentStyles[sentiment];
  return (
    <span className="text-xs font-medium" style={{ color: s.fg }}>
      {s.label}
    </span>
  );
}

const channelIcons: Record<Channel, ReactNode> = {
  chat: <MessageCircle size={14} />,
  email: <Mail size={14} />,
  voice: <Phone size={14} />,
  social: <Share2 size={14} />,
};

export function ChannelIcon({ channel }: { channel: Channel }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md bg-[var(--color-surface-sunken)] p-1.5 text-ink-secondary">
      {channelIcons[channel]}
    </span>
  );
}

export function Avatar({ name, color, size = 36 }: { name: string; color: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ background: color, width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--color-surface-sunken)] px-2 py-0.5 text-[11px] font-medium text-ink-secondary">
      {children}
    </span>
  );
}
