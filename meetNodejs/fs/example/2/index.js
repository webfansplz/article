const fs = require("fs");
// 异步写入
fs.writeFile("./write.txt", "Hello Nodejs", "utf8", err => {
  if (err) throw err;
});
// 同步写入
fs.writeFileSync("./writeSync.txt", "Hello Nodejs");
// 文件流写入
const ws = fs.createWriteStream("./writeStream.txt", "utf8");
ws.write("Hello Nodejs");
ws.end();
