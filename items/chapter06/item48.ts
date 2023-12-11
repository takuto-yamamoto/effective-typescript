/**
 * Item48: Use TSDoc for API Comments
 *
 * Things to remember
 * - use JSDoc/TSDoc to document exported functions, classes, and types
 * - This help editors surface information for your users when it's most relevant
 *
 * - use @param @returns and markdown for formatting
 *
 * - avoid including type information in documentation
 */

// Generate a greeting. Result is formatted for display.
// ↓

/** Generate a greeting. Result is formatted for display. */
function greet48(name: string, title: string) {
  return `Hello ${title} ${name}`;
}

/**
 * Generate a greeting.
 * @param name Name of the person to greet
 * @param salutation The person's title
 * @returns A greeting formatted for human consumption.
 */
function greetFullTSDoc(name: string, title: string) {
  return `Hello ${title} ${name}`;
}

/** A measurement performed at a time and place. */
interface Measurement {
  /** Where was the measurement made? */
  position: Vector3D;
  /** When was the measurement made? In seconds since epoch. */
  time: number;
  /** Observed momentum */
  momentum: Vector3D;
}

/**
 * This _interface_ has **three** properties:
 * 1. x
 * 2. y
 * 3. z
 */
interface Vector3D {
  x: number;
  y: number;
  z: number;
}
