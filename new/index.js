function createNew(func, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, func.prototype); // obj.__proto__ = func.prototype
  const result = func.apply(obj, args);
  return result instanceof Object ? result : obj;
}
