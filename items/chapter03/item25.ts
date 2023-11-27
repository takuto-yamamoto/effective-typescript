/**
 * Item25: Use async functions instead of callbacks for asynchronous code
 *
 * Things to remember
 * - Prefer Promises to callbacks for better composability and type flow
 *
 * - prefer async/await to raw Promise when possible.
 * - they produce more concise, straightforward code and eliminate whole classes of errors
 *
 * - if a function returns a Promise declare it async
 */

// callBack is not easy to handling
function fetchPagesCB() {
  let numDone = 0;
  const response: string[] = [];
  const done = () => {
    const [response1, response2, response3] = response;
    // ...
  };
  const urls = ['url1', 'url2', 'url3'];
  urls.forEach((url, i) => {
    fetchURL(url, (r) => {
      response[i] = url;
      numDone++;
      if (numDone === urls.length) done();
    });
  });
}

// timeout by promise.race
function timeout(mills: number): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout'), mills);
  });
}
async function fetchWithTimeout(url: string, ms: number) {
  return Promise.race([fetch(url), timeout(ms)]); // inferred as Promise<Response>
}

// raw promise equivalent
async function getNumber() {
  return 42;
}
const getNumber2 = () => Promise.resolve(42);

// x Promise<Promise<T>>
// o Promise<T>
async function getJSON(url: string) {
  const response = await fetch(url);
  const jsonPromise = response.json(); // Type is Promise<any>
  return jsonPromise;
}
