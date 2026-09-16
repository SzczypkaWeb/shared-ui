import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

// Toolbar toggle for the "dark" custom variant declared in globals.css
// (`@custom-variant dark (&:where(.dark, .dark *))`). Without this, every
// story only ever rendered the light theme - there was no way to preview
// dark mode short of toggling the class by hand in devtools every time.
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Light/dark theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.classList.toggle("dark", context.globals.theme === "dark");
      return <Story />;
    },
  ],
};

export default preview;
