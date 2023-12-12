/**
 * Item 54: Know How to Iterate Over Objects
 *
 * Things to remember
 * - Use let k: keyof T and a for-in loop to iterate objects when you know exactly what the keys will be.
 * - Be aware that any objects your function receives as parameters might have additional keys.
 *
 * - Use Object.entries to iterate over the keys and values of any object.
 */

// bad case
function foo54(abc: ABC) {
  for (const k in abc) {
    // const k: string
    const v = abc[k];
    // ~~~~~~ Element implicitly has an 'any' type
    // because type 'ABC' has no index signature
  }
}

// Good case
function foo54_1(abc: ABC) {
  let k: keyof ABC;
  for (k in abc) {
    // let k: "a" | "b" | "c"
    const v = abc[k]; // Type is string | number
  }
}
function foo54_2(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    k; // Type is string
    v; // Type is any
  }
}
