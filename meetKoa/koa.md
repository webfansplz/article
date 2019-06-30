## 前言

### 什么?这是一篇源码解读文章 ? 那一定很枯燥！不看。

**我把 Koa 的核心实现剥离成了 7 个小节,循序渐进,一步一步带你走进 Koa 的内心世界,不会干巴巴的很难啃～**

### 我没用过 Koa,会不会看不懂 ?

**每个核心实现我都做了实践和 demo~,非常简单易懂～**

## Koa 是什么

> Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

## Koa 组成

Koa 源码非常的精简,只有 4 个文件

- application.js ([koa 入口](https://github.com/koajs/koa/blob/master/lib/application.js),koa 中间件管理,请求处理,本文重点讲解.)

- context.js ([koa 上下文对象](https://github.com/koajs/koa/blob/master/lib/context.js),代理 request 与 response 对象的一些方法和属性)

- request.js ([koa 请求对象](https://github.com/koajs/koa/blob/master/lib/request.js),基于 node http 模块请求信息进行二次封装,并定义一些属性和方法,[引用一张图,可以很清楚的看到 request 做了什么](./request.png))

- response.js ([koa 响应对象](https://github.com/koajs/koa/blob/master/lib/response.js),基于 node http 模块响应信息进行二次封装,并定义一些属性和方法,[引用一张图,可以很清楚的看到 response 做了什么](./response.png))

## 遇见 koa

[1 . Koa 之 EventEmitter](./1.eventemitter/eventemitter.md)

[2 . Koa 之 Http 模块](./2.http/http.md)

[3 . Koa 之 Use 方法](./3.use-middleware/use-middleware.md)

[4 . Koa 之 洋葱模型](./4.koa-compose/koa-compose.md)

[5 . Koa 之 Context 对象](./5.context/context.md)

[6 . Koa 之 源码精读 一 ](./6.proxy/proxy.md)

[7 . Koa 之 源码精读 二 ](./7.end/end.md)
