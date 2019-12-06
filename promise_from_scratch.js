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

      /*if 'res' is thenable, lock it in otherwise reject it */
      const then = res != null ? res.then : null;
      if (typeof then === 'function') {
        /*at this point- resolved but still pending */
        return then(resolve, reject);
      }

      /*Set the state to reflect the recieved executor && set value */
      this.$state = 'FULFILLED';
      this.$internalValue = res;

      for (const { onFulfilled } of this.$chained) {
        onFulfilled(res);
      }

      return res
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

  then(onFulfilled, onRejected) {

    return new customPromise((resolve, reject) => {

      /*Catch any errors and reject to avoid crashing process */

      const _onFulfilled = res => {
        try {
          resolve(onFulfilled(res));
        }
        catch (err) {
          reject(err);
        }
      };

      const _onRejected = err => {
        try {
          reject(err);
        }
        catch (_err) {
          reject(_err);
        }
      }
      
      if (this.$state === 'FULFILLED') {
        _onFulfilled(this.$internalValue);
      }
      else if (this.$state === 'REJECTED') {
        _onRejected(this.$internalValue);
      } 
      else {
        this.$chained.push({ onFulfilled: _onFulfilled, onRejected: _onRejected });
      }
      
    });
  }


}









