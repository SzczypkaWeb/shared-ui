import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { FormError } from "../FormError";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Error message. When present, the input is marked `aria-invalid` and a
   * `FormError` is rendered below it.
   */
  error?: string;
  /** Additional classes for the wrapping container (not the `<input>` itself). */
  containerClassName?: string;
  /** Native input type. Defaults to "text". */
  type?: string;
}

/**
 * A native `<input>` styled with Tailwind, following shadcn/ui conventions.
 *
 * Ref-forwarding and free of any controlled-value logic of its own, so it
 * works directly with react-hook-form's `register()` - no `Controller`
 * wrapper needed.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { error, className, containerClassName, id, type = "text", ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cn("w-full", containerClassName)}>
      <input
        ref={ref}
        id={inputId}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...rest}
      />
      <FormError id={errorId} message={error} />
    </div>
  );
});
