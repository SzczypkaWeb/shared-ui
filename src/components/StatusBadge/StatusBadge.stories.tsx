import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge, type StatusBadgeStatus } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["running", "done", "blocked", "failed", "approved", "changes_requested"] satisfies StatusBadgeStatus[],
    },
  },
  args: {
    status: "running",
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Running: Story = { args: { status: "running" } };
export const Done: Story = { args: { status: "done" } };
export const Blocked: Story = { args: { status: "blocked" } };
export const Failed: Story = { args: { status: "failed" } };
export const Approved: Story = { args: { status: "approved" } };
export const ChangesRequested: Story = { args: { status: "changes_requested" } };

/** All variants rendered together, for quick visual comparison. */
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["running", "done", "blocked", "failed", "approved", "changes_requested"] satisfies StatusBadgeStatus[]).map(
        (status) => (
          <StatusBadge key={status} status={status} />
        )
      )}
    </div>
  ),
};
