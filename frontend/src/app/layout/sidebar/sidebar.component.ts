import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LayoutService } from '../../core/services/layout.service';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Overview', icon: 'LayoutGrid' },
  { path: '/conversations', label: 'Conversations', icon: 'MessagesSquare' },
  { path: '/analytics', label: 'Analytics', icon: 'BarChart3' },
  { path: '/agents', label: 'AI Agents', icon: 'Bot' },
  { path: '/settings', label: 'Settings', icon: 'Settings' },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  navItems = NAV_ITEMS;

  constructor(public layout: LayoutService) {}
}
