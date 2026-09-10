import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    placeholder: "Write your message...",
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Tell us a bit about yourself",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "This textarea already has some content in it.",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Bio",
    error: "Bio must be under 280 characters",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Cannot edit this",
    disabled: true,
  },
};
