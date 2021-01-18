import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Patients from "../components/Patients";
import Alerts from "../components/Alerts";
import Events from "../components/Events";
import Personnel from "../components/Personnel";
import Statuses from "../components/Statuses";
import myPatients from "../components/myPatients";
import Home from "../components/Home";
import PatientEvents from "../components/PatientEvents";
import PatientDetails from "../components/PatientDetails";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
    name: "login",
    meta: { requiresAuth: false }
  },
  {
    path: "/",
    component: Home,
    name: "home",
    meta: {
      requiresAuth: true,
      requiresData: true,
      dataUrl: "/events/incoming"
    }
  },
  {
    path: "/pacjenci",
    component: Patients,
    name: "patients",
    meta: {
      requiresAuth: true,
      requiresData: true,
      dataUrl: "/patients"
    }
  },
  {
    path: "/wydarzenia",
    component: Events,
    name: "events",
    meta: { requiresAuth: true }
  },
  {
    path: "/statusy",
    component: Statuses,
    name: "statuses",
    meta: { requiresAuth: true }
  },
  {
    path: "/personel",
    component: Personnel,
    name: "personnel",
    meta: { requiresAuth: true }
  },
  {
    path: "/powiadomienia",
    component: Alerts,
    name: "alerts",
    meta: { requiresAuth: true }
  },
  {
    path: "/ja/pacjenci",
    component: myPatients,
    name: "myPatients",
    meta: {
      requiresAuth: true,
      requiresData: true,
      dataUrl: "/user/patients"
    }
  },
  {
    path: "/pacjenci/:id/wydarzenia",
    component: PatientEvents,
    name: "PatientEvents",
    meta: { requiresAuth: true }
  },
  {
    path: "/pacjenci/:id",
    component: PatientDetails,
    name: "PatientDetails",
    meta: {
      requiresAuth: true,
      requiresData: true,
      dataUrl: "/patients/"
    }
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

router.beforeEach((to, from, next) => {
  store.commit("setLoading", true);
  from.meta.position = window.scrollY;
  if (to.meta.position && !!["PatientDetails"].includes(to.name)) {
    setTimeout(() => {
      window.scrollTo({ top: to.meta.position, behavior: "smooth" });
    }, 1500);
  } else {
    window.scroll(0, 0);
  }
  if (!store.getters.loggedIn) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
    store.commit("setLoading", false);
  } else {
    if (to.name === "login") {
      next({
        path: "/home"
      });
    }
    if (to.matched.some(record => record.meta.requiresData)) {
      store
        .dispatch("retrieveData", {
          url: to.meta.dataUrl,
          id: to.params.id
        })
        .then(response => {
          store.commit("retrieveData", response.data);
          next();
        })
        .finally(() => store.commit("setLoading", false));
    } else {
      next();
      store.commit("setLoading", false);
    }
  }
});

export default router;
