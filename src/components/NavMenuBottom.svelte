<script>
    import { link } from "svelte-spa-router";
    import active from 'svelte-spa-router/active'

</script>

<nav>
    <footer>
        <div>
            <a use:active={'/explorar'} use:link href="/explorar">
                <span class="material-icons">
                explore
                </span>
                Explorar
            </a>
        </div>
        <div>
            <a use:active={'/chat'} use:link href="/chat">
                <span class="material-icons">
                chat_bubble
                </span>
                Mensagens
            </a>
        </div>
        <div>
            <a use:active={'/perfil'} use:link href="/perfil">
                <span class="material-icons">
                account_circle
                </span>
                Perfil
            </a>
        </div>
    </footer>
</nav>


<style>
    nav {
        background-color: #000000;
        padding: 10px 20px 20px 20px;
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 13px;
        color: #5e5e5e;
        gap: 8px;
        padding: 5px 5px 0 5px;
        text-decoration: none;
        transition: all .3s ease-in-out;
    }
    nav footer a span {
        text-align: center;
        font-size: 16px;
    }
    nav footer > div {
        position: relative;
    }
    :global(footer a.active) {
        color: white !important;
    }
    :global(nav footer a.active::before) {
        content: '';
        height: 10px;
        background-color: #0e1013;
        position: absolute;
        top: -10px;
        left: 0;
        width: 100%;
        border-radius: 0 0 10px 10px;
    }
</style>