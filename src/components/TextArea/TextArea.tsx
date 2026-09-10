import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { FormError } from "../FormError";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Error message. When present, the textarea is marked `aria-invalid` and a
   * `FormError` is rendered below it. Same prop name/rendering as
   * `TextField`, so the two are interchangeable for consumers.
   */
  error?: string;
  /** Additional classes for the wrapping container (not the `<textarea>` itself). */
  containerClassName?: string;
}

/**
 * A native `<textarea>` styled with Tailwind, following the same
 * shadcn/ui-inspired conventions as `TextField`/`PasswordField`.
 *
 * Ref-forwarding and free of any controlled-value logic of its own, so it
 * works directly with react-hook-form's `register()` - no `Controller`
 * wrapper needed.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { error, className, containerClassName, id, ...rest },
  ref
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = error ? `${textareaId}-error` : undefined;

  return (
    <div className={cn("w-full", containerClassName)}>
      <textarea
        ref={ref}
        id={textareaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
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
