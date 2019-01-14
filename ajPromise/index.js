// http://www.ituring.com.cn/article/66566
//一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（pending）、执行态（Fulfilled）和拒绝态（Rejected）。
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
class AjPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    // 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值
    // 在 promise 执行结束前其不可被调用
    // 其调用次数不可超过一次
    const resolve = res => {
      if (this.state === PENDING) {
        this.state = RESOLVED;
        this.value = res;
        setTimeout(() => {
          this.resolvedCallbacks.map(cb => {
            this.value = cb(this.value);
          });
          return this.value;
        }, 0);
      }
    };
    const reject = res => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.value = res;
        setTimeout(() => {
          this.rejectedCallbacks.map(cb => {
            this.value = cb(this.value);
          });
        }, 0);
      }
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
    onFulfilled && typeof onFulfilled === 'function' && this.resolvedCallbacks.push(onFulfilled);
    onRejected && typeof onRejected === 'function' && this.rejectedCallbacks.push(onRejected);
    return this;
  }
}

new AjPromise((resolve, reject) => {
  console.log(123);
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
