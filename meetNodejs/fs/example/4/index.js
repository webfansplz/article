const fs = require("fs");

// 异步创建文件夹
fs.mkdir("./mkdir", err => {
  if (err) throw err;
});

// 同步创建文件夹
fs.mkdirSync("./mkdirSync");
