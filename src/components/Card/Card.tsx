import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional title rendered as a heading at the top of the card. */
  title?: string;
  /** Main content of the card. */
  children?: ReactNode;
  /** Optional content rendered in a footer area at the bottom of the card. */
  footer?: ReactNode;
}

function joinClassNames(...classNames: Array<string | undefined | false>): string {
  return classNames.filter(Boolean).join(" ");
}

/**
 * A basic, framework-agnostic container component with optional title and footer.
 */
export function Card({ title, footer, children, className, ...rest }: CardProps) {
  return (
    <div className={joinClassNames("suib-card", className)} {...rest}>
      {title ? <h3 className="suib-card__title">{title}</h3> : null}
      <div className="suib-card__body">{children}</div>
      {footer ? <div className="suib-card__footer">{footer}</div> : null}
    </div>
  );
}
