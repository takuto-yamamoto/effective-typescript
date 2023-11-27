/**
 * Item23: Create Objects all at once
 *
 * Things to remember
 * - Prefer to build objects all at once rather than piecemeal.
 * - Use Object spread to add properties in a type-safe way
 *
 * - know how to conditionally add props to an object
 */

// piece by piece -> error
// ex1
const pt = {};
pt.x = 3; // pt is {}
pt.y = 4; // pt is {}
// ex2
interface Point {
  x: number;
  y: number;
}
const pt2: Point = {}; // Point <-> {}
// solution
const ptGood: Point = { x: 3, y: 4 }; // at once!

// larger object
const pt3 = {};
const pt4 = { ...pt3, x: 3 };
const pt5: Point = { ...pt4, y: 4 }; // OK

// add no props
const is3D: boolean = true;
const pt6 = { ...pt5, ...(is3D ? { z: 6 } : {}) };
