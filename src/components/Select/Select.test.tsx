import { beforeAll, describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

// jsdom does not implement these APIs, but Radix UI's Select relies on them
// for pointer interactions and keyboard-driven scrolling. Polyfilling them
// here (rather than in the shared vitest setup) keeps the workaround scoped
// to the one component that actually needs it.
beforeAll(() => {
  if (!window.HTMLElement.prototype.hasPointerCapture) {
    window.HTMLElement.prototype.hasPointerCapture = () => false;
  }
  if (!window.HTMLElement.prototype.releasePointerCapture) {
    window.HTMLElement.prototype.releasePointerCapture = () => {};
  }
  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }
});

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

describe("Select", () => {
  it("renders all provided options once opened", async () => {
    const user = userEvent.setup();
    render(<Select options={options} placeholder="Pick a fruit" />);

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Cherry" })).toBeInTheDocument();
  });

  it("renders the placeholder when no value is selected", () => {
    render(<Select options={options} placeholder="Pick a fruit" />);
    expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
  });

  it("does not render the placeholder text once a value is controlled-selected", () => {
    render(<Select options={options} value="banana" placeholder="Pick a fruit" />);
    expect(screen.queryByText("Pick a fruit")).not.toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("calls onValueChange and onChange with the selected option's value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onChange = vi.fn();
    render(
      <Select options={options} onValueChange={onValueChange} onChange={onChange} placeholder="Pick a fruit" />
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Banana" }));

    expect(onValueChange).toHaveBeenCalledWith("banana");
    expect(onChange).toHaveBeenCalledWith("banana");
  });

  it("renders the error message when the error prop is set and marks the trigger invalid", () => {
    render(<Select options={options} error="Please select an option" />);

    expect(screen.getByText("Please select an option")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not render an error message when no error is passed", () => {
    render(<Select options={options} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  describe("dropdown width", () => {
    it("sizes the open content to track the trigger's width via the Radix CSS variable, not just a fixed min-width", async () => {
      const user = userEvent.setup();
      render(<Select options={options} placeholder="Pick a fruit" />);

      await user.click(screen.getByRole("combobox"));
      const listbox = await screen.findByRole("listbox");

      expect(listbox).toHaveClass("w-[var(--radix-select-trigger-width)]");
      // Fallback floor for very narrow triggers, kept alongside the tracking width.
      expect(listbox).toHaveClass("min-w-[8rem]");
    });
  });

  describe("visual tokens", () => {
    it("uses rounded-lg corners and a transparent background on the trigger", () => {
      render(<Select options={options} placeholder="Pick a fruit" />);
      const trigger = screen.getByRole("combobox");

      expect(trigger).toHaveClass("rounded-lg");
      expect(trigger).toHaveClass("bg-transparent");
      expect(trigger).toHaveClass("border-input");
      expect(trigger).not.toHaveClass("bg-background");
    });

    it("uses rounded-lg corners and a transparent background on the open content", async () => {
      const user = userEvent.setup();
      render(<Select options={options} placeholder="Pick a fruit" />);

      await user.click(screen.getByRole("combobox"));
      const listbox = await screen.findByRole("listbox");

      expect(listbox).toHaveClass("rounded-lg");
      expect(listbox).toHaveClass("bg-transparent");
      expect(listbox).toHaveClass("border-border");
      expect(listbox).not.toHaveClass("bg-background");
    });
  });
});
