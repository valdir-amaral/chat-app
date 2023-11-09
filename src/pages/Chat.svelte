<script>
    import { onMount } from "svelte";
    import { pbStore } from "../stores";

    export let params = {};

    let newMsg = '';
    let msgs = [];

    window.addEventListener('keydown', e => {
        if (e.keyCode == 13) {
            sendMessage();
        }
    });

    $pbStore.collection('chat_msg').subscribe('*', e => {
        if(e.record.user != localStorage.user) {
            msgs.push(e.record)
            msgs = msgs
        }
        
    })

    onMount(() => {
        $pbStore.collection('chat_msg').getList(1, 50, {filter: `chat_room="${params.id}"`, expand: 'user'})
        .then(res => msgs = res.items)
    })

    function sendMessage() {
        msgs.push({message: newMsg, 'chat_room': params.id, 'user': localStorage.user})
        msgs = msgs
        $pbStore.collection('chat_msg').create({
            'message': newMsg,
            'chat_room': params.id,
            'user': localStorage.user
        })
        newMsg = '';
    }
</script>

{#each msgs as msg}
<p>{msg.expand.user.name} -- {msg.message}</p>
{/each}


<input bind:value={newMsg} type="text">
<button on:click={sendMessage}>➜</button>

<style>
    input {
        margin-top: 50px;
        border-radius: 10px;
        border: none;
        padding: 10px;
        color: white;
        background-color: rgb(61, 57, 66);
    }
    button {
        padding: 10px;
        background-color: purple;
        border: none;
        border-radius: 50%;
        color: white;
        text-transform: uppercase;
    }
</style>