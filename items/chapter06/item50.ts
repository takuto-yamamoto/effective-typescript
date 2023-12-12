/**
 * Item50: Prefer Conditional types to overloaded declarations
 *
 * Things to remember
 * - Prefer conditional types to overloaded type declarations. By distributing over unions,
 * - conditional types allow your declarations to support union types without additional overloads.
 */

// bad
function double(x: number): number;
function double(x: string): string;
function double(x: any) {
  return x + x;
}
double(12); // Type is number
double('x');
function f(x: number | string) {
  return double(x);
  // ~ Argument of type 'string | number' is not assignable
  // to parameter of type 'string'
}

// good
function doubleGood<T extends string | number>(
  x: T
): T extends string ? string : number;
function doubleGood(x: any) {
  return x + x;
}
