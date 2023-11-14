<script>
    import { afterUpdate, onMount } from "svelte";
    import { pbStore } from "../stores";
    import { push } from "svelte-spa-router";

    export let params = {};

    let currentRoom;
    let newMsg = '';
    let msgs = [];
    let friend = '';
    let chatContainer;
    let promise = getMessages();
    let msgContainer;

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

    async function getMessages() {
        const currentRoom = await $pbStore.collection('chat_room').getOne(params.id, {expand: 'people'})
        friend = await currentRoom.expand.people.filter(i => i.id != localStorage.user)[0];
        const res = await $pbStore.collection('chat_msg').getList(1, 50, {filter: `chat_room="${params.id}"`, expand: 'user,replied_to'})
        console.log(res)
        msgs = await res.items
        return res;
    }


    function sendMessage() {
        if (!newMsg.length) return;
        msgs.push({message: newMsg, 'chat_room': params.id, 'user': localStorage.user})
        msgs = msgs;
        let sendMessage = newMsg;
        newMsg = "";

        $pbStore.collection('chat_msg').create({
            'message': sendMessage,
            'chat_room': params.id,
            'user': localStorage.user
        })
        .then(res => {
            $pbStore.collection('chat_room').update(params.id, {
            'messages+': res.id
            })

        })
        
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

    function followUser() {
        alert('isso não faz nada ainda bocó')
        $pbStore.collection('users').update(localStorage.user, {'following+': friend.id})
        .then(res => console.log(res))
    }

    const handleStart = ev => {
        let rect = msgContainer.getBoundingClientRect();
        let windowWidth = window.innerWidth

        let distance = windowWidth - rect.left;
        console.log(distance)
        console.log(ev.currentTarget.left)
    }
</script>
<div class="chat-layout">
    {#await promise}
    <div class="chat loading">
        <span class="loading-white"></span>
    </div>

    
    {:then res} 
        <header>
            <div class="container top-part">
                <span on:click={() => push('/chat')} class="material-icons">
                    arrow_back
                </span>
                <h2><div class="user-img" style="background-image: url('data:image/jpeg;base64,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');"></div>{friend.username} <button class="follow-btn" on:click={followUser}>Seguir</button></h2>
                {#if friend.bio}<p style="margin-bottom: 40px;">{friend.bio}</p>{/if}
            </div>
        </header>


        <div bind:this={chatContainer} class="chat">
            {#each msgs as msg}
            <div on:touchmove={handleStart} bind:this={msgContainer} class:me={msg.user == localStorage.user} class:other={msg.user != localStorage.user} class="container-msg">
                {#if msg['replied_to']}
                <div class="replied">
                    <div>
                        <span>{msg.expand['replied_to'].user == friend.id ? friend.username : "Você"}</span>
                        <span>{msg.expand['replied_to'].message}</span>
                    </div>
                </div>
                {/if}
                <div class="message" class:me={msg.user == localStorage.user} class:other={msg.user != localStorage.user}>
                    <p>{msg.message}</p>
                </div>
            </div>
            {/each}
        </div>

    {/await}
    
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
    .container-msg {
        width: fit-content;
        max-width: 65%;
    }
    .user-img {
        width: 44px;
        height: 44px;
        background-size: cover;
        border-radius: 50%;
        background-position: center;
    }
    .top-part {
        display: flex;
        gap: 15px;
        padding-top: 25px;
        padding-bottom: 25px;
        align-items: center;
        flex-direction: row !important;
        border-bottom: 1px solid #252525;
    }
    .top-part h2 {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
    }
    .bottom-part {
        margin-top: auto;
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
    .follow-btn {
        border-radius: 15px;
        font-size: 10px;
        padding: 8px;
    }
    .chat {
        padding-top: 20px;
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: calc(100vh - 100px - 118px);
        overflow-y: auto;
    }
    .chat.loading {
        height: calc(100vh - 120px);
    }
    .message {
        padding: 10px;
        min-width: 25px;
        width: 100%;
    }
    .me {
        margin-left: auto;
    }
    .other {
        margin-right: auto;
    }
    .message p {
        word-break: break-all;
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
    .replied {
        padding: 6px;
        word-break: break-all;
        font-size: 14px;
        border-radius: 10px 10px 0 0;
    }
    .me .replied {
        background-color: purple;

    }
    .me .replied div {
        background-color: rgb(112, 10, 112);
    }
    .me .replied + .message {
        border-radius: 0 0 0 10px;
    }
    .other .replied + .message {
        border-radius: 0 0 10px 0;
    }
    .other .replied {
        background-color: #242424;
    }
    .replied div {
        padding: 5px 5px 5px 7px;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        background-color: #3d3d3d;
        position: relative;
    }

    .replied div::before {
        content: "";
        position: absolute;
        height: 100%;
        left: 0;
        width: 2px;
        top: 0;
    }
    .me .replied div::before {
        background-color: rgb(255, 255, 255);
    }
    .other .replied div::before {
        background-color: purple;
    }
</style>