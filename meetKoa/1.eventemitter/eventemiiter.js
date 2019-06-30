const Emitter = require('events');
/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */
class Application extends Emitter {
  constructor() {
    super();
  }
}
const app = new Application();
//  监听error事件
app.on('error', err => {
  console.log('触发了error事件:', err); //hello koa
});
//  触发error事件
app.emit('error', 'hello koa');
