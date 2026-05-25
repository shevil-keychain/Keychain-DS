import React, { forwardRef, type ReactNode, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';

void React;

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, 'asChild'> {
  label?: ReactNode;
  description?: ReactNode;
}

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

const rootClass = cx(
  'relative inline-block h-16 w-16 shrink-0 appearance-none p-0 m-0 align-middle',
  'rounded-control border border-border-strong bg-surface',
  'transition-colors duration-quick ease-standard',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'data-[state=checked]:bg-control data-[state=checked]:border-control',
  'data-[state=indeterminate]:bg-control data-[state=indeterminate]:border-control',
  'data-[state=checked]:hover:bg-control-hover data-[state=checked]:hover:border-control-hover',
  'data-[state=indeterminate]:hover:bg-control-hover data-[state=indeterminate]:hover:border-control-hover',
  'disabled:cursor-not-allowed disabled:opacity-disabled',
);

const iconClass = 'h-icon-xs w-icon-xs stroke-[3]';

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  function Checkbox({ label, description, className, id, disabled, ...rest }, ref) {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const descId = description ? `${inputId}-desc` : undefined;

    const control = (
      <RadixCheckbox.Root
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-describedby={descId}
        className={cx(rootClass, !label && className)}
        {...rest}
      >
        <RadixCheckbox.Indicator className="text-control-fg absolute inset-0 grid place-items-center">
          {rest.checked === 'indeterminate' ? (
            <Minus className={iconClass} aria-hidden="true" />
          ) : (
            <Check className={iconClass} aria-hidden="true" />
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
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
