<script>
    import { link } from "svelte-spa-router";
    import NavMenuBottom from "../components/NavMenuBottom.svelte";
    import { pbStore } from "../stores";

    let promise = getUser();
    console.log($pbStore)
    async function getUser() {
        const res = await $pbStore.collection('users').getOne(localStorage.user);
        console.log(res);
        return res;
    }
</script>


{#await promise}
    <span class="loading-white"></span>
{:then data} 
    
    <main class="wrapper-page">
        <div class="top-part">
            <div class="user-image" style={`background-image: url(${$pbStore.baseUrl}/api/files/${data.collectionId}/${data.id}/${data.avatar})`}></div>
            <h1>@{data.username}</h1>
            <p class="bio">{data.bio || "Uma bio muito legal"}</p>
            <a use:link href="/editar-perfil"><span class="material-icons">edit</span>Editar perfil</a>
        </div>
        <div class="info-numbers">
            <div>
                <span class="number">291</span>
                <span class="text">Posts</span>
            </div>

            <div>
                <span class="number">2000</span>
                <span class="text">Seguidores</span>
            </div>

            <div>
                <span class="number">741</span>
                <span class="text">Seguindo</span>
            </div>
        </div>

        <div class="about-me container">
            <h2>Sobre mim</h2>
            <p>{data.about || "Eu sou uma pessoa bem assim sabe bem biruleibe da cabeça hihihihi"}</p>
        </div>
    </main>
{/await}

<NavMenuBottom />


<style>
    .wrapper-page {
        padding-top: 40px;

    }

    .top-part {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        justify-content: center;
    }   
    .top-part a {
        color: white;
        background-color: purple;
        padding: 8px 12px;
        font-size: 12px;
        text-decoration: none;
        border-radius: 32px;
        display: flex;
        align-items: center;
        gap: 6px;
    } 
    .top-part a .material-icons {
        font-size: 14px;
    }
    .top-part h1 {
        font-size: 24px;
    }
    .bio {
        font-size: 14px;
        color: #b3b3b3;
    }
    .user-image {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .info-numbers {
        padding-left: 16px;
        padding-right: 16px;
        max-width: 320px;
        margin: 30px auto;
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    .info-numbers > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .info-numbers .number {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
    }
    .info-numbers .text {
        font-size: 12px;
        color: #b3b3b3;
    }
    .about-me h2 {
        text-transform: uppercase;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .about-me p {
        font-size: 12px;
        line-height: 16px;        
    }
</style>