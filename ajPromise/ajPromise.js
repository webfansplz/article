const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class AjPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = value;
          this.onFulfilledCallbacks.map(cb => {
            cb = cb(this.value);
          });
        }
      });
    };
    const reject = reason => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.reason = reason;
          this.onRejectedCallbacks.map(cb => {
            cb = cb(this.reason);
          });
        }
      });
    };
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    let newPromise;

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason;
          };
    if (this.state === FULFILLED) {
      return (newPromise = new AjPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }));
    }
    if (this.state === REJECTED) {
      return (newPromise = new AjPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }));
    }
    if (this.state === PENDING) {
      return (newPromise = new AjPromise((resolve, reject) => {
        this.onFulfilledCallbacks.push(value => {
          try {
            let x = onFulfilled(value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(reason => {
          try {
            let x = onRejected(reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }));
    }
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    reject(new TypeError('循环引用'));
  }
  if (x instanceof AjPromise) {
    if (x.state === PENDING) {
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject);
        },
        reason => {
          reject(reason);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else if (x && (typeof x === 'function' || typeof x === 'object')) {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

AjPromise.all = function (promises) {      
  return new AjPromise((resolve, reject) => {
    let done = gen(promises.length, resolve);
    promises.forEach((promise, index) => {
      promise.then((value) => {
        done(index, value)
      }, reject)
    })
  })
}

function gen(length, resolve) {
  let count = 0;
  let values = [];
  return function (i, value) {
    values[i] = value;
    if (++count === length) {
      resolve(values);
    }
  }
}


AjPromise.race = function (promises) {    
  return new AjPromise((resolve, reject) => {
    for (var i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}
AjPromise.resolve = function (value) {
  return new AjPromise((resolve, reject) => resolve(value);
}
AjPromise.reject = function (reason) {
  return new AjPromise((resolve, reject) => reject(reason));
}


AjPromise.deferred = function() {
  let defer = {};
  defer.promise = new AjPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

module.exports = AjPromise;
