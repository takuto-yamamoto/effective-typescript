/**
 * Item36: Name Types Using the Language of Your Problem Domain
 *
 * Things to remember
 * - Reuse names from the domain of your problem
 * - where possible to increase the readability and level of abstraction of your code
 *
 * - Avoid using different names for the same thing: make distinction in names meaningful
 */

// Here’s a type declaration and value with less ambiguity:
interface Animal {
  commonName: string; // not name
  genus: string;
  species: string;
  status: ConservationStatus; // not endangered
  climates: KoppenClimate[]; // not habitat
}
type ConservationStatus = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
// Rather than inventing your own terms, try to reuse terms from the domain of your problem
type KoppenClimate =
  | 'Af'
  | 'Am'
  | 'As'
  | 'Aw'
  | 'BSh'
  | 'BSk'
  | 'BWh'
  | 'BWk'
  | 'Cfa'
  | 'Cfb'
  | 'Cfc'
  | 'Csa'
  | 'Csb'
  | 'Csc'
  | 'Cwa'
  | 'Cwb'
  | 'Cwc'
  | 'Dfa'
  | 'Dfb'
  | 'Dfc'
  | 'Dfd'
  | 'Dsa'
  | 'Dsb'
  | 'Dsc'
  | 'Dwa'
  | 'Dwb'
  | 'Dwc'
  | 'Dwd'
  | 'EF'
  | 'ET';
const snowLeopard: Animal = {
  commonName: 'Snow Leopard',
  genus: 'Panthera',
  species: 'Uncia',
  status: 'VU', // vulnerable
  climates: ['ET', 'EF', 'Dfd'], // alpine or subalpine
};
