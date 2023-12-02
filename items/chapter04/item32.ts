/**
 * Item32: Prefer Unions of interfaces to interfaces of unions
 *
 * Things to remember
 * - interfaces with multiple props that are union types are often a mistake
 * - because they obscure the relationships between these props
 *
 * - unions of interfaces are more precise and can be understand by TS
 *
 * - consider adding a 'tag' to your structure to facilitate TS's control flow analysis
 * - Because they are so well supported, tagged unions are ubiquitous in TS code
 */

// bad
interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}

// good
interface FillLayer {
  layout: FillLayout;
  paint: FillPaint;
}
interface LineLayer {
  layout: LineLayout;
  paint: LinePaint;
}
interface PointLayer {
  layout: PointLayout;
  paint: PointPaint;
}
type Layer = FillLayer | LineLayer | PointLayer;

// tagged Union
interface FillLayer2 {
  type: 'fill';
  layout: FillLayout;
  paint: FillPaint;
}
interface LineLayer2 {
  type: 'line';
  layout: LineLayout;
  paint: LinePaint;
}
interface PointLayer2 {
  type: 'paint';
  layout: PointLayout;
  paint: PointPaint;
}
type Layer2 = FillLayer2 | LineLayer2 | PointLayer2;

// conditionals
function drawLayer(layer: Layer2) {
  if (layer.type === 'fill') {
    const { paint } = layer; // Type is FillPaint
    const { layout } = layer; // Type is FillLayout
  } else if (layer.type === 'line') {
    const { paint } = layer; // Type is LinePaint
    const { layout } = layer; // Type is LineLayout
  } else {
    const { paint } = layer; // Type is PointPaint
    const { layout } = layer; // Type is PointLayout
  }
}

// bad ex
interface Person {
  name: string;
  // These will either both be present or not be present
  placeOfBirth?: string;
  dateOfBirth?: Date;
}

// good ex
interface Person {
  name: string;
  birth?: {
    place: string;
    date: Date;
  };
}
function eulogize(p: Person) {
  console.log(p.name);
  const { birth } = p;
  if (birth) {
    console.log(`was born on ${birth.date} in ${birth.place}.`);
  }
}

// if the structure of the type is outside your control
interface Name {
  name: string;
}
interface PersonWithBirth extends Name {
  placeOfBirth: string;
  dateOfBirth: Date;
}
type Person32 = Name | PersonWithBirth;
function eulogize2(p: Person32) {
  if ('placeOfBirth' in p) {
    p; // Type is PersonWithBirth
    const { dateOfBirth } = p; // OK, type is Date
  }
}
