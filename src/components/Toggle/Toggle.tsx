import React, { forwardRef, type ReactNode, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';

void React;

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

export interface ToggleProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixSwitch.Root>, 'asChild'> {
  label?: ReactNode;
  description?: ReactNode;
}

const trackClass = cx(
  'relative inline-block h-16 w-28 shrink-0 appearance-none p-0 m-0 align-middle',
  'rounded-pill bg-control-off',
  'transition-colors duration-quick ease-standard',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'data-[state=checked]:bg-control',
  'data-[state=checked]:hover:bg-control-hover',
  'disabled:cursor-not-allowed disabled:opacity-disabled',
);

const thumbClass = cx(
  'absolute top-2 left-2 h-12 w-12',
  'rounded-pill bg-control-fg shadow-card',
  'transition-transform duration-quick ease-standard',
  'data-[state=checked]:translate-x-12',
);

export const Toggle = forwardRef<ElementRef<typeof RadixSwitch.Root>, ToggleProps>(
  function Toggle({ label, description, className, id, disabled, ...rest }, ref) {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const descId = description ? `${inputId}-desc` : undefined;

    const control = (
      <RadixSwitch.Root
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-describedby={descId}
        className={cx(trackClass, !label && className)}
        {...rest}
      >
        <RadixSwitch.Thumb className={thumbClass} />
      </RadixSwitch.Root>
    );

    if (!label && !description) return control;

    return (
      <label
        htmlFor={inputId}
        className={cx(
          'inline-flex gap-12 select-none',
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
