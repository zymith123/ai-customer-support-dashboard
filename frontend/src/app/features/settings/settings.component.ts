import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

type Tone = 'friendly' | 'professional' | 'concise' | 'empathetic';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  // AI behavior flags
  autoResolve = signal(true);
  proactiveOffers = signal(false);
  autoTranslate = signal(true);
  escalateOnNegativeSentiment = signal(true);

  // Tone
  tones: Tone[] = ['friendly', 'professional', 'concise', 'empathetic'];
  selectedTone = signal<Tone>('friendly');

  // Confidence threshold
  confidenceThreshold = signal(80);

  // Notifications
  emailDigest = signal(true);
  slackAlerts = signal(false);

  // Workspace info (local only)
  workspaceName = 'Meridian & Co.';
  supportEmail = 'support@meridianco.com';
  savedJustNow = signal(false);

  saveWorkspace(): void {
    this.savedJustNow.set(true);
    setTimeout(() => this.savedJustNow.set(false), 2000);
  }
}
