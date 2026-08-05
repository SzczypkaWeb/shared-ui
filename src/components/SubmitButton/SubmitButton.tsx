import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface SubmitButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Content rendered inside the button. */
  children: ReactNode;
  /** Shows a loading spinner and disables the button while true. */
  isLoading?: boolean;
  /** Native button type attribute. Defaults to "submit". */
  type?: "button" | "submit" | "reset";
}

/**
 * A `<button>` styled with Tailwind, following shadcn/ui button conventions.
 *
 * Defaults to `type="submit"` since it is meant to submit its enclosing
 * form. While `isLoading` is true, the button is disabled and a spinner is
 * shown alongside its label.
 */
export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(function SubmitButton(
  { children, isLoading = false, type = "submit", disabled, className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
        "ring-offset-background transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "h-10 px-4 py-2",
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <svg
          data-testid="submit-button-spinner"
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
});
