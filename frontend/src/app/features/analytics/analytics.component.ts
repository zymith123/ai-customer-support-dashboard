import { Component, OnInit, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { catchError, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import {
  ChannelMixSlice,
  CsatTrendPoint,
  ResponseTimeBucket,
  TicketCategory,
} from '../../core/models/api.models';
import { DonutChartComponent } from '../../shared/ui/donut-chart/donut-chart.component';
import { axisTicks, chartTooltip, gridLines, readCssVar } from '../../shared/chart-theme';

const CHANNEL_COLOR_VARS: Record<string, string> = {
  chat: '--series-1',
  email: '--series-2',
  voice: '--series-3',
  social: '--series-4',
};

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [BaseChartDirective, DonutChartComponent],
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {
  categoriesLoaded = signal(false);
  responseTimeLoaded = signal(false);
  csatLoaded = signal(false);
  channelMix = signal<ChannelMixSlice[] | null>(null);

  categoriesEmpty = signal(false);
  responseTimeEmpty = signal(false);
  csatEmpty = signal(false);

  categoriesChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  categoriesChartOptions: ChartConfiguration<'bar'>['options'] = {};

  responseTimeChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  responseTimeChartOptions: ChartConfiguration<'bar'>['options'] = {};

  csatChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  csatChartOptions: ChartConfiguration<'line'>['options'] = {};

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .getTicketCategories()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.buildCategoriesChart(v));

    this.api
      .getResponseTimeDistribution()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.buildResponseTimeChart(v));

    this.api
      .getCsatTrend()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.buildCsatChart(v));

    this.api
      .getChannelMix()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.channelMix.set(v));
  }

  channelColor(key: string): string {
    return readCssVar(CHANNEL_COLOR_VARS[key] ?? '--series-5');
  }

  channelTotal(): number {
    return (this.channelMix() ?? []).reduce((sum, s) => sum + s.value, 0);
  }

  channelPct(value: number): number {
    const total = this.channelTotal();
    return total ? Math.round((value / total) * 1000) / 10 : 0;
  }

  channelLabels(): string[] {
    return (this.channelMix() ?? []).map((s) => s.name);
  }

  channelValues(): number[] {
    return (this.channelMix() ?? []).map((s) => s.value);
  }

  channelColors(): string[] {
    return (this.channelMix() ?? []).map((s) => this.channelColor(s.key));
  }

  private buildCategoriesChart(data: TicketCategory[]): void {
    this.categoriesLoaded.set(true);
    this.categoriesEmpty.set(data.length === 0);
    const brand = readCssVar('--color-brand');
    this.categoriesChartData = {
      labels: data.map((d) => d.category),
      datasets: [{ data: data.map((d) => d.tickets), backgroundColor: brand, borderRadius: 4, barThickness: 16 }],
    };
    this.categoriesChartOptions = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: gridLines(), ticks: axisTicks(), beginAtZero: true },
        y: { grid: { display: false }, ticks: axisTicks() },
      },
      plugins: {
        legend: { display: false },
        tooltip: chartTooltip((ctx) => `${ctx.label}: ${ctx.formattedValue} tickets`),
      },
    };
  }

  private buildResponseTimeChart(data: ResponseTimeBucket[]): void {
    this.responseTimeLoaded.set(true);
    this.responseTimeEmpty.set(data.length === 0);
    const brand = readCssVar('--color-brand');
    this.responseTimeChartData = {
      labels: data.map((d) => d.bucket),
      datasets: [{ data: data.map((d) => d.pct), backgroundColor: brand, borderRadius: 4, barThickness: 32 }],
    };
    this.responseTimeChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: axisTicks() },
        y: {
          grid: gridLines(),
          ticks: { ...axisTicks(), callback: (v) => `${v}%` },
          beginAtZero: true,
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: chartTooltip((ctx) => `${ctx.label}: ${ctx.formattedValue}%`),
      },
    };
  }

  private buildCsatChart(data: CsatTrendPoint[]): void {
    this.csatLoaded.set(true);
    this.csatEmpty.set(data.length === 0);
    const brand = readCssVar('--color-brand');
    this.csatChartData = {
      labels: data.map((d) => d.week),
      datasets: [
        {
          data: data.map((d) => d.csat),
          borderColor: brand,
          backgroundColor: brand + '22',
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: brand,
          borderWidth: 2,
        },
      ],
    };
    this.csatChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: axisTicks() },
        y: { grid: gridLines(), ticks: axisTicks(), min: 4.4, max: 5 },
      },
      plugins: {
        legend: { display: false },
        tooltip: chartTooltip((ctx) => `Week ${ctx.label}: ${ctx.formattedValue} CSAT`),
      },
    };
  }
}
