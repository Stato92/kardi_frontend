<template>
  <div>
    <h1 class="text-xl lg:text-3xl text-white">Komentarze</h1>
    <div
      class="flex flex-col justify-start items-start text-white leading-normal w-full mb-4"
    >
      <div
        class="flex flex-row justify-start items-center mt-2 w-full rounded-lg bg-blue-900 border border-gray-500 px-3 py-3 lg:px-4 lg:py-4"
      >
        <div
          v-if="this.$store.getters.user"
          class="acronym flex flex-row items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white bg-red-700 flex-shrink-0"
          :title="
            this.$store.getters.user.name +
              ' ' +
              this.$store.getters.user.surname
          "
        >
          <span class="tracking-wider text-sm lg:text-base">{{
            this.$store.getters.user.name[0] +
              this.$store.getters.user.surname[0]
          }}</span>
        </div>
        <textarea-autosize
          ref="addComment"
          v-model="newComment.content"
          :placeholder="'Wpisz komentarz i zatwierdź enterem'"
          :min-height="40"
          :max-height="350"
          @keypress.enter.native.prevent.exact="addComment()"
          class="ml-4 bg-blue-800 border border-white px-2 py-2 w-full rounded-lg text-sm lg:text-base"
        />
      </div>
      <div class="w-full slide" v-if="comments && comments.length > 0">
        <transition-group name="comments-transition">
          <div
            v-for="comment in sortedComments"
            :key="comment.id"
            class="comment flex flex-row w-full justify-start px-3 lg:px-4 py-3 lg:py-4 mt-4 relative border border-gray-500 rounded-lg bg-blue-900 shadow-lg text-sm lg:text-base"
            :class="
              comment.content.length > 150 ? 'items-start' : 'items-center'
            "
          >
            <div
              v-if="
                $store.getters.user &&
                  comment.user.id === $store.getters.user.id
              "
              class="acronym flex flex-col items-center justify-start w-8 lg:w-10 rounded-full border-2 border-white bg-red-700 opacity-50 cursor-pointer hover:opacity-100 flex-shrink-0 overflow-hidden"
              :title="
                comment.user.name +
                  ' ' +
                  comment.user.surname +
                  '\n' +
                  'Dodany: ' +
                  comment.created_at
              "
              :class="comment.expand ? 'h-24 opacity-100' : 'h-8 lg:h-10'"
              @mouseenter="comment.expand = true"
              @mouseleave="comment.expand = false"
            >
              <span class="absolute text-center mx-auto mt-1 tracking-wider">{{
                comment.user.name[0] + comment.user.surname[0]
              }}</span>
              <div
                :class="comment.expand ? 'opacity-100' : 'opacity-0'"
                class="comment-icons mt-6"
              >
                <svg
                  @click="startEdit(comment)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 lg:w-5 h-4 lg:h-5 fill-current opacity-50 hover:opacity-100 mt-2"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z"
                  />
                </svg>
                <svg
                  @click="removeComment(comment)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 lg:w-5 h-4 lg:h-5 fill-current mt-3 opacity-50 hover:opacity-100"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </div>
            </div>
            <div
              v-else
              class="acronym flex flex-row items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white bg-red-700 flex-shrink-0 opacity-50 text-sm lg:text-base"
              :title="
                comment.user.name +
                  ' ' +
                  comment.user.surname +
                  '\n' +
                  'Dodany: ' +
                  comment.created_at
              "
            >
              <span class="tracking-wider">{{
                comment.user.name[0] + comment.user.surname[0]
              }}</span>
            </div>
            <div class="flex flex-col w-full">
              <div
                @dblclick="startEdit(comment)"
                class="ml-2 lg:ml-4 text-justify -mt-1"
              >
                <span v-if="!comment.edit">{{ comment.content }}</span>
                <textarea-autosize
                  v-else
                  ref="editComment"
                  v-model="comment.content"
                  :min-height="40"
                  :max-height="350"
                  @blur.native="cancelEdit(comment)"
                  @keydown.esc.native="cancelEdit(comment)"
                  @keypress.enter.native.prevent.exact="editComment(comment)"
                  class="bg-blue-800 "
                  :autofocus="true"
                />
              </div>
              <span
                class="text-xs leading-tight text-gray-300 text-right mt-1"
                v-if="comment.created_at !== comment.updated_at"
                >Edytowany {{ comment.updated_at }}</span
              >
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
  props: ["entity", "itemId"],
  data: () => {
    return {
      newComment: {
        content: ""
      },
      comments: [],
      tempContent: ""
    };
  },
  computed: {
    sortedComments() {
      let sortedComments = this.comments;
      return sortedComments.sort((curr, next) => {
        new Date(next.created_at) - new Date(curr.created_at);
      });
    }
  },
  activated() {
    this.getComments();
    this.setEchoListeners();
  },
  deactivated() {
    this.$echo.leave(this.entity + "." + this.itemId);
  },
  created() {
    this.getComments();
    this.setEchoListeners();
  },
  beforeDestroy() {
    this.$echo.leave(this.entity + "." + this.itemId);
  },
  methods: {
    setEchoListeners() {
      this.$echo
        .private(this.entity + "." + this.itemId)
        .listen(".comment.created", e => {
          this.$snotify.info("Dodano nowy komentarz");
          e.patientComment.edit = false;
          e.patientComment.expand = false;
          this.comments.unshift(e.patientComment);
        })
        .listen(".comment.deleted", e => {
          this.$snotify.info("Usunięto komentarz");
          this.comments.splice(
            this.comments.findIndex(
              comment => comment.id === e.patientComment.id
            ),
            1
          );
        })
        .listen(".comment.edited", e => {
          this.$snotify.info("Edytowano komentarz");
          this.comments.splice(
            this.comments.findIndex(
              comment => comment.id === e.patientComment.id
            ),
            1,
            e.patientComment
          );
        });
    },
    startEdit(comment) {
      if (comment.user.id == this.$store.getters.user.id) {
        comment.edit = true;
        this.tempContent = comment.content;
        this.$nextTick(() => {
          this.$refs.editComment[0].$el.focus();
        });
      }
    },
    cancelEdit(comment) {
      comment.edit = false;
      comment.content = this.tempContent;
    },
    addComment() {
      this.$store.commit("setLoading", true);
      this.$http
        .post(
          "/" + this.entity + "/" + this.itemId + "/comment",
          this.newComment
        )
        .then(res => {
          if (res.status === 201) {
            this.newComment = {
              content: ""
            };
            res.data.edit = false;
            res.data.expand = false;
            this.comments.unshift(res.data);
            this.$snotify.success("Komentarz dodany");
          }
        })
        .catch(err => {
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
            this.$snotify.error("Wprowadzono nieprawidłowe dane");
          } else {
            this.$snotify.error(
              "Wystąpił błąd serwera, spróbuj ponownie później lub powiadom administratora."
            );
          }
        })
        .finally(() => this.$store.commit("setLoading", false));
    },
    getComments() {
      this.$store.commit("setLoading", true);
      this.$http.get("patients/" + this.itemId + "/comments").then(response => {
        response.data.map(comment => {
          comment.content = comment.content.replace(/\n\r?/g, "<br />");
          comment.edit = false;
          comment.expand = false;
        });
        this.comments = response.data;
        this.$store.commit("setLoading", false);
      });
    },
    removeComment(comment) {
      this.$snotify.warning("Czy na pewno chcesz usunąć komentarz?", {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: false,
        position: "centerCenter",
        pauseOnHover: true,
        buttons: [
          {
            text: "Tak",
            action: toast => {
              this.$snotify.remove(toast.id);
              this.$store.commit("setLoading", true);
              this.$http
                .delete(
                  "/patients/" + this.itemId + "/comments/" + comment.id,
                  comment
                )
                .then(() => {
                  this.$snotify.success("Komentarz usunięty");
                  this.comments.splice(
                    this.comments.findIndex(com => com.id === comment.id),
                    1
                  );
                })
                .catch(error =>
                  this.$snotify.error(
                    "Błąd przy usuwania komentarza" + "\n" + error
                  )
                )
                .finally(() => this.$store.commit("setLoading", false));
            },
            bold: true
          },
          { text: "Nie", action: toast => this.$snotify.remove(toast.id) }
        ]
      });
    },
    editComment(comment) {
      this.$store.commit("setLoading", true);
      this.$http
        .put("/patients/" + this.itemId + "/comments/" + comment.id, comment)
        .then(res => {
          if (res.status === 200) {
            res.data.edit = false;
            res.data.expand = false;
            this.comments.splice(
              this.comments.findIndex(com => com.id === comment.id),
              1,
              res.data
            );
            this.$snotify.success("Komentarz edytowany");
          }
        })
        .catch(err => {
          comment.content = this.tempContent;
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
            this.$snotify.error("Wprowadzono nieprawidłowe dane");
          } else {
            this.$snotify.error(
              "Wystąpił błąd serwera, spróbuj ponownie później lub powiadom administratora."
            );
          }
        })
        .finally(() => {
          this.tempContent = "";
          this.$store.commit("setLoading", false);
        });
    }
  }
};
</script>

<style scoped>
.acronym {
  transition: all 0.3s;
  transition-delay: 0.3s;
}
.acronym:hover {
  transition-delay: 0s;
}
.acronym > .comment-icons {
  transition: all 0.3s;
  transition-delay: 0s;
}
.acronym:hover > .comment-icons {
  transition-delay: 0.3s;
}
.comment {
  transition: all 0.5s;
}
.comments-transition-enter,
.comments-transition-leave-to {
  opacity: 0;
}
.comments-transition-enter {
  transform: translateY(-40px) scaleY(0.001);
}
.comments-transition-leave-to {
  transform: scaleY(0.001) translateX(-100px);
}
.comments-transition-leave-active,
.comments-transition-enter-active {
  transition: all 0.3s;
}
.comments-transition-leave-active {
  position: absolute;
}
</style>
