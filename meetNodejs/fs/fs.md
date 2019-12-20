## 文件操作系统 fs 模块

> 在一些场景下,我们需要对文件进行 增删改查等操作, Nodejs 提供了 fs 模块,让我们对文件进行操作.

下面我们来介绍几个经常用的 API

### 1. 读取文件

```js
const fs = require("fs");
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
```

### 2. 写入/修改文件

写入文件时,如果文件不存在,则会创建并写入,如果文件存在,会覆盖文件内容.

```js
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
```

### 3. 删除文件/文件夹

- 删除文件

```js
// 异步删除文件
fs.unlink("./delete.txt", err => {
  if (err) throw err;
});

// 同步删除文件
fs.unlinkSync("./deleteSync.txt");
```

- 删除文件夹

```js
// 异步删除文件夹
fs.rmdir("./rmdir", err => {
  if (err) throw err;
});

// 同步删除文件夹
fs.rmdirSync("./rmdirSync");
```

### 4. 创建文件夹

```js
// 异步创建文件夹
fs.mkdir("./mkdir", err => {
  if (err) throw err;
});

// 同步创建文件夹
fs.mkdirSync("./mkdirSync");
```

### 5. 重命名文件/文件夹

```js
const fs = require("fs");

// 异步重命名文件
fs.rename("./rename.txt", "./rename-r.txt", err => {
  if (err) throw err;
});

// 同步重命名文件夹
fs.renameSync("./renameSync", "./renameSync-r");
```

### 6. 复制文件/文件夹

```js
const fs = require("fs");

// 异步复制文件
fs.copyFile("./copy.txt", "./copy-c.txt", (err, copyFiles) => {
  if (err) throw err;
});

// 同步复制文件夹
fs.copyFileSync("./null", "null-c");
```

### 7. 文件夹状态- 文件/文件夹

```js
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
```

**在一些复杂的操作场景下,fs 模块要做很多判断与处理 ,这里我推荐大家使用 [fs-extra](https://github.com/jprichardson/node-fs-extra),它在 fs 的基础上扩展了一些方法,让一些复杂操作更简便!**
