/**
 * Item17: Use readonly to avoid errors associated with mutation
 *
 * Things to remember
 * - if your function does not modify its params then declare them readonly
 * - this makes its contract clearer and prevents inadvertant mutations in its implementation
 *
 * - use readonly to prevent errors with mutation and to find the places in your code where mutation occur
 *
 * - understand the difference between const and readonly
 *
 * - understand that readonly is shallow
 * - use DeepReadonly in ts-essentials or as const word
 */

// array.prototype.pop() is mutable.
function arraySum(arr: number[]) {
  let sum = 0;
  let num;
  while ((num = arr.pop()) !== undefined) {
    sum += num;
  }
  return sum;
}
// use readonly
// you cannot use pop/push/... or some mutable function
// number[] is subtype of readonly number[]
function arraySum2(arr: readonly number[]) {
  let sum = 0;
  let num;
  while ((num = arr.pop()) !== undefined) {
    sum += num;
  }
  return sum;
}

// readonly modifier wouldn't be much use if you could get rid of it without even a type assertion
const a17: number[] = [1, 2, 3];
const b17: readonly number[] = a17;
const c17: number[] = b17; // error

// functions don’t mutate their parameters unless explicitly noted.
// but these sorts of implicit understandings can lead to trouble with type checking
// Better to make them explicit, both for human readers and for tsc.

// If your function does not mutate its parameters, then you should declare them readonly.
// there's relatively little downside
function safeArraySum(arr: readonly number[]) {
  let sum = 0;
  for (const num of arr) {
    sum += num;
  }
  return sum;
}

// one downside
// you may need to call function that haven't marked thier params readonly
// readonly tends to be contagious, so if youre calling a function in another library, ...

// readonly can also be used to catch a whole class of mutation errors
function parseTaggedText(lines: string[]): string[][] {
  const paragraphs: string[][] = [];
  const currPara: string[] = [];

  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push(currPara); // this pushes a reference to the currPara
      currPara.length = 0;
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else currPara.push(line);
  }
  addParagraph();
  return paragraphs;
}
// ↓↓↓
function parseTaggedText2(lines: string[]): string[][] {
  let paragraphs: string[][] = [];
  let currPara: readonly string[] = [];

  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push([...currPara]); // returns a new array
      currPara = [];
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else {
      currPara = currPara.concat([line]); // concat() is immutable
    }
  }
  addParagraph();
  return paragraphs;
}
// or
// but it seems a bit rude to users of this function
function parseTaggedText3(lines: string[]): (readonly string[])[] {
  let paragraphs: (readonly string[])[] = [];
  let currPara: readonly string[] = [];

  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push(currPara);
      currPara = [];
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else {
      currPara = currPara.concat([line]);
    }
  }
  addParagraph();
  return paragraphs;
}
// or
function parseTaggedText4(lines: string[]): string[][] {
  const paragraphs: string[][] = [];
  let currPara: readonly string[] = [];

  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push(currPara as string[]); // assertion doesn't seem like the most offensive
      currPara = [];
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else {
      currPara = currPara.concat([line]);
    }
  }
  addParagraph();
  return paragraphs;
}

// readonly is shallow
// example 1
const dates: readonly Date[] = [new Date()];
dates.push(new Date()); // Error
dates[0].setFullYear(2037); // OK
// example 2
interface Outer {
  inner: {
    x: number;
  };
}
const ro: Readonly<Outer> = { inner: { x: 1 } };
ro.inner = { x: 1 }; // NG
ro.inner.x = 2; // OK
// The DeepReadonly generic in ts-essentials is one implementation
const dro: DeepReadOnly<Outer> = { inner: { x: 1 } };
dro.inner = { x: 1 }; // OK

// you can write readonly on an index signature
let roObj: { readonly [k: string]: number } = {};
roObj.hi = 45; // NG
roObj = { ...roObj, hi: 45 }; // OK
