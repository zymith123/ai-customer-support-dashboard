import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { catchError, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ConversationDetail, ConversationListItem } from '../../core/models/api.models';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';
import { StatusBadgeComponent } from '../../shared/ui/status-badge/status-badge.component';
import { ChannelIconComponent } from '../../shared/ui/channel-icon/channel-icon.component';

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [AvatarComponent, StatusBadgeComponent, ChannelIconComponent, LucideAngularModule, FormsModule],
  templateUrl: './conversations.component.html',
})
export class ConversationsComponent implements OnInit {
  conversations = signal<ConversationListItem[] | null>(null);
  selectedId = signal<string | null>(null);
  detail = signal<ConversationDetail | null>(null);
  detailLoading = signal(false);
  replyText = signal('');
  sending = signal(false);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .getConversations()
      .pipe(catchError(() => of([])))
      .subscribe((list) => {
        this.conversations.set(list);
        if (list.length) {
          this.select(list[0].id);
        }
      });
  }

  select(id: string): void {
    this.selectedId.set(id);
    this.detail.set(null);
    this.detailLoading.set(true);
    this.replyText.set('');
    this.api
      .getConversation(id)
      .pipe(catchError(() => of(null)))
      .subscribe((detail) => {
        this.detail.set(detail);
        this.detailLoading.set(false);
      });
  }

  send(text: string): void {
    const trimmed = text.trim();
    const id = this.selectedId();
    if (!trimmed || !id || this.sending()) return;

    this.sending.set(true);
    this.api
      .postMessage(id, trimmed)
      .pipe(catchError(() => of(null)))
      .subscribe((message) => {
        this.sending.set(false);
        if (!message) return;
        this.replyText.set('');
        const current = this.detail();
        if (current) {
          this.detail.set({ ...current, messages: [...current.messages, message] });
        }
      });
  }

  useSuggestion(suggestion: string): void {
    this.send(suggestion);
  }

  roleIcon(from: 'customer' | 'ai' | 'agent'): string {
    switch (from) {
      case 'customer':
        return 'User';
      case 'ai':
        return 'Bot';
      case 'agent':
        return 'Headset';
    }
  }
}
