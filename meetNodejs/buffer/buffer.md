## 缓冲器 Buffer 模块

在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。 Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。

### 创建缓冲区

```js
console.log(Buffer.from([1, 2, 3, 4, 5])); // <Buffer 01 02 03 04 05>

console.log(Buffer.from(new ArrayBuffer(8))); // <Buffer 00 00 00 00 00 00 00 00>

console.log(Buffer.from("Hello world")); // <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
```

### Buffer 与字符编码

当字符串数据被存储入 Buffer 实例或从 Buffer 实例中被提取时，可以指定一个字符编码。

```js
// 缓冲区转换为 UTF-8 格式的字符串

const buffer = Buffer.from("Hello world");

console.log(buffer.toString()); // Hello world
```

```js
// 缓冲区数据转换为base64格式字符串

const buffer = Buffer.from("Hello world");

console.log(buffer.toString("base64")); // SGVsbG8gd29ybGQ=
```

```js
// 将base64编码的字符串，转换为UTF-8编码

const buffer = Buffer.from("Hello world");

const base64Str = buffer.toString("base64");

const buf = Buffer.from(base64Str, "base64");

console.log(buf.toString("utf8")); // Hello world
```
