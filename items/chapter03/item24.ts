/**
 * Item24: Be consistent in your use of aliases
 *
 * Things to remember
 * - aliasing can prevent TS from narrowing type.
 * - If you create an alias for a variable, use it consistently
 *
 * - use destructuring syntax to encourage consistent naming
 *
 * - be aware of how function calls can invalidate type refinements on props.
 * - trust refinements on local variables more than on properties
 */

// alias
const borough = { name: 'Brooklyn', location: [40.688, -73.979] };
const loc = borough.location;
loc[0] = 0;
borough.location[0]; // 0

// if you introduce an alias, use it consistently
// ex
interface Coordinate {
  x: number;
  y: number;
}
interface BoundingBox {
  x: [number, number];
  y: [number, number];
}
interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;
  if (polygon.bbox) {
    if (
      pt.x < box.x[0] || // 'box' is possibly 'undefined'.
      pt.x > box.x[1] ||
      pt.y < box.y[1] ||
      pt.y > box.y[1]
    ) {
      return false;
    }
  }
  const { bbox } = polygon; // obj destructuring syntax rewards consistent naming
  if (bbox) {
    if (
      pt.x < bbox.x[0] || // OK
      pt.x > bbox.x[1] ||
      pt.y < bbox.y[1] ||
      pt.y > bbox.y[1]
    ) {
      return false;
    }
  }
}

// dangerous
function fnP(p: Polygon) {
  /* ... */
}
const polygon: Polygon = { exterior: [], holes: [] };
polygon.bbox; // Type is BoundingBox | undefined
if (polygon.bbox) {
  polygon.bbox; // Type is BoundingBox
  fnP(polygon); // this might change polygon props
  polygon.bbox; // Type is still BoundingBox
}
