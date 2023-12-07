/**
 * Item38: use the narrowest possible scope for any types
 *
 * Things to remember
 * - make your uses of any as narrowly scoped as possible to avoid undesired loss of type safety elsewhere in your code.
 *
 * - never return an any type from function
 * - This will silently lead to the loss of the safety for any client calling the function
 *
 * - consider @ts-ignore as an alternative to any if you need to silence one error
 */

// bad any
function processBar(b: Bar) {
  /* ... */
}
function expressionReturningFoo(x: Foo) {
  return x;
}
function f1() {
  const x: any = expressionReturningFoo(); // Don't do this
  processBar(x);
  return x; // any
}
// not bad any
function f2() {
  const x = expressionReturningFoo();
  processBar(x as any); // Prefer this
  return x; // Foo
}

// bad any
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value,
  },
} as any; // Don't do this!
// not bad any
const config: Config = {
  a: 1,
  b: 2, // These properties are still checked
  c: {
    key: value as any,
  },
};
