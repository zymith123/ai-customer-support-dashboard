import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';
import { LayoutService } from '../../core/services/layout.service';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [LucideAngularModule, AvatarComponent],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit {
  title = signal('Overview');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public theme: ThemeService,
    public layout: LayoutService,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        startWith(null),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return (child?.snapshot.data?.['title'] as string) ?? 'Overview';
        }),
      )
      .subscribe((title) => this.title.set(title));
  }
}
