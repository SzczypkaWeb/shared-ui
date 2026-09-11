import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { TextArea } from "./TextArea";

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
});
