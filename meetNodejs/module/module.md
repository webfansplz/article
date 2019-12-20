## module 模块

> Node.js 实现了一个简单的模块加载系统。在 Node.js 中，文件和模块是一一对应的关系，可以理解为一个文件就是一个模块。其模块系统的实现主要依赖于全局对象 module，其中实现了 exports(导出)、require()(加载)等机制。

### 1. 模块加载

Node.js 中一个文件就是一个模块。如，在 index.js 中加载同目录下的 circle.js：

```js
// circle.js
const PI = Math.PI

exports.area = r => PI * r * r

exports.circumference = r => 2 * PI * r
```

```js
// index.js
const circle = require('./circle.js')

console.log(`半径为 4 的圆面积为 ${circle.area(4)}`) // 半径为 4 的圆面积为 50.26548245743669
```

circle.js 中通过 exports 导出了 area()和 circumference 两个方法，这两个方法可以其它模块中调用。

#### exports 与 module.exports

exports 是对 module.exports 的一个简单引用。如果你需要将模块导出为一个函数(如：构造函数)，或者想导出一个完整的出口对象而不是做为属性导出，这时应该使用 module.exports。

```js
// square.js

module.exports = width => {
  return {
    area: () => width * width
  }
}
```

```js
// index.js

const square = require('./square.js')
const mySquare = square(2)
console.log(`The area of my square is ${mySquare.area()}`) // The area of my square is 4
```

### 2. 访问主模块

当 Node.js 直接运行一个文件时，require.main 属性会被设置为 module 本身。这样，就可通过这个属性判断模块是否被直接运行：

```js
require.main === module
```

比如,对于上面例子的 index.js 来说, node index.js 上面值就是 true, 而通过 require('./index')时, 值却是 false.

module 提供了一个 filename 属性，其值通常等于\_\_filename。 所以，当前程序的入口点可以通过 require.main.filename 来获取。

```js
console.log(require.main.filename === __filename) // true
```

### 3. 解析模块路径

使用 require.resolve()函数,可以获取 require 加载的模块的确切文件名,此操作只返回解析后的文件名，不会加载该模块。

```js
console.log(require.resolve('./square.js')) // /Users/null/meet-nodejs/module/square.js
```

require.resolve 的工作过程：

```js
require(X) from module at path Y
1. If X is a core module,
   a. return the core module
   b. STOP
2. If X begins with './' or '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
3. LOAD_NODE_MODULES(X, dirname(Y))
4. THROW "not found"

LOAD_AS_FILE(X)
1. If X is a file, load X as JavaScript text.  STOP
2. If X.js is a file, load X.js as JavaScript text.  STOP
3. If X.json is a file, parse X.json to a JavaScript Object.  STOP
4. If X.node is a file, load X.node as binary addon.  STOP

LOAD_AS_DIRECTORY(X)
1. If X/package.json is a file,
   a. Parse X/package.json, and look for "main" field.
   b. let M = X + (json main field)
   c. LOAD_AS_FILE(M)
2. If X/index.js is a file, load X/index.js as JavaScript text.  STOP
3. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
4. If X/index.node is a file, load X/index.node as binary addon.  STOP

LOAD_NODE_MODULES(X, START)
1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_AS_FILE(DIR/X)
   b. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   c. DIR = path join(PARTS[0 .. I] + "node_modules")
   b. DIRS = DIRS + DIR
   c. let I = I - 1
5. return DIRS
```

### 4. 模块缓存

模块在第一次加载后会被缓存到 require.cache 对象中, 从此对象中删除键值对将会导致下一次 require 重新加载被删除的模块。

多次调用 require('index')，未必会导致模块中代码的多次执行。这是一个重要的功能，借助这一功能，可以返回部分完成的对象；这样，传递依赖也能被加载，即使它们可能导致循环依赖。

如果你希望一个模块多次执行，那么就应该输出一个函数，然后调用这个函数。

#### 模块缓存的注意事项

模块的基于其解析后的文件名进行缓存。由于调用的位置不同，可能会解析到不同的文件(如，需要从 node_modules 文件夹加载的情况)。所以，当解析到其它文件时，就不能保证 require('index')总是会返回确切的同一对象。

