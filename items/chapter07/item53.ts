/**
 * Item 53: Prefer ECMAScript Features to TypeScript Features
 *
 * Things to remember
 * - By and large, you can convert TypeScript to JavaScript by removing all the types from your code.
 *
 * - Enums, parameter properties, triple-slash imports, and decorators are historical exceptions to this rule
 *
 * - In order to keep TypeScript’s role in your codebase as clear as possible, I recommend avoiding these features.
 */

// Enum
// Prefer literal union
enum Flavor {
  VANILLA = 'vanilla',
  CHOCOLATE = 'chocolate',
  STRAWBERRY = 'strawberry',
}
let flavor = Flavor.CHOCOLATE; // Type is Flavor
// ↓
type Flavor2 = 'vanilla' | 'chocolate' | 'strawberry';
let flavor2: Flavor2 = 'chocolate'; // OK

// don't use parameter props
class Person53 {
  constructor(public name: string) {}
}
const p53: Person53 = { name: 'Jed Bartlet' }; // OK

// don't use triple slash import
/// <reference path="other.ts"/>

// don't use decorator
