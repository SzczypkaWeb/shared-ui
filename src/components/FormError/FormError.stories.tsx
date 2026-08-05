import type { Meta, StoryObj } from "@storybook/react";
import { FormError } from "./FormError";

const meta: Meta<typeof FormError> = {
  title: "Components/FormError",
  component: FormError,
  tags: ["autodocs"],
  args: {
    message: "This field is required",
  },
};

export default meta;
type Story = StoryObj<typeof FormError>;

export const Default: Story = {};

/** Renders nothing (no element with layout impact) when there is no message. */
export const NoMessage: Story = {
  args: {
    message: undefined,
  },
};
