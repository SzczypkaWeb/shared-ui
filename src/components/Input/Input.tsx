import { useId, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { FormError } from "../FormError";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label rendered above the input. Optional. */
  label?: string;
  /** Error message. When present, the input is marked invalid and the message is shown below it. */
  error?: string;
  /** Native input type. Defaults to "text". */
  type?: string;
}

/**
 * A basic, framework-agnostic text input with an optional label and error message.
 *
 * Uses React's `useId` (rather than any browser API) to associate the label
 * with the input, so it renders identically on the server and the client.
 *
 * Styled with Tailwind utility classes (shadcn/ui conventions, same as
 * TextField/PasswordField) driven by this package's shared design tokens,
 * rather than the legacy 'suib-input' BEM classes this component used to
 * render (those relied on a hand-authored stylesheet that no longer exists
 * post-Tailwind migration, so they rendered unstyled).
 */
export function Input({ label, error, id, type = "text", className, ...rest }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium leading-none text-foreground">
          {label}
        </label>
      ) : null}
      <input
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
}
