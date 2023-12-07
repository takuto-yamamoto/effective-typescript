/**
 * Item40: Hide unsafe type assertions in well-typed functions
 *
 * Things to remember
 * - Sometimes unsafe type assertions are necessary or expedient
 * - when you need to use one, hide it inside a function with a correct signature
 */

// signature is easy to define
declare function cacheLast<T extends Function>(fn: T): T;

// type-safe function without assertion is hard to define
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;
  return function (...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T;
}
