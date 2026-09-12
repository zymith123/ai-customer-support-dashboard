import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/overview/overview.component').then((m) => m.OverviewComponent),
    data: { title: 'Overview' },
  },
  {
    path: 'conversations',
    loadComponent: () =>
      import('./features/conversations/conversations.component').then(
        (m) => m.ConversationsComponent,
      ),
    data: { title: 'Conversations' },
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./features/analytics/analytics.component').then((m) => m.AnalyticsComponent),
    data: { title: 'Analytics' },
  },
  {
    path: 'agents',
    loadComponent: () =>
      import('./features/agents/agents.component').then((m) => m.AgentsComponent),
    data: { title: 'AI Agents' },
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings.component').then((m) => m.SettingsComponent),
    data: { title: 'Settings' },
  },
  { path: '**', redirectTo: '' },
];
