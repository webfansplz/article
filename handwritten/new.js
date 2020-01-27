// 模拟new
function create(func, ...args) {
  const obj = Object.create(null, func.prototype);
  const result = func.apply(obj, ...args);
  return result instanceof Object ? result : obj;
}
