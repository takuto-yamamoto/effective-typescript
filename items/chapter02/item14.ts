/**
 * Item14: Use type operations and generics to avoid repeating yourself
 *
 * Things to remember
 * - DRY principal
 *
 * - Name types rather than repeating them
 * - Use extends to avoid repeting fields in interfaces
 *
 * - keyof, typeof, mappedtypesを活用しよう
 *
 * - Generic types are the equivalent of functions for types.
 * - Use them to map between types instead of repeating types. Use extends to constrain generic types.
 *
 * - Familiarize yourself with generic types defined in the standard library such as Pick, Partial, ReturnType...
 */

// uncomfortable repetation
console.log(
  'Cylinder 1 x 1 ',
  'Surface area:',
  6.283185 * 1 * 1 + 6.283185 * 1 * 1,
  'Volume:',
  3.14159 * 1 * 1 * 1
);
console.log(
  'Cylinder 1 x 2 ',
  'Surface area:',
  6.283185 * 1 * 1 + 6.283185 * 2 * 1,
  'Volume:',
  3.14159 * 1 * 2 * 1
);
console.log(
  'Cylinder 2 x 1 ',
  'Surface area:',
  6.283185 * 2 * 1 + 6.283185 * 2 * 1,
  'Volume:',
  3.14159 * 2 * 2 * 1
);
// DRY principle
type CylinderFn = (r: number, h: number) => number;
const surfaceArea: CylinderFn = (r, h) => 2 * Math.PI * r * (r + h);
const volume: CylinderFn = (r, h) => Math.PI * r * r * h;
const cylinders = [
  [1, 1],
  [1, 2],
  [2, 1],
];
for (const [r, h] of cylinders) {
  console.log(
    `Cylinder ${r} x ${h}`,
    `Surface area: ${surfaceArea(r, h)}`,
    `Volume: ${volume(r, h)}`
  );
}

// duplication is more common in types
// The simplest way to reduce repetition is by naming your types
function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
interface Point2D {
  x: number;
  y: number;
}
function distance2(a: Point2D, b: Point2D) {
  /* ... */
}

// if several functions share the same type signature, for instance
function get(url: string, opts: Options): void {
  /* ... */
}
function post(url: string, opts: Options): void {
  /* ... */
}
// ↓↓↓
type HTTPFunction = (url: string, opts: Options) => void;
const get2: HTTPFunction = (url, opts) => {
  /* ... */
};
const post2: HTTPFunction = (url, opts) => {
  /* ... */
};

// making one interface extend the other
interface Person {
  firstName: string;
  lastName: string;
}
interface PersonWithBirthDate extends Person {
  birth: Date;
}
// when you want to add some addtional type to a union type, you can also use intersection types
type TPersonWithBirthDate = Person & {
  birth: Date;
};

// hmm...
interface State14 {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}
interface TopNavState14 {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
}
// ↓↓↓
// more concise!!!
type TopNavState142 = {
  [k in 'userId' | 'pageTitle' | 'recentFiles']: State14[k];
};
// ↓↓↓
// by using utility types
// type Pick<T, K> = { [ k in K ]: T[k] };
type TopNavState143 = Pick<State14, 'userId' | 'pageTitle' | 'recentFiles'>;

// tagged union's dupulication
interface SaveAction {
  type: 'save';
  // ...
}
interface LoadAction {
  type: 'load';
  // ...
}
type Action = SaveAction | LoadAction;
type BadActionType = 'save' | 'load'; // dupulicated
type GoodActionType = Action['type']; // 'save' | 'load'
type ActionRec = Pick<Action, 'type'>; // {type: 'save' | 'load' } ≠ 'save' | 'load'

// optional update
interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}
interface OptionsUpdate {
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}
class UIWidget {
  constructor(init: Options) {
    /* ... */
  }
  update(options: OptionsUpdate) {
    /* ... */
  }
}
// ↓↓↓
type OptionsUpdate2 = {
  // keyof gives you a union of the types of its keys
  [key in keyof Options]?: Options[key];
  // >>> Type is width | height | color | label
};
// ↓↓↓ Mapped type `Partial`
type OptionsUpdate3 = Partial<Options>;

// typeof: the shape of a defined value
// **But it's usually better to define types first and declare that values are assignable to them.**
const INIT_OPTIONS = {
  width: 640,
  height: 480,
  color: '#00FF00',
  label: 'VGA',
};
type Options14 = typeof INIT_OPTIONS;

// named type for a return value
// **But it's usually better to define types first and declare that values are assignable to them.**
function getUserInfo(userId: string) {
  // ...
  return {
    userId,
    name,
    age,
    height: 100,
    weight: 50,
    favoriteColor: 'red',
  };
}
// ↓↓↓
type UserInfo = ReturnType<typeof getUserInfo>;

// Generic type
// how do you constrain the parameters in a generic type? -> extends
interface Name {
  first: string;
  last: string;
}
type DancingDuo<T extends Name> = [T, T];
const couple1: DancingDuo<Name> = [
  { first: 'Fred', last: 'Astaire' },
  { first: 'Ginger', last: 'Rogers' },
];
