/**
 * Item3: Understand that code generation is independent of types
 *
 * Things to Reminder
 * - Code generation is independent of the type system.
 * - This means that TS types cannot affect the runtime behavior or performance your code.
 *
 * - It is possible for a program with type errors to produce code ("compile")
 *
 * - TS types are not available at runtime.
 * - To query a type at runtime, you need some way to reconstruct it.
 * - Tagged unions and property checking are common ways to do this.
 * - Some constructs, such as class, introduce both a TS type and a value that is available at runtime.
 */

// tsc does two things. Those two behaviors are entirely independent of one another.
// 1. transpile (to next-generation or older version of JS)
// 2. check your code for type errors

// code with type errors can produce output
let x4 = 'hello';
x4 = 1234;

// TypeScript's types or interfaces should be "erasable".
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  // The `instanceof` check happens at runtime
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

// This works
function calculateArea2(shape: Shape) {
  if ('height' in shape) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

// This also works ("tagged" union)
interface Square {
  kind: 'square';
  width: number;
}
interface Rectangle extends Square {
  kind: 'rectangle';
  height: number;
}
type TaggedShape = Square | Rectangle;

function calculateArea3(shape: TaggedShape) {
  if (shape.kind === 'rectangle') {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

// This also works (class constructor)
class SquareClass {
  constructor(public width: number) {}
}
class RectangleClass extends SquareClass {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type ShapeClass = SquareClass | RectangleClass;

function calculateArea4(shape: ShapeClass) {
  if (shape instanceof RectangleClass) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

// if you'd like to normalize value so that it's always number, this doesn't work.
function asNumber(val: number | string) {
  return val as number;
}

// To normalize the value you'll need to check its runtime type and do the conversion using JS constructs.
function asNumber2(val: number | string) {
  return typeof val === 'string' ? Number(val) : val;
}

// TypeScripts does not complain about this.
// If this function called with 'OK', default branch will be triggered.
// You should be aware that it's possible for a value to have types other than the ones you've declared.
function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      // turnLightOn();
      break;
    case false:
      // turnLightOff();
      break;
    default:
      // value 'OK' hits this branch
      console.log(`I'm afraid I can't do that.`);
  }
}

// You cannot overload a function based on TS types
// because the runtime behavior of your code is independent of its TypeScript types
function normalAdd(a: number, b: number) {
  return a + b;
}
function normalAdd(a: string, b: string) {
  return a + b;
}

// You can overload your function by using type declaration
function overloadedAdd(a: number, b: number): number; // declaration
function overloadedAdd(a: string, b: string): string; // declaration
// single implementation that covers all declarations (only remains when you generate JS)
function overloadedAdd(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
}
const three = overloadedAdd(1, 2);
const twelve = overloadedAdd('1', '2');

// TS types have no effect on runtime performance because types and type operations are erased when you generate JS.
// There are two caveats for this
// 1. TS compliner will introduce build time overhead.
// - but compilation is usually quite fast.
// - If the overhead becomes significant, you can set true `increment` or `transpile only` option.
//   - inclemental build: this method compiles only the changes made since the last build.
//   - transpile only: skip the type checking.
//
// 2. The code that TS emits to support older runtimes may incur a performance overhead vs. native implementations.
// - but in any case, this problem has to do with the emit target and language levels and is still independent of the types.
