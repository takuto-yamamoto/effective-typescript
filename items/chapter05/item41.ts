/**
 * Item41: understand evolving any
 *
 * Things to remember
 * - While TS types typically only refine, implicit any and any[] types are allowed to evolve
 * - you should be able to recognize and understand this construct where it occurs
 *
 * - for better error checking consider providing an explicit annotation instead of using evolving any
 */

// evolving any
function range41(start: number, limit: number) {
  const out = []; // any[]
  for (let i = start; i < limit; i++) {
    out.push(i); // any[]
  }
  return out; // Return type inferred as number[]
}

// but implicit any is not readable
const anyValue = [];
anyValue;

// array type can expand by pushing different elements onto it
const result = []; // Type is any[]
result.push('a');
result; // Type is string[]
result.push(1);
result; // Type is (string | number)[]

// primitive value
let val; // Type is any
if (Math.random() < 0.5) {
  val = /hello/;
  val; // Type is RegExp
} else {
  val = 12;
  val; // Type is number
}
val; // Type is number | RegExp

// only happens with implicit any
let val2 = null; // Type is any
try {
  val2 = 12;
  val2; // Type is number
} catch (e) {
  console.warn('alas!');
}
val2; // Type is number | null

let val3: any = null; // Type is any
try {
  val3 = 12;
  val3; // Type is any
} catch (e) {
  console.warn('alas!');
}
val3; // Type is any
