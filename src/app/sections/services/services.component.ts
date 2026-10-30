import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild, computed, signal } from '@angular/core';
import { SERVICES_DATA } from '../../data/services.data';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  readonly services = SERVICES_DATA;
  readonly activePage = signal(0);
  readonly slidesPerPage = signal(3);
  readonly pages = computed(() =>
    Array.from({ length: Math.ceil(this.services.length / this.slidesPerPage()) }, (_, index) => index)
  );
  @ViewChild('carouselTrack') private carouselTrack?: ElementRef<HTMLElement>;
  private scrollFrame = 0;

  ngAfterViewInit(): void {
    this.updateSlidesPerPage();
    this.scrollToPage(0, false);
  }

  ngOnDestroy(): void {
    if (this.scrollFrame) {
      cancelAnimationFrame(this.scrollFrame);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateSlidesPerPage();
  }

  onTrackScroll(): void {
    if (this.scrollFrame) cancelAnimationFrame(this.scrollFrame);
    this.scrollFrame = requestAnimationFrame(() => {
      const track = this.carouselTrack?.nativeElement;
      if (!track) return;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      const pageDistance = track.clientWidth + gap;
      const page = pageDistance > 0 ? Math.round(track.scrollLeft / pageDistance) : 0;
      this.activePage.set(Math.max(0, Math.min(page, this.pages().length - 1)));
    });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.goToPage(this.activePage() + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.goToPage(this.activePage() - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.goToPage(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.goToPage(this.pages().length - 1);
    }
  }

  goToPage(page: number): void {
    const target = Math.max(0, Math.min(page, this.pages().length - 1));
    this.activePage.set(target);
    this.scrollToPage(target, true);
  }

  private updateSlidesPerPage(): void {
    const width = window.innerWidth;
    this.slidesPerPage.set(width <= 640 ? 1 : width <= 900 ? 2 : 3);
    const boundedPage = Math.min(this.activePage(), this.pages().length - 1);
    this.activePage.set(boundedPage);
    requestAnimationFrame(() => this.scrollToPage(boundedPage, false));
  }

  private scrollToPage(page: number, smooth: boolean): void {
    const track = this.carouselTrack?.nativeElement;
    if (!track) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollTo({
      left: page * (track.clientWidth + gap),
      behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto',
    });
  }
}
