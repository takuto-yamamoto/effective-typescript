/**
 * Item43: Prefer type safe approaches to monkey patching
 *
 * Things to remember
 * - Prefer structured code to storing data in globals or on the DOM.
 *
 * - If you must store data on built-in types, use one of the type-safe approaches
 * - augmentation or asserting a custom interface
 *
 * - Understand the scoping issues of augmentations
 */

// 1. use an augmentations
interface Document {
  monkey: string;
}
document.monkey = 'Tamarin'; // OK

// 2. use more precise type assertion
interface MonkeyDocument extends Document {
  monkey: string;
}
(document as MonkeyDocument).monkey = 'Macaque';
