/**
 * Item37: Consider "brands" for nominal typing
 *
 * Things to remember
 * - TS uses structural typing, which can sometimes lead to surprising results
 * - if you need nominal typing, consider attaching brands to your values
 *
 * - in some cases you may be able to attach brands entirely in the type system, rather than at runtime
 * - you can use this technique to model properties outside of TS type system
 */

// nominal typing <-> structural typing
interface Vector2D37 {
  _brand: '2d'; // brands for nominal typing
  x: number;
  y: number;
}
function vec2D(x: number, y: number): Vector2D37 {
  return { x, y, _brand: '2d' };
}
function calculateNorm(p: Vector2D37) {
  return Math.sqrt(p.x * p.x + p.y * p.y); // Same as before
}
calculateNorm(vec2D(3, 4)); // OK, returns 5
const vec3D37 = { x: 3, y: 4, z: 1 };
calculateNorm(vec3D37); // _brand is missing in type...

// ex2
type AbsolutePath = string & { _brand: 'abs' };
const isAbsolutePath = (path: string): path is AbsolutePath => {
  return path.startsWith('/');
};
function listAbsolutePath(path: AbsolutePath) {
  // ...
}

function f(path: string) {
  if (isAbsolutePath(path)) {
    listAbsolutePath(path);
  }
  listAbsolutePath(path);
  // ~~~~ Argument of type 'string' is not assignable
  // to parameter of type 'AbsolutePath'
}
