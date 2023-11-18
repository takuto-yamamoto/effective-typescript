/**
 * Item5: Limit Use of the any Type
 *
 * Things to remember
 *
 * - The any type effectively silences the type checker and TS language service.
 * - It can mask real problem, harm developer experience, and undermine confidence in the type system.
 * - Avoid using it when you can!
 */

// TS type system is gradual and optional.
// the key to these features is the `any` type
let age: number;
age = '12' as any; // OK, '12'
age += 1; // OK, '121'

// any lets you break contracts
function calculateAge(birthDate: Date): number {
  let age: number = 0;
  // ...do something
  return age;
}
let birthDate: any = '1990-01-19';
calculateAge(birthDate); // OK, return NaN

// There are no language services for `any` types
// Losing language services will lead to a loss in productivity, not just for you but for everyone else working with your code
let person: any = { first: 'George', last: 'Washington' };
person.f; // <-  no autocomplete for properties

// `any` types mask bugs when you refactor code
// prev interface
// interface ComponentProps {
//   onSelectItem: (item: any) => void;
// }
// refactored interface
interface ComponentProps {
  onSelectItem: (id: number) => void;
}

function renderSelector(props: ComponentProps) {
  /* ... */
}

let selectedId: number = 0;

function handleSelectItem(item: any) {
  selectedId = item.id; // id.id???
}

renderSelector({ onSelectItem: handleSelectItem });

// any hides your type design

// any undermines confidence in the type system
// any types are often the source of the errors uncauted by TS type checker.
