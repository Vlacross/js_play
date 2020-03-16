/* 
Coding along with various examples of memoization functions

src:
*/

const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      console.log('fetching from cashay', n);
      return cache[n];
    }
    else {
      console.log('Calculating result', n);
      return cache[n]
    }
  }
}

const factorial = memoize(
  (x) => {
    if (x == 0) {
      return 1;
    }
    else {
      return x * factorial(x - 1);
    }
  }
);


