import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/renderer/src/__test__/utils/index.ts"],
    include: ["src/renderer/src/__test__/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/renderer/src/__test__/utils/",
        "src/renderer/src/components/ui/",
        "src/main/",
        "src/preload/",
        "src/shared/",
        "out/",
        "*.config.{js,ts}",
        "*/**/*.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/renderer/src"),
      "@renderer": resolve("src/renderer/src"),
      "@shared": resolve("src/shared"),
      "@/components": resolve("src/renderer/src/components"),
      "@/utils": resolve("src/renderer/src/utils"),
      "@/hooks": resolve("src/renderer/src/hooks"),
      "@/atoms": resolve("src/renderer/src/atoms"),
      "@/routes": resolve("src/renderer/src/routes"),
    },
  },
});
