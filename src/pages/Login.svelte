<script>
    import { onMount } from 'svelte';
    import {pbStore} from '../stores';
    import { push, replace } from 'svelte-spa-router';

    let name, password, warnLogin = '', warnSign = '';
    
    let state = 'login';

    let data = {}

    function changeState() {
        state = state == 'sign-in' ? "login" : 'sign-in';
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
        .catch(err => {
            warnLogin = "Usuário e/ou senha incorretos!"
        })
    }

    const signIn = () => {
        console.log(data)
        $pbStore.collection('users').create(data)
        .then(res => login(data.username, data.password))
        .catch(err => {
            warnSign = "Usuário indisponível, tente pensar em um outro nome legal!"
        })
    }

    const checkPasswords = () => {
        if (data.password && data.password.length < 8) {
            warnSign = "A senha deve ter no mínimo 8 caracteres."
            return
        }
        if (data.password && data.passwordConfirm && data.password != data.passwordConfirm) {
            warnSign = "Senhas não correspondem";
        } else {
            warnSign = ''
        }
    }

    const validateLogin = () => {
        if (name && password){ 
            warnLogin = '';
            return
        }
       
        warnLogin = "Por favor preencha todos os campos."
    }

    const validateSign = () => {
        if(data.name && data.username && data.password && data.passwordConfirm) {
            warnSign = ''
            return false
        } else {
            warnSign = 'Por favor preencha todos os campos.'
            return true
        }
    }
</script>

<div class="container">
    {#if state == 'login'}
    <h1>Bem-vindo(a) ao ÉoMininDePapaiÉ!</h1>
    <p>Entre agora na sua conta e conheça pessoas incríveis!</p>

    <div class="form">
        <div class="form-control">
            <span class="material-icons">person</span>
            <input placeholder="Nome de usuário ou e-mail" bind:value={name} type="text">
        </div>
        <div class="form-control">
            <span class="material-icons">lock</span>
            <input on:input={validateLogin} on:blur={validateLogin} placeholder="Senha" bind:value={password} type="password">
        </div>
    </div>
    <p class="warn-validation">{warnLogin}</p>
    <p class="sign">Não tem uma conta? <a on:click={changeState}>Crie uma agora!</a></p>
    <button disabled={!name || !password} class="sign-in" on:click={() => login(name, password)}>Entrar</button>

    {:else if state == 'sign-in'}
    <h1>Falta pouco para usar nosso app!</h1>
    <p>Crie agora uma conta, é fácil e rápido :)</p>

    <div class="form-grid">
        <input style="grid-area: a;" type="text" bind:value={data.name} placeholder="Seu nome*">
        <input style="grid-area: b;" bind:value={data.username} type="text" placeholder="Nome de usuário*">
        <input style="grid-area: c;" bind:value={data.email} type="email" placeholder="E-mail">
        <input style="grid-area: d;" on:blur={checkPasswords} on:keypress={checkPasswords} bind:value={data.password} type="password" placeholder="Senha*">
        <input style="grid-area: e;" on:blur={checkPasswords} on:keypress={checkPasswords} bind:value={data.passwordConfirm} type="password" placeholder="Confirmar senha*">
    </div>
    <p class="warn-validation">{warnSign}</p>
    <p class="sign">Já tem uma conta? <a on:click={changeState}>Entrar</a></p>

    <button disabled={!(data.username && data.name && data.password && data.passwordConfirm)} class="sign-in" on:click={signIn}>Criar conta</button>
    {/if}
</div>


<style>
h1 {
    
    line-height: 44px;
}
.container {
    padding-top: 70px;
}
.warn-validation {
    color: rgb(253, 42, 42);
    font-size: 13px;
}
p {
    margin-top: 20px;
    line-height: 22px;
}
.sign {
    font-size: 13px;
    margin-top: 25px;
    text-align: center;
}
.sign a {
    color: #9241d4;
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
}
.form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form input,
.form-grid input {
    transition: all .2s ease-in-out;
    transition: border-radius .3s ease-in-out;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid gray;
    padding: 18px 25px 18px 50px;
    color: white;
    width: 100%;
}
.form-grid {
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    grid-template-areas: "a a"
                         "c c"
                         "b b"
                         "d e";
}
.form-grid input {
    padding: 12px 10px 12px 10px;
}
.form-control {
    position: relative;
}
.form-control span {
    top: 13px;
    left: 15px;
    position: absolute;
}
.form input:focus,
.form-grid input:focus {
    outline: none;
    border: none;
    border-radius: 30px;
    background-color: #292929;

}
.sign-in {
    background-color: rgb(107, 42, 160);
    color: white;
    border: none;
    text-transform: uppercase;
    font-family: 'Inter';
    margin-top: 50px;
    font-weight: 600;
    padding: 15px 40px;
    border-radius: 20px;
    width: 100%;
    cursor: pointer;

    transition: opacity .4s, background-color .4s, transform .2s;
}
.sign-in:not(:disabled):hover {
    background-color: rgb(70, 0, 128);
    transform: translateY(-4px);
}
.sign-in:disabled {
    opacity: .4;
    cursor: default;
    background-color: rgba(148,148,148, .4);
}
</style>