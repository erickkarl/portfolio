import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { profile } from "@/content/profile";
import { RevisionHistory } from "./RevisionHistory";

const meta = {
  title: "Datasheet/RevisionHistory",
  component: RevisionHistory,
  args: { revisions: profile.revisions },
} satisfies Meta<typeof RevisionHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullHistory: Story = {};

export const CurrentRole: Story = {
  args: { revisions: profile.revisions.slice(0, 1) },
};

/** A company with more than one role renders them as grouped sub-roles. */
export const Promotion: Story = {
  args: { revisions: profile.revisions.filter((r) => r.roles.length > 1) },
};
