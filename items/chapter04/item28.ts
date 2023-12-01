/**
 * Item28: prefer types that always represent valid state
 *
 * Things to remember
 * - Types that represent both valid and invalid states are likely to lead to confusing and error-prone code
 *
 * - prefer types that only represent valid states.
 * - Even if they are longer or harder to express they will save you time and pain in the end
 */

// bad example
interface State28 {
  pageText: string;
  isLoading: boolean;
  error?: string;
}

function renderPage(state: State28) {
  const currentPage = 'currentPage';

  if (state.error) {
    return `Error! Unable to load ${currentPage}: ${state.error}`;
  } else if (state.isLoading) {
    return `Loading ${currentPage}...`;
  }
  return `<h1>${currentPage}</h1>\n${state.pageText}`;
}

async function changePage(state: State28, newPage: string) {
  state.isLoading = true;
  try {
    const response = await fetch(getUrkForPage(newPage));
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const text = await response.text();
    state.isLoading = false;
    state.pageText = text;
  } catch (e) {
    state.error = '' + e;
  }
}

// some problems
// 1. to set state.isLoading to false in error case
// 2. didn't clear state.error
// 3. • If the user changes pages again while the page is loading, who knows what will happen

// better way
interface RequestPending {
  state: 'pending';
}
interface RequestError {
  state: 'error';
  error: string;
}
interface RequestSuccess {
  state: 'ok';
  pageText: string;
}
type RequestState = RequestSuccess | RequestPending | RequestError;

interface ImprovedState {
  currentPage: string;
  requests: { [page: string]: RequestState };
}

function improvedRenderPage(state: ImprovedState) {
  const { currentPage } = state;
  const requestState = state.requests[currentPage];
  switch (requestState.state) {
    case 'pending':
      return `Loading ${currentPage}...`;
    case 'error':
      return `Error! Unable to load ${currentPage}: ${requestState.error}`;
    case 'ok':
      return `<h1>${currentPage}</h1>\n${requestState.pageText}`;
  }
}

async function improvedChangePage(state: ImprovedState, newPage: string) {
  state.requests[newPage] = { state: 'pending' };
  state.currentPage = newPage;
  try {
    const response = await fetch(getUrlForOage(newPage));
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const pageText = await response.text();
    state.requests[newPage] = { state: 'ok', pageText };
  } catch (e) {
    state.requests[newPage] = { state: 'error', error: '' + e };
  }
}

// bad interface example
interface CockpitControls {
  leftSideStick: number;
  rightSideStick: number;
}
// there's no good way to implement this function
function getStickSetting(control: CockpitControls) {
  const { leftSideStick, rightSideStick } = control;
  if (leftSideStick === 0) {
    return rightSideStick;
  } else if (rightSideStick === 0) {
    return leftSideStick;
  }
  if (Math.abs(leftSideStick - rightSideStick) < 5) {
    return (leftSideStick + rightSideStick) / 2;
  }
}

// good interface
interface ImprovedCockpitCOntrols {
  stickAngle: number;
}
