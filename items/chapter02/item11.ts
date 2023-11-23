/**
 * Item11: Recognize the Limits of excess property checking
 *
 * Things to remember
 * - When you assign an object literal to variable or pass it as an argument to a function
 * - it undergoes excess property checking
 *
 * - Exxcess property checking is an effective way to find errors,
 * - but it is distinct from the usual structural assignability checks done by the TS type checker
 *
 * - Be aware of the limits of excess property checking:
 * - introducing an intermediate variable will remove these checks
 */

// When you assign an object literal to a variable with a declared type
// TypeScript makes sure it has the properties of that type and no others:
interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
  // ~~~~~~~~~~~~~~~~~~ Object literal may only specify known properties,
  // and 'elephant' does not exist in type 'Room'
};

// That constant is assignable to the Room type,
// which you can see by introducing an intermediate variable:
const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
};
const r2: Room = obj; // OK

// in the first you've triggered a process known as "exxcess property checking"
// But this process has its limits(an intuition for structural typing)
// Recognize excess property checking as a distinct process

// this code doesn't throw any sort of error at runtime (because of structural typing)
interface Options {
  title: string;
  darkMode?: boolean;
}
function createWindow({ title, darkMode }: Options) {
  if (darkMode) {
    // ...
  }
  // ...
}
createWindow({
  title: 'Spider Solitaire',
  darkmode: true, // error, Did you mean `darkMode` ?
});

// here are a few more values that are assignable to `Options`
const o1: Options = document; // OK
const o2: Options = new HTMLAnchorElement(); // OK

// Excess property checking tries to rein this in
// without compromising the fundamentally structural nature of the type system
// It does this by disallowing unknown properties specifically on object literals
// It’s sometimes called “strict object literal checking” for this reason.
const o3: Options = { darkmode: true, title: 'Ski Free' }; // error

// this explains why using an intermediate variable without a type annotation makes the error go away
const intermediate = { darkmode: true, title: 'Ski Free' }; // obj literal
const o4: Options = intermediate; // this is a good reason to prefer declaration to assertions

// if you don't  want this sort od check, you can tell TS to expect additional props usiong an index signature
interface Options2 {
  darkMode?: boolean;
  [otherOptions: string]: unknown;
}
const o5: Options2 = { darkmode: true }; // OK

// A related check happens for weak tyoes
//  TypeScript adds another check to make sure that the value type and declared type have at least one property in common
interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
const opts = { logScale: true };
const o6: LineChartOptions = opts;
// Type '{ logScale: boolean; }' has no properties in common with type 'LineChartOptions'.
