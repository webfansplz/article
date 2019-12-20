const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();
//  监听play事件
mrNull.on("play", function(data) {
  console.log(this);
  console.log(`play`);
});
//  监听play事件
mrNull.on("play", data => {
  console.log(this);
  console.log(`play again`);
});
//  触发play事件
mrNull.emit("play", "hello nodeJs");
