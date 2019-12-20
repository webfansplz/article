const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();

mrNull.emit("play");

mrNull.on("play", () => {
  console.log("play !");
});
