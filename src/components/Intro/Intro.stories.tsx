import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { profile } from "@/content/profile";
import { Intro } from "./Intro";

const meta = {
  title: "Portfolio/Intro",
  component: Intro,
  args: { text: profile.fullName },
  parameters: { layout: "fullscreen" },
  // Each story starts with the intro visible so the animation replays.
  beforeEach: () => {
    document.documentElement.removeAttribute("data-intro");
  },
} satisfies Meta<typeof Intro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
