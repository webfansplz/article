const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();
mrNull.once("play", () => {
  console.log("play !");
});

mrNull.emit("play");
mrNull.emit("play");
