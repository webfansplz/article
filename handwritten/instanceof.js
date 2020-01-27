// 模拟 instanceof
function instance_of(L, R) {
  //L 表示左表达式，R 表示右表达式
  const O = R.prototype; // 取 R 的显式原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null) return false;
    if (O === L) return true;
    L = L.__proto__;
  }
}
