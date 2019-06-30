const util = require('util');
function app() {
  if (util.inspect.custom) {
    this[util.inspect.custom] = () => {
      return 'hello,util.inspect';
    };
  }
  return this;
}
console.log(util.inspect(app())); //  hello,util.inspect
// console.log(app.inspect());
