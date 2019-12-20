import applyMixin from "./mixin.js";
let Vue; // bind on install
export class Store {
  constructor(options = {}) {
    console.log(options);
  }
}

export function install(_Vue) {
  Vue = _Vue;
  applyMixin(Vue);
}
