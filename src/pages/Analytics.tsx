import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader } from "../components/ui";
import { TooltipCard } from "../components/charts/ChartTheme";
import { channelMix, csatTrend, responseTimeDistribution, ticketCategories } from "../data/mockData";

const channelColors: Record<string, string> = {
  chat: "var(--color-series-1)",
  email: "var(--color-series-2)",
  voice: "var(--color-series-3)",
  social: "var(--color-series-4)",
};

export default function Analytics() {
  const totalChannel = channelMix.reduce((a, b) => a + b.value, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Ticket volume by category" subtitle="Last 30 days" />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ticketCategories} layout="vertical" margin={{ left: 8, right: 24 }}>
              <CartesianGrid horizontal={false} stroke="var(--color-grid)" />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="category"
                tickLine={false}
                axisLine={false}
                width={110}
                tick={{ fill: "var(--color-ink-secondary)", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "var(--color-surface-sunken)" }}
                content={({ active, payload, label }) => (
                  <TooltipCard
                    active={active}
                    label={String(label)}
                    rows={payload?.map((p) => ({ name: "Tickets", value: (p.value as number).toLocaleString(), color: "var(--color-brand)" }))}
                  />
                )}
              />
              <Bar dataKey="tickets" fill="var(--color-brand)" radius={[0, 4, 4, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="First response time distribution" subtitle="Share of all conversations" />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={responseTimeDistribution} margin={{ left: 0, right: 8, top: 8 }}>
              <CartesianGrid vertical={false} stroke="var(--color-grid)" />
              <XAxis
                dataKey="bucket"
                tickLine={false}
                axisLine={{ stroke: "var(--color-axis)" }}
                tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={44}
                tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                cursor={{ fill: "var(--color-surface-sunken)" }}
                content={({ active, payload, label }) => (
                  <TooltipCard
                    active={active}
                    label={String(label)}
                    rows={payload?.map((p) => ({ name: "Share", value: `${p.value}%`, color: "var(--color-brand)" }))}
                  />
                )}
              />
              <Bar dataKey="pct" fill="var(--color-brand)" radius={[4, 4, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="CSAT trend" subtitle="Weekly average, last 6 weeks" />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={csatTrend} margin={{ left: 0, right: 16, top: 8 }}>
              <CartesianGrid vertical={false} stroke="var(--color-grid)" />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={{ stroke: "var(--color-axis)" }}
                tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
              />
              <YAxis
                domain={[4.4, 5]}
                tickLine={false}
                axisLine={false}
                width={40}
                tick={{ fill: "var(--color-ink-muted)", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-axis)", strokeWidth: 1 }}
                content={({ active, payload, label }) => (
                  <TooltipCard
                    active={active}
                    label={String(label)}
                    rows={payload?.map((p) => ({ name: "CSAT", value: p.value as number, color: "var(--color-brand)" }))}
                  />
                )}
              />
              <Line
                type="monotone"
                dataKey="csat"
                stroke="var(--color-brand)"
                strokeWidth={2}
                dot={{ r: 4, fill: "var(--color-brand)", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Channel mix" subtitle="Share of total volume" />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={channelMix}
                dataKey="value"
                nameKey="name"
                innerRadius={54}
                outerRadius={78}
                paddingAngle={2}
                cornerRadius={4}
                stroke="var(--color-surface)"
                strokeWidth={2}
              >
                {channelMix.map((c) => (
                  <Cell key={c.key} fill={channelColors[c.key]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => (
                  <TooltipCard
                    active={active}
                    rows={payload?.map((p) => ({
                      name: String(p.name),
                      value: `${(((p.value as number) / totalChannel) * 100).toFixed(1)}%`,
                      color: p.payload.fill,
                    }))}
                  />
                )}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2">
            {channelMix.map((c) => (
              <div key={c.key} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-ink-secondary">
                  <span className="h-2 w-2 rounded-full" style={{ background: channelColors[c.key] }} />
                  {c.name}
                </span>
                <span className="font-medium tabular-nums text-ink-primary">
                  {((c.value / totalChannel) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
