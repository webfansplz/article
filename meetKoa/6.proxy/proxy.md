下面我们来看 Koa 的部分源码~

```javascript
'use strict';

/**
 * Module dependencies.
 */

const util = require('util');
const only = require('only');

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

class Application extends Emitter {
  /**
   * Initialize a new `Application`.
   *
   * @api public
   */

  constructor() {
    super();

    this.proxy = false;
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || 'development';
    if (util.inspect.custom) {
      this[util.inspect.custom] = this.inspect;
    }
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, ['subdomainOffset', 'proxy', 'env']);
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    return this.toJSON();
  }
}
```

???,哈哈哈,看完是不是一脸黑人问号???

## node-only 模块

我们先来了解一下 only 模块是用来做什么的?

都说年龄和体重是女人的秘密 ...

```javascript
const only = require('only');
const girlInfo = {
  name: 'lily',
  age: 25,
  weight: 88
};
const lily = only(girlInfo, ['name']);
console.log(lily); //  lily
const letMeSee = only(girlInfo, ['age', 'weight']);
console.log(letMeSee); //  { age: 25, weight: 88 }
```

这下你能明白 only 模块的用途了吗? (你好骚啊.png)

[demo 代码](./only.js)

## util.inspect

util 模块是 Node.js 的核心模块,提供常用的函数集合,这里我们就上面两个 API 做简单介绍.

### util.inspect(object[, options])

> 作用：返回 object 的字符串表示，主要用于调试。 附加的 options 可用于改变格式化字符串的某些方面。

### util.inspect.custom

> 作用：可被用于声明自定义的查看函数。

Talk is cheap ...停停停,我写我写..

```javascript
const util = require('util');
function app() {
  if (util.inspect.custom) {
    this[util.inspect.custom] = () => {
      return 'hello,util.inspect';
    };
  }
  return this;
}
console.log(util.inspect(app())); //  hello,util.inspect
```

[demo 代码](./inspect.js)

## subdomainOffset

这是什么神仙属性呢？我们先来看看 Koa 源码 request.js,里面有这么一段。

```javascript
  /**
   * Return subdomains as an array.
   *
   * Subdomains are the dot-separated parts of the host before the main domain
   * of the app. By default, the domain of the app is assumed to be the last two
   * parts of the host. This can be changed by setting `app.subdomainOffset`.
   *
   * For example, if the domain is "tobi.ferrets.example.com":
   * If `app.subdomainOffset` is not set, this.subdomains is
   * `["ferrets", "tobi"]`.
   * If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
   *
   * @return {Array}
   * @api public
   */

  get subdomains() {
    const offset = this.app.subdomainOffset;
    const hostname = this.hostname;
    if (net.isIP(hostname)) return [];
    return hostname
      .split('.')
      .reverse()
      .slice(offset);
  },
```

又给我看天文数字？？？好好好,Show U YoudaoDict~

```javascript
  /**
   *  以数组的形式返回子域
   *  子域是主机主域前的点分隔部分应用程序的域。默认情况下，应用程序的域被假定为最后两个域主机的部分。这可以通过设置“app.subdomainOffset”来更改。
   *  举个例子,如果域名是“tobi.ferrets.example.com”:如果未设置subdomainOffset。子域是["ferrets", "tobi"],如果设置subdomainOffset等于3,那么子域就是["tobi"]
   * @return {Array}
   * @api public
   */

  get subdomains() {
    const offset = this.app.subdomainOffset;
    const hostname = this.hostname;
    if (net.isIP(hostname)) return [];
    return hostname
      .split('.')
      .reverse()
      .slice(offset);
  },
```

所以 subdomainOffset 其实就是子域名的偏移量～

## env

env 属性大家都很熟悉了,就是 node 的环境变量 NODE_ENV 值。

## proxy

proxy 属性值可以设置为 true 或 false,它的作用在于是否获取真正的客户端 ip 地址～

这里我们引用某位大佬的一波解释~

要知道, 我们在实际运用中, 可能会使用很多的代理服务器, 包括我们常见的正向代理与反向代理, 虽然代理的用处很大, 但是无法避免地我们有时需要知晓真正的客户端的请求 ip。

而其实实际上, 服务器并不知道真正的客户端请求 ip, 即使你使用 socket.remoteAddrss 属性来查看,

因为这个请求是代理服务器转发给服务器的, 幸好代理服务器例如 nginx 提供了一个 HTTP 头部来记录每次代理服务器的源 IP 地址, 也就是 X-Forwarded-For 头部.形式如下:

```shell
X-Forwarded-For: 192.168.210.13, 210.112.40.13, 43.56.210.10
```

如果一个请求跳转了很多代理服务器, 那么 X-Forwarded-For 头部的 ip 地址就会越多, 第一个就是原始的客户端请求 ip, 第二个就是第一个代理服务器 ip, 以此类推.

当然, X-Forwarded-For 并不完全可信, 因为中间的代理服务器可能会”使坏”更改某些 IP.

而 koa 中 proxy 属性的设置就是如果使用 true, 那么就是使用 X-Forwarded-For 头部的第一个
ip 地址, 如果使用 false, 则使用 server 中的 socket.remoteAddress 属性值.

除了 X-Forwarded-For 之外, proxy 还会影响 X-Forwarded-proto 的使用, 和 X-Forwarded-For 一样, X-Forwarded-proto 记录最开始的请求连接使用的协议类型(HTTP/HTTPS), 因为客户端与
服务端之间可能会存在很多层代理服务器, 而代理服务器与服务端之间可能只是使用 HTTP 协议, 并没有使用 HTTPS,

所以 proxy 属性为 true 的话, koa 的 protocol 属性会去取 X-Forwarded-proto 头部的值(koa 中 protocol 属性会先使用 tlsSocket.encrypted 属性来判断是否是 https 协议, 如果是则直接返回 ‘https’).

## 浪子回头

现在,你在回头看上面的源码,是不是感觉 so easy 呢？
