/**
 *模拟new操作符实现
 *@parmam func  构造函数
 */
function new2(func) {
  //创建一个实例对象o,让构造函数的显式原型 指向 实例o的隐式原型__proto__
  const o = Object.create(func.prototype);
  //获取要实例化的实参
  const args = [].slice.call(arguments, 1);
  //执行构造函数,并用apply将this指向硬绑定到实例上
  const res = func.apply(o, args);
  //如果是引用类型,返回该引用类型,否则返回实例
  return ['object', 'function'].includes(typeof res) ? res : o;
}
