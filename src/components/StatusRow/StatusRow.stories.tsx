import type { Meta, StoryObj } from "@storybook/react";
import { StatusRow } from "./StatusRow";
import type { StatusBadgeStatus } from "../StatusBadge";

const meta: Meta<typeof StatusRow> = {
  title: "Components/StatusRow",
  component: StatusRow,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["running", "done", "blocked", "failed", "approved", "changes_requested"] satisfies StatusBadgeStatus[],
    },
  },
  args: {
    label: "Deploy to production",
    status: "running",
  },
};

export default meta;
type Story = StoryObj<typeof StatusRow>;

export const Running: Story = { args: { status: "running" } };
export const Done: Story = { args: { status: "done" } };
export const Blocked: Story = { args: { status: "blocked" } };
export const Failed: Story = { args: { status: "failed" } };
export const Approved: Story = { args: { status: "approved" } };
export const ChangesRequested: Story = { args: { status: "changes_requested" } };

/** Several rows stacked together, as they'd typically appear in a list of steps/checks. */
export const StepList: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <StatusRow label="Install dependencies" status="done" />
      <StatusRow label="Run tests" status="failed" />
      <StatusRow label="Build" status="blocked" />
      <StatusRow label="Deploy" status="running" />
      <StatusRow label="Code review" status="changes_requested" />
      <StatusRow label="Release" status="approved" />
    </div>
  ),
};
