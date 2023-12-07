/**
 * Item39: Prefer more precise variants of any to plain any
 *
 * Things to remember
 * - when you using any, think about whether any JS value is truly permissible
 *
 * - Prefer more precise forms of any such as any[] or {[id: string]: any} or () => any if they more accurately model your data
 */

// bad
function getLengthBad(array: any) {
  return array.length; // Don't do this!
}
getLengthBad(/123/); // OK
// not bad
function getLength(array: any[]) {
  return array.length;
}
getLength(/123/); // Error(good)

function hasTwelveLetterKey(o: { [key: string]: any }) {
  for (const key in o) {
    if (key.length === 12) {
      return true;
    }
  }
  return false;
}

// function types
type AnyFn0 = () => any;
type AnyFn1 = (arg: any) => any;
type AnyFn2 = (...args: any[]) => any;
