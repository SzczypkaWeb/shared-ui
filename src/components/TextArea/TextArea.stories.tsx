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

/** Starts tall and demonstrates that it auto-grows further while typing. */
export const AutoGrow: Story = {
  args: {
    defaultValue: "Line one\nLine two\nLine three",
  },
};

/**
 * Content well beyond the default 320px cap - the textarea should stop
 * growing and fall back to internal scrolling instead of pushing the rest
 * of the page down indefinitely.
 */
export const CappedWithScroll: Story = {
  args: {
    defaultValue: Array.from({ length: 30 }, (_, i) => `Line ${i + 1}`).join("\n"),
  },
};

/** A lower maxHeight caps growth sooner. */
export const CustomMaxHeight: Story = {
  args: {
    maxHeight: 120,
    defaultValue: Array.from({ length: 15 }, (_, i) => `Line ${i + 1}`).join("\n"),
  },
};
