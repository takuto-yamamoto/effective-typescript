/**
 * item21: understand type widening
 */

// widening
let x21 = 3; // initialized by literal
typeof x21; // number, not 3 ( 3 --widening--> number)

// widening have a few possibilities
// ('x' | 1)[], ['x', 1], [string, number], ...
const mixed = ['x, 1']; // (string | number)[]

// const
const x21const = 'x';
typeof x21const; // type is 'x'

// const with objects
const v21 = {
  x: 1, // type is number, not `1`
};

// as const
const v21Const = {
  xConst: 1, // type is `1`
} as const;
