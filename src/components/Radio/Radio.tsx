import React, { forwardRef, type ReactNode, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

void React;

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

// ── RadioGroup ──────────────────────────────────────────────────────────────

type Orientation = 'vertical' | 'horizontal';

export interface RadioGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>, 'orientation'> {
  orientation?: Orientation;
  label?: ReactNode;
}

export const RadioGroup = forwardRef<
  ElementRef<typeof RadixRadioGroup.Root>,
  RadioGroupProps
>(function RadioGroup({ orientation = 'vertical', label, className, children, ...rest }, ref) {
  const inner = (
    <RadixRadioGroup.Root
      ref={ref}
      orientation={orientation}
      className={cx(
        'flex',
        orientation === 'horizontal' ? 'flex-row flex-wrap gap-24' : 'flex-col gap-12',
        !label && className,
      )}
      {...rest}
    >
      {children}
    </RadixRadioGroup.Root>
  );

  if (!label) return inner;

  return (
    <fieldset className={cx('flex flex-col', className)}>
      <legend className="text-sm text-fg mb-12 w-full">{label}</legend>
      {inner}
    </fieldset>
  );
});

// ── Radio ───────────────────────────────────────────────────────────────────

export interface RadioProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>, 'asChild'> {
  label?: ReactNode;
  description?: ReactNode;
}

const rootClass = cx(
  'relative inline-block h-16 w-16 shrink-0 appearance-none p-0 m-0 align-middle',
  'rounded-pill border border-border-strong bg-surface',
  'transition-colors duration-quick ease-standard',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'data-[state=checked]:bg-control data-[state=checked]:border-control',
  'data-[state=checked]:hover:bg-control-hover data-[state=checked]:hover:border-control-hover',
  'disabled:cursor-not-allowed disabled:opacity-disabled',
);

export const Radio = forwardRef<ElementRef<typeof RadixRadioGroup.Item>, RadioProps>(
  function Radio({ label, description, className, id, disabled, value, ...rest }, ref) {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const descId = description ? `${inputId}-desc` : undefined;

    const control = (
      <RadixRadioGroup.Item
        ref={ref}
        id={inputId}
        value={value}
        disabled={disabled}
        aria-describedby={descId}
        className={cx(rootClass, !label && className)}
        {...rest}
      >
        <RadixRadioGroup.Indicator className="absolute inset-0 grid place-items-center">
          <span className="h-6 w-6 rounded-pill bg-control-fg" aria-hidden="true" />
        </RadixRadioGroup.Indicator>
      </RadixRadioGroup.Item>
    );

    if (!label && !description) return control;

    return (
      <label
        htmlFor={inputId}
        className={cx(
          'inline-flex gap-8 select-none',
          description ? 'items-start' : 'items-center',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          className,
        )}
      >
        <span className="flex h-20 items-center">{control}</span>
        <div className="flex flex-col gap-2">
          {label && (
            <span className={cx('text-sm', disabled ? 'text-fg-disabled' : 'text-fg')}>
              {label}
            </span>
          )}
          {description && (
            <span id={descId} className="text-xs font-normal text-fg-subtle">
              {description}
            </span>
          )}
        </div>
      </label>
    );
  },
);
