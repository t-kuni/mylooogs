import TopPage from './components/pages/TopPage'
import ListPage from './components/pages/ListPage'
import EditPage from './components/pages/EditPage'

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
        path: '/edit',
        name: 'edit',
        component: EditPage,
    },
]
