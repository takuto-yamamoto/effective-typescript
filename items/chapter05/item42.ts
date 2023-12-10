/**
 * Item42: Use unknown instead of any for values with an unknown type
 *
 * Things to remember
 * - The unknown type is a type-safe alternative to any
 * - use it when you know you have a value but do not know what its type is
 *
 * - use unknown to force your users to use a type assertion or do type checking
 */

// bad
function parseYAML(yaml: string): any {
  // ...
  let obj;
  return obj;
}
interface Book {
  name: string;
  author: string;
}
const book = parseYAML(`
  name: Wuthering Heights
  author: Emily Brontë
 `);
alert(book.title); // No error, alerts "undefined" at runtime
book('read'); // No error,

// better
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}
const book2 = safeParseYAML(`
  name: The Tenant of Wildfell Hall
  author: Anne Brontë
 `) as Book; // unknown type assertion
book2.name;
alert(book2.title);
// ~~~~ Object is of type 'unknown'
book2('read');
// ~~~~~~~~~~ Object is of type 'unknown'

// any type is assignable to unknown, and unknown type is only assignable to unknown and any
// never type is assignable to any other type, and any type is not assignable to never

// bad generics (same as type assertion)
function safeParseYAMLGenerics<T>(yaml: string): T {
  return parseYAML(yaml);
}
