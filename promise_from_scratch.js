/*  coding along with a 'Make Your Own Promise' guide.
source: https://thecodebarbarian.com/write-your-own-node-js-promise-library-from-scratch.html */



/*

--NOTES--

"A Promise is a state machine with 3 states: 
  pending
  fulfilled
  rejected
"
*/

class customPromise {

  constructor(executor) {

    if(typeof executor !== 'function') {
      throw new Error('Executor must be a function');
    }

    this.$state = 'PENDING';
    this.$chained = [];

    const resolve = res => {
      /*stop res/rej from being called twice */
      if (this.$state !== 'PENDING') {
        return;
      }

      /*Set the state to reflect the recieved executor && set value */
      this.$state = 'FULFILLED';
      this.$internalValue = res;

      for (const { onFullfilled } of this.$chained) {
        onFullfilled(res);
      }
    };

    const reject = err => {
      if (this.$state !== 'PENDING') {
        return;
      }

      this.$state = 'REJECTED';
      this.$internalValue = err;

      for (const { onRejected } of this.$chained) {
        onRejected(err)
      }
    };

    /* call executor function with res, rej */
    try {

      executor(resolve, reject);
    }
    catch (err) {
      reject(err)
    }

  }

  then(onFullfilled, onRejected) {
    if (this.$state === 'FULFILLED') {
      onFullfilled(this.$internalValue);
    }
    else if (this.$state === 'REJECTED') {
      onRejected(this.$internalValue);
    } 
    else {
      this.$chained.push({ onFulfilled, onRejected });
    }

  }


}









