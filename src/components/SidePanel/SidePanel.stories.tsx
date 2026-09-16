import type { Meta, StoryObj } from "@storybook/react";
import { SidePanel } from "./SidePanel";

const meta: Meta<typeof SidePanel> = {
  title: "Components/SidePanel",
  component: SidePanel,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "600px", border: "1px solid #ddd" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

// Lorem ipsum list items to demonstrate scroll behavior
const loremItems = Array.from({ length: 20 }, (_, i) => (
  <div key={i} className="px-6 py-3 border-b border-border last:border-b-0">
    <h4 className="font-semibold text-sm mb-1">Item {i + 1}</h4>
    <p className="text-xs text-muted-foreground">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
    </p>
  </div>
));

export const Default: Story = {
  args: {
    title: "Panel Title",
    children: loremItems,
  },
};

export const WithoutTitle: Story = {
  args: {
    children: loremItems,
  },
};

export const WithMinimalContent: Story = {
  args: {
    title: "Short List",
    children: (
      <>
        <div className="px-6 py-4">Item 1</div>
        <div className="px-6 py-4 border-t border-border">Item 2</div>
        <div className="px-6 py-4 border-t border-border">Item 3</div>
      </>
    ),
  },
};
