/**
 * Item7: Think of types as sets of values
 *
 * Things to remember
 * - Think of types as sets of values.
 * - These sets can either be finite or infinite
 *
 * - TS types form intersecting sets rather than a strict hierarchy.
 * - Two types can overlap without either being a subtype of the other
 *
 * - Remember that an object can still belong to a type
 * - even if it has additional properties that were not mentioned in the type declaration
 *
 * - Type opetarions apply to a set's domain.
 * - The intersection of A and B is the intersection of A's domain and B's domain
 * - For object types, this means that values in A & B have the props of both A and B
 *
 * - Thinks of "extends", "assignable to" and "subtype of" as synonyms for "subset of"
 */

// think of types as sets of values
// the smallest set is the empty set, which called `never`
const x: never = 12; // type '12' is not assignable to type `never`
const neverX: never = 12 as unknown as never; // OK

// the next smallest sets are those which contain single values
type A = 'A';
type B = 'B';
type AB = A | B; // union types

// Almost all the type checker is doing is testing whether one set is a subset of another
const ab: AB = Math.random() < 0.5 ? 'A' : 'B'; // OK

// most types tha you work in paractice have infinite domains
type Int = 1 | 2 | 3 | 4 | 5; // |...
// or by describing thier members
// Think of this interface as a description of the values in the domain of its type
interface Identified {
  id: string;
}

// the `&` operator computes the intersection of two types
interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan;
// or you can write interface with extends:
interface PersonSpan2 extends Person {
  birth: Date;
  death?: Date;
}

// A value that has the props of both `Person` and `Lifespan` will belong to intersection type
const ps: PersonSpan = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
}; // OK
// you can assign excess props
const tmp = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
  first: 'Alan', // excess prop
};
const ps2: PersonSpan = tmp;

// intersections and unions
// keyof (A&B) = (keyof A) | (keyof B)
// keyof (A|B) = (keyof A) & (keyof B)

// extends can also appear as a constraint in a generic type
// `K` is a generc type, which is a subset of string
function getKey<K extends string>(val: any, key: K) {
  // ...
}

// we can read both `extends` and `assignable` as `subset of`
interface Point {
  x: number;
  y: number;
}
function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  // ...
  return vals;
}
const pts: Point[] = [
  { x: 1, y: 1 },
  { x: 2, y: 0 },
];
sortBy(pts, 'x'); // OK

// number[] is not assignable to [number, number] since it's not a subset of it.
const list = [1, 2];
const tuple: [number, number] = list; // NG

// There is no TS type for all the integers, or for all the objects that have x and y properties but no ohters
// you can sometimes subtract types useing `Exclude`, but only when it would result in a proper TS type
type T = Exclude<string | Date, string | number>; // Date
type NonZeroNums = Exclude<number, 0>; // Type is still just number
