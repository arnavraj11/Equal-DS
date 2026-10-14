import { useEffect, useRef, type CSSProperties } from 'react';
import type { AnimationItem } from 'lottie-web';

/**
 * Lottie animations: drop `<name>.json` into `equal-ds/assets/lottie/` and play it with
 * `<Lottie name="<name>" />` (picked up by a Vite glob, like image assets). Android plays the same
 * file with `EqualLottie` (`npm run assets` copies it to `res/raw/lottie_<name>.json`).
 *
 * Illustrative motion only (mascot moments, celebrations, typing); micro-interactions stay in code
 * on the motion tokens. Respects reduced motion: shows the first frame and doesn't play. `tint`
 * recolours every fill and stroke (single-colour animations that should follow the theme, e.g.
 * `var(--eq-text-action)`: green in light, lime in dark).
 */
const files = import.meta.glob('../../../assets/lottie/*.json', { eager: true, import: 'default' }) as Record<string, object>;
export const lottieAnimations: Record<string, object> = Object.fromEntries(
  Object.entries(files).map(([path, data]) => [path.split('/').pop()!.replace(/\.json$/, ''), data]),
);
export const lottieNames = Object.keys(lottieAnimations).sort();

export type LottieProps = {
  /** File name in assets/lottie/ (without .json). */
  name?: string;
  /** Or pass the parsed JSON directly. */
  animationData?: object;
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
  /** CSS colour that replaces every fill/stroke, e.g. `var(--eq-text-action)`. */
  tint?: string;
  /** Accessible name; omit for decorative animations. */
  label?: string;
  style?: CSSProperties;
};

export function Lottie({ name, animationData, width = 120, height = 120, loop = true, autoplay = true, tint, label, style }: LottieProps) {
  const ref = useRef<HTMLDivElement>(null);
  const data = animationData ?? (name ? lottieAnimations[name] : undefined);
  useEffect(() => {
    if (!data || !ref.current) return;
    let anim: AnimationItem | undefined;
    let cancelled = false;
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    import('lottie-web/build/player/lottie_light').then(({ default: lottie }) => {
      if (cancelled || !ref.current) return;
      // Lottie mutates the data it plays; give it a copy so other players start clean.
      const item = lottie.loadAnimation({ container: ref.current, renderer: 'svg', loop: !reduce && loop, autoplay: !reduce && autoplay, animationData: structuredClone(data) });
      if (reduce) item.addEventListener('DOMLoaded', () => item.goToAndStop(0, true));
      anim = item;
    });
    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [data, loop, autoplay]);
  if (!data) {
    return <span className="eq-asset-placeholder" data-asset-placeholder={`lottie:${name}`} title={`lottie: ${name}`} style={{ width, height, display: 'inline-block' }} />;
  }
  return (
    <div
      ref={ref}
      className={tint ? 'eq-lottie eq-lottie--tint' : 'eq-lottie'}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ width, height, flexShrink: 0, ...(tint ? { ['--eq-lottie-tint' as string]: tint } : null), ...style }}
    />
  );
}
