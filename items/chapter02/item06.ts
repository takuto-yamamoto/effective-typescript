/**
 * Item6: Use your editor to interrogate and explore the type system
 *
 * Things to remember
 * - Take advantage of the TS language service by usiong an editor that cam use them.
 *
 * - Use your editor to build en intuition for how the type system works and how TS infer types
 *
 * - Know how to jump into type declarationfiles to see how they model behavior
 */

// you can generally mouse over a symbol to see what TS considers its type
let num = 10; // let num: number

// you can also inspect functions
function addItem6(a: number, b: number) {
  return a + b; // return type: number
}

// the type of a value change in the branch of a conditional
function logMessage(message: string | null) {
  if (message) {
    message; // string
  }
}

// you can inspect individual props in a large object
const fooItem6 = {
  x: [1, 2, 3], // number[]
  bar: {
    name: 'Fred', // { name: string }
  },
};

// to see indered generic types in the middle of a chain of operations, inspect the method name
// this information can prove esential in writing and debugging long chains of function calls
function restOfPath(path: string) {
  return path.split('/').slice(1).join('/');
}

// Seeing the type errors in your editor can also be a great way to learn the nuances of the type system
function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  if (typeof elOrId === 'object') {
    return elOrId; // Type null' is not assignable to type 'HTMLElement'.
  } else if (elOrId === null) {
    return document.body;
  } else {
    const el = document.getElementById(elOrId);
    return el; // Type 'null' is not assignable to type 'HTMLElement'.
  }
}

// improved implementation
function improvedGetElement(elOrId: string | HTMLElement | null): HTMLElement {
  // `object` concludes `null`
  if (typeof elOrId === 'object' && elOrId !== null) {
    return elOrId;
  } else if (elOrId === null) {
    return document.body;
  } else {
    const el = document.getElementById(elOrId);
    return el ? el : document.createElement('div');
  }
}

// vocode provides a `go to definition` option
const response = fetch('http://example.com');

// fetch definition (by lib.dom.d.ts)
declare function fetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response>;
