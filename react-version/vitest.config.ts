import path from "node:path";
import { defineConfig, defaultExclude } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: path.resolve(__dirname, "./test/setup.ts"),
    exclude: [...defaultExclude, "**/node_modules/**"],
    environmentMatchGlobs: [
      ["**/*.test.tsx", "jsdom"],
      ["**/*.component.test.ts", "jsdom"],
    ],
    coverage: {
      statements: 54.92,
      thresholdAutoUpdate: true,
      include: ["srcs/**/*"],
      exclude: [
        "test/**",
        "vite.*.ts",
        "**/*.d.ts",
        "**/*.test.*",
        "**/*.config.*",
        "**/snapshot-tests/**",
        "**/*.solution.tsx",
        "**/coverage/**",
      ],
      all: true,
    },
  },
});

global.fetch = (url, options) => fetch(cookieJar, url, options);
