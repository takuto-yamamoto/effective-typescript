/**
 * Item45: Put TypeScript and `@types` in devDependencies
 *
 * Things to remember
 * - Avoid installing TypeScript system-wide. Make TypeScript a devDependency of your project to ensure that everyone on the team is using a consistent version.
 *
 * - • Put `@types` dependencies in devDependencies, not dependencies. If you need `@types` at runtime, then you may want to rework your process.
 */

// dependencies: required to run your JS code
// devDependencies: not required at runtime(use to develop and test your code)
// peerDependencies: These are packages that you require at runtime but don’t want to be responsible for tracking.

// Make TypeScript a devDependencies instead
