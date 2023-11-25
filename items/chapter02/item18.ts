/**
 * Item18: Use MappedTypes to keep values in sync
 *
 * Things to remember
 * - use mapped types to keep related values and types synchronized
 *
 * - consider using mapped types to force choices when adding new props to an interface
 */

// Changing data or display properties will require a redraw,
// but changing the event handler will not.
interface ScatterProps {
  // data
  xs: number[];
  ys: number[];

  // display
  xRange: [number, number];
  yRange: [number, number];

  // events
  onClick: (x: number, y: number, index: number) => void;
}
// less common approach
function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k]) {
      if (k !== 'onClick') return true;
    }
  }
  return false;
}
// common approach: to use mapped type
const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  onClick: false,
};
function shouldUpdate2(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k]) {
      if (k !== 'onClick' && REQUIRES_UPDATE[k]) return true;
    }
  }
  return false;
}

// If future you adds a new property to ScatterProps:
// Then this will produce an error in the definition of REQUIRES_UPDATE:
