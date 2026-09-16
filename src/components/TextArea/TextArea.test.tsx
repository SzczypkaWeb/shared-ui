import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { TextArea } from "./TextArea";

/**
 * jsdom doesn't perform real layout, so `scrollHeight` is always `0` by
 * default. Autosize tests stub it to a fixed value on the element to
 * simulate "this much content would need this much height".
 */
function mockScrollHeight(element: HTMLElement, value: number) {
  Object.defineProperty(element, "scrollHeight", {
    configurable: true,
    value,
  });
}

describe("TextArea", () => {
  it("renders a native textarea element", () => {
    render(<TextArea placeholder="Notes" />);
    const textarea = screen.getByPlaceholderText("Notes");

    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("forwards the ref to the underlying native textarea element", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} placeholder="Notes" />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current).toBe(screen.getByPlaceholderText("Notes"));
  });

  it("does not render a FormError when no error is passed", () => {
    render(<TextArea placeholder="Notes" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("displays the error message below the textarea and marks it invalid when an error is passed", () => {
    render(<TextArea placeholder="Bio" error="Bio is too long" />);

    expect(screen.getByText("Bio is too long")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Bio")).toHaveAttribute("aria-invalid", "true");
  });

  it("applies passed-through props and className", () => {
    render(<TextArea placeholder="Bio" className="custom-class" rows={10} disabled />);
    const textarea = screen.getByPlaceholderText("Bio");

    expect(textarea).toHaveClass("custom-class");
    expect(textarea).toHaveAttribute("rows", "10");
    expect(textarea).toBeDisabled();
  });

  it("works directly with react-hook-form's register(), with no Controller wrapper", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function TestForm() {
      const { register, handleSubmit } = useForm<{ bio: string }>();
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextArea placeholder="Bio" {...register("bio")} />
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(<TestForm />);

    await user.type(screen.getByPlaceholderText("Bio"), "Hello there");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ bio: "Hello there" }), expect.anything());
  });

  describe("auto-grow behavior", () => {
    it("removes the native resize handle since height is managed programmatically", () => {
      render(<TextArea placeholder="Notes" />);
      expect(screen.getByPlaceholderText("Notes")).toHaveClass("resize-none");
    });

    it("grows the inline height to match scrollHeight when typing, up to maxHeight", () => {
      render(<TextArea placeholder="Notes" />);
      const textarea = screen.getByPlaceholderText("Notes") as HTMLTextAreaElement;

      mockScrollHeight(textarea, 150);
      fireEvent.input(textarea, { target: { value: "some content" } });

      expect(textarea.style.height).toBe("150px");
    });

    it("caps the height at maxHeight and switches to internal scrolling once content exceeds it", () => {
      render(<TextArea placeholder="Notes" maxHeight={200} />);
      const textarea = screen.getByPlaceholderText("Notes") as HTMLTextAreaElement;

      mockScrollHeight(textarea, 500);
      fireEvent.input(textarea, { target: { value: "a lot of content".repeat(50) } });

      expect(textarea.style.height).toBe("200px");
      expect(textarea.style.overflowY).toBe("auto");
    });

    it("does not enable scrolling while content stays under maxHeight", () => {
      render(<TextArea placeholder="Notes" maxHeight={200} />);
      const textarea = screen.getByPlaceholderText("Notes") as HTMLTextAreaElement;

      mockScrollHeight(textarea, 120);
      fireEvent.input(textarea, { target: { value: "short" } });

      expect(textarea.style.height).toBe("120px");
      expect(textarea.style.overflowY).not.toBe("auto");
    });

    it("defaults maxHeight to 320px when the prop is not passed", () => {
      render(<TextArea placeholder="Notes" />);
      const textarea = screen.getByPlaceholderText("Notes") as HTMLTextAreaElement;

      mockScrollHeight(textarea, 900);
      fireEvent.input(textarea, { target: { value: "a lot of content".repeat(80) } });

      expect(textarea.style.height).toBe("320px");
      expect(textarea.style.overflowY).toBe("auto");
    });

    it("respects a custom maxHeight prop", () => {
      render(<TextArea placeholder="Notes" maxHeight={500} />);
      const textarea = screen.getByPlaceholderText("Notes") as HTMLTextAreaElement;

      mockScrollHeight(textarea, 900);
      fireEvent.input(textarea, { target: { value: "a lot of content".repeat(80) } });

      expect(textarea.style.height).toBe("500px");
    });

    it("resizes on mount to fit any initial defaultValue content", () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<TextArea ref={ref} placeholder="Notes" defaultValue="hello" />);

      expect(ref.current).not.toBeNull();
      // On mount the height should already be an explicit pixel value (not
      // the browser default), proving the resize routine ran without any
      // user interaction.
      expect(ref.current?.style.height).toMatch(/^\d+px$/);
    });
  });

  describe("visual tokens", () => {
    it("uses rounded-lg corners, a transparent background, and the border-input token", () => {
      render(<TextArea placeholder="Notes" />);
      const textarea = screen.getByPlaceholderText("Notes");

      expect(textarea).toHaveClass("rounded-lg");
      expect(textarea).toHaveClass("bg-transparent");
      expect(textarea).toHaveClass("border-input");
      expect(textarea).not.toHaveClass("bg-background");
    });
  });

  describe("width overrides", () => {
    it("keeps the textarea full-width by default", () => {
      render(<TextArea placeholder="Notes" />);
      expect(screen.getByPlaceholderText("Notes")).toHaveClass("w-full");
    });

    it("still allows overriding the textarea's width via className", () => {
      render(<TextArea placeholder="Notes" className="w-64" />);
      const textarea = screen.getByPlaceholderText("Notes");

      expect(textarea).toHaveClass("w-64");
      expect(textarea).not.toHaveClass("w-full");
    });

    it("still allows styling the wrapping container via containerClassName", () => {
      const { container } = render(<TextArea placeholder="Notes" containerClassName="max-w-sm" />);
      expect(container.firstElementChild).toHaveClass("max-w-sm");
      expect(container.firstElementChild).toHaveClass("w-full");
    });
  });
});
