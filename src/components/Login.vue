<template>
  <div
    class="absolute z-30 top-0 left-0 w-screen h-full flex justify-center items-end lg:items-center bg-black"
  >
    <video autoplay muted loop class="fixed top-0 left-0 w-screen lg:h-screen">
      <source src="@/assets/bg.mp4" type="video/mp4" />
    </video>

    <div
      class="lg:rounded-lg w-96 shadow-md z-20 shadow-xl p-3 lg:p-6"
      style="background: rgba(42, 67, 101, 0.5)"
    >
      <div class="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          viewBox="0 0 450 127"
          class="w-64 fill-current text-white"
        >
          <path
            d="M28.3 11.8C17.1 15.8 9.6 23.6 6 34.9c-4 12.7-1.8 27 6 38.8l3.5 5.3h32.2l1.8-4c2.1-4.5 3-5 4.1-1.8.7 2.2.8 2.1 1.5-.7.4-1.7 2.2-12.3 4-23.8C60.9 37.3 62.7 28 63 28c.4 0 1.2 3.3 1.8 7.2 2.8 19.5 8.4 54.5 8.9 55.8.3.8 1.6-2.3 3-7s2.7-8.7 2.9-8.9c.2-.2 1.2.3 2.2 1.2 1.8 1.6 1.9 1.3 3.6-7.8 1-5.2 2.2-9.3 2.6-9 .4.3 1.3 2.7 2 5.5 1.1 4.8 2.9 7.6 3.1 4.8 0-.7.9.6 1.9 2.9l1.9 4.3H111c11.8 0 14 .2 14 1.5 0 1.2 1.8 1.5 10.5 1.5H146v-9.8l.1-9.7 5-5.5c4-4.5 5.1-5.2 5.9-4 .5.8 5.6 7.6 11.2 15l10.3 13.5h27.8l3.3-7.5 3.3-7.5 16.9-.3c12.8-.2 17.2.1 17.9 1 .5.7 2.3 4.3 3.9 8l2.8 6.8H287V56.9l8.2.3 8.2.3 8 11.2 8 11.3h62.8c61.5 0 62.8 0 62.8-1.9 0-1.7-.8-2-4.7-2.3l-4.8-.3-.3-31.8L435 12h-11v64h-15.5c-8.5 0-15.5-.2-15.5-.4s1.6-1.4 3.5-2.6c8.2-5 13.1-17.2 12.2-30.1-.8-12-5.4-20.3-14.3-25.5-7.3-4.3-13.5-5.4-30.6-5.4H348v64h-8.7l-8.8-.1-6-8.5c-3.3-4.7-6.6-9.4-7.4-10.4-1.2-1.8-1.1-2.1 1.2-2.9 4.1-1.6 9.5-7 10.8-10.8.6-2 1.2-6.4 1.2-9.9.1-8.8-3.2-14.9-9.8-18.4-4.7-2.4-5.8-2.5-24.7-2.8l-19.8-.4V76h-11.5l-14-32-14-32h-6.3c-5.1 0-6.4.3-6.9 1.7-.4 1-6.6 15.3-13.9 31.8l-13.3 30-3.4.3c-3.5.3-3.6.1-16-17l-12.5-17.3 8.2-8.9c4.4-4.9 10.5-11.5 13.4-14.7l5.4-5.9h-14l-15.3 16.3-15.4 16.4-.3-16.4L146 12h-11v12.7l-.1 12.8-3.3-7c-4.4-9.4-11.3-15.7-20.3-18.5-13.5-4.2-28.2-1.5-37.4 6.7L69 23.2l-4.7-4.1c-7.1-6-13.4-8.4-22.8-8.8-6-.3-9.3.1-13.2 1.5zm284.6 11.3c3.8 1.4 6.1 5.4 6.1 10.9 0 9.8-4.4 12.5-20.5 12.5h-11l-.3-12.3-.3-12.2h11.4c6.3 0 12.8.5 14.6 1.1zm74.2 2.6c6.4 3.6 9.7 9.1 10.6 17.4 1.1 10.6-3 18.8-11.6 23.1-5 2.5-6.5 2.8-16.3 2.8H359V21.7l11.3.5c10.4.4 11.8.7 16.8 3.5zM239.6 46.2l3.3 7.8h-12.4c-6.9 0-12.5-.3-12.5-.6 0-.7 8.8-21 10.8-24.9l1.5-3 3 6.5c1.6 3.6 4.5 10 6.3 14.2zM135 66v10h-9.8l2.9-5.3c1.6-2.8 3.6-7.3 4.5-10 .8-2.6 1.7-4.7 2-4.7.2 0 .4 4.5.4 10z"
          />
          <path
            d="M62.5 45.2c-.2.7-1.6 8.9-3 18.3-3.2 20.7-3.3 21-5.2 16.5l-1.5-3.4-1.6 2.2c-1.6 2-2.6 2.2-17.7 2.4l-16 .3 8 8.4C40 105 62.6 122 68.3 122c6.1 0 29.8-17 44.7-31.9l9.5-9.6-13.7-.3c-12.5-.2-13.7-.4-14.3-2.2-.3-1-1.2-1.7-1.9-1.4-.9.3-1.8-1.2-2.8-4.8l-1.5-5.3-1.8 8.2c-1.9 8.5-2.7 9.6-4.4 6.6-.5-1-1.1-1.6-1.4-1.3-.2.3-1.9 6.1-3.7 13-1.8 6.9-3.6 12.8-3.9 13.2-.4.4-2.6-13.4-5-30.7C65.7 58.2 63.5 44 63.3 44c-.2 0-.5.6-.8 1.2z"
          />
        </svg>
      </div>
      <h1
        class="text-3xl text-white pt-3 text-center tracking-widest antialiased"
      >
        Autoryzacja
      </h1>
      <form action="#" class="pt-5" @submit.prevent="login">
        <div class="relative">
          <label
            for="email"
            class="uppercase text-blue-500 text-xs font-bold tracking-widest absolute pl-3 pt-2 antialiased"
            >Email</label
          >
          <input
            id="email"
            v-model="username"
            class="pt-5 w-full rounded p-3 bg-blue-800 text-gray-100 outline-none hover:bg-blue-700 focus:shadow-outline text-center antialiased tracking-wider"
            type="email"
            placeholder="Twój mail"
            autofocus
            required
          />
        </div>
        <div class="relative pt-5">
          <label
            for="password"
            class="uppercase text-blue-500 text-xs font-bold tracking-widest absolute pl-3 pt-2 antialiased"
            >Hasło</label
          >
          <input
            id="password"
            v-model="password"
            class="block pt-5 w-full rounded p-3 bg-blue-800 text-gray-100 outline-none hover:bg-blue-700 focus:shadow-outline text-center antialiased tracking-wider"
            type="password"
            placeholder="Twoje hasło"
            required
          />
        </div>
        <div class="flex flex-col justify-center items-center">
          <button
            :class="{ 'cursor-wait': loading }"
            :disabled="loading"
            type="submit"
            class="mt-8 bg-white hover:bg-gray-500 active:bg-gray-600 text-gray-800 font-semibold py-2 px-4 border border-gray-500 focus:shadow-outline rounded rounded-lg shadow font-bold w-64  antialiased"
          >
            Zaloguj
          </button>
          <div id="gSignInWrapper">
            <div
              id="customBtn"
              class="customGPlusSignIn"
              @click="googleLogin()"
            >
              <span class="icon"></span>
              <span class="buttonText">Zaloguj przez Google</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      password: "",
      clientId:
        "YOUR_CLIENT_ID",
      isInit: false,
      isSignIn: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
    login() {
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("authLogin", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch("retrieveUser").then(() => {
            if (this.$route.query.redirect) {
              this.$router
                .push({ path: this.$route.query.redirect })
                .then(() =>
                  this.$snotify.success("Autoryzacja przebiegła pomyślnie")
                );
            } else
              this.$router
                .push({ name: "home" })
                .then(() =>
                  this.$snotify.success("Autoryzacja przebiegła pomyślnie")
                );
          });
        })
        .catch(error => {
          this.password = "";
          this.$snotify.error(error.response.data);
        })
        .finally(() => this.$store.commit("setLoading", false));
    },
    googleLogin() {
      this.$store.commit("setLoading", true);
      this.$gapi
        .getGapiClient()
        .then(gapiClient => gapiClient.auth2.getAuthInstance().signIn())
        .then(res => {
          let google_access_token = res.getAuthResponse().access_token;
          this.isSignIn = res.isSignedIn();
          this.$store.dispatch("googleLogin", google_access_token).then(() => {
            this.$snotify.success("Zalogowano");
            this.$store.dispatch("retrieveUser").then(user => {
              if (this.$route.query.redirect) {
                this.$router.push({ path: this.$route.query.redirect });
              } else this.$router.push({ name: "home" });
              if (user.data.clinic === null) {
                this.$store.commit("setCurrentModal", "EditProfile");
                this.$snotify.info("Proszę uzupełnić profil", {
                  position: "centerTop"
                });
              }
            });
          });
        })
        .catch(error => {
          if (error.error === "popup_closed_by_user") {
            this.$snotify.error("Autoryzacja przerwana przez użytkownika");
          } else {
            this.$snotify.error(
              "Błąd autoryzacji Google, proszę użyć alternatywnej metody logowania"
            );
          }
        })
        .finally(() => this.$store.commit("setLoading", false));
    }
  }
};
</script>

<style scoped>
#customBtn {
  @apply w-64 py-2 mt-4;
  display: inline-block;
  background-color: white;
  color: #444;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
}
#customBtn:hover {
  cursor: pointer;
  background-color: #888888;
  @apply shadow-outline;
}
span.label {
  font-family: serif;
  font-weight: normal;
}
span.icon {
  background: url("../assets/g-normal.png") transparent 5px 50% no-repeat;
  display: inline-block;
  vertical-align: middle;
  width: 42px;
  height: 42px;
}
span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  font-size: 14px;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: "Roboto", sans-serif;
}
</style>
