// 模拟apply
// es3
Function.prototype.apply = function(cxt, arrArgs) {
  var context = cxt || window;
  context.fn = this;
  var args = [];
  for (var i = 0; i < arrArgs.length; i++) {
    args.push("arrArgs[" + i + "]");
  }
  var result = eval("context.fn(" + args + ")");
  delete context.fn;
  return result;
};
// es6
Function.prototype.apply = function(cxt, args) {
  const context = cxt || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
