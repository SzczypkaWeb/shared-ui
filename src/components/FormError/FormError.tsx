import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface FormErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * The validation/field error message to display.
   * When omitted or an empty string, the component renders nothing
   * (not an empty element with layout impact).
   */
  message?: string;
}

/**
 * A small, consistently-styled message for a single field/validation error.
 *
 * Renders nothing when no message is provided, so it never reserves space
 * or affects layout while a field is valid.
 */
export function FormError({ message, className, ...rest }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p role="alert" className={cn("mt-1.5 text-sm font-medium text-destructive", className)} {...rest}>
      {message}
    </p>
  );
}
