/**
 * Item 52: Be Aware of the Pitfalls of Testing Types
 *
 * Things to remember
 * - When testing types, be aware of the difference between equality and assignability, particularly for function types.
 *
 * - For functions that use callbacks, test the inferred types of the callback parameters.
 * - Don’t forget to test the type of this if it’s part of your API.
 *
 * Be wary of any in tests involving types. Consider using a tool like dtslint for stricter, less error-prone checking
 */

// test type declaration
const lengths: number[] = map(['john', 'paul'], (name) => name.length);
function assertType<T>(x: T) {}
assertType<number[]>(map(['john', 'paul'], (name) => name.length));

// subtype assertion is not equivalent
const n52 = 12;
assertType<number>(n52); // OK, but n53 is type of `12`

// Parameters and ReturnTypes
// Still Complicated
const double52 = (x: number) => 2 * x;
let p52: Parameters<typeof double52> = null!;
assertType<[number, number]>(p52);
// ~ Argument of type '[number]' is not
// assignable to parameter of type [number, number]
let r52: ReturnType<typeof double52> = null!;
assertType<number>(r52); // OK

// test type declaration
const beatles = ['john', 'paul', 'george', 'ringo'];
assertType<number[]>(
  map(beatles, function (name, i, array) {
    assertType<string>(name);
    assertType<number>(i);
    assertType<string[]>(array);
    assertType<string[]>(this);
    return name.length;
  })
);

// with dtslint (text comparison)
const beatles2 = ['john', 'paul', 'george', 'ringo'];
map(
  beatles2,
  function (
    name, // $ExpectType string
    i, // $ExpectType number
    array // $ExpectType string[]
  ) {
    this; // $ExpectType string[]
    return name.length;
  }
); // $ExpectType number[]
