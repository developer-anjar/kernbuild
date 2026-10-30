import { Component, signal, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly mobileMenuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly activeSection = signal('home');
  readonly isHomeRoute = signal(false);
  private readonly routeSubscription: Subscription;

  readonly navLinks = [
    { label: 'Home', fragment: 'home' },
    { label: 'About', fragment: 'about' },
    { label: 'Services', fragment: 'services' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Process', fragment: 'process' },
    { label: 'Contact', fragment: 'contact' },
  ];

  constructor(private readonly router: Router) {
    this.isHomeRoute.set(this.router.url.split('#')[0] === '/');
    this.routeSubscription = this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) return;

      const currentUrl = event.urlAfterRedirects;
      const currentPath = currentUrl.split('#')[0];
      this.isHomeRoute.set(currentPath === '/');
      if (currentPath !== '/') {
        this.activeSection.set(currentUrl.startsWith('/projects') ? 'projects' : currentUrl.startsWith('/contact') ? 'contact' : '');
      } else {
        const fragment = this.router.parseUrl(currentUrl).fragment;
        if (fragment) this.scrollToTarget(fragment, 'auto');
      }
    });
  }

  ngOnInit(): void {
    this.scrolled.set(window.scrollY > 20);
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
    this.updateActiveSection();
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  scrollTo(fragment: string): void {
    this.closeMobileMenu();
    this.activeSection.set(fragment);
    this.scrollToTarget(fragment, 'smooth');
  }

  private scrollToTarget(fragment: string, behavior: ScrollBehavior): void {
    requestAnimationFrame(() => {
      document.getElementById(fragment)?.scrollIntoView({ behavior, block: 'start' });
    });
  }

  private updateActiveSection(): void {
    if (this.router.url.split('#')[0] !== '/') return;
    const active = this.navLinks
      .filter(link => document.getElementById(link.fragment))
      .filter(link => document.getElementById(link.fragment)!.getBoundingClientRect().top <= 160)
      .at(-1);
    this.activeSection.set(active?.fragment ?? 'home');
  }
}
