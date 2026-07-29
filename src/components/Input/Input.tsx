import { useId, type InputHTMLAttributes } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label rendered above the input. Optional. */
  label?: string;
  /** Error message. When present, the input is marked invalid and the message is shown below it. */
  error?: string;
  /** Native input type. Defaults to "text". */
  type?: string;
}

function joinClassNames(...classNames: Array<string | undefined | false>): string {
  return classNames.filter(Boolean).join(" ");
}

/**
 * A basic, framework-agnostic text input with an optional label and error message.
 *
 * Uses React's `useId` (rather than any browser API) to associate the label
 * with the input, so it renders identically on the server and the client.
 */
export function Input({
  label,
  error,
  id,
  type = "text",
  className,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="suib-input">
      {label ? (
        <label className="suib-input__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        type={type}
        className={joinClassNames("suib-input__control", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...rest}
      />
      {error ? (
        <span id={errorId} className="suib-input__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
