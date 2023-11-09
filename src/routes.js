import Login from './pages/Login.svelte';
import Users from './pages/Users.svelte';
import Chat from './pages/Chat.svelte';

const routes = {
    '/': Login,
    '/users': Users,
    '/chat/:id': Chat
}

export default routes;