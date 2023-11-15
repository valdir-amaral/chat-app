
<script>
    import {push} from 'svelte-spa-router';
    import { pbStore } from '../stores';
    let fileInput, fileName = "";

    let newBio, newDescription;
    const formData = new FormData();

    const changeInputFile = ev => {
        formData.append('avatar', ev.target.files[0]);

        fileName = ev.target.files[0].name;
    }
    
    const saveChanges = () => {

        if (newBio) formData.append('bio', newBio)
        if (newDescription) formData.append('description', newDescription)
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
    <input bind:value={newBio} type="text" placeholder="Bio"> -> campo feito na maior preguiça
    <input bind:value={newDescription} type="text" placeholder="Descrição"> -> campo feito na maior preguiça
    <a on:click={saveChanges}>Salvar alterações</a>
</div>

<style>
    .top-part {
        padding-top: 40px;
        display: flex;
        gap: 8px;
        align-items: center;
    }
    input {
        display: block;
        margin-top: 20px;
    }
    label {
        display: block;
        margin-top: 50px;
    }
    #avatar-input {
        display: none;
    }
    .container a {
        margin-top: 50px;
        display: block;
        background-color: purple;
        padding: 12px 8px;
        border-radius: 50px;
        text-align: center;
        
    }
</style>