const fs = require("fs");

// 异步读取
fs.readFile("./index.txt", "utf8", (err, data) => {
  console.log(data); //  Hello Nodejs
});

// 同步读取
const data = fs.readFileSync("./index.txt", "utf8");

console.log(data); //  Hello Nodejs

// 创建读取流

const stream = fs.createReadStream("./index.txt", "utf8");

// 这里可以看到fs.createReadStream用到了我们前面介绍的events eventEmitter.on() 方法来监听事件

stream.on("data", data => {
  console.log(data); // Hello Nodejs
});
