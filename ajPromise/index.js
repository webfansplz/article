// http://www.ituring.com.cn/article/66566
//一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（pending）、执行态（Fulfilled）和拒绝态（Rejected）。
const PENDING = 'pending';
const FUlFILLED = 'fulfilled';
const REJECTED = 'rejected';

function resolvePromise(promise2, x, resolve, reject) {
  // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
  if (x === promise2) {
    return reject(new TypeError('循环引用'));
  }
  // 避免多次调用
  let called = false;
  // x是一个promise对象
  if (x instanceof AjPromise) {
    if (x.state === PENDING) {
      x.then(
        res => {
          resolvePromise(promise2, res, resolve, reject);
        },
        e => {
          reject(e);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  }
  //x 是对象或者函数
  else if (x && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          res => {
            if (called) return;
            called = true;
            resolvePromise(promise2, res, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
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

class AjPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];
    // 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值
    // 在 promise 执行结束前其不可被调用
    // 其调用次数不可超过一次
    const resolve = value => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FUlFILLED;
          this.value = value;
          this.fulfilledCallbacks.map(cb => {
            this.value = cb(this.value);
          });
        }
      });
    };
    const reject = value => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.value = value;
          this.rejectedCallbacks.map(cb => {
            this.value = cb(this.value);
          });
        }
      }, 0);
    };
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  // 一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因。
  // promise 的 then 方法接受两个参数：
  // onFulfilled 和 onRejected 都是可选参数。
  // 如果 onFulfilled 不是函数，其必须被忽略
  // 如果 onRejected 不是函数，其必须被忽略
  then(onFulfilled, onRejected) {
    let newPromise;
    // 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : e => {
            throw e;
          };

    // onFulfilled && typeof onFulfilled === 'function' && this.fulfilledCallbacks.push(onFulfilled);
    // onRejected && typeof onRejected === 'function' && this.rejectedCallbacks.push(onRejected);
    //成功
    if (this.state === FUlFILLED) {
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
    //失败
    if (this.state === REJECTED) {
      return (newPromise = new AjPromise((resolve, reject) => {
        try {
          let x = onRejected(this.reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }));
    }
    //等待
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
}

new AjPromise((resolve, reject) => {
  console.log(123);
  setTimeout(() => {
    resolve(1);
  }, 2000);
});

// AjPromise.deferred = function () {
//   // 延迟对象
//   let defer = {};
//   defer.promise = new Promise((resolve, reject) => {
//     defer.resolve = resolve;
//     defer.reject = reject;
//   });
//   return defer;
// };

// module.exports = AjPromise;
