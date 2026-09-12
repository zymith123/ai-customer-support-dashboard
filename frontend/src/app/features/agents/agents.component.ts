import { Component, OnInit, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { catchError, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Agent, AutomationRule } from '../../core/models/api.models';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [LucideAngularModule, AvatarComponent],
  templateUrl: './agents.component.html',
})
export class AgentsComponent implements OnInit {
  agents = signal<Agent[] | null>(null);
  rules = signal<AutomationRule[] | null>(null);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .getAgents()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.agents.set(v));

    this.api
      .getAutomationRules()
      .pipe(catchError(() => of([])))
      .subscribe((v) => this.rules.set(v));
  }

  aiAgents(): Agent[] {
    return (this.agents() ?? []).filter((a) => a.type === 'AI');
  }

  humanAgents(): Agent[] {
    return (this.agents() ?? []).filter((a) => a.type === 'Human');
  }

  totalResolved(): number {
    return (this.agents() ?? []).reduce((sum, a) => sum + a.resolved, 0);
  }

  avgAutonomy(): number {
    const ai = this.aiAgents();
    if (!ai.length) return 0;
    const sum = ai.reduce((s, a) => s + (a.autonomyRate ?? 0), 0);
    return Math.round(sum / ai.length);
  }

  avgCsat(): string {
    const all = this.agents() ?? [];
    if (!all.length) return '—';
    const sum = all.reduce((s, a) => s + a.csat, 0);
    return (sum / all.length).toFixed(2);
  }

  statusColor(status: Agent['status']): string {
    switch (status) {
      case 'active':
        return 'var(--status-good)';
      case 'idle':
        return 'var(--status-warning)';
      case 'training':
        return 'var(--color-axis)';
    }
  }
}
