const EventEmitter = require("events");
/**
 * Expose `Application` class.
 * Inherits from `EventEmitter.prototype`.
 */
class Application extends EventEmitter {}
const app = new Application();
//  监听hello事件
app.on("hello", data => {
  console.log(data); // hello nodeJs
});
//  触发hello事件
app.emit("hello", "hello nodeJs");
