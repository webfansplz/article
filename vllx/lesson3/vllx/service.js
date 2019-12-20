import { isObject, isPromise } from "./util.js";

/**
 * 整合对象类型,让Action 支持以对象形式分发,mutation以对象形式提交

 store.dispatch({
  type: 'incrementAsync',
  amount: 10
 })

 store.commit({
  type: 'increment',
  amount: 10
 })

 */

export function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  return { type, payload, options };
}

/**
 *  注册action
 */

function registerAction(store, type, handler) {
  const entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    let res = handler.call(
      store,
      {
        dispatch: store.dispatch,
        commit: store.commit,
        state: store.state
      },
      payload
    );
    // action返回值不是promise时,转为promise对象
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    return res;
  });
}

/**
 *  注册mutation
 */

function registerMutation(store, type, handler) {
  const entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, store.state, payload);
  });
}

export function register(store, { state, actions, mutations }, Vue) {
  // 基于vue的响应系统原理,computed会订阅vm.data的变化,
  // 创建一个vue实例,并将vuex state作为data初始值,从而实现数据响应视图
  store._vm = new Vue({
    data: {
      $$state: state
    }
  });
  // 批量注册 action
  Object.keys(actions).forEach(key => registerAction(store, key, actions[key]));
  // 批量注册 mutation
  Object.keys(mutations).forEach(key =>
    registerMutation(store, key, mutations[key])
  );
}
