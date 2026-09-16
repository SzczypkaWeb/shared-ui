import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    children: "Click me",
    href: "#",
    external: false,
  },
  argTypes: {
    external: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Internal: Story = {
  args: {
    href: "/dashboard",
    external: false,
    children: "Go to dashboard",
  },
};

export const External: Story = {
  args: {
    href: "https://github.com",
    external: true,
    children: "Visit GitHub",
  },
};

export const InternalLongText: Story = {
  args: {
    href: "/docs",
    external: false,
    children: "Read the comprehensive documentation",
  },
};

export const ExternalShortText: Story = {
  args: {
    href: "https://example.com",
    external: true,
    children: "External",
  },
};

/** Multiple links as they'd appear in a paragraph */
export const Paragraph: Story = {
  render: () => (
    <p className="text-base leading-relaxed text-foreground">
      Check out the <Link href="/guide">getting started guide</Link> or visit our{" "}
      <Link href="https://github.com" external>
        GitHub repository
      </Link>{" "}
      to see the source code.
    </p>
  ),
};

/** A list of internal and external links */
export const LinkList: Story = {
  render: () => (
    <ul className="flex flex-col gap-2">
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/docs">Documentation</Link>
      </li>
      <li>
        <Link href="https://github.com/SzczypkaWeb" external>
          Our GitHub
        </Link>
      </li>
      <li>
        <Link href="https://twitter.com" external>
          Follow on Twitter
        </Link>
      </li>
    </ul>
  ),
};
