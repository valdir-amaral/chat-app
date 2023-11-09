<script>
    import { onMount } from "svelte";
    import { pbStore } from "../stores";

    export let params = {};

    let newMsg = '';
    let msgs = [];
    $pbStore.collection('chat_msg').subscribe('*', e => {
        if(e.record.user != localStorage.user) {
            msgs.push(e.record)
            msgs = msgs
        }
        
    })

    onMount(() => {
        $pbStore.collection('chat_msg').getList(1, 50, {filter: `chat_room="${params.id}"`})
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

    }
</script>

{#each msgs as msg}
<p>{msg.message}</p>
{/each}


<input bind:value={newMsg} type="text">
<button on:click={sendMessage}>Enviar mensagem</button>

<style>
    input {
        display: block;
        margin-top: 500px;
    }
</style>