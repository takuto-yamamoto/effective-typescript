/**
 * Item20: use different variables for different types/concepts
 *
 * Things to remember
 * - while a variable's value can change, its type generally does not
 *
 * - to avoid confusion, both for human readers and for the type checker,
 * - avoid reusing variables for differently typed values
 */

// while a variable's value can change, its type generally does not
let id = '12-34-56';
id = '123456'; // OK
id = 123456; // error

// one common way a type change is to narrow
let id2: string | number;
id2 = 123456; // OK
console.log(id2); // number
id2 = '123456'; // OK
console.log(id2); // string
const id3: string | number = 123456;
console.log(id3); // number
// TS has narrowed the union type based on the assignment

// a union type does work, but it can be confused
// ↓↓↓ better
const id4 = '123456'; // string
const serial = 123456; // number

// not good: shadowing
// it's better to use different names for different concepts
const id5 = '12-34-56';
{
  const id5 = 123456; // OK
}
