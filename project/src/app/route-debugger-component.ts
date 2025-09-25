import { Component, OnDestroy, inject } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route-debugger',
  template: '',
  standalone: true,
})
export class RouteDebuggerComponent implements OnDestroy {
  private router = inject(Router);
  private sub: Subscription;

  constructor() {
    this.sub = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('🔄 Navigation started:', event.url);
      } else if (event instanceof NavigationEnd) {
        console.log('✅ Navigation ended:', event.urlAfterRedirects);
      } else if (event instanceof NavigationCancel) {
        console.warn('⚠️ Navigation canceled:', event.reason);
      } else if (event instanceof NavigationError) {
        console.error('❌ Navigation error:', event.error);
      } else {
        // Other events like RouteConfigLoadStart, Scroll, etc.
        console.debug('ℹ️ Other router event:', event);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
