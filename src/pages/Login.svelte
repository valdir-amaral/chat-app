<script>
    import { onMount } from 'svelte';
    import {pbStore} from '../stores';
    import { push, replace } from 'svelte-spa-router';

    let name, password;
    
    onMount(() => {
        /*if (localStorage.user) {
            replace('/users')
        }
        */
    })
    const login = () => {
        $pbStore.collection('users').authWithPassword(name, password)
        .then(res => {
            localStorage.setItem('user', $pbStore.authStore.model.id)
            push('/users')
        })
    }
</script>

<div class="container">
    <h1>Login</h1>
    <p>Entre agora na sua conta</p>

    <div class="form">
        <input placeholder="E-mail" bind:value={name} type="text">
        <input placeholder="Senha" bind:value={password} type="text">
    </div>

    <button class="sign-in" on:click={login}>Login</button>

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
    padding: 15px 10px;
    color: white;
    border-radius: 10px;
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