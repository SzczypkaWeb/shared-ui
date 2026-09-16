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

/**
 * `size="md"` (the default) - today's centered card, `max-w-md`. Suitable for
 * short confirmations/forms. Verify contrast against the backdrop and card
 * content in both light and `.dark` mode via the toolbar's dark mode toggle.
 */
export const SizeMd: Story = {
  render: () => {
    function ToggleDemo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open modal (size=md)</Button>
          <Modal open={open} onOpenChange={setOpen} title="Confirm action" size="md">
            <p className="text-sm text-foreground">
              A compact, centered card for short confirmations or simple forms. This is the default
              size.
            </p>
          </Modal>
        </>
      );
    }

    return <ToggleDemo />;
  },
};

/**
 * `size="lg"` - a wider centered card (`max-w-3xl`) for content-heavy
 * dialogs, e.g. a run-details view with several sections of text/data.
 */
export const SizeLg: Story = {
  render: () => {
    function ToggleDemo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open modal (size=lg)</Button>
          <Modal open={open} onOpenChange={setOpen} title="Run details" size="lg">
            <div className="space-y-4 text-sm text-foreground">
              <section>
                <h3 className="font-semibold">Summary</h3>
                <p>
                  A wider centered card, roomy enough for content-heavy dialogs with multiple
                  sections of text or data without feeling cramped.
                </p>
              </section>
              <section>
                <h3 className="font-semibold">Logs</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </section>
              <section>
                <h3 className="font-semibold">Metadata</h3>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
              </section>
            </div>
          </Modal>
        </>
      );
    }

    return <ToggleDemo />;
  },
};

/**
 * `size="full"` - near-fullscreen, anchored with a small margin on every side
 * via `inset` instead of a centered floating card. Suitable for dialogs that
 * need maximum space (e.g. a full editor or a dense data table).
 */
export const SizeFull: Story = {
  render: () => {
    function ToggleDemo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open modal (size=full)</Button>
          <Modal open={open} onOpenChange={setOpen} title="Full-screen view" size="full">
            <div className="space-y-4 text-sm text-foreground">
              <p>
                A near-fullscreen card anchored to the viewport edges with a small margin, instead
                of a centered floating card. Useful for content that needs as much room as
                possible.
              </p>
              {Array.from({ length: 10 }, (_, i) => (
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
