import Login from './pages/Login.svelte';
import Users from './pages/Users.svelte';
import Chat from './pages/Chat.svelte';
import Posts from './pages/Posts.svelte';
import Direct from './pages/Direct.svelte';
import Profile from './pages/Profile.svelte';
import EditProfile from './pages/EditProfile.svelte';

const routes = {
    '/': Login,
    '/users': Users,
    '/chat': Direct,
    '/chat/:id': Chat,
    '/explorar': Posts,
    '/perfil': Profile,
    '/editar-perfil': EditProfile
}

export default routes;