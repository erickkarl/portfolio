import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./SectionHeading";

const meta = {
  title: "Datasheet/SectionHeading",
  component: SectionHeading,
  args: { n: 4, title: "Pin configuration" },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: { sub: "Core skills. Select a pin for details." },
};
