import { BaseRouter } from './base.js';
export class HashRouter extends BaseRouter {
  constructor(list) {
    super(list);
    this.handler();
    window.addEventListener('hashchange', e => {
      this.handler();
    });
  }
  handler() {
    this.render(this.getState());
  }
  getState() {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/';
  }
  getUrl(path) {
    const href = window.location.href;
    const i = href.indexOf('#');
    const base = i >= 0 ? href.slice(0, i) : href;
    return `${base}#${path}`;
  }
  push(path) {
    window.location.hash = path;
  }
  replace(path) {
    window.location.replace(this.getUrl(path));
  }
  go(n) {
    window.history.go(n);
  }
}
