import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { profile } from "@/content/profile";
import { Pinout } from "./Pinout";

const meta = {
  title: "Datasheet/Pinout",
  component: Pinout,
  args: { pins: profile.pins, partNo: profile.partNo },
} satisfies Meta<typeof Pinout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ServerSidePinSelected: Story = {
  args: { initialPin: 13 },
};

export const SelectingAPin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pin = canvas.getByRole("button", { name: "Pin 6: Storybook" });
    await userEvent.click(pin);
    await expect(pin).toHaveAttribute("aria-pressed", "true");
  },
};
