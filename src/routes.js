import Login from './pages/Login.svelte';
import Users from './pages/Users.svelte';
import Chat from './pages/Chat.svelte';
import Posts from './pages/Posts.svelte';

const routes = {
    '/': Login,
    '/users': Users,
    '/chat/:id': Chat,
    '/posts': Posts
}

export default routes;