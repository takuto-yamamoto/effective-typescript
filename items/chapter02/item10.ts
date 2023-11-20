/**
 * Item10: Avoid object wrapper types(String, Number, Boolean, Symbol, BigInt)
 *
 * Things to remember
 * - Understand how object wrapper types are used to provide methods on primitive values
 * - Avoid instantiating them or using them directly
 *
 * - Avoid TS object wrappers types. Use the primitive types instead.
 */

// Prinitives are distinguished from objects by being immutable and not having methods
// You might object that string do have methods
'primitive'.charAt(3); // m

// JS also defines String object type, JS freely converts between string and String
// when you access a method like charAt on a string primitive, JS wraps it in a String object
// you can observe this if you monkey-patch String.prototype
const originalCharAt = String.prototype.charAt;
String.prototype.charAt = function (pos: any) {
  console.log(this, typeof this, pos);
  return originalCharAt.call(this, pos);
};
console.log('primitive'.charAt(3));
// [String: 'prototype'] 'object' 3
// m

// a String object is only ever equal to itself
'hello' === new String('hello'); // false
new String('hello') === new String('hello'); // false

// if you assign a property to a primitive, it disappears(in JS)
const x10 = 'hello';
x.language = 'English'; // x is String
x.language; // undefined(x is string)

// object wrapper types exists as a convenience to provide methods on the primitive values and provides static methods
// But there's no reason to instance them directly
// better to stick with the primitive types

// as a final note, it's OK to call BigInt and Symbol without new
typeof BigInt(1234); // bigInt
typeof Symbol('sym'); // symbol
