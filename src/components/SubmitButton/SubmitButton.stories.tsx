import type { Meta, StoryObj } from "@storybook/react";
import { SubmitButton } from "./SubmitButton";

const meta: Meta<typeof SubmitButton> = {
  title: "Components/SubmitButton",
  component: SubmitButton,
  tags: ["autodocs"],
  args: {
    children: "Sign in",
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Signing in...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
