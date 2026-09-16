import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Content rendered inside the button. */
  children: ReactNode;
  /** Visual style of the button. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Size of the button. Defaults to "medium". */
  size?: ButtonSize;
  /** Native button type attribute. Defaults to "button" (not "submit"). */
  type?: "button" | "submit" | "reset";
}

function joinClassNames(...classNames: Array<string | undefined | false>): string {
  return classNames.filter(Boolean).join(" ");
}

/**
 * Tailwind class strings for each variant.
 * These are literal strings that will be picked up by Tailwind's content
 * scanner. They reference the semantic design tokens from globals.css
 * (bg-primary, bg-secondary, bg-accent, ...) rather than hardcoded palette
 * classes (bg-blue-600, bg-gray-200, ...), so the button repaints
 * automatically when an ancestor toggles the `.dark` class - no
 * theme-related props/logic needed here.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 disabled:bg-primary/50 transition-colors",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 disabled:bg-secondary/50 transition-colors",
  ghost:
    "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80 disabled:text-muted-foreground transition-colors",
};

/**
 * Tailwind class strings for each size.
 * These are literal strings that will be picked up by Tailwind's content scanner.
 */
const sizeClasses: Record<ButtonSize, string> = {
  small: "px-3 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

/**
 * Base Tailwind classes applied to all buttons.
 * This is a literal string that will be picked up by Tailwind's content scanner.
 */
const baseClasses =
  "inline-flex items-center justify-center font-medium rounded border border-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";

/**
 * A basic, framework-agnostic button component.
 *
 * Does not depend on any external UI framework and does not touch
 * `window`/`document` at module scope, so it is safe to import in
 * server-rendering environments.
 *
 * Uses Tailwind utility classes for styling. The classes are literal strings
 * so they will be picked up by Tailwind's content scanner in consuming applications.
 */
export function Button({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={joinClassNames(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
