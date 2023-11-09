<script>
    import { onMount } from "svelte";
    import {pbStore} from '../stores';
    import { link } from "svelte-spa-router";
    
    let rooms = [];
    let friend = {}
    onMount(() => {
        console.log(localStorage.user)
        $pbStore.collection('chat_room').getList(1,20,{expand: "people"})
        .then(res => {
            
            rooms = res.items.filter(i => i.expand.people.filter(j => j.id == localStorage.user));  
            console.log(rooms)
        })
    })
</script>

{#each rooms as room}
<a use:link href="{`/chat/${room.id}`}">{room.id}</a>
{/each}