/**
 * Item15: use index signatures for dynamic data
 *
 * Things to remember
 * - use index signatures when the props of an obj cannot be known until runtime
 * - ex. if youre loading them from a CSV file
 *
 * - consider adding undefined to the value type of an index signature for safer access
 *
 * - prefer more precise types to index signatures when possible
 * - interface, Records or mapped types
 */

// index signature
// 1. A name for the keys (purely for the documents)
// 2. A type for the keys
// 3. A type for the values
type Rocket = { [key: string]: string };
const rocket: Rocket = {
  name: 'Falcon9',
  variant: 'v1.0',
  thrust: '4,940kN',
};

// index signatures are not very precise because
// 1. it allows any keys, including incorrect ones
// 2. it doesn't require any specific keys to be presant. {} is also valid Rocket
// 3. it cannot have distinct type for different keys
// 4. TS language services cant help you with types

// Rocket should be clearly be an interface
interface IRocket {
  name: string;
  variant: string;
  thrust_kN: number;
}
const falconHeavy: IRocket = {
  name: 'Falcon Heavy',
  variant: 'v1',
  thrust_kN: 15_200,
};

// when should you use index signature for?
// canoninal case: for dynamic data
type CSVParser = (input: string) => { [columnName: string]: string }[];
const parseCSV: CSVParser = (input) => {
  const [header, ...rows] = input.split('\n');
  return rows.map((rowStr) => {
    const row: { [columnName: string]: string } = {};
    rowStr.split(',').forEach((cell, i) => {
      row[header[i]] = cell;
    });
    return row;
  });
};

//  If the user of parseCSV knows more about what the columns are in a particular context
interface ProductRow {
  productId: string;
  name: string;
  price: string;
}
declare let csvData: string;
const products = parseCSV(csvData) as unknown as ProductRow[]; // no guarantee

// you can implement function safer (but less convenient)
function safeParseCSV(
  input: string
): { [columnName: string]: string | undefined }[] {
  return parseCSV(input);
}
// every access requires a check
const rows = parseCSV(csvData);
const prices: { [produt: string]: number } = {};
for (const row of rows) {
  prices[row.productId] = Number(row.price);
}
const safeRows = safeParseCSV(csvData);
for (const row of safeRows) {
  prices[row.productId] = Number(row.price);
  // ~~~~~~~~~~~~~ Type 'undefined' cannot be used as an index type
}

// If your type has a limited set of possible fields, don’t model this with an index signature.
interface Row1 {
  [column: string]: number;
} // Too broad
interface Row2 {
  a: number;
  b?: number;
  c?: number;
  d?: number;
} // Better
type Row3 =
  | { a: number }
  | { a: number; b: number }
  | { a: number; b: number; c: number }
  | { a: number; b: number; c: number; d: number }; // most precise, but inconvenient

// if the problem with using an index signature is that string is too broad,
// then there are a few alternatives.
// 1. Record
type Vec3D = Record<'x' | 'y' | 'z', number>;
// 2. Mapped type
type MVec3D = { [k in 'x' | 'y' | 'z']: number };
type ABC = { [k in 'a' | 'b' | 'c']: k extends 'b' ? string : number };
