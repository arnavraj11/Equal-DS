import { Icon } from '../foundations/Icon';

export type CheckboxProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  size?: number;
  /** Token used for the label. */
  labelVariant?: 'bodyLarge' | 'body1';
  /** Accessible name when there is no visible label (e.g. a checkbox at the end of a contact row). */
  ariaLabel?: string;
};

/** Checkbox with optional label. Unchecked uses text/secondary, checked uses button/primary. */
export function Checkbox({ checked, onChange, label, size = 22, labelVariant = 'bodyLarge', ariaLabel }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange?.(!checked)}
      className="eq-reset-btn"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 12, minHeight: 40 }}
    >
      <Icon name={checked ? 'checkbox-checked' : 'checkbox-blank'} size={size} color={checked ? 'var(--eq-button-primary)' : 'var(--eq-text-secondary)'} />
      {label && (
        <span className={labelVariant === 'bodyLarge' ? 'eq-t-body-large' : 'eq-t-body1'} style={{ color: 'var(--eq-text-primary)' }}>
          {label}
        </span>
      )}
    </button>
  );
}
