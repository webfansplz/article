// 使用reduce实现map

Array.prototype._map = function(fn, context = null) {
  return this.reduce((pre, cur, index, arr) => {
    return [...pre, fn.call(context, cur, index, arr)];
  }, []);
};
