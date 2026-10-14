import './Switch.css';

export type SwitchProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
};

/** Toggle — 40 × 24 track, 18 thumb. Controlled. */
export function Switch({ checked, onChange, disabled, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`eq-reset-btn eq-touch eq-switch ${checked ? 'is-on' : ''}`}
    >
      <span className="eq-switch__thumb" />
    </button>
  );
}
