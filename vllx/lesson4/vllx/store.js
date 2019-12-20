import applyMixin from "./mixin.js";
import { register, unifyObjectStyle } from "./service.js";
let Vue; // bind on install
export class Store {
  constructor(options = {}) {
    this._actions = Object.create(null);
    this._mutations = Object.create(null);
    this._wrappedGetters = Object.create(null);
    const store = this;
    const { dispatch, commit } = this;
    register(store, options, Vue);
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload);
    };
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options);
    };
  }
  get state() {
    return this._vm._data.$$state;
  }
  /**
   * dispatch 方法,用promise来调用对应异步action并捕获返回值,并返回promise对象
   */
  dispatch(_type, _payload) {
    const { type, payload } = unifyObjectStyle(_type, _payload);
    const entry = this._actions[type];
    const result =
      entry.length > 1
        ? Promise.all(entry.map(handler => handler(payload)))
        : entry[0](payload);
    return result.then(res => {
      return res;
    });
  }
  /**
   * commit 方法,调用对应mutation,这里可以看到和action不同的是mutation采取同步处理
   */
  commit(_type, _payload, _options) {
    const { type, payload, options } = unifyObjectStyle(
      _type,
      _payload,
      _options
    );
    const entry = this._mutations[type];
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  }
}

export function install(_Vue) {
  Vue = _Vue;
  applyMixin(Vue);
}
