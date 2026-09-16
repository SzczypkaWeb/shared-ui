import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * A toggle button drives `open`/`onOpenChange` so both the open and closed
 * states can be exercised directly in Storybook, and - combined with the
 * toolbar's dark mode toggle - so contrast against the backdrop and against
 * card content can be manually verified in both light and `.dark` mode.
 */
export const Default: Story = {
  render: () => {
    function ToggleDemo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Modal open={open} onOpenChange={setOpen} title="Modal title">
            <p className="text-sm text-foreground">
              This is the modal body content. Press Escape, click the backdrop, or click the close
              button to dismiss it.
            </p>
          </Modal>
        </>
      );
    }

    return <ToggleDemo />;
  },
};

export const WithoutTitle: Story = {
  render: () => {
    function ToggleDemo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open modal (no title)</Button>
          <Modal open={open} onOpenChange={setOpen}>
            <p className="text-sm text-foreground">
              A modal with no title - only the close button is shown in the corner.
            </p>
          </Modal>
        </>
      );
    }

    return <ToggleDemo />;
  },
};

/** Demonstrates long content scrolling inside the card instead of overflowing the viewport. */
export const LongContent: Story = {
  render: () => {
    function ToggleDemo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open modal (long content)</Button>
          <Modal open={open} onOpenChange={setOpen} title="Terms and Conditions">
            <div className="space-y-4 text-sm text-foreground">
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i}>
                  Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          </Modal>
        </>
      );
    }

    return <ToggleDemo />;
  },
};
