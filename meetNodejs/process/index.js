// console.log(process.version);

// console.log(process.pid);

// console.log(process.argv);

// console.log(process.execArgv);

// console.log(process.cwd());
// console.log("start");
// process.nextTick(() => {
//   console.log("nextTick cb");
// });
// console.log("end");

// process.on("exit", function(code) {
//   console.log("进程退出码是:%d", code); // 进程退出码是:886
// });

// process.exit(886);

// console.log = function(d) {
//   process.stdout.write(d + "\n");
// };

// console.log("Hello Nodejs");

// process.stdin.setEncoding("utf8");

// process.stdin.on("readable", () => {
//   let chunk;
//   // 使用循环确保我们读取所有的可用数据。
//   while ((chunk = process.stdin.read()) !== null) {
//     if (chunk === "\n") {
//       process.stdin.emit("end");
//       return;
//     }
//     process.stdout.write(`收到数据: ${chunk}`);
//   }
// });

// process.stdin.on("end", () => {
//   process.stdout.write("结束监听");
// });
