
<script>
    import {push} from 'svelte-spa-router';
    import { pbStore } from '../stores';
    let fileInput, fileName = "";

    let newBio, newDescription, loading = false;
    const formData = new FormData();

    const changeInputFile = ev => {
        formData.append('avatar', ev.target.files[0]);

        fileName = ev.target.files[0].name;
    }
    
    const saveChanges = () => {
        loading = true;
        if (newBio) formData.append('bio', newBio)
        if (newDescription) formData.append('description', newDescription)
        $pbStore.collection('users').update(localStorage.user, formData)
        .then(res => {
            loading = false;
            push('/perfil');
        })
    }
</script>

<div class="top-part container">
    <span on:click={() => push('/perfil')} class="material-icons">
        arrow_back
    </span>
    <h2>Editar perfil</h2>
</div>

<div class="container">
    <label class="file-input" for="avatar-input">
        Foto de perfil
        <span class="material-icons">
            upload
        </span>
        Selecione um arquivo {fileName}
    </label>

    <input type="file" on:change={changeInputFile} bind:files={fileInput} name="avatar-input" id="avatar-input">
    <input bind:value={newBio} type="text" placeholder="Bio"> 
    <input bind:value={newDescription} type="text" placeholder="Descrição">
    <button disabled={!newBio && !newDescription && loading && fileInput} class="sign-in" on:click={saveChanges}>{#if loading}<span class="loading-white"></span>{:else}Salvar alterações{/if}</button>
</div>

<style>
    .top-part {
        padding-top: 40px;
        display: flex;
        gap: 8px;
        align-items: center;
    }
    
    input {
    transition: all .2s ease-in-out;
    transition: border-radius .3s ease-in-out;
    background-color: transparent;
    margin-bottom: 20px;
    border: 1px solid #494949;
    border-radius: 20px;
    padding: 12px 25px;
    color: white;
    width: 100%;
}
    .file-input {
        border-radius: 20px;
        border: 1px solid #494949;
        padding: 30px;
        color: #757575;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-bottom: 20px;
    }
    label {
        display: block;
        margin-top: 50px;
        text-align: center;
    }
    #avatar-input {
        display: none;
    }
    .container button {
        width: 100%;
        color: white;
        border: none;
        margin-top: 50px;
        display: block;
        background-color: purple;
        padding: 12px 8px;
        border-radius: 50px;
        text-align: center;
        
    }
</style>