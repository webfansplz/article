import { HashRouter } from './hash';
import { HistoryRouter } from './history';
import { ROUTELIST } from './routeList';

class WebRouter {
  constructor({ mode = 'hash', routeList }) {
    this.router = mode === 'hash' ? new HashRouter(routeList) : new HistoryRouter(routeList);
  }
  push(path) {
    this.router.push(path);
  }
  replace(path) {
    this.router.replace(path);
  }
  go(num) {
    this.router.go(num);
  }
}

const webRouter = new WebRouter({
  mode: 'history',
  routeList: ROUTELIST
});
