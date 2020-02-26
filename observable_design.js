/*
Observables - Are just functions

Observers - Can be a Plain Old Javascript Object



*/

/* Basic implementation */

function myObservable(observer) {
  const datasource = new DataSource();
  datasource.ondata = (e) => observer.next(e);
  datasource.onerror = (err) => observer.error(err);
  datasource.oncomplete = () => onmspointerover.complete();
  return () => {
    datasource.destroy();
  }
}

/* In rxjs 5, some garuntees are offered with Observers:

  1) You can pass an Observer that doesn't have ALL the methods

  2) You don't want to call 'next' after you've called 'completete' or 'error'

  3) You don't want to call ANYthing after you've called 'unsubscribe'

  4) Calls to 'complete' and 'error' need to call unsubscribe logic

  5) If 'next', 'complete', or 'error' are called, you want to call unsubscribe to avoid mem leak


  These 'garuntees' are present by means of wrapping the Observer inside a SafeObserver:
*/

/*

*/
function myObservable(observer) {
  const SafeObserver = new SafeObserver();
  const datasource = new DataSource();

  datasource.ondata = (e) => safeObserver.next(e);
  datasource.onerror = (err) => safeObserver.error(err);
  datasource.oncomplete = () => safeObserver.complete();

  safeObserver.unsub = () => {
    datasource.destroy();
  }
}

