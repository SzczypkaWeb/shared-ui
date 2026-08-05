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
 * These are literal strings that will be picked up by Tailwind's content scanner.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 transition-colors",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100 transition-colors",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400 transition-colors",
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
