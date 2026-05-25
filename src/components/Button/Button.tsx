import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

void React;

type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: Variant;
  size?: Size;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

const base = cx(
  'inline-flex items-center justify-center select-none whitespace-nowrap',
  'rounded-default transition-colors duration-quick ease-standard',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'disabled:cursor-not-allowed',
);

const variants: Record<Variant, string> = {
  primary: cx(
    'bg-primary text-fg-on-primary font-medium',
    'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]',
    'hover:bg-primary-hover active:bg-primary-active',
    'disabled:bg-primary-disabled disabled:text-fg-disabled',
  ),
  secondary: cx(
    'bg-secondary text-fg-on-secondary font-medium border border-border-strong',
    'hover:bg-secondary-hover active:bg-secondary-active',
    'disabled:bg-secondary-disabled disabled:text-fg-disabled',
  ),
  tertiary: cx(
    'bg-tertiary text-fg font-medium',
    'hover:bg-tertiary-hover active:bg-tertiary-active',
    'disabled:bg-tertiary-disabled disabled:text-fg-disabled',
  ),
  danger: cx(
    'bg-danger text-fg-on-danger font-medium',
    'hover:bg-danger-hover active:bg-danger-active',
    'disabled:bg-danger-disabled disabled:text-fg-disabled',
  ),
};

const sizes: Record<Size, string> = {
  sm: 'h-32 px-12 gap-6 text-xs',
  md: 'h-40 px-16 gap-8 text-sm',
  lg: 'h-48 px-24 gap-8 text-base',
};

const iconOnlySizes: Record<Size, string> = {
  sm: 'h-32 w-32 p-0',
  md: 'h-40 w-40 p-0',
  lg: 'h-48 w-48 p-0',
};

const iconSizeClass: Record<Size, string> = {
  sm: 'h-icon-sm w-icon-sm',
  md: 'h-icon-sm w-icon-sm',
  lg: 'h-icon-md w-icon-md',
};

function Spinner({ sizeClass }: { sizeClass: string }) {
  return (
    <svg
      className={cx(sizeClass, 'animate-spin')}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    iconLeading,
    iconTrailing,
    iconOnly = false,
    loading = false,
    disabled,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  const icon = iconSizeClass[size];
  const wrap = (node: ReactNode) =>
    node ? (
      <span
        className={cx('inline-grid shrink-0 place-items-center [&>svg]:h-full [&>svg]:w-full', icon)}
        aria-hidden="true"
      >
        {node}
      </span>
    ) : null;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(base, variants[variant], iconOnly ? iconOnlySizes[size] : sizes[size], className)}
      {...rest}
    >
      {loading ? (
        <Spinner sizeClass={icon} />
      ) : iconOnly ? (
        wrap(iconLeading ?? iconTrailing)
      ) : (
        <>
          {wrap(iconLeading)}
          {children}
          {wrap(iconTrailing)}
        </>
      )}
    </button>
  );
});
