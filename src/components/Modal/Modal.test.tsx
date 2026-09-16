import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders its children when open", () => {
    render(
      <Modal open onOpenChange={() => {}}>
        <p>Modal body content</p>
      </Modal>
    );
    expect(screen.getByText("Modal body content")).toBeInTheDocument();
  });

  it("does not render its children when closed", () => {
    render(
      <Modal open={false} onOpenChange={() => {}}>
        <p>Modal body content</p>
      </Modal>
    );
    expect(screen.queryByText("Modal body content")).not.toBeInTheDocument();
  });

  it("renders an optional title as an accessible heading", () => {
    render(
      <Modal open title="Modal Title" onOpenChange={() => {}}>
        <p>Body</p>
      </Modal>
    );
    expect(screen.getByRole("heading", { name: "Modal Title" })).toBeInTheDocument();
  });

  it("does not render a heading when no title is given", () => {
    render(
      <Modal open onOpenChange={() => {}}>
        <p>Body</p>
      </Modal>
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders as a dialog with an accessible name matching the title", () => {
    render(
      <Modal open title="Settings" onOpenChange={() => {}}>
        <p>Body</p>
      </Modal>
    );
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();
  });

  it("forwards a custom className to the content card", () => {
    render(
      <Modal open onOpenChange={() => {}} className="extra-class">
        <p>Body</p>
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("extra-class");
  });

  it("calls onOpenChange(false) when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        <p>Body</p>
      </Modal>
    );

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("has an accessible label on the icon-only close button", () => {
    render(
      <Modal open onOpenChange={() => {}}>
        <p>Body</p>
      </Modal>
    );
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("calls onOpenChange(false) when Escape is pressed (comes free from Radix)", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        <p>Body</p>
      </Modal>
    );

    await user.keyboard("{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onOpenChange(false) when clicking the overlay/outside the content (comes free from Radix)", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        <p>Body</p>
      </Modal>
    );

    // Click the overlay - it sits outside the dialog Content's DOM subtree,
    // so Radix's dismissable layer treats it as an "outside" interaction.
    await user.click(screen.getByTestId("modal-overlay"));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  describe("visual tokens", () => {
    it("uses an opaque surface token (bg-background), not bg-transparent, on the content card", () => {
      render(
        <Modal open onOpenChange={() => {}}>
          <p>Body</p>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("bg-background");
      expect(dialog).not.toHaveClass("bg-transparent");
    });

    it("centers the content card on screen", () => {
      render(
        <Modal open onOpenChange={() => {}}>
          <p>Body</p>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("fixed");
      expect(dialog).toHaveClass("left-1/2");
      expect(dialog).toHaveClass("top-1/2");
    });

    it("scrolls long content inside the card instead of overflowing the viewport", () => {
      render(
        <Modal open onOpenChange={() => {}}>
          <p>Body</p>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("max-h-[85vh]");
      expect(dialog).toHaveClass("overflow-y-auto");
    });
  });
});
