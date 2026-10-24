import app from "../src/server";

export default app;

// Ensure full compatibility with both CommonJS and ES Module loaders on Vercel
if (typeof module !== "undefined" && module.exports) {
  module.exports = app;
  (module.exports as any).default = app;
}
