import { Component, Input, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { chartTooltip, readCssVar } from '../../chart-theme';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `<div class="relative h-56 w-full">
    <canvas baseChart [data]="chartData" [options]="chartOptions" type="doughnut"></canvas>
  </div>`,
})
export class DonutChartComponent implements OnChanges {
  @Input({ required: true }) labels!: string[];
  @Input({ required: true }) values!: number[];
  @Input({ required: true }) colors!: string[];

  chartData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'doughnut'>['options'] = {};

  ngOnChanges(): void {
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.values,
          backgroundColor: this.colors,
          borderColor: readCssVar('--color-surface'),
          borderWidth: 2,
          hoverOffset: 4,
        },
      ],
    };
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: chartTooltip((ctx) => {
          const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
          const val = ctx.parsed as number;
          const pct = total ? Math.round((val / total) * 1000) / 10 : 0;
          return `${ctx.label}: ${val.toLocaleString()} (${pct}%)`;
        }),
      },
    };
  }
}
