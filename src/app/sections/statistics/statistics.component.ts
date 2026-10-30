import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { STATISTICS_DATA } from '../../core/config/site.config';
import { StatisticMetric } from '../../models/statistics.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements AfterViewInit, OnDestroy {
  readonly metrics = STATISTICS_DATA;
  readonly animatedValues = signal<Record<string, number>>({});
  @ViewChild('statisticsSection') private statisticsSection?: ElementRef<HTMLElement>;
  private statisticObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    const section = this.statisticsSection?.nativeElement;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    this.statisticObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = (entry.target as HTMLElement).dataset['statId'];
        const metric = this.metrics.find(item => item.id === id);
        if (!metric || typeof metric.value !== 'number') continue;
        this.statisticObserver?.unobserve(entry.target);
        this.countUp(metric);
      }
    }, { threshold: 0.35 });
    section.querySelectorAll<HTMLElement>('[data-stat-id]').forEach(card => this.statisticObserver?.observe(card));
  }

  ngOnDestroy(): void {
    this.statisticObserver?.disconnect();
  }

  valueFor(metric: StatisticMetric): number | string {
    if (typeof metric.value !== 'number') return metric.value;
    return this.animatedValues()[metric.id] ?? 0;
  }

  private countUp(metric: StatisticMetric): void {
    if (typeof metric.value !== 'number') return;
    const target = metric.value;
    const started = performance.now();
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850;

    const update = (now: number): void => {
      const progress = duration === 0 ? 1 : Math.min((now - started) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      this.animatedValues.update(values => ({
        ...values,
        [metric.id]: Math.round(target * eased),
      }));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
}
