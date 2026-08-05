import type { Meta, StoryObj } from "@storybook/react";
import { PasswordField } from "./PasswordField";

const meta: Meta<typeof PasswordField> = {
  title: "Components/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
  args: {
    placeholder: "Password",
    autoComplete: "current-password",
  },
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "Password must be at least 8 characters",
  },
};

/** `autoComplete` is never hardcoded - registration forms should pass "new-password". */
export const NewPassword: Story = {
  args: {
    autoComplete: "new-password",
  },
};
