import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Select } from "../Select";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "primary",
    size: "medium",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled button",
  },
};

/**
 * Regression story for a constrained flex container (e.g. a Button next to a
 * Select): the label must never wrap onto two lines, and the flex parent
 * must not compress the Button below its natural content width.
 */
export const InConstrainedFlexContainer: Story = {
  render: () => (
    <div className="flex w-64 gap-4">
      <Select
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
        ]}
        placeholder="Select a fruit"
      />
      <Button>Save changes</Button>
    </div>
  ),
};
