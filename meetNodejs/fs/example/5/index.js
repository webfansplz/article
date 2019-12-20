const fs = require("fs");

// 异步重命名文件
fs.rename("./rename.txt", "./rename-r.txt", err => {
  if (err) throw err;
});

// 同步重命名文件夹
fs.renameSync("./renameSync", "./renameSync-r");
