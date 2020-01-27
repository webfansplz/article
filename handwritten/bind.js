Function.prototype.bind = function() {
  const context = [].shift.call(arguments) || window;
  const args = [].slice.call(arguments);
  const self = this;
  function Bd() {
    return self.apply(
      this instanceof Bd ? this : context,
      // 参数合并
      args.concat([].slice.call(arguments))
    );
  }
  Bd.prototype = Object.create(self.prototype);
  return Bd;
};
