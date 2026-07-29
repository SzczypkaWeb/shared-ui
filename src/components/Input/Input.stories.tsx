import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Email address",
    placeholder: "you@example.com",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    label: "Username",
    error: "Username is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled field",
    disabled: true,
    value: "Cannot edit this",
  },
};
