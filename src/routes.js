import TopPage from './components/pages/TopPage'
import ListPage from './components/pages/ListPage'
import LogCreatingPage from "./components/pages/LogCreatingPage";
import LogEditingPage from "./components/pages/LogEditingPage";

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
      component: LogCreatingPage,
    },
    {
        path: '/log/:logID/edit',
        name: 'log_editing',
        component: LogEditingPage,
    },
]
