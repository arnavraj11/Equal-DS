import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../foundations/Icon';
import { Text } from '../foundations/Text';
import './Inputs.css';

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> & {
  /** Overline label. Omit for fields in a group that shares one label. */
  label?: string;
  value: string;
  onChange?: (v: string) => void;
  optional?: boolean;
  /** Marks the label with * (e.g. LABEL*). */
  required?: boolean;
  helper?: ReactNode;
  error?: string;
  multiline?: boolean;
  align?: 'start' | 'center';
};

/** Form field — overline label, bodyLarge value (Edit address). */
export function TextField({ label, value, onChange, optional, required, helper, error, multiline, align = 'start', className, ...rest }: TextFieldProps) {
  const inputCls = ['eq-field__input eq-t-body-large', className].filter(Boolean).join(' ');
  const id = useId();
  return (
    <div className={`eq-field eq-field--${align} ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={id} style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 8 }}>
          <Text variant="overline" color="tertiary">{label.toUpperCase() + (required ? '*' : '')}</Text>
          {optional && <Text variant="caption" color="tertiary" style={{ fontWeight: 400 }}>(Optional)</Text>}
        </label>
      )}
      {multiline ? (
        <textarea id={id} className={inputCls} value={value} rows={2} onChange={(e) => onChange?.(e.target.value)} placeholder={rest.placeholder} aria-label={label ?? rest['aria-label']} />
      ) : (
        <input id={id} className={inputCls} value={value} onChange={(e) => onChange?.(e.target.value)} aria-label={label ?? rest['aria-label']} {...rest} />
      )}
      {(error || helper) && (
        <Text as="div" variant="captionWrap" color={error ? 'danger' : 'secondary'} style={{ marginTop: 6 }}>
          {error ?? helper}
        </Text>
      )}
    </div>
  );
}

export type SearchFieldProps = {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  /** Home: the field is an entry point; focusing it opens the search screen. */
  onActivate?: () => void;
};

/** Search input — bodyLarge, pill. */
export function SearchField({ value, onChange, placeholder = 'Search for names', autoFocus, onActivate }: SearchFieldProps) {
  return (
    <label className="eq-search">
      <Icon name="search" size={20} color="var(--eq-text-tertiary)" />
      <input className="eq-t-body-large" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} aria-label={placeholder} autoFocus={autoFocus} onFocus={onActivate ? (e) => (e.currentTarget.blur(), onActivate()) : undefined} readOnly={!!onActivate} />
      {value && (
        <button type="button" className="eq-reset-btn eq-touch" aria-label="Clear" onClick={() => onChange?.('')} style={{ color: 'var(--eq-text-tertiary)' }}>
          <Icon name="close" size={18} />
        </button>
      )}
    </label>
  );
}

export type SegmentedChipsProps<T extends string> = { options: readonly T[]; value: T; onChange?: (v: T) => void };

/** Segmented label chips (Home / Work / Other). button token. */
export function SegmentedChips<T extends string>({ options, value, onChange }: SegmentedChipsProps<T>) {
  return (
    <div role="radiogroup" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map((o) => (
        <button key={o} type="button" role="radio" aria-checked={o === value} className={`eq-reset-btn eq-pressable eq-seg ${o === value ? 'is-on' : ''}`} onClick={() => onChange?.(o)}>
          <span className="eq-t-button">{o}</span>
        </button>
      ))}
    </div>
  );
}
