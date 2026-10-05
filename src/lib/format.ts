const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2024-03" → "Mar 2024" */
export function formatMonth(value: string): string {
  const [year, month] = value.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** Prefix a public/ asset path with the configured base (e.g. /portfolio/). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

// Money, counts, percentages and ranges: $7B, 1,600+, 96.85%, $100M–$200M, 81 to 10
const METRIC = /((?<![\w$])\$?\d[\d,.]*[MBK]?(?:[–-]\$?\d[\d,.]*[MBK]?)?\+?%?(?![\w]))/g;

/** Split text so numeric metrics can be rendered with emphasis. */
export function splitMetrics(text: string): { text: string; metric: boolean }[] {
  // split() with a capture group alternates [plain, match, plain, match, ...]
  return text
    .split(METRIC)
    .map((part, i) => ({ text: part, metric: i % 2 === 1 }))
    .filter((part) => part.text !== '');
}

/** Final display string for an animated metric, e.g. formatValue(96.85, { decimals: 2, suffix: '%' }) → "96.85%". */
export function formatValue(value: number, opts: { prefix?: string; suffix?: string; decimals?: number } = {}): string {
  const number = value.toLocaleString('en-US', {
    minimumFractionDigits: opts.decimals ?? 0,
    maximumFractionDigits: opts.decimals ?? 0,
  });
  return `${opts.prefix ?? ''}${number}${opts.suffix ?? ''}`;
}
