/**
 * Item19: Avoid cluttering your code with inferable types
 *
 * Things to remember
 * - avoid writing type annotations when TS can infer the same type
 *
 * - ideally your code has type annotations in function/method signatures
 * - but not on local variables in their bodies
 *
 * - consider using explicit annotations for object literal and function return types even when they can be inferred.
 * - This will help prevent implementation errors from surfacing in user code
 */

// The explicit type annotation is redundant
// TS will infer the types
let xNum = 12;
const inferablePerson = {
  name: 'Sojourner Truth',
  born: {
    where: 'Swarthily, NY',
    when: 'c.1797',
  },
  died: {
    where: 'Battle Creek, MI',
    when: 'Nov. 26, 1883',
  },
};

// TS may infer something more precise than what you expected
const axis1: string = 'x'; // type is string
const axis2 = 'x'; // type is 'x'

// type inference will also facilitate refactoring
interface Product {
  id: number;
  name: string;
  price: number;
}
function logProduct(product: Product) {
  const id: number = product.id;
  const name: string = product.name;
  const price: number = product.price;
  console.log(id, name, price);
}
// change the type of id in Product
interface Product2 {
  id: string;
  name: string;
  price: number;
}
function logProduct2(product: Product2) {
  const id: number = product.id; // error
  const name: string = product.name;
  const price: number = product.price;
  console.log(id, name, price);
}
// ↓↓↓
function logProduct3({ id, name, price }: Product2) {
  console.log(id, name, price);
}

// Explicit type annotations are still required in some situations where TypeScript doesn’t have enough context to determine a type on its own
// You have seen one of these before: function parameters.

// ideal TS code includes type annotations for function/method signatures but not for the local variables
// if the function has default value, there's no need for annotation
function parseNumber(str: string, base = 10) {
  // ...
}

// There are a few situations where you may still want to specify a type even where it can be inferred.
// 1. object literal
// you enable excess property checking
const elmo: Product2 = {
  name: 'Tickle Me Elmo',
  id: '048188 627152',
  price: 28.99,
};
// 2. some function's return type
// case2-1 you want to use a named type
interface Vector2D19 {
  x: number;
  y: number;
}
function add19(a: Vector2D19, b: Vector2D19) {
  return { x: a.x + b.x, y: a.y + b.y }; // not Vector2D, but {x: number, y: number}
}
type Vector2D19Fn = (a: Vector2D19, b: Vector2D19) => Vector2D19;
const add192: Vector2D19Fn = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
// case2-2
async function getQuote1(ticker: string) {
  return await fetch(`https://quotes.example.com/?q=${ticker}`).then(
    (response) => response.json
  );
}
// ↓↓↓ add cache feature
const cache: { [ticker: string]: number } = {};
async function getQuote2(ticker: string) {
  if (ticker in cache) {
    return cache[ticker];
  }
  return await fetch(`https://quotes.example.com/?q=${ticker}`)
    .then((response) => response.json())
    .then((quote) => {
      cache[ticker] = quote;
      return quote;
    });
}
// ↓↓↓ define return type
function getQuote3(ticker: string): Promise<number> {
  if (ticker in cache) {
    return cache[ticker]; // error
  }
  return fetch(`https://quotes.example.com/?q=${ticker}`)
    .then((response) => response.json())
    .then((quote) => {
      cache[ticker] = quote;
      return quote;
    });
}
// ↓↓↓ TODO: async/await
async function getQuote4(ticker: string): Promise<number> {
  if (ticker in cache) {
    return cache[ticker]; // errorならない
  }
  return await fetch(`https://quotes.example.com/?q=${ticker}`)
    .then((response) => response.json())
    .then((quote) => {
      cache[ticker] = quote;
      return quote;
    });
}

// you should know what its input and output are before you implement it
// This is similar in spirit to TDD
