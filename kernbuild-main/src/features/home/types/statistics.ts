export interface StatisticMetric {
  id: string;
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  isPlaceholder: boolean;
  icon: string;
}
