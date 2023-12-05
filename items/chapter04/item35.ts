/**
 * Item35: Generate types from APIs and Specs, Not Data
 *
 * Things to remember
 * - consider generating types for API calls and data formats
 * - to get type safety all the way to the edge of your code
 *
 * - Prefer generating code from specs rather than data.
 * - Rare case matter!
 */

import { Feature, Geometry } from 'geojson';

// generate types from specs, not data
function calculateBoundingBox(f: Feature): BoundingBox | null {
  let box: BoundingBox | null = null;
  const helper = (coords: any[]) => {
    // ...
  };

  const geometryHelper = (g: Geometry) => {
    if (geometry.type === 'GeometryCollection') {
      geometry.geometries.forEach(geometryHelper);
    } else {
      helper(geometry.coordinates); // OK
    }
  };

  const { geometry } = f;

  if (geometry) {
    geometryHelper(geometry);
  }

  return box;
}

/**
 * generate type from GraphQL type system
 * ```
 * $ apollo client:codegen \
 *   --endpoint https://api.github.com/graphql \
 *   --includes license.graphql \
 *   --target typescript
 * ```
 */
