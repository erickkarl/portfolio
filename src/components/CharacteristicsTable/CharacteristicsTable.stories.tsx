import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { profile } from "@/content/profile";
import { CharacteristicsTable } from "./CharacteristicsTable";

const meta = {
  title: "Datasheet/CharacteristicsTable",
  component: CharacteristicsTable,
  args: { rows: profile.characteristics },
} satisfies Meta<typeof CharacteristicsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleRow: Story = {
  args: { rows: profile.characteristics.slice(0, 1) },
};
