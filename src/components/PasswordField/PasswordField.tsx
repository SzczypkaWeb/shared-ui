import { forwardRef } from "react";
import { TextField, type TextFieldProps } from "../TextField";

export interface PasswordFieldProps extends Omit<TextFieldProps, "type"> {
  /**
   * Native `autocomplete` hint. Differs by context (e.g. "current-password"
   * for a login form vs. "new-password" for a registration/reset form), so
   * it is never hardcoded here - callers must pass it explicitly.
   */
  autoComplete?: TextFieldProps["autoComplete"];
}

/**
 * A `TextField` locked to `type="password"`.
 *
 * Ref-forwarding (delegated to `TextField`), so it also works directly with
 * react-hook-form's `register()` with no `Controller` wrapper needed.
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
  props,
  ref
) {
  return <TextField ref={ref} type="password" {...props} />;
});
