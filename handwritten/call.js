// 模拟call
// es3
Function.prototype.call = function(cxt) {
  var context = cxt || window;
  context.fn = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }
  var result = eval("context.fn(" + args + ")");
  delete context.fn;
  return result;
};
// es6
Function.prototype.call = function(cxt, ...args) {
  const context = cxt || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
