const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();
mrNull.on("play", function(data) {
  console.log(data);
});

mrNull.emit("play", "hello nodeJs");

console.log(`hello MrNull`);

// hello nodeJs
// hello MrNull

const developer = new Person();
developer.on("dev", function(data) {
  setImmediate(() => {
    console.log(data);
  });
});
developer.on("dev", function(data) {
  process.nextTick(() => {
    console.log(data);
  });
});
developer.emit("dev", "hello nodeJs");

console.log(`hello developer`);

// hello developer
// hello nodeJs
// hello nodeJs
