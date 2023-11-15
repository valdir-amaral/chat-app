
<script>
    import {push} from 'svelte-spa-router';
    import { pbStore } from '../stores';
    let fileInput, fileName = "";

    const formData = new FormData();

    const changeInputFile = ev => {
        formData.append('avatar', ev.target.files[0]);

        fileName = ev.target.files[0].name;
    }

    const saveChanges = () => {
        $pbStore.collection('users').update(localStorage.user, formData)
        .then(res => console.log(res))
    }
</script>

<div class="top-part container">
    <span on:click={() => push('/perfil')} class="material-icons">
        arrow_back
    </span>
    <h2>Editar perfil</h2>
</div>

<div class="container">
    <label for="avatar-input">
        Trocar foto {fileName}
    </label>
    <input type="file" on:change={changeInputFile} bind:files={fileInput} name="avatar-input" id="avatar-input">

    <a on:click={saveChanges}>Salvar alterações</a>
</div>

<style>
    .top-part {
        padding-top: 40px;
        display: flex;
        gap: 8px;
        align-items: center;
    }
    #avatar-input {
        display: none;
    }
    .container a {
        margin-top: 50px;
        display: block;
    }
</style>