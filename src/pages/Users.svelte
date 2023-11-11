<script>
    import { onMount } from "svelte";
    import {pbStore} from '../stores';
    import { push, link, replace } from "svelte-spa-router";
    
    let rooms = [];
    let friend = {};
    let users = [];
    let query = '';
    let newRooms = []


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

    onMount(() => {
        $pbStore.collection('chat_room').getList(1,20,{expand: "people"})
        .then(res => {
            rooms = res.items.filter(i => {
                return i.people.includes(localStorage.getItem('user'))
            });  
        })
    })

    const searchUsers = () => {
        $pbStore.collection('users').getList(1,20,{filter: `username ~ "${query}" && id != "${localStorage.user}"`})
        .then(res => users = res.items)
    }

    const checkRoom = (user) => {
        console.log(user)
        newRooms = rooms.filter(i => {
            return i.people.includes(user.id)
        });  
        if (newRooms.length) {
            let roomWithFriend = rooms.filter(i => i.people.includes(localStorage.user, user.id))
            push(`/chat/${roomWithFriend[0].id}`)
        } else {
            $pbStore.collection('chat_room').create({
                "people": [
                    localStorage.user,
                    user.id
                ],
                "messages": [

                ]
            })
            .then(res => push(`/chat/${res.id}`))
        }
    }
</script>

<div class="container">
    <h2>Suas conversas recentes</h2>
    {#each rooms as room}
    <a class="user" use:link href="{`/chat/${room.id}`}">@{room.expand.people.filter(i => i.id != localStorage.user)[0].username}</a>
    {/each}

    <h2>Procure um amigo</h2>
    <input class="search-users" bind:value={query} on:keypress={searchUsers} type="text">

    {#each users as user}
    <a on:click={() => checkRoom(user)} class="user">@{user.username}</a>
    {/each}
</div>


<style>
    .container {
        padding-top: 50px;
    }
    h2 {
        margin-bottom: 30px;
    }

    .user {
        display: block;
        margin-bottom: 15px;
    }
    .search-users {
        display: block;
        margin-bottom: 40px;
    }
</style>