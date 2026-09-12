import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader, StatTile, Avatar, StatusBadge, SentimentTag, ChannelIcon } from "../components/ui";
import { Legend, TooltipCard } from "../components/charts/ChartTheme";
import { agents, conversations, kpis, resolutionSplit, volumeTrend } from "../data/mockData";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const channelSeries = [
  { key: "chat", label: "Chat", color: "var(--color-series-1)" },
  { key: "email", label: "Email", color: "var(--color-series-2)" },
  { key: "voice", label: "Voice", color: "var(--color-series-3)" },
  { key: "social", label: "Social", color: "var(--color-series-4)" },
];

const resolutionColors: Record<string, string> = {
  ai: "var(--color-series-1)",
  hybrid: "var(--color-series-2)",
  human: "var(--color-series-3)",
  escalated: "var(--color-series-8)",
};

export default function Overview() {
  const totalResolution = resolutionSplit.reduce((a, b) => a + b.value, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <StatTile key={k.label} {...k} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Conversation volume by channel"
            subtitle="Last 7 days"
            action={<Legend items={channelSeries.map((c) => ({ label: c.label, color: c.color }))} />}
          />
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={volumeTrend} margin={{ left: 0, right: 8, top: 8 }}>
              <defs>
                {channelSeries.map((c) => (
                  <linearGradient id={`fill-${c.key}`} key={c.key} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c.color} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={c.color} stopOpacity={0.03} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} stroke="var(--color-grid)" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={{ stroke: "var(--color-axis)" }}
                tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
                width={42}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-axis)", strokeWidth: 1 }}
                content={({ active, label, payload }) => (
                  <TooltipCard
                    active={active}
                    label={String(label)}
                    rows={payload?.map((p) => ({
                      name: channelSeries.find((c) => c.key === p.dataKey)?.label ?? String(p.dataKey),
                      value: p.value as number,
                      color: p.color,
                    }))}
                  />
                )}
              />
              {channelSeries.map((c) => (
                <Area
                  key={c.key}
                  type="monotone"
                  dataKey={c.key}
                  stackId="1"
                  stroke={c.color}
                  strokeWidth={2}
                  fill={`url(#fill-${c.key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Resolution breakdown" subtitle="Last 30 days" />
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={resolutionSplit}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={56}
                  outerRadius={80}
                  paddingAngle={2}
                  cornerRadius={4}
                  stroke="var(--color-surface)"
                  strokeWidth={2}
                >
                  {resolutionSplit.map((r) => (
                    <Cell key={r.key} fill={resolutionColors[r.key]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => (
                    <TooltipCard
                      active={active}
                      rows={payload?.map((p) => ({
                        name: String(p.name),
                        value: `${(((p.value as number) / totalResolution) * 100).toFixed(1)}%`,
                        color: p.payload.fill,
                      }))}
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {resolutionSplit.map((r) => (
              <div key={r.key} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-ink-secondary">
                  <span className="h-2 w-2 rounded-full" style={{ background: resolutionColors[r.key] }} />
                  {r.name}
                </span>
                <span className="font-medium tabular-nums text-ink-primary">
                  {((r.value / totalResolution) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2" padded={false}>
          <div className="flex items-center justify-between p-5 pb-0">
            <CardHeader title="Recent conversations" subtitle="Live queue across all channels" />
            <Link
              to="/conversations"
              className="mb-4 flex items-center gap-1 text-xs font-medium text-[var(--color-brand)] hover:underline"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-[var(--color-border)]">
            {conversations.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar name={c.customer} color={c.avatarColor} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-ink-primary">{c.customer}</p>
                    <ChannelIcon channel={c.channel} />
                  </div>
                  <p className="truncate text-xs text-ink-muted">{c.subject}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <SentimentTag sentiment={c.sentiment} />
                  <p className="text-[11px] text-ink-muted">{c.updated}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Top performing agents" subtitle="By resolved conversations" />
          <div className="flex flex-col gap-4">
            {agents
              .slice()
              .sort((a, b) => b.resolved - a.resolved)
              .slice(0, 4)
              .map((a) => (
                <div key={a.id} className="flex items-center gap-3">
                  <Avatar name={a.name} color={a.avatarColor} size={32} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-primary">{a.name}</p>
                    <p className="text-[11px] text-ink-muted">
                      {a.resolved.toLocaleString()} resolved · CSAT {a.csat.toFixed(2)}
                    </p>
                  </div>
                  {a.type === "AI" && (
                    <span className="rounded-full bg-[var(--color-brand-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-brand)]">
                      AI
                    </span>
                  )}
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
