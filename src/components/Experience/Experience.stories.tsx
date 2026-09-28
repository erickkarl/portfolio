import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { profile } from "@/content/profile";
import { Experience } from "./Experience";

const meta = {
  title: "Portfolio/Experience",
  component: Experience,
  args: {
    jobs: profile.experience,
    footnotes: [
      { label: "Earlier", line: profile.earlier },
      { label: "Education", line: profile.education },
    ],
  },
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const CurrentRole: Story = {
  args: { jobs: profile.experience.slice(0, 1), footnotes: [] },
};

/** A company with more than one role renders them as grouped sub-roles. */
export const Promotion: Story = {
  args: { jobs: profile.experience.filter((j) => j.roles.length > 1), footnotes: [] },
};
