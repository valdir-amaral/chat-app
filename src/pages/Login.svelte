<script>
    import { onMount } from 'svelte';
    import {pbStore} from '../stores';
    import { push, replace } from 'svelte-spa-router';

    let name, password, warn;
    
    let state = 'login';

    let data = {}
    function changeState() {
        state = 'sign-in'
    }
    onMount(() => {
        /*if (localStorage.user) {
            replace('/users')
        }
        */
    })
    const login = (name, password) => {
        $pbStore.collection('users').authWithPassword(name, password)
        .then(res => {
            localStorage.setItem('user', $pbStore.authStore.model.id)
            push('/users')
        })
    }

    const signIn = () => {
        console.log(data)
        $pbStore.collection('users').create(data)
        .then(res => login(data.username, data.password))
    }

    const checkPasswords = () => {
        if (data.password && data.passwordConfirm && data.password != data.passwordConfirm) {
            warn = "Senhas não correspondem";
        } else {
            warn = ''
        }
    }
</script>

<div class="container">
    {#if state == 'login'}
    <h1>Login</h1>
    <p>Entre agora na sua conta</p>

    <div class="form">
        <input placeholder="Nome de usuário ou e-mail" bind:value={name} type="text">
        <input placeholder="Senha" bind:value={password} type="text">
    </div>

    <p>Não tem uma conta? <a on:click={changeState}>Crie uma agora!</a></p>
    <button class="sign-in" on:click={() => login(name, password)}>Login</button>

    {:else if state == 'sign-in'}
    <h1>Criar conta</h1>
    <p>Crie agora uma conta, é fácil e rápido :)</p>

    <div class="form">
        <input type="text" bind:value={data.name} placeholder="Seu nome*">
        <input bind:value={data.username} type="text" placeholder="Nome de usuário*">
        <input bind:value={data.email} type="email" placeholder="E-mail">
        <input on:blur={checkPasswords} on:keypress={checkPasswords} bind:value={data.password} type="password" placeholder="Senha*">
        <input on:blur={checkPasswords} on:keypress={checkPasswords} bind:value={data.passwordConfirm} type="password" placeholder="Confirmar senha*">
    </div>
    {#if warn}<p>{warn}</p>{/if}
    <button class="sign-in" on:click={signIn}>Criar conta</button>
    {/if}
</div>


<style>
h1 {
    margin-top: 50px;
}
p {
    margin-top: 20px;
}
.form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form input {
    transition: all .2s ease-in-out;
    transition: border-radius .3s ease-in-out;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid gray;
    padding: 15px 25px;
    color: white;
}
.form input:focus {
    outline: none;
    border: none;
    border-radius: 30px;
    background-color: #38304C;
}
.sign-in {
    background-color: rgb(70, 0, 128);
    color: white;
    border: none;
    text-transform: uppercase;
    font-family: 'Inter';
    margin-top: 20px;
    font-weight: 600;
    padding: 15px 40px;
    border-radius: 20px;
    width: 100%;
    max-width: 400px;
}
</style>