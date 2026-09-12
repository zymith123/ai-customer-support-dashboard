import { Bot, CheckCircle2, CircleDashed, Zap } from "lucide-react";
import { Avatar, Card, Pill } from "../components/ui";
import { agents, automationRules } from "../data/mockData";
import clsx from "clsx";

const statusMeta = {
  active: { label: "Active", color: "var(--status-good)" },
  idle: { label: "Idle", color: "var(--color-ink-muted)" },
  training: { label: "Training", color: "var(--status-warning)" },
};

export default function Agents() {
  const aiAgents = agents.filter((a) => a.type === "AI");
  const humanAgents = agents.filter((a) => a.type === "Human");

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
            <Bot size={22} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-primary">AI is handling 78.3% of volume autonomously</p>
            <p className="text-xs text-ink-muted">3 AI agents active across chat, email and social channels</p>
          </div>
        </div>
        <button className="rounded-xl bg-[var(--color-brand)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
          Deploy new AI agent
        </button>
      </Card>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-ink-primary">AI agents</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {aiAgents.map((a) => {
            const s = statusMeta[a.status];
            return (
              <Card key={a.id} className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={a.name} color={a.avatarColor} size={40} />
                    <div>
                      <p className="text-sm font-semibold text-ink-primary">{a.name}</p>
                      <span className="flex items-center gap-1 text-xs text-ink-muted">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                        {s.label}
                      </span>
                    </div>
                  </div>
                  <Pill>Autonomy {a.autonomyRate}%</Pill>
                </div>
                <div className="grid grid-cols-3 gap-2 rounded-xl bg-[var(--color-surface-sunken)] p-3 text-center">
                  <div>
                    <p className="text-sm font-semibold tabular-nums text-ink-primary">{a.resolved.toLocaleString()}</p>
                    <p className="text-[10px] text-ink-muted">Resolved</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold tabular-nums text-ink-primary">{a.avgHandleTime}</p>
                    <p className="text-[10px] text-ink-muted">Avg handle</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold tabular-nums text-ink-primary">{a.csat.toFixed(2)}</p>
                    <p className="text-[10px] text-ink-muted">CSAT</p>
                  </div>
                </div>
                <button className="rounded-lg border border-[var(--color-border)] py-2 text-xs font-medium text-ink-secondary hover:bg-[var(--color-surface-sunken)]">
                  Configure agent
                </button>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-ink-primary">Human agents</h2>
        <Card padded={false}>
          <div className="divide-y divide-[var(--color-border)]">
            {humanAgents.map((a) => {
              const s = statusMeta[a.status];
              return (
                <div key={a.id} className="flex items-center gap-3 px-5 py-3.5">
                  <Avatar name={a.name} color={a.avatarColor} size={36} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink-primary">{a.name}</p>
                    <span className="flex items-center gap-1 text-xs text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                      {s.label}
                    </span>
                  </div>
                  <div className="hidden gap-6 text-right sm:flex">
                    <div>
                      <p className="text-sm font-semibold tabular-nums text-ink-primary">{a.resolved}</p>
                      <p className="text-[10px] text-ink-muted">Resolved</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold tabular-nums text-ink-primary">{a.avgHandleTime}</p>
                      <p className="text-[10px] text-ink-muted">Avg handle</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold tabular-nums text-ink-primary">{a.csat.toFixed(2)}</p>
                      <p className="text-[10px] text-ink-muted">CSAT</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Zap size={16} className="text-[var(--color-brand)]" />
          <h2 className="text-sm font-semibold text-ink-primary">Automation rules</h2>
        </div>
        <Card padded={false}>
          <div className="divide-y divide-[var(--color-border)]">
            {automationRules.map((r) => (
              <div key={r.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  {r.enabled ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: "var(--status-good)" }} />
                  ) : (
                    <CircleDashed size={18} className="mt-0.5 shrink-0 text-ink-muted" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-ink-primary">{r.name}</p>
                    <p className="text-xs text-ink-muted">
                      When <span className="text-ink-secondary">{r.trigger}</span> → {r.action}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-8 sm:pl-0">
                  <span className="text-xs text-ink-muted">{r.hits}</span>
                  <span
                    className={clsx(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium",
                      r.enabled ? "text-[var(--status-good)]" : "text-ink-muted",
                    )}
                    style={{ background: r.enabled ? "rgba(12,163,12,0.12)" : "var(--color-surface-sunken)" }}
                  >
                    {r.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
