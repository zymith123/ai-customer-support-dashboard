import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { catchError, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Tone } from '../../core/models/api.models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  loaded = signal(false);

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

  // Workspace info
  workspaceName = '';
  supportEmail = '';

  saving = signal(false);
  savedJustNow = signal(false);
  saveError = signal<string | null>(null);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .getSettings()
      .pipe(catchError(() => of(null)))
      .subscribe((s) => {
        this.loaded.set(true);
        if (!s) return;
        this.autoResolve.set(s.autoResolve);
        this.proactiveOffers.set(s.proactiveOffers);
        this.autoTranslate.set(s.autoTranslate);
        this.escalateOnNegativeSentiment.set(s.escalateNegative);
        this.selectedTone.set(s.tone);
        this.confidenceThreshold.set(s.confidenceThreshold);
        this.emailDigest.set(s.emailDigest);
        this.slackAlerts.set(s.slackAlerts);
        this.workspaceName = s.workspaceName;
        this.supportEmail = s.supportEmail;
      });
  }

  saveWorkspace(): void {
    if (this.saving()) return;
    this.saving.set(true);
    this.saveError.set(null);

    this.api
      .updateSettings({
        autoResolve: this.autoResolve(),
        proactiveOffers: this.proactiveOffers(),
        autoTranslate: this.autoTranslate(),
        escalateNegative: this.escalateOnNegativeSentiment(),
        tone: this.selectedTone(),
        confidenceThreshold: this.confidenceThreshold(),
        emailDigest: this.emailDigest(),
        slackAlerts: this.slackAlerts(),
        workspaceName: this.workspaceName,
        supportEmail: this.supportEmail,
      })
      .pipe(
        catchError(() => {
          this.saveError.set("Couldn't save — check the workspace name and support email are valid.");
          return of(null);
        }),
      )
      .subscribe((saved) => {
        this.saving.set(false);
        if (!saved) return;
        this.savedJustNow.set(true);
        setTimeout(() => this.savedJustNow.set(false), 2000);
      });
  }
}
