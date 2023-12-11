/**
 * Item47: Export All Types That Appear in Public APIs
 *
 * Things to remember
 * - Export types that appear in any form in any public method.
 * - your users will be able to extract them anyway, so you may as well make it easy for them
 */

// if a type even appears in a function declaration, it is effectively exported
interface SecretName {
  first: string;
  last: string;
}
interface SecretSanta {
  name: SecretName;
  gift: string;
}
export function getGift(name: SecretName, gift: string): SecretSanta {
  // ...
  return {
    name: {
      first: 'santa',
      last: 'cloth',
    },
    gift: 'present',
  };
}

type MySanta = ReturnType<typeof getGift>; // SecretSanta