另外，在不区分大小写的文件系统或系统中，不同的文件名可能解析到相同的文件，但缓存仍会将它们视为不同的模块，会多次加载文件。如：require('./index')和 require('./INDEX')会返回两个不同的对象，无论'./index'和'./INDEX'是否是同一个文件。

### 5. 循环依赖

当 require()存在循环调用时，模块在返回时可能并不会被执行。

```js
// a.js
console.log('a starting')
exports.done = false
const b = require('./b.js')
console.log('in a, b.done = %j', b.done)
exports.done = true
console.log('a done')
```

```js
// b.js
console.log('b starting')
exports.done = false
const a = require('./a.js')
console.log('in b, a.done = %j', a.done)
exports.done = true
console.log('b done')
```

```js
// main.js
console.log('main starting')
const a = require('./a.js')
const b = require('./b.js')
console.log('in main, a.done=%j, b.done=%j', a.done, b.done)
```

首先 main.js 会加载 a.js，接着 a.js 又会加载 b.js。这时，b.js 又会尝试去加载 a.js。

为了防止无限的循环，a.js 会返回一个 unfinished copy 给 b.js。然后 b.js 就会停止加载，并将其 exports 对象返回给 a.js 模块。

这样 main.js 就完成了 a.js、b.js 两个文件的加载。输出如下:

```js
$ node main.js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done=true, b.done=true
```

### 6. 文件模块

当加载文件模块时，如果按文件名查找未找到。那么 Node.js 会尝试添加.js 和.json 的扩展名，并再次尝试查找。如果仍未找到，那么会添加.node 扩展名再次尝试查找。

对于.js 文件，会将其解析为 JavaScript 文本文件；而.json 会解析为 JOSN 文件文件；.node 会尝试解析为编译后的插件文件，并由 dlopen 进行加载。

#### 路径解析

当加载的文件模块使用'/'前缀时，则表示绝对路径。如，require('/home/null/index.js')会加载/home/null/index.js 文件。

而使用'./'前缀时，表示相对路径。如，在 index.js 中 require('./circle')引用时，circle.js 必须在相同的目录下才能加载成功。

当没有'/'或'./'前缀时，所引用的模块必须是“核心模块”或是 node_modules 中的模块。

如果所加载的模块不存在，require()会抛出一个 code 属性为'MODULE_NOT_FOUND'的错误。

### 7. \_\_dirname

当前模块的目录名。 与 \_\_filename 的 path.dirname() 相同。

```js
console.log(__dirname) // /Users/null/meet-nodejs/module

console.log(require('path').dirname(__filename)) // /Users/null/meet-nodejs/module

console.log(__dirname === require('path').dirname(__filename)) // true
```

### 8. module 对象

module 在每个模块中表示对当前模块的引用。 而 module.exports 又可以通过全局对象 exports 来引用。module 并不是一个全局对象，而更像一个模块内部对象。

#### module.children

这个模块引入的所有模块对象

#### module.exports

module.exports 通过模块系统创建。有时它的工作方式与我们所想的并不一致，有时我们希望模块是一些类的实例。因此，要将导出对象赋值给 module.exports，但是导出所需的对象将分配绑定本地导出变量，这可能不是我们想要的结果。

```js
// a.js

const EventEmitter = require('events')

module.exports = new EventEmitter()

// Do some work, and after some time emit
// the 'ready' event from the module itself.
setTimeout(() => {
  module.exports.emit('ready')
}, 1000)
```

```js
const a = require('./a')
a.on('ready', () => {
  console.log('module a is ready')
})
```

需要注意，分配给 module.exports 的导出值必须能立刻获取到，当使用回调时其不能正常执行。

#### exports 别名

exports 可以做为 module.exports 的一个引用。和任何变量一样，如果为它分配新值，其旧值将会失效：

```js
function require(...) {
  // ...
  ((module, exports) => {
    // Your module code here
    exports = some_func;        // re-assigns exports, exports is no longer
                                // a shortcut, and nothing is exported.
    module.exports = some_func; // makes your module export 0
  })(module, module.exports);
  return module;
}

```

- module.filename - 模块解析后的完整文件名

- module.id - 用于区别模块的标识符，通常是完全解析后的文件名。

- module.loaded - 模块是否加载完毕

- module.parent - 父模块，即：引入这个模块的模块

- module.require(id)

- module.require 提供了类似 require()的功能，可以从最初的模块加载一个模块
