/**
 * Item30: don't repeat type information in documentation
 *
 * Things to remember
 * - avoid repeating type information in comments and variable names
 * - In the best case it is duplicative of type declarations
 * - and in the worst it will lead to conflicting information
 *
 * - consider including units in variable names if they aren't clear from the type
 * - e.g. timeMs or temperatureC
 */

// bad examples
// ex1
/**
 * Returns a string with the foreground color.
 * Takes zero or one arguments. With no arguments, returns the
 * standard foreground color. With one argument, returns the foreground color
 * for a particular page.
 */
function getForegroundColor(page?: string) {
  return page === 'login' ? { r: 127, g: 127, b: 127 } : { r: 0, g: 0, b: 0 };
}
// ↓↓↓
/** Get the foreground color for the application or a specific page. */
function getForegroundColor2(page?: string): Color {
  // ...
}

// ex2
/** Does not modify nums */
function sort(nums: number[]) {
  /* ... */
}
// ↓↓↓
function sort2(nums: readonly number[]) {
  /* ... */
}

// avoid putting types in variable names
// Bad: ageNum -> age, ...
// Good(with units): time -> timeMs, temperature -> temperatureC
