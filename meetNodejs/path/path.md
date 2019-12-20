## 本地路径 path 模块

Node.js 提供了 path 模块,用于处理文件路径和目录路径 . 不同操作系统 表现有所差异 !

### 1. 获取路径的目录名

```js
const path = require('path')

path.dirname('/path/example/index.js') // /path/example
```

### 2. 获取路径的扩展名

```js
const path = require('path')

path.extname('/path/example/index.js') // .js
```

### 3. 是否是绝对路径

```js
const path = require('path')

path.isAbsolute('/path/example/index.js') // true

path.isAbsolute('.') // false
```

### 4. 拼接路径片段

```js
path.join('/path', 'example', './index.js') // /path/example/index.js
```

### 5. 将路径或路径片段的序列解析为绝对路径。

```js
path.resolve('/foo/bar', './baz')
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/')
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

### 6. 规范化路径

```js
path.normalize('/path///example/index.js') //  /path/example/index.js
```

### 7. 解析路径

```js
path.parse('/path/example/index.js')

/*
 { root: '/',
  dir: '/path/example',
  base: 'index.js',
  ext: '.js',
  name: 'index' }
*/
```

### 8. 序列化路径

```js
path.format({
  root: '/',
  dir: '/path/example',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}) // /path/example/index.js
```

### 9. 获取 from 到 to 的相对路径

```js
path.relative('/path/example/index.js', '/path') // ../..
```
