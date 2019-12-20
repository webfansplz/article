const fs = require("fs");

// 异步获取文件状态
fs.stat("./dir", (err, stats) => {
  if (err) throw err;

  // 是否是文件类型
  console.log(stats.isFile()); // false
  // 是否是文件夹类型
  console.log(stats.isDirectory()); // true
});

// 同步获取文件状态
const stats = fs.statSync("./stats.txt");

// 是否是文件类型
console.log(stats.isFile()); // true
// 是否是文件夹类型
console.log(stats.isDirectory()); // false
