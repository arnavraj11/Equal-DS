import { createElement, type CSSProperties, type ElementType, type ReactNode } from 'react';
import type { TypeName } from '../tokens/tokens';

/** Colour roles a piece of text may take. Anything else is a defect (Typography §02). */
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'placeholder'
  | 'action'
  | 'action-disabled'
  | 'on-action'
  | 'on-action-disabled'
  | 'on-danger'
  | 'on-dark'
  | 'on-dark-secondary'
  | 'danger'
  | 'accent-gold'
  | 'brand'
  | 'inherit';

export const textColorVar = (c: TextColor) => (c === 'inherit' ? 'inherit' : `var(--eq-text-${c})`);

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
export const typeClass = (v: TypeName) => `eq-t-${kebab(v)}`;

export type TextProps = {
  /** Type token. */
  variant?: TypeName;
  color?: TextColor;
  as?: ElementType;
  /** Single line with ellipsis. */
  truncate?: boolean;
  align?: CSSProperties['textAlign'];
  /** Non-Latin (e.g. Devanagari) — resets tracking to 0em. */
  nonLatin?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
};

/**
 * Renders text with a single type token and colour role.
 * Overline / Badge are uppercased by the token class — pass sentence-case strings or uppercase yourself.
 */
export function Text({ variant = 'body1', color = 'primary', as = 'span', truncate, align, nonLatin, className, style, children, id }: TextProps) {
  const cls = [typeClass(variant), truncate && 'eq-truncate', nonLatin && 'eq-non-latin', className].filter(Boolean).join(' ');
  return createElement(as, { id, className: cls, style: { color: textColorVar(color), textAlign: align, margin: 0, ...(truncate ? { display: 'block' } : null), ...style } }, children);
}
