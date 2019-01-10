import { BaseRouter } from './base.js';
export class HistoryRouter extends BaseRouter {
  constructor(list) {
    super(list);
    this.handler();
    window.addEventListener('popstate', e => {
      this.handler();
    });
  }
  handler() {
    this.render(this.getState());
  }
  getState() {
    const path = window.location.pathname;
    return path ? path : '/';
  }
  push(path) {
    history.pushState(null, null, path);
    this.handler();
  }
  replace(path) {
    history.replaceState(null, null, path);
    this.handler();
  }
  go(n) {
    window.history.go(n);
  }
}
