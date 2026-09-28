import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { profile } from "@/content/profile";
import { TechStack } from "./TechStack";

const meta = {
  title: "Portfolio/TechStack",
  component: TechStack,
  args: { groups: profile.stack },
} satisfies Meta<typeof TechStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllGroups: Story = {};

export const SingleGroup: Story = {
  args: { groups: profile.stack.slice(0, 1) },
};
