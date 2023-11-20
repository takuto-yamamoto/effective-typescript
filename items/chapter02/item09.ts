/**
 * Item9: Prefer type declarations to type assertions
 *
 * Things to remember
 * - Prefer type declarations to type assetions
 *
 * - Know how to annotate the return type of an arrow function
 *
 * - Use type assetions and non-null assetions when you know something about types that TS does not
 */

// TS seems to have two ways of assigning a value to a variable and givining it a type
interface Person9 {
  name: string;
}
const alice: Person9 = { name: 'Alice' };
const bob = { name: 'Bob' } as Person9;

// they are actually quite different!
const alice2: Person9 = {}; // error
const bob2 = {} as Person9; // no error

// the same thing happens if you specify an additional property
const alice3: Person9 = { name: 'Alice', occupation: 'TS dev' }; // error
const bob3 = { name: 'Bob', occupation: 'TS dev' } as Person9; // no error

// it's not always clear how to use a declaration with arrow functions
const people = ['alice', 'bob', 'jan'].map((name) => ({ name })); // { name: string }[]
const people2 = ['alice', 'bob', 'jan'].map((name) => ({ name } as Person9)); // Person[]
const people3 = ['alice', 'bob', 'jan'].map((name) => ({} as Person9)); // but no error...
const people4 = ['alice', 'bob', 'jan'].map((name) => {
  const person: Person9 = { name };
  return person;
}); // but too noisy...

// the most concice way is to declare the return type of the arrow function
const people5 = ['alice', 'bob', 'jan'].map((name): Person9 => ({ name })); // Person[]

// when you should type assertion?
// when you truly do know more about a type than TypeScript does
// for example, you may know the type of a DOM element more precisely than TS does
// Because TS doesn't hace access to the DOM of your page, it has no way of knowing that #myButton is a button element
document.querySelector('#myButton')?.addEventListener('click', (e) => {
  const button = e.currentTarget as HTMLButtonElement;
});

// you may also run into the non-null assertion
// you should treat ! just like any other assetion
// if you can't, you should use a conditional to check for the null case
const elNull = document.getElementById('foo'); // type is HTMLElement | null
const el = document.getElementById('foo')!; // type is HTMLElement

// type assetions don't let you convert between arbitrary types
// the general idea is that you can use a type assertion to convert between A and B if either is a subset of the other
// ex. HTMLElement is a subtype of HTMLElement | null, HTMLButtonElement is a subtype of EventTarget, Person is a subtype of {}
const body = document.body;
const el2 = body as Person; // error: conversion may be a mistake
// escape (every type is a subset of unknown)
const el3 = body as unknown as Person; // you’re doing something suspicious!
