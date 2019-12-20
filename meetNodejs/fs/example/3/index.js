const fs = require("fs");

// 异步删除文件
fs.unlink("./delete.txt", err => {
  if (err) throw err;
});

// 同步删除文件
fs.unlinkSync("./deleteSync.txt");

// 异步删除文件夹
fs.rmdir("./rmdir", err => {
  if (err) throw err;
});

// 同步删除文件夹
fs.rmdirSync("./rmdirSync");
