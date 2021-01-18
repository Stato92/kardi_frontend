import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
// Use Axios globally
Vue.prototype.$http = axios;
// import the plugin
import VueGAPI from "vue-gapi";

// create the 'options' object
const apiConfig = {
  clientId: "YOUR_CLIENT_ID",
  scope: "profile email",
  prompt: "select_account"
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig);
import store from "./store";
import router from "./router";
import Snotify from "vue-snotify";
import "vue-snotify/styles/material.css";
import TextareaAutosize from "vue-textarea-autosize";
Vue.use(TextareaAutosize);

import VCalendar from "v-calendar";
Vue.use(VCalendar);
import "./assets/main.css";
Vue.use(Snotify);

import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
Vue.prototype.$echo = new Echo({
  broadcaster: "pusher",
  key: "7080L8ujczGo",
  wsHost: window.location.hostname,
  wsPort: 6001,
  authEndpoint: "YOUR_AUTH_ENDPOINT",
  auth: {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
      Authorization: store.getters.loggedIn ? "Bearer " + store.state.token : ""
    }
  },
  disableStats: true
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (
      router.currentRoute.name !== "login" &&
      err.response.status === 401 &&
      err.response.config &&
      !err.response.config.__isRetryRequest
    ) {
      store.dispatch("authLogout").then(() => {
        router.push({
          path: "/login",
          query: { redirect: router.currentRoute.fullPath }
        });
        Vue.prototype.$snotify.error("Wylogowano z powodu braku autoryzacji");
      });
    } else if (err.response.status === 404) {
      Vue.prototype.$snotify.error("Nie znaleziono");
    } else if (err.response.status === 500) {
      return axios.request(err.config);
    }
    return Promise.reject(err);
  }
);
// let token = document.head.querySelector('meta[name="csrf-token"]');
window.baseUrl =
  process.env.NODE_ENV === "development"
    ? "YOUR_API_URL"
    : window.location.protocol + "//" + window.location.host + "/api";
axios.interceptors.request.use(function(config) {
  config.baseURL = window.baseUrl;
  config.headers = {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "X-Socket-ID": Vue.prototype.$echo.socketId()
    // "X-CSRF-TOKEN": token.content
  };
  config.headers["Authorization"] = store.getters.loggedIn
    ? "Bearer " + store.state.token
    : "";
  return config;
});

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
