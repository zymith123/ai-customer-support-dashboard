import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  @Input({ required: true }) name!: string;
  @Input() color = '#2a78d6';
  @Input() size: 'sm' | 'md' = 'md';

  initials(): string {
    const parts = this.name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
}
