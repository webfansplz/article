## 查询字符串 querystring 模块

querystring 模块是 Node.js 中的工具模块之一，用于处理 URL 中的查询字符串，即：querystring 部分。查询字符串指：URL 字符串中，从问号"?"(不包括?)开始到锚点"#"或者到 URL 字符串的结束（存在#，则到＃结束，不存在则到 URL 字符串结束）的部分叫做查询字符串。querystring 模块可将 URL 查询字符串解析为对象，或将对象序列化为查询字符串。

### 1. 对象序列化为查询字符串

querystring.stringify(obj[, sep][, eq][, options])

```js
const querystring = require('querystring')

const obj = {
  url: 'github.com/webfansplz',
  name: 'null'
}

console.log(querystring.stringify(obj)) // url=github.com%2Fwebfansplz&name=null
```

### 2. 查询字符串解析为对象

```js
const querystring = require('querystring')

const o = querystring.parse(`url=github.com%2Fwebfansplz&name=null`)

console.log(o.url) // github.com/webfansplz
```

### 3. 编码查询字符串中的参数

querystring.escape 方法会对查询字符串进行编码，在使用 querystring.stringify 方法时可能会用到.

```js
const str = querystring.escape(`url=github.com%2Fwebfansplz&name=null`)

console.log(str) // url%3Dgithub.com%252Fwebfansplz%26name%3Dnull
```

### 4. 解码查询字符串中的参数

querystring.unescape 方法是和 querystring.escape 相逆的方法，在使用 querystring.parse 方法时可能会用到。

```js
const str = querystring.escape(`url=github.com%2Fwebfansplz&name=null`)

console.log(querystring.parse(str)) // { 'url=github.com%2Fwebfansplz&name=null': '' } ✖️

console.log(querystring.parse(querystring.unescape(str))) // { url: 'github.com/webfansplz', name: 'null' }
```
