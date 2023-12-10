/**
 * Item44: Track your type coverage to prevent regressions in type safety
 *
 * Things to remember
 * - Even with noImplicitAny set,
 * - any types can make their way into your code either through explicit `any`s or third-party type declarations (@types).
 *
 * - Consider tracking how well-typed your program is.
 * - this will encourage you to revisit decisions about using any and increase type safety over time
 */

// add type annotation for values with implicit any and enable noImplicitAny
// and then, any can still enter your programs in two main ways
// 1. Explicit any types: any[] or {[key: string]: any} can be any
// 2. From third-party type declarations: silent any...

// $ npx type-coverage
// 9985 / 10117 98.69%
// This means that, of the 10,117 symbols in this project, 9,985 (98.69%) had a type other than any or an alias to any

//  Running type-coverage with the --detail flag will print where every any type occurs in your code:
// $ npx type-coverage --detail
// path/to/code.ts:1:10 getColumnInfo
// path/to/module.ts:7:1 pt2
// ...
