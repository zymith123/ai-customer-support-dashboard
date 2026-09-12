import { Component, Input } from '@angular/core';
import { ConversationStatus } from '../../../core/models/api.models';

interface StatusStyle {
  bg: string;
  text: string;
  dot: string;
}

const STYLES: Record<ConversationStatus, StatusStyle> = {
  open: { bg: 'var(--color-brand-soft)', text: 'var(--color-brand-strong)', dot: 'var(--color-brand)' },
  pending: { bg: 'rgba(250,178,25,0.16)', text: '#8a5a06', dot: 'var(--status-warning)' },
  resolved: { bg: 'rgba(12,163,12,0.14)', text: 'var(--status-good-text)', dot: 'var(--status-good)' },
  escalated: { bg: 'rgba(208,59,59,0.14)', text: 'var(--status-critical)', dot: 'var(--status-critical)' },
};

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `<span
    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
    [style.backgroundColor]="style.bg"
    [style.color]="style.text"
    ><span class="h-1.5 w-1.5 rounded-full" [style.backgroundColor]="style.dot"></span
    >{{ status }}</span
  >`,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: ConversationStatus;

  get style(): StatusStyle {
    return STYLES[this.status];
  }
}
