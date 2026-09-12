import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ChannelKey } from '../../../core/models/api.models';

const ICONS: Record<ChannelKey, string> = {
  chat: 'MessageCircle',
  email: 'Mail',
  voice: 'Phone',
  social: 'Share2',
};

@Component({
  selector: 'app-channel-icon',
  standalone: true,
  imports: [LucideAngularModule],
  template: `<lucide-icon [name]="iconName" [size]="size" class="shrink-0"></lucide-icon>`,
})
export class ChannelIconComponent {
  @Input({ required: true }) channel!: ChannelKey;
  @Input() size = 14;

  get iconName(): string {
    return ICONS[this.channel];
  }
}
