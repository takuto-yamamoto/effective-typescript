/**
 * Item8: Know how to tell whether a symbol is in the type space or value space
 *
 * Things to remember
 * - Know how to tell whwther you're in type space or value space while reading a TS expression
 * - Use the TS playground to build an intuition for this
 *
 * - Every value has a type, but types do not have values.
 * - Constructs such as type and interface exist only in the type space
 *
 * - "foo" might be a string literal, or it might be a string literal type.
 * - Be aware of this distinction and understand how to tell which is.
 *
 * - typeof, this and many other operators and keywords have different meanings in type space and value space
 *
 * - Some constructs such as class or enum introduce both a type and a value
 */

// A symbol of TS exists in one of two spaces
// - Type Space
// - Value Space
interface Cylinder {
  radius: number;
  height: number;
}
const Cylinder = (radius: number, height: number) => ({ radius, height });

// on the context, you'll eigher be referring to the type or the value.
function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape.radius; // `radius` does not exist on type `{}`
  }
}

// the TS playground shows you the generated JS for your TS source.
// Types are erased during compilation
type T1 = 'string here';
type T2 = 123;
const T1 = 'string here';
const T2 = 123;

// after a type declaration (:) or an assertion (as) are in type space
// everything after an equal (=) is in value space
interface PersonItem8 {
  first: string;
  last: string;
}
const p: PersonItem8 = { first: 'Jane', last: 'Jacos' };

// the class and enum constructs introduces both a type and a value
class CylinderClass {
  radius = 1;
  height = 1;
}

// In a type context, typeof takes a value and return its TS type.
type T3 = typeof p; // Person
// In a value context, typeof returns the runtime type
const v3 = typeof p; // object
// class keyword introduces both a value(constructor function) and a type(instance type)
// what is the typeof a class? It depends on the context
const c1 = typeof CylinderClass; // function
type c2 = typeof CylinderClass; // CylinderClass constructor signature
declare let fn: c2;
const instanceC = new fn(); // Type is CylinderClass

// you can go between the constructor type and instance type using the Instance Type Generic
type C3 = InstanceType<typeof CylinderClass>; // Type is CylinderClass

// the [] property accessor also has an identical-looking equivalent in type space
class Person {
  first: string;
  last: string;
  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }
}
const p1 = new Person('takuto', 'yamamoto');
const first: Person['first'] = p1.first; // first: string = 'takuto'

// you can put any type in the index slot, including union type or primitive type
type PersonEl = Person['first' | 'last'];
type Tuple = [string, number, Date];
type TupleEl = Tuple[number];

// There are many other constructs that have different meanings in the two spaces
// - this(value: JS's this, type: type of polymorphic this)
// - & and |(value: AND and OR, type: union and intersection)
// - value: const, type: as const
// - extends class, extends interface, extends generic type<T extends string>
// - in can either be part of a loop(for (key in object)) or mapped type [key in objectType]: string

// if TS doesn't seem to understand your code at all, it may be because of confusion around type and value space
function email2({ person: Person, subject: string, body: string }) {
  /*...*/
}
// The problem is that Person and string are being interpreted in a value context
// you should separate the types and values
function email3({
  person,
  subject,
  body,
}: {
  person: Person;
  subject: string;
  body: string;
}) {
  /*...*/
}
