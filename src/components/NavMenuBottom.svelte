<script>
    import { link } from "svelte-spa-router";


</script>

<nav>
    <footer>
        <a class="active" use:link href="/explorar">Explorar</a>
        <a use:link href="/direct">Mensagens</a>
        <a use:link href="/perfil">Perfil</a>
    </footer>
</nav>


<style>
    nav {
        background-color: #000000;
        padding: 20px;
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    nav footer {
        display: flex;
        justify-content: center;
        gap: 16px;
    }
    nav footer a {
        font-size: 13px;
        color: #5e5e5e;
        padding: 5px 5px 0 5px;
        text-decoration: none;
    }
    nav footer a.active {
        color: white;
    }
</style>