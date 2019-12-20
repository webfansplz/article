# 撸一个简版 vuex

## Vuex 是什么 ?

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

![vuex](https://raw.githubusercontent.com/webfansplz/article/master/vllx/vuex.png)

## Vuex 核心概念

- State (单一状态树,数据共享数据存储)

- Getter (Vuex 的计算属性,从 state 派生状态)

- Mutation (更改 Vuex state 的唯一方法,同步操作)

- Action (异步操作处理方法,提交 mutation 来更改 state,而不是直接变更)

## vllx 做了哪些基本实现?

> vllx 对 vuex 源码进行了拆分简化,让源码读起来更简单易懂,也让你通过这个简版的 vllx 理解 vuex 的核心实现,vllx 实现了以下功能:

- Vuex.Store 构造器选项

  ✅ state

  ✅ mutations

  ✅ actions

  ✅ getters

- Vuex.Store 实例方法

  ✅ commit

  ✅ dispatch

<!-- vllx 实现分为 4 小节,循序渐进,简单易懂.(代码附注释) 也让你通过这个简版的 vllx 理解 vuex 的核心实现！ -->

## vllx 实践

[ 1. Vue.use(vuex) 做了什么？](https://github.com/webfansplz/article/tree/master/vllx/lesson1)

[ 2. Vue computed 和 Vuex state 如何实现响应 ？](https://github.com/webfansplz/article/tree/master/vllx/lesson2)

[ 3. Vuex.Store 核心方法 commit,dispatch 的实现 ！](https://github.com/webfansplz/article/tree/master/vllx/lesson3)

[ 4. 为什么说 Vuex getter 相当于 Vue 的 computed ?](https://github.com/webfansplz/article/tree/master/vllx/lesson4)

**demo 使用了 JavaScript modules,需要启动 web 服务器来调试 !**

## ❤️ 结语

如果你和我一样对前端感兴趣,也喜欢"动手",欢迎关注[我的博客](https://github.com/webfansplz/article)一起玩耍啊~
