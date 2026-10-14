import { Emoji } from '../foundations/Icon';
import './Badge.css';

/** Text badge — one-word state (NEW). Uppercased in the string. Never wraps, max two words. */
export function NewBadge({ label = 'New', tone = 'solid' }: { label?: string; tone?: 'solid' | 'soft' }) {
  return <span className={`eq-badge eq-badge--text eq-badge--${tone} eq-t-badge`}>{label.toUpperCase()}</span>;
}

/** Count badge — unread count. Tabular, −0.026em. 99+ collapses to 99+. */
export function CountBadge({ count, size = 20, ring = false }: { count: number; size?: number; ring?: boolean }) {
  if (count <= 0) return null;
  const text = count > 99 ? '99+' : String(count);
  return (
    <span className={`eq-badge eq-badge--count eq-t-badge-count ${ring ? 'eq-badge--ring' : ''}`} style={{ minWidth: size, height: size }} aria-label={`${count} unread`}>
      {text}
    </span>
  );
}

/** NEW FEATURE pill with the star asset. */
export function FeatureBadge({ label = 'New feature' }: { label?: string }) {
  return (
    <span className="eq-badge eq-badge--feature">
      <Emoji char="⭐" size={11} />
      <span className="eq-t-badge">{label.toUpperCase()}</span>
    </span>
  );
}

/** Plan marker (UNLIMITED) — gold gradient. */
/** Plan marker beside the logo. `expired` is the red PLAN EXPIRED badge (Plan Expired touchpoint). */
export function PlanBadge({ label = 'Unlimited', tone = 'paid' }: { label?: string; tone?: 'paid' | 'expired' }) {
  return <span className={`eq-badge eq-badge--plan eq-t-badge ${tone === 'expired' ? 'eq-badge--expired' : ''}`}>{label.toUpperCase()}</span>;
}
