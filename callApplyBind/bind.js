Function.prototype.bind = function(context) {
  //对context进行深拷贝,防止污染.
  const cxt = JSON.parse(JSON.stringify(context)) || window;

  // 将当前被调用的方法定义在cxt.fuc上.(为了能以对象调用的形式绑定this)
  cxt.func = this;

  // 获取实参
  const args = Array.from(arguments).slice(1);

  // bind 返回一个绑定函数,等待调用,
  return function() {
    //这里需要注意的一点是需要对bind函数的实参和返回的绑定函数的实参进行参数合并,调用时传入!
    const allArgs = args.concat(Array.from(arguments));
    //以对象调用的形式调用func,此时this指向ctx 也就是传入的需要绑定的this指向
    return allArgs.length > 0 ? cxt.func(...allArgs) : cxt.func();
  };
};
