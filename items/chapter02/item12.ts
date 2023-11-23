/**
 * Item12: Apply Types to Entire Function Expressions When possible
 *
 * Things to remember
 * - Consider applying type annotations to entire function expressions,
 * - rather than to thier parameters and return types
 *
 * - If you're writing the same type signature repeatedly,
 * - factor out a function type or look for an existing one.
 * - If you're a library author, provide types for common callbacks
 *
 * - Use typeof fn to match the signature of another function
 */

// JS distinguishes a functionatatement and a function expression
// statement
function rollDice1(sides: number): number {
  /* ... */
  return sides;
}
// expression
const rollDice2 = function (sides: number): number {
  /* ... */
  return sides;
};
// arrow function
const rollDice3 = (sides: number): number => {
  /* ... */
  return sides;
};

// apply types to entire function expression
type DiceRollFn = (sides: number) => number;
const rollDice4: DiceRollFn = (sides) => {
  /* ... */
  return sides;
};

// this technique does open up a number of possibilities
// 1. reducing repetition
function add(a: number, b: number) {
  return a + b;
}
function sub(a: number, b: number) {
  return a - b;
}
function mul(a: number, b: number) {
  return a * b;
}
function div(a: number, b: number) {
  return a / b;
}
// ↓↓↓↓
type BinaryFn = (a: number, b: number) => number;
const addEx: BinaryFn = (a, b) => a + b;
const subEx: BinaryFn = (a, b) => a - b;
const mulEx: BinaryFn = (a, b) => a * b;
const divEx: BinaryFn = (a, b) => a / b;

// 2. use common function signatures provided by libraries
//  ReactJS provides a MouseEventHandler type that you can apply to an entire function
// rather than specifying MouseEvent as a type for the function’s parameter.

// 3. match the signature of some other function
async function getQuote() {
  const response = await fetch('/quote?by=Mark+Twain'); // Type is Promise<Response>
  const quote = await response.json();
  return quote;
}
// there's bug here: if the request for /quote fails
// the response body is likeky to contain an expression like "404 Not Found"
// it's easy to forget that an error response with fetch does not result in a rejected Promise.
async function checkedFetch(input: RequestInfo, init: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response;
}
// this works, but it can be written more concisely
const checkedFetch2: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response;
};
