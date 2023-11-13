<script>
    import { afterUpdate, onMount } from "svelte";
    import { pbStore } from "../stores";

    export let params = {};

    let currentRoom;
    let newMsg = '';
    let msgs = [];
    let friend = '';
    let chatContainer;
    afterUpdate(() => {
        if (msgs) scrollToBottom(chatContainer)
    })

    window.addEventListener('keydown', e => {
        if (e.keyCode == 13) {
            sendMessage();
        }
    });
    
    $pbStore.collection('chat_msg').subscribe('*', e => {
        if(e.record.user != localStorage.user) {
            $pbStore.collection('chat_msg').getOne(e.record.id, {
                expand: 'user'
            })
            .then(res => {
                msgs.push(res)
                msgs = msgs
            })
            
        }
        
    })

    onMount(() => {
        $pbStore.collection('chat_room').getOne(params.id, {expand: 'people'})
        .then(res => {
            currentRoom = res
            friend = currentRoom.expand.people.filter(i => i.id != localStorage.user)[0].username;

        })

        $pbStore.collection('chat_msg').getList(1, 50, {filter: `chat_room="${params.id}"`, expand: 'user'})
        .then(res => msgs = res.items)
    })

    function sendMessage() {
        if (!newMsg.length) return;
        msgs.push({message: newMsg, 'chat_room': params.id, 'user': localStorage.user})
        msgs = msgs
        $pbStore.collection('chat_msg').create({
            'message': newMsg,
            'chat_room': params.id,
            'user': localStorage.user
        })
        newMsg = '';
    }

    const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }; 

    document.addEventListener('beforeinput', event => {
        const {
            inputType,
        } = event;
        if (['insertParagraph', 'insertLineBreak'].includes(inputType)) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

</script>
<div class="chat-layout">
    <header>
        <div class="container top-part">
            <h2>{friend}</h2>
            <p style="margin-bottom: 40px;">Você é o user {localStorage.user} :)</p>
        </div>
    </header>


    <div bind:this={chatContainer} class="chat">
        {#each msgs as msg}
        <div class="message" class:me={msg.user == localStorage.user} class:other={msg.user != localStorage.user}>
            <p>{msg.message}</p>
        </div>
        {/each}
    </div>


    <div class="bottom-part">
        <div style="width: 100%;">
            <p class="new-input" bind:textContent={newMsg} contenteditable="true">
                {newMsg}
            </p>
        </div>
        
        
        {#if newMsg.length}
        <button on:click={sendMessage}>➜</button>
        {/if}
    </div>
</div>

<style>
    .bottom-part {
        display: flex;
        gap: 15px;
        padding-left: 6px;
        padding-right: 6px;
    }

    .container {
        display: flex;
        flex-direction: column;
        padding-left: 16px;
        padding-right: 16px;
    }
    .chat {
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: calc(100vh - 100px - 100px);
        overflow-y: auto;
    }
    .message {
        padding: 10px;
        max-width: 65%;
        min-width: 25px;
        width: fit-content;
    }
    .message.me {
        margin-left: auto;
        border-radius: 10px 10px 0 10px;
        background-color: purple;
    }

    .message.other {
        margin-right: auto;
        background-color: #292929;
        border-radius: 10px 10px 10px 0;
    }
    .new-input {
        word-break: break-word;
        border-radius: 20px;
        border: none;
        color: white;
        padding-inline-end: 10px !important;
        padding: 10px;
        max-height: 75px;
        overflow-y: auto;
        background-color: #292929;
    }
    button {
        max-height: 40px;
        padding: 10px;
        background-color: purple;
        border: none;
        border-radius: 50%;
        color: white;
        text-transform: uppercase;
    }
</style>