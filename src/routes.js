import {STATE} from "./state";
import store from './store';
import TopPage from './components/pages/TopPage'
import ListPage from './components/pages/ListPage'
import LogEditingPage from "./components/pages/LogEditingPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ViewListPage from "./components/pages/ViewListPage";
import LogViewPage from "./components/pages/LogViewPage";

export default [
    {
        path: '/',
        name: 'top',
        component: TopPage,
        beforeEnter: (to, from, next) => {
          if (store.state[STATE.SIGNED_IN]) {
            next('/list');
          } else {
            next();
          }
        }
    },
    {
        path: '/list',
        name: 'list',
        component: ListPage,
    },
    {
      path: '/log/create',
      name: 'log_creating',
      component: LogEditingPage,
    },
    {
        path: '/log/:logID/edit',
        name: 'log_editing',
        component: LogEditingPage,
    },
    {
      path: '/view-list',
      name: 'view-list',
      component: ViewListPage,
    },
    {
      path: '/log/:logID',
      name: 'log_view',
      component: LogViewPage,
    },
    {
      path: '*',
      component: NotFoundPage
    }
]
