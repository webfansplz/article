## 统一资源定位符 url 模块

Node.js 提供了 url 模块,用于处理与解析 URL。

### 1. URL 对象都有哪些属性 ?

```js
const { URL } = require("url");

const myURL = new URL("https://github.com/webfansplz#hello");
console.log(myURL);
{
  href: 'https://github.com/webfansplz#hello',  // 序列化的 URL
  origin: 'https://github.com', // 序列化的 URL 的 origin
  protocol: 'https:', // URL 的协议
  username: '', // URL 的用户名
  password: '', //  URL 的密码
  host: 'github.com', // URL 的主机
  hostname: 'github.com',   // URL 的主机名
  port: '',  // URL 的端口
  pathname: '/webfansplz',  // URL 的路径
  search: '', // URL 的序列化查询参数
  searchParams: URLSearchParams {}, //  URL 查询参数的 URLSearchParams 对象
  hash: '#hello'  // URL 的片段
}
```

URL 对象属性 除了 origin 和 searchParams 是只读的,其他都是可写的.

### 2. 序列化 URL

```js
const { URL } = require("url");

const myURL = new URL("https://github.com/webfansplz#hello");

console.log(myURL.href); //  https://github.com/webfansplz#hello

console.log(myURL.toString()); // https://github.com/webfansplz#hello

console.log(myURL.toJSON()); //  https://github.com/webfansplz#hello
```
