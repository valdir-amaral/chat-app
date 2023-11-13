import Login from './pages/Login.svelte';
import Users from './pages/Users.svelte';
import Chat from './pages/Chat.svelte';
import Posts from './pages/Posts.svelte';
import Direct from './pages/Direct.svelte';
const routes = {
    '/': Login,
    '/users': Users,
    '/chat': Direct,
    '/chat/:id': Chat,
    '/explorar': Posts,
}

export default routes;