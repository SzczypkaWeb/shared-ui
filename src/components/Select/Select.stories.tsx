import type { Meta, StoryObj } from "@storybook/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select } from "./Select";
import { SubmitButton } from "../SubmitButton";

const fruitOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    options: fruitOptions,
    placeholder: "Select a fruit",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/** Empty/default state - no value selected yet. */
export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Choose your favorite fruit",
  },
};

export const WithError: Story = {
  args: {
    error: "Please select a fruit",
  },
};

export const Preselected: Story = {
  args: {
    value: "banana",
  },
};

/** The open dropdown's width should match this narrow trigger exactly. */
export const NarrowTrigger: Story = {
  render: (args) => (
    <div className="w-32">
      <Select {...args} />
    </div>
  ),
};

/** The open dropdown's width should match this wide trigger exactly. */
export const WideTrigger: Story = {
  render: (args) => (
    <div className="w-[32rem]">
      <Select {...args} />
    </div>
  ),
};

const formSchema = z.object({
  fruit: z.string().min(1, "Please select a fruit"),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * Demonstrates wiring `Select` up via react-hook-form's `Controller` with
 * Zod-based validation (`zodResolver`) - the pattern consumers should follow,
 * since Radix's `Select` is not a native `<select>` and can't be
 * uncontrolled-registered via `register()`.
 */
export const ControlledWithZodValidation: Story = {
  render: () => {
    function ControllerDemo() {
      const {
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
      } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { fruit: "" },
      });

      return (
        <form
          className="flex w-64 flex-col gap-4"
          onSubmit={handleSubmit(() => {
            /* no-op: this story only demonstrates validation wiring */
          })}
        >
          <Controller
            name="fruit"
            control={control}
            render={({ field }) => (
              <Select
                options={fruitOptions}
                placeholder="Select a fruit"
                error={errors.fruit?.message}
                {...field}
              />
            )}
          />
          <SubmitButton>Submit</SubmitButton>
          {isSubmitSuccessful ? <p className="text-sm text-muted-foreground">Submitted!</p> : null}
        </form>
      );
    }

    return <ControllerDemo />;
  },
};
