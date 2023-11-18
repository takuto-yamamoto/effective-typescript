/**
 * Item1: Understand the Relationship Between TS and JS
 *
 * Things to Remember
 * - TS is a superset of JS.
 * - In other words, all JS programs are already TS programs.
 * - TS has some more syntax of its own, so TS programs are not , in general, valid JS programs.
 *
 * - TS adds a type system that models JS's runtime behavior and tries to spot code which will throw exceptions at runtime.
 * - But you shouldn't expect it flag every exception.
 * - It is possible for code to pass the type checker but still throw at runtime.
 *
 * - While TS's type system largely models JS behavior,
 * - there are some constructs that JS allows but TS chooses to bar, such as calling functions with the wrong number of args.
 * - This is largely matter of taste.
 */

// simple typescript function
function greet(who: string) {
  console.log('hello, ', who);
}

// There are no type annotation, but TypeScript's type checker is still able to spot the problem
let city = 'new york city';
console.log(city.toUppercase()); // did you mean `toUpperCase`?

// detect code that will throw an ezxception at runtime, without having to run your code
const states = [
  { name: 'Alabama', capital: 'Montgomery' },
  { name: 'Alaska', capital: 'Juneau' },
  { name: 'Arizona', capital: 'Phoenix' },
  // ...
];
for (const state of states) {
  console.log(state.capitol); // did you mean `capital`?
}

// with the type annotation, there is an error
type State = { name: string; capital: string };

const state2: State[] = [
  { name: 'Alabama', capital: 'Mongomery' },
  { name: 'Alaska', capitol: 'Juneau' }, // did you mean `capital`?
  // ...
];

// TypeScript's type system models the runtime behavior of JS
const x = 2 + '3'; // OK, type is string
const y = '2' + 3; // OK, type is string

// TS goes beyond simply modeling of JS
const a = null + 7; // Evaluate 7 in JS
const b = [] + 12; // Evaluate 12 in JS
alert('Hello', 'TypeScript'); // alerts 'Hello

// TS assumed that array access would be within bounds, but it was not.
const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());
