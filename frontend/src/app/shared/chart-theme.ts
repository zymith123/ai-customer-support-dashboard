import type { TooltipItem } from 'chart.js';

/** Reads a CSS custom property's current computed value from :root. */
export function readCssVar(name: string): string {
  if (typeof document === 'undefined') return '#000000';
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || '#000000';
}

/**
 * Builds a themed Chart.js tooltip config using the current surface/border/ink
 * design tokens so it matches light/dark mode instead of Chart.js defaults.
 * `label` formats the body line(s) for a given tooltip item.
 */
export function chartTooltip<T extends 'line' | 'bar' | 'doughnut'>(
  label: (ctx: TooltipItem<T>) => string | string[],
) {
  return {
    enabled: true,
    backgroundColor: readCssVar('--color-surface-raised'),
    titleColor: readCssVar('--color-ink-primary'),
    bodyColor: readCssVar('--color-ink-secondary'),
    borderColor: readCssVar('--color-border-strong'),
    borderWidth: 1,
    padding: 10,
    cornerRadius: 8,
    displayColors: true,
    boxPadding: 4,
    titleFont: { family: 'system-ui, -apple-system, "Segoe UI", sans-serif', weight: 600 as const },
    bodyFont: { family: 'system-ui, -apple-system, "Segoe UI", sans-serif' },
    callbacks: {
      label,
    },
  };
}

/** Shared axis/grid styling for line & bar charts. */
export function axisTicks() {
  return {
    color: readCssVar('--color-ink-muted'),
    font: { family: 'system-ui, -apple-system, "Segoe UI", sans-serif', size: 11 },
  };
}

export function gridLines() {
  return {
    color: readCssVar('--color-grid'),
    drawTicks: false,
  };
}
