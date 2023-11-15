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
                <div class="user-img" style={`background-image: url(${$pbStore.baseUrl}/api/files/_pb_users_auth_/${room.expand.people.filter(i => i.id != localStorage.user)[0].id}/${room.expand.people.filter(i => i.id != localStorage.user)[0].avatar})`}>
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