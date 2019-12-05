export function register(store, { state }, Vue) {
  // 基于vue的响应系统原理,computed会订阅vm.data的变化,
  // 创建一个vue实例,并将vuex state作为data初始值,从而实现数据响应视图
  store._vm = new Vue({
    data: {
      $$state: state
    }
  });
}
