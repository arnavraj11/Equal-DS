import { LOGO_VIEWBOX, MARK_PATH, MARK_VIEWBOX, WORDMARK_PATH, WORDMARK_X } from './logo';

/** Brand colour for the flat logo: #00B140 in light, lime in dark (matches the orb convention). */
const LOGO_COLOR = 'var(--eq-text-action)';

/** The Equal six-dot mark — vector of the official logo. */
export function EqualMark({ width = 23, color = LOGO_COLOR, title }: { width?: number; color?: string; title?: string }) {
  const h = (width * MARK_VIEWBOX.height) / MARK_VIEWBOX.width;
  return (
    <svg viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`} width={width} height={h} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} style={{ display: 'block', flexShrink: 0 }}>
      <path d={MARK_PATH} fill={color} />
    </svg>
  );
}

export type EqualLogoProps = {
  /** Rendered height in dp. The lockup keeps the official 113 × 24 proportions. */
  height?: number;
  color?: string;
  /** 'full' = mark + wordmark, 'wordmark' = "equal ai" only. */
  variant?: 'full' | 'wordmark';
};

/** Full Equal AI logo: mark + "equal ai" wordmark, from the official vector. */
export function EqualLogo({ height = 20, color = LOGO_COLOR, variant = 'full' }: EqualLogoProps) {
  const x0 = variant === 'wordmark' ? WORDMARK_X : 0;
  const w = LOGO_VIEWBOX.width - x0;
  return (
    <svg viewBox={`${x0} 0 ${w} ${LOGO_VIEWBOX.height}`} height={height} width={(height * w) / LOGO_VIEWBOX.height} role="img" aria-label="Equal AI" style={{ display: 'block', flexShrink: 0 }}>
      {variant === 'full' && <path d={MARK_PATH} fill={color} />}
      <path d={WORDMARK_PATH} fill={color} />
    </svg>
  );
}
