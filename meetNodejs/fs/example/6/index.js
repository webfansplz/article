const fs = require("fs");

// 异步复制文件
fs.copyFile("./copy.txt", "./copy-c.txt", (err, copyFiles) => {
  if (err) throw err;
});

// 同步复制文件夹
fs.copyFileSync("./null", "null-c");
