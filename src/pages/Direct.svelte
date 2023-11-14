<script>
    import NavMenuBottom from "../components/NavMenuBottom.svelte";
    import {pbStore } from '../stores';
    import { onMount } from 'svelte';
    import {link} from 'svelte-spa-router';

    let rooms = [];
    let promise = getRooms();

    onMount(() => {
        promise = getRooms();
    })

    async function getRooms() {
        const res = await $pbStore.collection('chat_room').getList(1,20,{sort: '-updated', expand: "people,messages"})
        let rooms = res.items.filter(i => {
            return i.people.includes(localStorage.getItem('user'))
        });  
        return rooms;
    }

    $pbStore.collection('chat_room').subscribe('*', e => {
        if (e.record.people.includes(localStorage.user)) {
            $pbStore.collection('chat_room').getOne(e.record.id, {
                expand: 'people'
            })
            .then(res => {
                rooms.push(res)
                rooms = rooms
            })
        }
    })
</script>


<div class="container">
    <div class="top-part">
        <h1>Mensagens</h1>
        <div class="input-control">
            <span class="material-icons">
                search
            </span>
            <input placeholder="Procurar uma mensagem..." type="text" class="search-user">
        </div>
        
    </div>

    {#await promise}
        <span class="loading-white"></span>
    {:then rooms} 
    <div class="rooms-list">
        {#each rooms as room}
        {#if room.expand.messages}
        <a class="user" use:link href="{`/chat/${room.id}`}">
        
            <div class="left-part">
                <div class="user-img" style="background-image: url('data:image/jpeg;base64,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');">
                </div>
                <div class="room-info">
                    <p>{room.expand.people.filter(i => i.id != localStorage.user)[0].username}</p>
                    <span class="last-msg">{room.expand.messages[room.messages.length - 1].message}</span>
                </div>
            </div>
            <div class="right-part">
                <span>{new Date(room.updated).getHours() < 10 ? `0${new Date(room.updated).getHours()}` : new Date(room.updated).getHours()}:{new Date(room.updated).getMinutes() < 10 ? `0${new Date(room.updated).getHours()}` : new Date(room.updated).getHours()}</span>
            </div>
        
        </a>
        {/if}
        {/each}
    </div>
    {/await}
    

</div>


<NavMenuBottom />

<style>
    .input-control {
        position: relative;
    }
    .input-control .material-icons {
        position: absolute;
        top: 25px;
        left: 10px;
        color: #585858;
    }
    .top-part {
        padding: 20px 0;
    }
    .last-msg {
        font-size: 12px;
    }
    .search-user {
        background-color: #242424;
        border: none;
        width: 100%;
        padding: 8px 6px 8px 50px;
        margin-top: 20px;
        border-radius: 5px;
    }
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;

    }
    .loading-white {
        width: 70px;
        margin: auto;
        height: 70px;
        border: 3px solid white;
        border-right-color: transparent;
        border-bottom-color: transparent;
        animation-duration: 700ms;
    }
    .rooms-list {
        margin-top: 0px;
    }
    .user {
        text-decoration: none;
        color: white;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        gap: 6px;
        justify-content: space-between;
        border-bottom: 1px solid #242424;
    }
    .user-img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .user .left-part {
        display: flex;
        gap: 8px;
    }
</style>