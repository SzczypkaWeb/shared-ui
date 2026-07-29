import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Card title",
    children: "This is the card body content.",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithFooter: Story = {
  args: {
    footer: "Footer content",
  },
};

export const WithoutTitle: Story = {
  args: {
    title: undefined,
  },
};
