/**
 * Item 61: Convert Module by Module Up Your Dependency Graph
 *
 * Things to remember
 * - Start migration by adding @types for third-party modules and external API calls
 *
 * - Begin migrating your modules from the bottom of the dependency graph upwards.
 * - The first module will usually be some sort of utility code.
 * - Consider visualizing the dependency graph to help you track progress.
 *
 * - Resist the urge to refactor your code as you uncover odd designs.
 * - Keep a list of ideas for future refactors, but stay focused on TypeScript conversion
 *
 * - Be aware of common errors that come up during conversion.
 * - Copy JSDoc annotations if necessary to avoid losing type safety as you convert
 */
