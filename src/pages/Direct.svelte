<script>
    import NavMenuBottom from "../components/NavMenuBottom.svelte";
    import {pbStore } from '../stores';
    import { onMount } from 'svelte';
    import {link} from 'svelte-spa-router';

    let rooms = [];
    onMount(() => {
        $pbStore.collection('chat_room').getList(1,20,{sort: '-updated', expand: "people,messages"})
        .then(res => {
            rooms = res.items.filter(i => {
                return i.people.includes(localStorage.getItem('user'))
            });  
            console.log(rooms)
        })
    })

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
    <h1>Mensagens</h1>

    {#each rooms as room}

    {#if room.expand.messages}
    <a class="user" use:link href="{`/chat/${room.id}`}">
        <div>
            <img src="" alt="">
            <div>
                <p>{room.expand.people.filter(i => i.id != localStorage.user)[0].username}</p>
                <span>{room.expand.messages[room.messages.length - 1].message}</span>
            </div>

            <div>
                <span>{new Date(room.updated).getHours()}:{new Date(room.updated).getMinutes()}</span>
            </div>
        </div>
    </a>
   
    {/if}
    {/each}

</div>


<NavMenuBottom />

<style>
    
</style>