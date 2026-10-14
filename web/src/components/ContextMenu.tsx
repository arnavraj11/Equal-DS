import { Fragment } from 'react';
import { Icon } from '../foundations/Icon';
import type { IconName } from '../foundations/icons';

export type MenuItem = { label: string; icon?: IconName; danger?: boolean; onSelect?: () => void };

/** Long-press context menu (Component ref #18). */
export function ContextMenu({ items, minWidth = 131 }: { items: MenuItem[]; minWidth?: number }) {
  return (
    <div role="menu" style={{ minWidth, display: 'inline-flex', flexDirection: 'column', background: 'var(--eq-bg-surface)', borderRadius: 12, boxShadow: 'var(--eq-shadow-card)', overflow: 'hidden' }}>
      {items.map((it, i) => (
        <Fragment key={it.label}>
          {i > 0 && <hr className="eq-divider" />}
          <button
            role="menuitem"
            type="button"
            className="eq-reset-btn"
            onClick={it.onSelect}
            style={{ height: 40, padding: '0 16px 0 12px', display: 'flex', alignItems: 'center', gap: 10, color: it.danger ? 'var(--eq-text-danger)' : 'var(--eq-text-primary)', textAlign: 'left' }}
          >
            {it.icon && <Icon name={it.icon} size={16} color={it.danger ? 'var(--eq-text-danger)' : 'var(--eq-text-tertiary)'} />}
            <span className="eq-t-body1">{it.label}</span>
          </button>
        </Fragment>
      ))}
    </div>
  );
}
