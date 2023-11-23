/**
 * Item13: Know the differences between type and interface
 *
 * Things to remember
 * - Understand the differencies and similarities between type and interfaces
 *
 * - Know how to write the same types using either syntax
 *
 * - In deciding which to use in your project, consider the established stype
 * - and whether augumentation might be beneficial
 */

// you have two options.
type TState = {
  name: string;
  capital: string;
};
interface IState {
  name: string;
  capital: string;
}

// which should you use, type of interface?
// In many situations, you can use either
// you should be aware of the distinctions that remain between type and interface
// But you sould also know how to write the same types using both

// First, the similarities
// the State types are nearly indistinguishable from one
const TWyoming: TState = {
  name: 'Wyoming',
  capital: 'Cheyenne',
  population: 500_000,
};
const IWyoming: IState = {
  name: 'Wyoming',
  capital: 'Cheyenne',
  population: 500_000,
};
// index signature
type TDict = { [key: string]: string };
interface IDict {
  [key: string]: string;
}
// function types
type TFn = (x: number) => string;
interface IFn {
  (x: number): string;
}
const toStrT: TFn = (x) => '' + x;
const toStrI: IFn = (x) => '' + x;
// function with props
type TFnWithProperties = {
  (x: number): number;
  prop: string;
};
interface IFnWithProperties {
  (x: number): number;
  prop: string;
}
// generics
type TPair<T> = {
  first: T;
  second: T;
};
interface IPair<T> {
  first: T;
  second: T;
}
// extention
interface IStateWithPop extends TState {
  population: number;
}
type TStateWithPop = IState & { population: number };
// class implementation
class StateT implements TState {
  name: string = '';
  capital: string = '';
}
class StateI implements IState {
  name: string = '';
  capital: string = '';
}

// Differencies
// union
type AorB = 'a' | 'b';
// exxtending union types can be useful
type Input = {
  /* */
};
type Output = {
  /* */
};
interface VariableMap {
  [name: string]: Input | Output;
}
type NamedVariable = (Input | Output) & { name: string };

// A type is, in general, more capable than an interface
// Array, Tuple
type Pair = [number, number]; // better to use `type`
type StringList = string[];
type NamedNums = [string, ...number[]];
// this is awkward and drops all the tuple methods like `concat`
interface ITuple {
  0: number;
  1: number;
  length: 2;
}

// interface advantages
// an interface can be augumented (daclaration merging)
// This is primarily used with type declaration files
interface IState2 {
  name: string;
  capital: string;
}
interface IState2 {
  population: number;
}
const wyoming: IState2 = {
  name: 'Wyoming',
  capital: 'Cheyenne',
  population: 500_000,
}; // OK

// declaration merge
// this is primary used with `.d.ts` files
// if you're writing one, you should use interface to support it and follow the norms
// TS uses merging to get different types for the different versions of JS's standard library

// Summary
// - For complex types => `type`
// - For simple types => consider consistency and augumentation
//   - consistency: depends on PJ's style guide
//   - For projects without an established style, you should think about augumentation
//     - are you publishing type declaration for an API?
