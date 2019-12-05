import applyMixin from "./mixin.js";
import { register } from "./service.js";
let Vue; // bind on install
export class Store {
  constructor(options = {}) {
    this._actions = Object.create(null);
    this._mutations = Object.create(null);
    const store = this;
    register(store, options, Vue);
  }
  // class getter ,访问store.state,返回对应store.vm data中的$$state
  get state() {
    return this._vm._data.$$state;
  }
}

export function install(_Vue) {
  Vue = _Vue;
  applyMixin(Vue);
}
