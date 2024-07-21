import { config } from "./src/config";

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: config.BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
