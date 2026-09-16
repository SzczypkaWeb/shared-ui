import { forwardRef, useId } from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { cn } from "../../lib/utils";
import { FormError } from "../FormError";

export interface SelectOption {
  /** Human-readable text shown for this option. */
  label: string;
  /** Underlying value submitted/stored for this option. */
  value: string;
}

export interface SelectProps {
  /** The list of selectable options. */
  options: SelectOption[];
  /** Text shown when no option is selected yet. */
  placeholder?: string;
  /**
   * Error message. When present, the trigger is marked `aria-invalid` and a
   * `FormError` is rendered below it - same pattern as `TextField`/`TextArea`.
   */
  error?: string;
  /** Currently selected value. Pass react-hook-form Controller's `field.value` here. */
  value?: string;
  /**
   * Called with the newly selected value. Mirrors react-hook-form
   * Controller's `field.onChange`, so `<Select {...field} .../>` works
   * directly (Controller's field object uses `onChange`, not Radix's native
   * `onValueChange`).
   */
  onChange?: (value: string) => void;
  /** Radix-idiomatic alias for `onChange`. Called alongside it, if provided. */
  onValueChange?: (value: string) => void;
  /** Called when the dropdown closes. Mirrors Controller's `field.onBlur`. */
  onBlur?: () => void;
  /** Form field name. Mirrors Controller's `field.name`. */
  name?: string;
  /** Disables the trigger and prevents opening the dropdown. */
  disabled?: boolean;
  id?: string;
  /** Additional classes for the trigger button. */
  className?: string;
  /** Additional classes for the wrapping container (not the trigger itself). */
  containerClassName?: string;
}

/**
 * A dropdown select built on Radix UI's `Select` primitive, styled with
 * Tailwind utility classes to match `TextField`/`PasswordField`.
 *
 * Radix's `Select` is not a native `<select>`, so it cannot be
 * uncontrolled-registered via react-hook-form's `register()`. Instead, this
 * component exposes a `value`/`onChange`-shaped API (plus a Radix-idiomatic
 * `onValueChange` alias) so it can be wired up via react-hook-form's
 * `Controller`:
 *
 * ```tsx
 * <Controller
 *   name="fruit"
 *   control={control}
 *   render={({ field, fieldState }) => (
 *     <Select
 *       options={options}
 *       placeholder="Select a fruit"
 *       error={fieldState.error?.message}
 *       {...field}
 *     />
 *   )}
 * />
 * ```
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options,
    placeholder = "Select an option",
    error,
    value,
    onChange,
    onValueChange,
    onBlur,
    name,
    disabled,
    id,
    className,
    containerClassName,
  },
  ref
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;

  function handleValueChange(nextValue: string) {
    onValueChange?.(nextValue);
    onChange?.(nextValue);
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      onBlur?.();
    }
  }

  return (
    <div className={cn("w-full", containerClassName)}>
      <SelectPrimitive.Root
        value={value}
        onValueChange={handleValueChange}
        onOpenChange={handleOpenChange}
        name={name}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[placeholder]:text-muted-foreground",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className={cn(
              // Unlike the trigger (a form control, correctly bg-transparent so it
              // blends into its parent surface), this is a portaled popover that
              // floats on top of arbitrary page content - it needs the opaque
              // bg-background surface token, same as Card/Modal's content card,
              // or whatever is behind it bleeds through the open dropdown.
              "relative z-50 w-[var(--radix-select-trigger-width)] min-w-[8rem] overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-md",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            )}
          >
            <SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center">
              <ChevronDownIcon className="h-4 w-4 rotate-180" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
                    "focus:bg-muted focus:text-foreground",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center">
                    <CheckIcon className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center">
              <ChevronDownIcon className="h-4 w-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      <FormError id={errorId} message={error} />
    </div>
  );
});

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4 opacity-50", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
