import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={fontVariables} style={{ padding: "24px 0", maxWidth: 1000 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "error" },
  },
};

export default preview;
