export const ROUTELIST = [
  {
    path: '/',
    name: 'index',
    component: 'This is index page'
  },
  {
    path: '/hello',
    name: 'hello',
    component: 'This is hello page'
  },
  {
    path: '/user',
    name: 'user',
    component: 'This is user page'
  },
  {
    path: '*',
    name: 'notFound',
    component: '404 NOT FOUND'
  }
];
