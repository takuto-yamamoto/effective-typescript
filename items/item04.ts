/**
 * Item4: Get comfortable with structural typing
 *
 * Things to reminder
 * - Understand that JS is duck typed and TS uses structural typing to model this
 * - values assignable to your interfaces might have properties beyond those explicitly listed in your type declarations.
 * - Types are not 'sealed'.
 *
 * - Be aware that classes also follow structural typing rules.
 * - You may not have an instance of the class you expect.
 *
 * - Use structual typing to facilitate unit testing.
 */

// TS is inherently duck typed. (because TS type system models JS behavior)
// NamedVector's structure is compatible with Vector2D
// This is where the term "structural typing" comes from.
interface Vector2D {
  x: number;
  y: number;
}
function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
interface NamedVector {
  name: string;
  x: number;
  y: number;
}
const v: NamedVector = { x: 3, y: 4, name: 'Zee' };
calculateLength(v);

// But this can also lead to trouble
// If you want this ("duck typing") to be an error, you have some options.
interface Vector3D {
  x: number;
  y: number;
  z: number;
}
function normalize(v: Vector3D) {
  const length = calculateLength(v);
  return {
    x: v.x / length, // 0.6 (false)
    y: v.y / length, // 0.8 (false)
    z: v.z / length, // 1.0 (false)
  };
}

// your types are "open". This can sometimes lead to surprises
function calculateLengthL1(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v)) {
    const coord = v[axis]; // string can't be used to index type 'Vector3D'
    length += Math.abs(coord);
  }
  return length;
}

// The logic in the previous paragraph assumes that Vector3D is sealed and does not hove other property
// But it could.
const vec3D = { x: 3, y: 4, z: 1, address: '123 Broadway' };
calculateLengthL1(vec3D); // OK, because Math.abs('123 Broadway') returns NaN

// Iterationg over objects can be tricky to type correctly.
// In this case an implementation without loops would be better.
function improvedCalculateLengthL1(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}

// structual typing can also lead to surprises with classes, which are compared structurally for assignability.
class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}
const c = new C('instance of C');
const d: C = { foo: 'object literal' }; // OK

// structural typing is beneficial when you're writing tests
interface Author {
  first: string;
  last: string;
}
function getAuthors(database: PostgresDB): Author[] {
  const authorRows = database.runQuery('SELECT FIRST, LAST FROM AUTHORS');
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}

// To test this, you could create a mock PostgresDB
// But a better approach is to use structural typing and define a narrower interface.
interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors2(database: DB): Author[] {
  const authorRows = database.runQuery('SELECT FIRST, LAST FROM AUTHORS');
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}

// test code
test('getAuthors', () => {
  const authors = getAuthors({
    runQuery(sql: string) {
      return [
        ['Toni', 'Morrison'],
        ['Maya', 'Angelou'],
      ];
    },
  });
  expect(authors).toEqual([
    ['Toni', 'Morrison'],
    ['Maya', 'Angelou'],
  ]);
});
