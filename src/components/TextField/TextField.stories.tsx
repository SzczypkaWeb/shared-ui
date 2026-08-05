import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    placeholder: "you@example.com",
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    placeholder: "Email address",
    error: "Please enter a valid email address",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Cannot edit this",
    disabled: true,
  },
};
