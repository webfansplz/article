# 前言

各位大佬好久不见啊～

啊～好久没写文章了,惭愧惭愧。🐶

小 null 最近跑去写 Flutter 了 ~

Flutter 使用 Dart 语言进行开发,小 null 在写 Flutter 的过程中发现 Dart 和 Javascript/Typescript 有些相似之处～

本文分享一些相似之处,希望能帮助到打算上车的你～

**You might already know Dart.** - from [10 good reasons to learn Dart](https://medium.com/hackernoon/10-good-reasons-why-you-should-learn-dart-4b257708a332)

是的,你还没开始学 Dart,可能就对它很熟悉了。

# Dart 的「 前世今生 . 衰落与崛起 」

## Dart 语言的诞生

> 2011 年 9 月,网络上出现了一封标题为"Future of JavaScript"的谷歌内部电子邮件,邮件中表明,由于 Javascript 语言发展缓慢,谷歌内部正在开发一门比 JavaScript 更好的 web 语言。这门新语言的目标是实现 JavaScript 所能实现的一切。它的主要目标是"保持 JavaScript 的动态特性,但要有更好的性能配置文件,并能适应大型项目的工具"。它还可以交叉编译成 JavaScript。这种语言作为技术预览版向更广泛的世界发布,并命名为 Dart。 - 引自 《Dart in Action》

> 2011 年 10 月 10 日的 GOTO 大会上,谷歌的两位工程师 Lars Bak (V8 JavaScript engine 项目组长..)和 Gilad Bracha (实现定制 Java/JVM 规范,JVM 规范主要贡献者..) 发布了"Dart",也验证了之前 email 传闻。Dart 是一种全新的编程语言,旨在帮助开发者构建 Web 应用程序。

![2011goto](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/2011goto.jpg)

对 Dart 语言开发团队有兴趣的话~可戳 👉[Dart 语言背后有哪些大牛？](https://www.infoq.cn/article/2015/04/dart-1.8-javascript)

## Dart 1.0 《Dart 1.0: A stable SDK for structured web apps》

2013 年 11 月 14 日,谷歌发布 Dart 1.0 版。Dart 1.0 版本发布,不但推出了 Dart 语言 1.0 版本而且还推出了相关开源工具箱和配套的编辑器。为了推广 Dart,Google 在 Chrome 内置了 DartVM 引擎(已在 2015 年移除),彼时 JavaScript 因为 NodeJs 生态的崛起而焕发了第二春,而 Dart 却不温不火,且因为其运行效率饱受诟病。

就这样,Dart 还在 2018 年 "荣获 20 大糟糕语言榜首",总结 「 Javascript 很"忙",Dart 很"惨" 」。

![2018-worst-lang](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/2018-worst-lang.png)

## Dart 2.0 《Announcing Dart 2 Stable and the Dart Web Platform》

2018 年 8 月 8 日,谷歌发布 Dart2.0 版本。谷歌对 Dart 进行全新改版,从底层重构了 Dart 语言,加入了很多面向未来的新特性,语言性能大幅提供。Dart 开发团队总结了 Dart1.0 版本的优缺点,决定打造一个运行更快、更加安全的强类型语言 Dart2.0（在 Dart2.0 之前,Dart 是一门弱类型语言。此次发布谷歌不仅发布了 Dart 2.0 稳定版,而且还重写了 Dart web platform。新版的 web platform 提供了一套高性能、可扩展的生产力工具。

## Flutter 发布 《Flutter 1.0: Google’s Portable UI Toolkit》

Google 内部用 Dart 编写孵化了一个移动开发框架 Sky,之后又被命名为 Flutter,进入了移动跨平台开发的领域。

2018 年 12 月 4 日,谷歌发布 Flutter 1.0 版本。

Flutter 是谷歌开源的移动应用开发 SDK,使用 Flutter 可以直接开发 Android 和 iOS 应用。其最大的特点就是一套代码多平台运行、高性能和 Hot Reload（热重载）。谷歌即将发布 Fuchsia 系统就以 Flutter 为主要开发框架。Flutter 采用 Dart 作为其底层语言。Dart 也由于 Flutter 美好未来而得到众多开发者的青睐。

## Fuchsia 技术选型,Dart 笑到最后

Android 和 Chrome OS 可能是谷歌最知名的 OS 项目,但实际上这两年曝光量逐渐增大的是谷歌正在开发的第三个操作系统——Fuchsia。Fuchsia 是一个开源项目,类似于 AOSP（Android 开放源代码项目）,但 Fuchsia 可以运行各种设备,从智能家居设备到笔记本电脑和手机等等。它也被认为是建立在一个谷歌构建的名为“zircon”的全新内核之上,而不是构成 Android 和 Chrome 操作系统基础的 Linux 内核。

近日谷歌 Fuchsia 网站上更新了一则[“Fuchsia Programming Language Policy”](https://fuchsia.googlesource.com/fuchsia/+/refs/heads/master/docs/project/policy/programming_languages.md)的文档,详细解释了 Fuchsia 项目在编程语言方面的选型考虑。据官方文档披露,C/C++、Dart、Rust、Go 语言都是 Fuchsia 开发的候选语言,除了老牌编程语言 C 和 C++ 的江湖地位稳固得到了官方开发人员的认可以外,新兴编程语言中,Dart 击败了 Rust 和 Go 语言,成为用户 UI 界面的正式官方语言。

# Javascript 🆚 Dart

## 变量声明

```js
// javascript

var name = 'null仔'

// dart

var name = 'null仔'
```

与 Javascript 一样,在 Dart 中,我们可以使用 var 定义变量。

不一样的是,在 Dart 中,变量都是引用类型,也就是说所有的变量都是对象,所以 Dart 是一门完全面向对象的语言。

Dart 是类型安全的,所以当你使用 var 关键字定义变量时,本质其实就是具体类型的引用。

比如上文代码其实就是一个 String 类型对象的引用,这个对象的内容是 null 仔 。

在 Dart 中,声明一个未初始化的变量,变量的类型可以更改,它的初始值是 null。

![variable](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/variable1.png)

在 Dart 中,声明一个初始化的变量,变量类型不能再更改 。

![variable](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/variable2.png)

## 常量声明

```dart
// javascript

const name = 'null仔';

// dart

const name = 'null仔';
```

与 Javascript 一样,在 Dart 中,我们可以使用 const 定义常量。

Dart 中,还可以使用 final 定义常量,由于本文主要将与 Javascript 的相似点,这里就不细说了。

![constant](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/constant.png)

## 模版字符串

```dart
// javascript

const name = 'null仔';

const word = `My name is ${name}`;

// dart

const name = 'null仔';

const word = 'My name is $name';
```

与 Javascript 一样,Dart 同样支持模板字符串,语法为：${expression},如果expression是一个变量,那么可以省略{},即为$varibale。

如果表达式的结果是一个对象,那么会调用对象的 toString()方法。

![template-string](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/template-string.png)

## 箭头函数

```dart
// javascript

  const getName = (name) => name;

  getName('null仔');

// dart

  String getName(name) => name;

  getName('null仔');
```

与 Javascript 一样,Dart 同样支持箭头函数,如果函数只包含一个表达式,可以使用箭头表达式方法进行简写。=> 后面的表达式将作为函数的返回结果。

## 扩展运算符 (Spread Operator)

```dart
// javascript

  const list=[1,2,3,4,5];

  [0,...list,6];

// dart

  const list=[1,2,3,4,5];

  [0,...list,6];
```

Dart v2.3 引入了 Spread Operator,我们在 Javascript 中很喜欢用的神器,在 Dart 中也可以用啦～嗯,真香~

![spread](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/spread.png)

## 参数默认值与可选参数

```dart
// javascript

  function getInfo({name='null仔',age}){
    console.log(`大家好,我是${name},今年${age}岁`);
  }
  getInfo({age:18});

// dart

  void getInfo({name="null仔",age}){
    print('大家好,我是$name,今年$age岁');
  }
  getInfo(age:18);
```

与 Javascript 相似,Dart 支持函数参数默认值与可选参数,Get it ~

![default](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/default.png)

## async/await 函数

```dart
// javascript

  async function getData(){

    const name= await new Promise((resolve)=>setTimeout(()=>resolve('null仔'),1000));

    console.log(name);  // null仔
  }
  getData();

// dart

  Future getData() async{

    String name =  await Future.delayed(Duration(seconds: 1),()=>'null仔');

    print(name);  // null仔
  }
  getData();
```

与 Javascript 相同,Dart 也提供了 async/await 语法糖,让我们更好的处理异步操作～

Javascript async 函数返回的是 Promise 对象,而 Dart async 函数返回的是 Future 对象～

![async](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/async.png)

## 级联函数(链式调用)

```js
// javascript

new Promise((r) => {
  r(1)
})
  .then((res) => ++res)
  .then((res) => ++res)
  .then((res) => console.log(++res)) // 4

// dart

 List<int> list =

   []..addAll([1,2,3,4,5])
     ..replaceRange(0,1,[6])
     ..sort((a,b)=>a-b);

  print(list);  // [2, 3, 4, 5, 6]
```

在 Javascript 中 我们一般通过手动 "return this" 来实现链式调用,而 Dart 提供了 Cascade (级联运算符) .. 帮我们实现链式调用～ 真香！

![Cascade](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/cascade.png)

## 模块导入和导出 import

Javascript 和 Dart 都使用 import 来导入模块,不过不同的是,Dart 并不需要使用 export 来导出模块。

```dart

// 完全导入

// javascript

import abc from "abc";
import * as xx from "abc";

// dart

import 'package:abc/abc';

// 部分导入

// javascript

import { xx } from "abc";

// dart

import 'package:abc/abc' show xxx; // 只导出其中一个对象/方法 xxx
import 'package:abc/abc' hide xxx; // 导出模块时不导出xxx

```

## 类 class

```dart
//javascript

class Person{
  // 私有属性提案
  #age=0;
  // 构造函数及参数默认值
  constructor(name='null仔'){
    this.name=name;
  }
  // 实例方法
  getName(){
    console.log(this.name);
  }
  // 静态方法
  static say(){
    console.log(`hello world`);
  }
  // getter && setter
  get age(){
    return this.#age;
  }
  set age(value){
    this.#age=value;
  }
}

//dart

class Person{
  // 私有属性
  int _age;
  String name;
   // 构造函数及参数默认值
  Person({this.name='null仔'});
   // 实例方法
  void getName(){
    print(this.name);
  }
   // 静态方法
  static say(){
    print("hello world");
  }
  // getter && setter
  int get age =>this._age;
  set age(int value)=>this._age=value;
}

```

![fx](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/class.png)

# Typescript 🆚 Dart

## 泛型

Typescript 与 Dart 中都存在泛型,下面我们以一个简单的泛型函数简单介绍下～

```dart
// typescript

  function identity<T>(arg: T): T {
    return arg;
  };

  identity<String>('null仔'); // null仔

  identity<Number>(18); // 18

// dart

  T identity<T>(T arg){
    return arg;
  }

  identity<String>('null仔'); // null仔

  identity<int>(18);  // 18

```

![fx](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/fx.png)

## Typescript Type Assertion 🆚 Dart as 运算符

类型断言（Type Assertion）可以用来手动指定一个值的类型。

```js
值 as 类型
```

![as-dart](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/as-dart.png)

![as](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/as.png)

## Typescript Optional Chaining 🆚 Dart ?. 运算符

TypeScript 3.7 实现了呼声最高的 ECMAScript 功能之一：可选链（Optional Chaining）！

终于不用再写 一坨长长臭臭的&& 运算符执行中间属性检查 和 null/undefined 判断了～

```js
// before
if (foo && foo.bar && foo.bar.baz) {
  // ...
}
// after

if (foo?.bar?.baz) {
  // ...
}
```

Dart 本身就内置了?.运算符,我们来瞧瞧～

```dart
// typescript

let foo;

console.log(foo?.bar?.baz);


// dart

var foo;

print(foo?.bar?.baz);

```

![optional-chaining](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/optional-chaining.png)

## Typescript Nullish Coalescing 🆚 Dart ?? 运算符

TypeScript 3.7 实现了另一个即将推出的 ECMAScript 功能是 空值合并运算符（nullish coalescing operator）!

?? 运算符可以在处理 null 或 undefined 时“回退”到一个默认值上 !

```js
// typescript

let x = foo ?? bar()

// 等价于

let x = foo !== null && foo !== void 0 ? foo : bar()
```

Dart 本身就内置了??运算符,我们来瞧瞧～

```dart
// typescript
  let age;

  function setAge() {
    age = 18;
  }

  age ?? setAge();

  console.log(age) // 18

// dart

  var age;

  void setAge() {
    age = 18;
  }

  age ?? setAge();

  print(age); // 18
```

![nullish coalescing](https://raw.githubusercontent.com/webfansplz/article/master/dart/images/nullish-coalescing.png)

# 参考

[Dart 语言的前世今生](https://www.jianshu.com/p/c939a613dc4f)

# 后记

> 如果你和我一样喜欢前端,也爱动手折腾,欢迎关注我一起玩耍啊～ ❤️

[github 地址,欢迎 follow 哦～](https://github.com/webfansplz)

## 博客

[我的博客,点 star,不迷路～](https://github.com/webfansplz/article)

## 公众号

前端时刻

![前端时刻](https://raw.githubusercontent.com/webfansplz/article/master/qrcode.gif)
