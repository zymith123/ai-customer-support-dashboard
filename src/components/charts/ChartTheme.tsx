export const CHART_FONT = {
  fontSize: 12,
  fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
};

export function chartVar(name: string) {
  if (typeof window === "undefined") return "#2a78d6";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export const seriesColor = (n: number) => `var(--color-series-${n})`;

export function TooltipCard({
  active,
  label,
  rows,
}: {
  active?: boolean;
  label?: string;
  rows?: { name: string; value: string | number; color?: string }[];
}) {
  if (!active || !rows?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-surface px-3 py-2 shadow-[var(--shadow-card)]">
      {label && <p className="mb-1 text-xs font-medium text-ink-secondary">{label}</p>}
      <div className="flex flex-col gap-1">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2 text-xs">
            {r.color && <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />}
            <span className="text-ink-secondary">{r.name}</span>
            <span className="ml-auto font-semibold tabular-nums text-ink-primary">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-1.5 text-xs text-ink-secondary">
          <span className="h-2 w-2 rounded-full" style={{ background: it.color }} />
          {it.label}
        </div>
      ))}
    </div>
  );
}
