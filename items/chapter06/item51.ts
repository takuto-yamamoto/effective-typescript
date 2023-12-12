/**
 * Item51: Mirror Types to Sever Dependencies
 *
 * Things to remember
 * - Use structural typing to sever dependencies that are nonessential.
 *
 * - Don’t force JavaScript users to depend on @types. Don’t force web developers to depend on NodeJS
 */

// Mirror type
// Buffer mirror
interface CsvBuffer {
  toString(encoding: string): string;
}
