/**
 * Item22: understand type narrowing
 *
 * Things to remember
 * - understand how typescript narrows types based on conditional and other types of control flow
 *
 * - use tagged unions and user-defined type guards to help the process of narrowing
 */

// type guard conditionals -> narrowing
const el22 = document.getElementById('foo'); // Type is HTMLElement | null
if (el22) {
  el22; // Type is HTMLElement
  el22.innerHTML = 'Party Time'.blink();
} else {
  el22; // Type is null
  alert('No element #foo');
}

// narrowing can be thwarted by aliasing
// narrowing examples: instanceof conditional, properties check, tagged union, custom function...

interface UploadEvent {
  type: 'upload';
  filename: string;
  contents: string;
}
interface DownloadEvent {
  type: 'download';
  filename: string;
}
type AppEvent = UploadEvent | DownloadEvent;
function handleEvent(e: AppEvent) {
  switch (e.type) {
    case 'download':
      e; // Type is DownloadEvent
      break;
    case 'upload':
      e; // Type is UploadEvent
      break;
  }
}

// user-defined type guard
// `el is HTMLElement` tells the type checker that it can narrow the type of the params
function isInputElement(el: HTMLElement): el is HTMLElement {
  return 'value' in el;
}

// type narrowing across arrays or objects
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}
const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const members = ['Janet', 'Jackson']
  .map((who) => jackson5.find((n) => n === who))
  .filter(isDefined);
