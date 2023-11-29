/**
 * Item26: understand how context is use in type inference
 *
 * Things to remember
 * - be aware of how context is used in type inference
 *
 * - if factoring out a variable introduces a type error, consider adding a type declaration
 *
 * - if the variable is truly constant use a const assertion
 * - But be aware that this may result in errors surfacing at use rather than definition
 */

// TS doesn't just infer types based on values. it also considers the context in which the value occurs
type Language = 'JavaScript' | 'TypeScript' | 'Python';
function setLanguage(language: Language) {
  /* ... */
}
setLanguage('JavaScript'); // OK
let language = 'JavaScript'; // TS infers string at first assignment
setLanguage(language); // hence error

// there are 2 good ways to solve this problem
// 1. constrain the possible values of language with a type declaration
let language2: Language = 'JavaScript';
setLanguage(language2); // OK
// 2. const
const language3 = 'JavaScript'; // type is 'JavaScript'
setLanguage(language3); // OK

// tuple example
function panTo(where: [number, number]) {
  /*...*/
}
panTo([10, 20]); // OK
const locTuple = [10, 20]; // type is number
panTo(locTuple); // error
// 1st solution
const locTuple2: [number, number] = [10, 20];
panTo(locTuple2); // OK
// 2nd solution
function panTo2(where: readonly [number, number]) {
  /*...*/
}
const locTuple3 = [10, 20] as const;
panTo2(locTuple3); // OK

// callbacks example
function callWithRandomNumbers(fn: (n1: number, n2: number) => void) {
  fn(Math.random(), Math.random());
}

callWithRandomNumbers((a, b) => {
  a; // type is number
  b; // type is number
  console.log(a, b);
});

const fnNums = (a, b) => {}; // a|b implicitly has an any type
const fnNums2 = (a: number, b: number) => {}; // OK
