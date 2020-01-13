// 节流函数

const throttle = (fn, delay = 200) => {
  let last = 0;
  return (...args) => {
    const cur = +new Date();
    if (cur - last > delay) {
      fn.aplly(this, args);
      last = cur;
    }
  };
};
