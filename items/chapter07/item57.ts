/**
 * Item 57: Use Source Maps to Debug TypeScript
 *
 * Things to remember
 * - Don’t debug generated JavaScript. Use source maps to debug your TypeScript code at runtime.
 *
 * - Make sure that your source maps are mapped all the way through to the code that you run.
 *
 * - Depending on your settings, your source maps might contain an inline copy of your original code
 * - Don’t publish them unless you know what you’re doing!
 */

// To tell TypeScript to generate one, set the source Map option in your tsconfig.json:
// tsc generates js.map file
const compileOption = {
  compilerOptions: {
    sourceMap: true,
  },
};
