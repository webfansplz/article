export function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

export function isPromise(val) {
  return val && typeof val.then === "function";
}
