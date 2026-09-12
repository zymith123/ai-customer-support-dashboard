import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { catchError, of } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { ApiService } from '../../core/services/api.service';
import { Agent, ConversationListItem, Kpi, ResolutionSplitSlice, VolumeTrendPoint } from '../../core/models/api.models';
import { StatTileComponent } from '../../shared/ui/stat-tile/stat-tile.component';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';
import { StatusBadgeComponent } from '../../shared/ui/status-badge/status-badge.component';
import { ChannelIconComponent } from '../../shared/ui/channel-icon/channel-icon.component';
import { DonutChartComponent } from '../../shared/ui/donut-chart/donut-chart.component';
import { chartTooltip, axisTicks, gridLines, readCssVar } from '../../shared/chart-theme';

const RESOLUTION_COLOR_VARS: Record<string, string> = {
  ai: '--series-1',
  hybrid: '--series-2',
  human: '--series-3',
  escalated: '--series-4',
};

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    StatTileComponent,
    AvatarComponent,
    StatusBadgeComponent,
    ChannelIconComponent,
    DonutChartComponent,
    BaseChartDirective,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  kpis = signal<Kpi[] | null>(null);
  conversations = signal<ConversationListItem[] | null>(null);
  agents = signal<Agent[] | null>(null);
  resolutionSplit = signal<ResolutionSplitSlice[] | null>(null);

  volumeChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  volumeChartOptions: ChartConfiguration<'line'>['options'] = {};

  volumeLegend: { label: string; color: string }[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .getKpis()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.kpis.set(v));

    this.api
      .getConversations()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.conversations.set(v));

    this.api
      .getAgents()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.agents.set(v));

    this.api
      .getResolutionSplit()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.resolutionSplit.set(v));

    this.api
      .getVolumeTrend()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.buildVolumeChart(v));
  }

  topAgents(): Agent[] {
    return [...(this.agents() ?? [])].sort((a, b) => b.resolved - a.resolved).slice(0, 4);
  }

  recentConversations(): ConversationListItem[] {
    return (this.conversations() ?? []).slice(0, 5);
  }

  resolutionColor(key: string): string {
    return readCssVar(RESOLUTION_COLOR_VARS[key] ?? '--series-5');
  }

  resolutionTotal(): number {
    return (this.resolutionSplit() ?? []).reduce((sum, s) => sum + s.value, 0);
  }

  resolutionPct(value: number): number {
    const total = this.resolutionTotal();
    return total ? Math.round((value / total) * 1000) / 10 : 0;
  }

  resolutionLabels(): string[] {
    return (this.resolutionSplit() ?? []).map((s) => s.name);
  }

  resolutionValues(): number[] {
    return (this.resolutionSplit() ?? []).map((s) => s.value);
  }

  resolutionColors(): string[] {
    return (this.resolutionSplit() ?? []).map((s) => this.resolutionColor(s.key));
  }

  private buildVolumeChart(points: VolumeTrendPoint[]): void {
    const series: { key: keyof Omit<VolumeTrendPoint, 'day'>; label: string; varName: string }[] = [
      { key: 'chat', label: 'Chat', varName: '--series-1' },
      { key: 'email', label: 'Email', varName: '--series-2' },
      { key: 'voice', label: 'Voice', varName: '--series-3' },
      { key: 'social', label: 'Social', varName: '--series-4' },
    ];

    this.volumeLegend = series.map((s) => ({ label: s.label, color: readCssVar(s.varName) }));

    this.volumeChartData = {
      labels: points.map((p) => p.day),
      datasets: series.map((s) => ({
        label: s.label,
        data: points.map((p) => p[s.key] as number),
        borderColor: readCssVar(s.varName),
        backgroundColor: readCssVar(s.varName) + '33',
        fill: true,
        stack: 'volume',
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      })),
    };

    this.volumeChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { grid: { display: false }, ticks: axisTicks() },
        y: { stacked: true, grid: gridLines(), ticks: axisTicks(), beginAtZero: true },
      },
      plugins: {
        legend: { display: false },
        tooltip: chartTooltip((ctx) => `${ctx.dataset.label}: ${ctx.formattedValue}`),
      },
    };
  }
}
