import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
    user: null,
    responseData: [],
    loading: false,
    currentModal: null,
    currentPatient: null,
    editMode: false
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    retrieveData(state, responseData) {
      state.responseData = responseData;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    retrieveUser(state, user) {
      state.user = user;
    },
    clearStore(state) {
      state.token = null;
      state.user = null;
      state.responseData = [];
      state.currentModal = null;
      state.editMode = false;
      state.currentPatient = null;
    },
    setCurrentModal(state, modal) {
      state.currentModal = modal;
    },
    setCurrentPatient(state, patient) {
      state.currentPatient = patient;
    },
    setEditMode(state, mode) {
      state.editMode = mode;
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.token;
    },
    responseData(state) {
      return state.responseData;
    },
    isLoading(state) {
      return state.loading;
    },
    user(state) {
      return state.user;
    },
    currentModal(state) {
      return state.currentModal;
    },
    currentPatient(state) {
      return state.currentPatient;
    },
    editMode(state) {
      return state.editMode;
    }
  },
  actions: {
    retrieveUser(context) {
      return new Promise((resolve, reject) => {
        context.commit("setLoading", true);
        axios
          .get("/user")
          .then(response => {
            context.commit("retrieveUser", response.data);
            resolve(response);
          })
          .catch(error => reject(error))
          .finally(() => context.commit("setLoading", false));
      });
    },
    authLogout(context) {
      return new Promise(resolve => {
        context.commit("setLoading", true);
        context.commit("clearStore");
        localStorage.removeItem("access_token");
        Vue.prototype.$gapi.getGapiClient().then(GapiClient => {
          GapiClient.auth2.getAuthInstance().signOut();
        });
        context.commit("setLoading", false);
        resolve();
      });
    },
    authLogin(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            const token = response.data.access_token;
            localStorage.setItem("access_token", token);
            context.commit("retrieveToken", token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    googleLogin(context, google_access_token) {
      return new Promise((resolve, reject) => {
        axios
          .post("/googleLogin", {
            access_token: google_access_token
          })
          .then(response => {
            const token = response.data.access_token;
            localStorage.setItem("access_token", token);
            context.commit("retrieveToken", token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    retrieveData(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(payload.url + (payload.id ? payload.id : ""))
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});
