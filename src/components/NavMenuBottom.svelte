<script>
    import { link } from "svelte-spa-router";


</script>

<nav>
    <footer>
        <div>
            <a class="active" use:link href="/explorar">Explorar</a>
        </div>
        <div>
            <a use:link href="/direct">Mensagens</a>
        </div>
        <div>
            <a use:link href="/perfil">Perfil</a>
        </div>
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
        position: relative;
    }
    nav footer a {
        font-size: 13px;
        color: #5e5e5e;
        padding: 5px 5px 0 5px;
        text-decoration: none;
        transition: all .3s ease-in-out;
    }
    nav footer > div {
        position: relative;
    }
    nav footer a.active {
        color: white;
    }
    nav footer a.active::before {
        content: '';
        height: 10px;
        background-color: #0e1013;
        position: absolute;
        top: -20px;
        left: 0;
        width: 100%;
        border-radius: 0 0 10px 10px;
    }
</style>