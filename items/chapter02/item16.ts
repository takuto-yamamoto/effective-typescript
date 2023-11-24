/**
 * Item16: prefer arrays, tuples, and arrayLike to number index signatures
 *
 * Things to remember
 * - understand that arrays are object, so thier keys are strings, not numbers
 * - number as an index signature is a purely TS construct which is designed to help catch bugs
 *
 * - Prefer array, tuple, or arraylike types to using number in an index signature yourself
 */

// JS does not have a notion of 'hashable' objects like you find in Python or Java
// > x = {}
// {}
// > x[[1, 2, 3]] = 2
// 2
// > x
// { '1,2,3': 1 }

// arrays are objects
typeof []; // object
const array16 = [1, 2, 3];
Object.keys(array16); // '0', '1', '2'

// TS compile error (this is fiction)
function get<T>(array: T[], k: string): T {
  return array[k]; // ~ Element implicitly has an 'any' type
}

// if you dont care about the index, you can use for-of or Array.prototype
for (const x of array16) {
  x;
  if (x < 0) break;
}
array16.forEach((x, i) => {
  i;
  x;
});

// if you need to break out of the loop early, youre best off using a C-style for loop
// do not use for-in loop because of performance
for (let i = 0; i < array16.length; i++) {
  const x = array16[i];
  if (x < 0) break;
}

// Use array or tuple instead of number index signature
// or use ArrayType object that has just a length and numeric index signature
const tupleLike: ArrayLike<string> = {
  '0': 'A',
  '1': 'B',
  length: 2,
}; // OK
