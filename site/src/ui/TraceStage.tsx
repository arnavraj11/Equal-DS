import { useMemo, useRef, useState, type ReactNode } from 'react';
import { ANDROID_FRAME, PhoneFrame } from '@equal/ds';
import { componentDocs } from '../registry/components';
import { useRoute } from '../app/router';
import { traceAt, type TraceHit } from '../app/trace';

const nameToDoc = new Map<string, { id: string; name: string }>();
componentDocs.forEach((d) => d.components.forEach((c) => nameToDoc.set(c, { id: d.id, name: d.name })));
const traceable = new Set(nameToDoc.keys());

export type StagePhone = {
  key: string;
  label: string;
  to?: string;
  render: () => ReactNode;
  /** React code shown in the stage's Code section. */
  code?: string;
  /** Extend this phone vertically (dp, ≥ 800) when its content is longer than the frame. */
  height?: number;
};

type Box = { x: number; y: number; w: number; h: number; hit: TraceHit };

/**
 * Horizontal stage of live phones. In Trace mode, hovering outlines the DS component under the
 * cursor and clicking opens its page; in Try mode the phones are fully interactive.
 */
export function TraceStage({ phones, scale = 0.78, mode, height = 800, wrap = false }: { phones: StagePhone[]; scale?: number; mode: 'trace' | 'try'; height?: number; wrap?: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<Box | null>(null);
  const { go } = useRoute();
  const w = ANDROID_FRAME.width * scale;

  const locate = (target: EventTarget | null) => {
    const root = stage.current;
    if (!root || !(target instanceof Element)) return setBox(null);
    const hit = traceAt(target, traceable, root);
    if (!hit) return setBox(null);
    const r = hit.element.getBoundingClientRect();
    const s = root.getBoundingClientRect();
    setBox({ x: r.left - s.left + root.scrollLeft, y: r.top - s.top + root.scrollTop, w: r.width, h: r.height, hit });
  };

  const doc = box ? nameToDoc.get(box.hit.name) : undefined;
  const parent = box?.hit.chain.find((n) => n !== box.hit.name);
  const tagAbove = box ? box.y > 36 : true;

  const handlers = useMemo(
    () =>
      mode === 'trace'
        ? {
            onMouseMove: (e: React.MouseEvent) => locate(e.target instanceof Element && e.target.closest('.s-phone__label') ? null : e.target),
            onMouseLeave: () => setBox(null),
            onClickCapture: (e: React.MouseEvent) => {
              const root = stage.current;
              if (!root || !(e.target instanceof Element) || e.target.closest('.s-phone__label')) return;
              const hit = traceAt(e.target, traceable, root);
              e.preventDefault();
              e.stopPropagation();
              const d = hit && nameToDoc.get(hit.name);
              if (d) go(`/components/${d.id}`);
            },
          }
        : {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode],
  );

  return (
    <div ref={stage} className={`s-stage ${wrap ? 's-stage--wrap' : ''}`} {...handlers} style={{ cursor: mode === 'trace' ? 'crosshair' : undefined }} onScroll={() => setBox(null)}>
      {phones.map((p) => (
        <div key={p.key} className="s-phone" style={{ width: w }}>
          <div className="s-phone__label">
            <span>{p.label}</span>
            {p.to && <a href={`#${p.to}`}>Open</a>}
          </div>
          <div style={{ width: w, height: Math.max(p.height ?? height, ANDROID_FRAME.height) * scale }}>
            <div className="s-phone__scale" style={{ width: ANDROID_FRAME.width, height: Math.max(p.height ?? height, ANDROID_FRAME.height), transform: `scale(${scale})` }}>
              <PhoneFrame height={p.height ?? height}>{p.render()}</PhoneFrame>
            </div>
          </div>
        </div>
      ))}
      {mode === 'trace' && box && doc && (
        <>
          <div className="s-trace-box" style={{ transform: `translate(${box.x - 2}px, ${box.y - 2}px)`, width: box.w + 4, height: box.h + 4 }} />
          <div className="s-trace-tag" style={{ transform: `translate(${box.x - 2}px, ${tagAbove ? box.y - 36 : box.y + box.h + 8}px)` }}>
            {box.hit.name}
            {parent && <small>in {parent}</small>}
            <kbd>click to open</kbd>
          </div>
        </>
      )}
    </div>
  );
}
