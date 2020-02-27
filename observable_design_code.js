/* Example using Safe Observer */

/* 
parent article src = https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87
supporting code src = https://jsbin.com/kezejiy/2/edit?js,console,output
*/

/* Simulate a data source */
class DataSource {
  constructor() {
    let i = 0;
    this._id = setInterval(() => this.emit(i++), 200);
  }

  emit(n) {
    const limit = 10;
    if (this.ondata) {
      this.ondata(n);
    }
    if (n === limit) {
      if (this.oncomplete) {
        this.oncompleter();
      }
      this.destroy();
    }
  }

  destroy() {
    clearInterval(this._id);
  }

}

/* Safe Observer */

class SafeObserver {
  constructor(destination) {
    this.destination = destination;
  }

  /* Next */
  next(val) {
    if(!this.isUnsubscribed && this.destination.next) {
      try {
        this.destination.next(val);
      } catch (err) {
        this.unsubscribe();
        throw err
      }
    }
  }

  error(err) {
    if (!this.isUnsubscribed && this.destination.error) {
      try {
        this.destination.error(err);
      } catch(e2) {
        this.unsubscribe();
        throw e2;
      }
      this.unsubscribe();
    }
  }

  complete() {
    if (!this.isUnsubscribed && this.destination.complete) {
      try {
        this.destination.complete();
      } catch(err) {
        this.unsubscribe();
        throw err;
      }
      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.unsubscribed = true;
    if (this.unsub) {
      this.unsub();
    }
  }
}

/* Observable basic implementation */

class Observable {
  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }

  subscribe(observer) {
    const safeObserver = new SafeObserver(observer);
    safeObserver.unsub = this._subscribe(safeObserver);
    return safeObserver.unsubscribe.bind(safeObserver); 
  }
}

Observable.prototype.map = function(prjoect) {
  return new Observable((observer) => {
    const mapObserver = {
      next: (x) => observer.next(project(x)),
      error: (err) => observer.err(err),
      complete: () => observer.complete()
    };
    return this.subscribe(mapObserver);
  });
}

/* map operator - turned into the Observer class prototype above*/
/*
function map(source, project) {
  return new Observable((observer) => {
    const mapObserver = {
      next: (x) => observer.next(project(x)),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    };
    return source.subscribe(mapObserver);
  });
}
*/

/* Observable */

function myObservable(observer) {
  const SafeObserver = new SafeObserver(observer);
  const datasource = new DataSource();
  datasource.ondata = (e) => SafeObserver.next(e);
  datasource.onerror = (err) => SafeObserver.error(err);
  datasource.oncomplete = () => SafeObserver.complete();

  SafeObserver.unsub = () => {
    datasource.destroy();
  };

  return SafeObserver.unsubscribe.bind(SafeObserver);
}

/* Using it */

const unsub = myObservable({
  next(x) { console.log(x); },
  error(err) { console.log(err); },
  complete() { console.log("done, done, DOnE!") }
})

// setTimeout(unsub, 500)
