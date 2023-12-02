/**
 * Item33: prefer more precise alternatives to string types
 *
 * Things to remember
 * - avoid "stringly typed" code.
 * - Prefer more appropriate types where not every string is a possibility
 *
 * - Prefer a union of string literal types to string
 * - if that more accurately describes the domain of a variable
 * - you'll get stricter type checking and improve the development experience
 *
 * - prefer keyof T to string for function parameters that are expected to be properties of an object
 */

// bad
interface Album {
  artist: string;
  title: string;
  releaseDate: string; // YYYY-MM-DD
  recordingType: string; // 'live' or 'studio'
}

// good
type RecordingType = 'live' | 'studio';
interface Album2 {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}

// bad ex
function pluck<T>(records: T[], key: string): T[] {
  return records.map((record) => record[key]);
}
function pluck2<T>(records: T[], key: keyof T): T[keyof T][] {
  return records.map((record) => record[key]);
}
// good ex
function plunk3<T, K extends keyof T>(records: T[], key: K): T[K][] {
  return records.map((record) => record[key]);
}
