import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Kpi } from '../../../core/models/api.models';

@Component({
  selector: 'app-stat-tile',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './stat-tile.component.html',
})
export class StatTileComponent {
  @Input({ required: true }) kpi!: Kpi;
}
