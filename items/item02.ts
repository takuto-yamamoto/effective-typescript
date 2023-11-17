/**
 * Item2: Know which TS options you're using.
 *
 * Things to reminder
 * - The TS compiler includes several settings which affect core aspects of the language
 *
 * - Configure TS using `ts.config.json` rather than command line options
 *
 * - Turn on `notImplicitAny` unless you are transitioning a JS project to TS
 *
 * - Use `strictNullChecks` to prevent `undefined is not an object`-style runtime errors.
 *
 * - Aim to enable `strict` to get most thorough checking that TS can offer
 */

// pass the type checker? it depends on `noImplicitAny`
function add(a, b) {
  return a + b;
}
add(10, null);

// you should understand most important of TS settings: `noImplicitAny` and `strictNullCheck`
function add2(a: number, b: number) {
  return a + b;
}
add(10, 100); // OK, noImplicitAny: true

// strictNullcheck: on
const x2: number = null; // Type 'null' is not assignable to type 'number'.
const y2: number = undefined; // Type 'undefined' is not assignable to type 'number'.

// if you mean to allow `null`, you can fix the error by making your intent explicit.
const x3: number | null = null;
