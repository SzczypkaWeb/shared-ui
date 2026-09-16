import { forwardRef, useEffect, useRef, useId, type Ref, type TextareaHTMLAttributes } from "react";
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
  /**
   * Maximum height (in pixels) the textarea is allowed to auto-grow to
   * before it caps out and falls back to internal scrolling. Defaults to
   * `320`.
   */
  maxHeight?: number;
}

const DEFAULT_MAX_HEIGHT = 320;

/**
 * Merges multiple refs (callback or object form) pointing at the same node
 * into a single callback ref. Small local helper - no need for an extra
 * dependency just for this.
 */
function mergeRefs<T>(...refs: Array<Ref<T> | undefined | null>): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

/**
 * Standard autosize-textarea routine: reset the inline height to `auto` so
 * `scrollHeight` reflects the content's natural height (not the previous
 * inline height), then grow up to `maxHeight` and switch to internal
 * scrolling once content exceeds it.
 */
function autosize(element: HTMLTextAreaElement, maxHeight: number) {
  element.style.height = "auto";
  const nextHeight = Math.min(element.scrollHeight, maxHeight);
  element.style.height = `${nextHeight}px`;
  element.style.overflowY = element.scrollHeight > maxHeight ? "auto" : "hidden";
}

/**
 * A native `<textarea>` styled with Tailwind, following the same
 * shadcn/ui-inspired conventions as `TextField`/`PasswordField`.
 *
 * Auto-grows vertically as the user types (up to `maxHeight`), instead of
 * relying on the browser's native resize handle, which is disabled
 * (`resize-none`) since height is now managed programmatically.
 *
 * Ref-forwarding and free of any controlled-value logic of its own, so it
 * works directly with react-hook-form's `register()` - no `Controller`
 * wrapper needed.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { error, className, containerClassName, id, maxHeight = DEFAULT_MAX_HEIGHT, onInput, value, defaultValue, ...rest },
  ref
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = error ? `${textareaId}-error` : undefined;
  const internalRef = useRef<HTMLTextAreaElement | null>(null);

  // Resize on mount and whenever the (controlled) value changes externally,
  // e.g. programmatic resets via react-hook-form's `reset()`.
  useEffect(() => {
    if (internalRef.current) {
      autosize(internalRef.current, maxHeight);
    }
  }, [maxHeight, value]);

  // Typed off `TextareaHTMLAttributes`'s own `onInput` signature (React 19's
  // native `InputEvent<T>`, not the more generic `FormEvent<T>`) so this
  // stays in sync with whatever event shape `<textarea onInput>` expects.
  const handleInput: NonNullable<TextareaHTMLAttributes<HTMLTextAreaElement>["onInput"]> = (event) => {
    autosize(event.currentTarget, maxHeight);
    onInput?.(event);
  };

  return (
    <div className={cn("w-full", containerClassName)}>
      <textarea
        ref={mergeRefs(internalRef, ref)}
        id={textareaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        value={value}
        defaultValue={defaultValue}
        onInput={handleInput}
        className={cn(
          "flex min-h-[80px] w-full resize-none overflow-hidden rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background",
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
