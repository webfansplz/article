## 全局对象 process 进程

> process 对象是一个 Global 全局对象，你可以在任何地方使用它，而无需 require。process 是 EventEmitter 的一个实例，所以 process 中也有相关事件的监听。使用 process 对象，可以方便处理进程相关操作。

### process 常用属性

#### 进程命令行参数: process.argv

process.argv 是一个当前执行进程折参数组，第一个参数是 node，第二个参数是当前执行的.js 文件名，之后是执行时设置的参数列表。

```js
node index.js --tips="hello nodejs"

/*
[ '/usr/local/bin/node',
  'xxx/process/index.js',
  '--tips=hello nodejs' ]
*/
```

#### Node 的命令行参数数组：process.execArgv

process.execArgv 属性会返回 Node 的命令行参数数组。

```js
node --harmony index.js --version

console.log(process.execArgv);  // [ '--harmony' ]

console.log(process.argv);

/*
[ '/usr/local/bin/node',
  'xxx/process/index.js',
  '--version' ]
*/

```

#### Node 编译时的版本: process.version

process.version 属性会返回 Node 编译时的版本号，版本号保存于 Node 的内置变量 NODE_VERSION 中。

```js
console.log(process.version); // v10.15.3
```

#### 当前进程的 PID process.pid

process.pid 属性会返回当前进程的 PID。

```js
console.log("process PID: %d", process.pid);

//process PID: 10086
```

### process 常用方法

#### 当前工作目录 process.cwd()

process.cwd()方法返回进程当前的工作目录

```js
console.log(process.cwd()); // /Users/null/nodejs/process
```

#### 终止当前进程：process.exit([code])

process.exit()方法终止当前进程，此方法可接收一个退出状态的可选参数 code，不传入时，会返回表示成功的状态码 0。

```js
process.on("exit", function(code) {
  console.log("进程退出码是:%d", code); // 进程退出码是:886
});

process.exit(886);
```

#### nodejs 微任务: process.nextTick()

process.nextTick()方法用于延迟回调函数的执行， nextTick 方法会将 callback 中的回调函数延迟到事件循环的下一次循环中，与 setTimeout(fn, 0)相比 nextTick 方法效率高很多，该方法能在任何 I/O 之前调用我们的回调函数。

```js
console.log("start");
process.nextTick(() => {
  console.log("nextTick cb");
});
console.log("end");

// start
// end
// nextTick cb
```

### process 标准流对象

process 中有三个标准备流的操作，与 其他 streams 流操作不同的是，process 中流操作是同步写,阻塞的。

#### 标准错误流: process.stderr

process.stderr 是一个指向标准错误流的可写流 Writable Stream。console.error 就是通过 process.stderr 实现的。

#### 标准输入流：process.stdin

process.stdin 是一个指向标准输入流的可读流 Readable Stream。

```js
process.stdin.setEncoding("utf8");

process.stdin.on("readable", () => {
  let chunk;
  // 使用循环确保我们读取所有的可用数据。
  while ((chunk = process.stdin.read()) !== null) {
    if (chunk === "\n") {
      process.stdin.emit("end");
      return;
    }
    process.stdout.write(`收到数据: ${chunk}`);
  }
});

process.stdin.on("end", () => {
  process.stdout.write("结束监听");
});
```

![process-stdin](./process-stdin.gif)

#### 标准输出流：process.stdout

process.stdout 是一个指向标准输出流的可写流 Writable Stream。console.log 就是通过 process.stdout 实现的

```js
console.log = function(d) {
  process.stdout.write(d + "\n");
};

console.log("Hello Nodejs"); // Hello Nodejs
```
