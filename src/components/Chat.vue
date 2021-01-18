<template>
  <div>
    <template>
      <div>
        <div
          class="fixed top-0 right-0 mt-6 mr-6 flex flex-row justify-center items-center text-white border-2 rounded-full lg:border-4 border-white opacity-50 hover:opacity-100 z-20 bg-blue-800 cursor-pointer w-10 h-10 lg:w-16 lg:h-16"
          @click="showChatWindow = !showChatWindow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-6 h-6 lg:w-8 lg:h-8 fill-current"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M22 6h-3v9H6v3h12l4 4V6zm-5 7V2H2v15l4-4h11z" />
          </svg>
        </div>
        <div class="fixed pl-12 lg:pl-20 w-full top-0">
          <transition
            mode="out-in"
            enter-active-class="animated slideInDown faster"
            leave-active-class="animated slideOutUp faster"
          >
            <div
              v-if="showChatWindow"
              class="flex flex-col
             mx-auto max-w-128 sm:w-2/3 lg:w-1/2 h-128 bg-blue-700 z-80"
            >
              <div
                class="w-full flex flex-row justify-center items-center text-2xl text-white bg-blue-900 py-2"
              >
                Kardi czat
              </div>
              <div class="h-full overflow-y-scroll">
                <div
                  v-for="(message, index) in messageList"
                  :key="message.id"
                  class="w-full flex flex-row"
                  :class="[
                    message.user.id === $store.getters.user.id
                      ? 'justify-end rounded-l-lg rounded-t-lg rounded-bl-lg'
                      : 'justify-start rounded-r-lg  rounded-br-lg',
                    index > 0 &&
                    messageList[index].user.id ===
                      messageList[index - 1].user.id
                      ? ''
                      : 'mt-2',
                    messageList[index].user.id ===
                    messageList[index + 1].user.id
                      ? ''
                      : 'mt-2'
                  ]"
                >
                  <div
                    class="flex flex-row items-center justify-start bg-blue-900 w-2/3 py-2 px-2  text-white"
                    :class="
                      message.user.id === $store.getters.user.id
                        ? 'rounded-l-lg rounded-t-lg rounded-bl-lg mr-2'
                        : 'rounded-r-lg rounded-t-lg rounded-br-lg ml-2'
                    "
                  >
                    <div
                      class="flex flex-row items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-red-700 text-white flex-shrink-0 text-xl lg:text-sm mr-2 tracking-wider"
                      v-if="
                        index === 0 ||
                          messageList[index].user.id !==
                            messageList[index - 1].user.id
                      "
                    >
                      {{
                        message.user.id === $store.getters.user.id
                          ? "ja"
                          : message.user.name[0] + message.user.surname[0]
                      }}
                    </div>
                    <span>{{ JSON.parse(message.data).text }}</span>
                  </div>
                </div>
              </div>
              <div
                class="w-full flex flex-row justify-center items-center text-2xl text-white bg-blue-900 py-2"
              >
                <input /><button>Wyślij</button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      participants: [], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      showChatWindow: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      alwaysScrollToBottom: true // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    };
  },
  methods: {
    onMessageWasSent(message) {
      // called when the user sends a message
      this.$http.post("messages", message).then(res => {
        this.messageList = [...this.messageList, message];
      });
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    editMessage(message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    setEchoListeners() {
      this.$echo
        .join("chat")
        .here(users => {
          console.log("here", users);
          this.participants = users.map(user => {
            return {
              id: user.id,
              name: user.name,
              surname: user.surname
            };
          });
          this.participants.splice(
            this.participants.indexOf(
              participant => participant.id === this.$store.getters.user.id
            ),
            1
          );
        })
        .joining(user => {
          console.log("joining", user);
          this.participants.push({
            id: user.id,
            name: user.name,
            surname: user.surname
          });
        })
        .leaving(user => {
          console.log("leaving", user);
          this.participants.splice(
            this.participants.indexOf(
              participant => participant.id === user.id
            ),
            1
          );
        })
        .listen(".message.created", e => {
          let data = JSON.parse(e.chatMessage.data);
          data.meta = e.chatMessage.created_at;
          this.messageList = [
            ...this.messageList,
            {
              id: e.chatMessage.id,
              type: e.chatMessage.type,
              data: data,
              author:
                e.chatMessage.user_id === this.$store.getters.user.id
                  ? "me"
                  : e.chatMessage.user_id
            }
          ];
        })
        .listen(".message.deleted", e => {
          console.log(e);
          this.$snotify.info("Usunięto wiadomość");
          this.messageList.splice(
            this.messageList.findIndex(message => message.id === e.message.id),
            1
          );
        })
        .listenForWhisper(".typing", id => {
          console.log(id + " is typing");
          this.showTypingIndicator = id;
        })
        .listenForWhisper(".client-typing", id => {
          console.log(id + " is typing");
          this.showTypingIndicator = id;
        })
        .listenForWhisper(".client.typing", id => {
          console.log(id + " is typing");
          this.showTypingIndicator = id;
        })
        .listenForWhisper("typing", id => {
          console.log(id + " is typing");
          this.showTypingIndicator = id;
        });
      this.$echo
        .private("chat")
        .listen(".typing", id => {
          console.log(id + " is typing");
          this.showTypingIndicator = id;
        })
        .listen(".client-typing", id => {
          console.log(id + " is typing");
          this.showTypingIndicator = id;
        })
        .listen(".client.typing", id => {
          console.log(id + " is typing");
          this.showTypingIndicator = id;
        })
        .listen("typing", id => {
          console.log(id + " is typing");
          this.showTypingIndicator = id;
        });
    },
    handleTypingEvent() {
      return this.$echo.private("chat").whisper("typing", {
        id: this.$store.getters.user.id
      });
    }
  },
  created() {
    this.setEchoListeners();
    this.$http.get("messages").then(res => {
      this.messageList = res.data;
    });
  }
};
</script>

<style></style>
