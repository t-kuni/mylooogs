import TopPage from './components/pages/TopPage'
import ListPage from './components/pages/ListPage'
import LogEditingPage from "./components/pages/LogEditingPage";
import NotFoundPage from "./components/pages/NotFoundPage";

export default [
    {
        path: '/',
        name: 'top',
        component: TopPage,
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
      path: '*',
      component: NotFoundPage
    }
]
