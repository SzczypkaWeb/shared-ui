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
 * A basic, framework-agnostic button component.
 *
 * Does not depend on any external UI framework and does not touch
 * `window`/`document` at module scope, so it is safe to import in
 * server-rendering environments.
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
      className={joinClassNames("suib-button", `suib-button--${variant}`, `suib-button--${size}`, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
