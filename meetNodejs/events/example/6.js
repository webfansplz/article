const EventEmitter = require("events");

class Person extends EventEmitter {
  constructor() {
    super();
  }
}
const mrNull = new Person();

function play() {
  console.log("play !");
}
mrNull.on("play", play);

mrNull.emit("play");

mrNull.off("play", play);

// mrNull.removeListener("play", play);

mrNull.emit("play");

// play !  解绑后不再触发
