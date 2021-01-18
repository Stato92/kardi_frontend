<template>
  <div>
    <!-- navbar -->
    <div
      class="navbar h-full flex flex-col justify-between items-start overflow-hidden fixed z-20 bg-blue-900"
      :class="[
        expand ? 'w-48 lg:w-80' : 'w-12 lg:w-20',
        loggedIn ? 'opacity-100' : 'opacity-0'
      ]"
      @mouseenter="startExpandTimer()"
      @mouseleave="stopExpandTimer()"
    >
      <!-- search -->
      <div
        class="px-2 mt-4 lg:mb-4 text-white hover:opacity-100 h-8 lg:h-16 flex-shrink-0 z-30"
      >
        <label
          class="text-white"
          :class="{ 'opacity-100': search }"
          for="search"
        >
          <transition
            enter-active-class="animated fadeInLeft faster"
            leave-active-class="animated fadeOutLeft faster"
            name="search-transition"
          >
            <svg
              @click="expand = true"
              v-if="!expand"
              class="navbar-icon lg:w-16 cursor-pointer hover:opacity-100"
              :class="{ 'opacity-100': search }"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </transition>
          <transition
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster"
            name="search-transition"
          >
            <keep-alive>
              <search-results
                v-show="expand"
                v-on:search-active="search = true"
                v-on:search-inactive="search = false"
                v-on:search-result-click="expand = false"
              ></search-results>
            </keep-alive>
          </transition>
        </label>
      </div>
      <!-- end Search -->

      <!-- middle menu -->
      <div class="flex flex-col w-full">
        <router-link
          :to="{ name: 'home' }"
          class="navbar-link lg:mb-4"
          @click.native="stopExpandTimer()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="navbar-icon lg:w-16 flex-shrink-0"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
          </svg>
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut faster"
            name="navbar-link-transition"
          >
            <span
              v-if="expand"
              class="navbar-link-text lg:ml-2 lg:text-2xl w-full"
            >
              Główna
            </span>
          </transition>
        </router-link>
        <router-link
          :to="{ name: 'patients' }"
          class="navbar-link lg:mb-4"
          @click.native="stopExpandTimer()"
        >
          <svg
            class="navbar-icon lg:w-16 flex-shrink-0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"
            />
          </svg>
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut faster"
            name="navbar-link-transition"
          >
            <span v-if="expand" class="navbar-link-text lg:ml-2 lg:text-2xl">
              Pacjenci
            </span>
          </transition>
        </router-link>
        <router-link
          :to="{ name: 'events' }"
          class="navbar-link lg:mb-4"
          @click.native="stopExpandTimer()"
        >
          <svg
            class="navbar-icon lg:w-16 flex-shrink-0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M17 13h-5v5h5v-5zM16 2v2H8V2H6v2H3.01L3 22h18V4h-3V2h-2zm3 18H5V9h14v11z"
            />
          </svg>
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut faster"
            name="navbar-link-transition"
          >
            <span v-if="expand" class="navbar-link-text lg:ml-2 lg:text-2xl">
              Wydarzenia
            </span>
          </transition>
        </router-link>
        <router-link
          :to="{ name: 'statuses' }"
          class="navbar-link lg:mb-4"
          @click.native="stopExpandTimer()"
        >
          <svg
            class="navbar-icon lg:w-16 flex-shrink-0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M17 10H7v2h10v-2zm4-7h-3V1h-2v2H8V1H6v2H3v18h18V3zm-2 16H5V8h14v11zm-5-5H7v2h7v-2z"
            />
          </svg>
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut faster"
            name="navbar-link-transition"
          >
            <span v-if="expand" class="navbar-link-text lg:ml-2 lg:text-2xl">
              Statusy
            </span>
          </transition>
        </router-link>
        <router-link
          :to="{ name: 'personnel' }"
          class="navbar-link lg:mb-4"
          @click.native="stopExpandTimer()"
        >
          <svg
            class="navbar-icon lg:w-16 flex-shrink-0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"
            />
          </svg>
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut faster"
            name="navbar-link-transition"
          >
            <span v-if="expand" class="navbar-link-text lg:ml-2 lg:text-2xl">
              Personel
            </span>
          </transition>
        </router-link>
      </div>
      <!-- end middle menu -->

      <!-- my menu -->
      <div class="flex flex-col items-center justify-between">
        <transition
          enter-active-class="animated fadeInUp faster"
          leave-active-class="animated fadeOutDown faster"
          name="myMenu-transition"
        >
          <div
            v-if="expand && myMenu"
            class="bottom-0 left-0 ml-4 mb-12 lg:mb-20 rounded-lg bg-blue-900 my-menu fixed overflow-hidden"
            style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
          >
            <a
              href="/wyloguj"
              class="navbar-link py-2"
              @click.prevent="
                () => {
                  stopExpandTimer();
                  logOut();
                }
              "
            >
              <svg
                class="navbar-icon-small lg:w-8"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
                />
              </svg>
              <span class="navbar-link-text-small lg:ml-4 lg:pr-4 lg:text-base">
                Wyloguj
              </span>
            </a>
            <router-link
              :to="{ path: 'ja/statusy' }"
              class="navbar-link py-2"
              @click.native="stopExpandTimer()"
            >
              <svg
                class="navbar-icon-small lg:w-8"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M17 10H7v2h10v-2zm4-7h-3V1h-2v2H8V1H6v2H3v18h18V3zm-2 16H5V8h14v11zm-5-5H7v2h7v-2z"
                />
              </svg>
              <span class="navbar-link-text-small lg:ml-4 lg:pr-4 lg:text-base">
                Moje statusy
              </span>
            </router-link>
            <router-link
              :to="{ path: 'ja/wydarzenia' }"
              class="navbar-link py-2"
              @click.native="stopExpandTimer()"
            >
              <svg
                class="navbar-icon-small lg:w-8"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M17 13h-5v5h5v-5zM16 2v2H8V2H6v2H3.01L3 22h18V4h-3V2h-2zm3 18H5V9h14v11z"
                />
              </svg>
              <span class="navbar-link-text-small lg:ml-4 lg:pr-4 lg:text-base">
                Moje wydarzenia
              </span>
            </router-link>
            <router-link
              :to="{ path: 'ja/powiadomienia' }"
              class="navbar-link py-2"
              @click.native="stopExpandTimer()"
            >
              <svg
                class="navbar-icon-small lg:w-8"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 23c1.1 0 1.99-.89 1.99-1.99h-3.98c0 1.1.89 1.99 1.99 1.99zm7-6v-6c0-3.35-2.36-6.15-5.5-6.83V1.5h-3v2.67C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2zm-6-1h-2v-2h2v2zm0-4h-2V8h2v4z"
                />
              </svg>
              <span class="navbar-link-text-small lg:ml-4 lg:pr-4 lg:text-base">
                Moje powiadomienia
              </span>
            </router-link>
            <router-link
              :to="{ name: 'myPatients' }"
              class="navbar-link py-2"
              @click.native="stopExpandTimer()"
            >
              <svg
                class="navbar-icon-small lg:w-8"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"
                />
              </svg>
              <span class="navbar-link-text-small lg:ml-4 lg:pr-4 lg:text-base">
                Moi pacjenci
              </span>
            </router-link>
          </div>
        </transition>
        <div
          class="ml-3 mb-3 flex justify-start items-center flex-shrink-0 z-30 text-white cursor-pointer opacity-50 hover:opacity-100"
          @click="showMyMenu()"
        >
          <div
            class="flex justify-center items-center w-6 h-6 lg:w-14 lg:h-14 text-center border-2 lg:border-4 border-white rounded-full bg-red-700 z-30"
          >
            <span
              class="text-xxs lg:text-2xl align-middle text-center antialiased select-none"
            >
              {{ acronym }}
            </span>
          </div>
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut faster"
            name="navbar-link-transition"
          >
            <span
              v-if="expand"
              class="text-sm lg:text-2xl ml-3 fade whitespace-no-wrap antialiased z-30"
            >
              {{ fullName }}
            </span>
          </transition>
        </div>
      </div>
      <!-- end my menu -->
    </div>
    <!-- end navbar -->

    <!--      LogoutAnimation -->
    <transition name="logout-fade">
      <div
        v-if="inactiveTime > 200 && this.loggedIn"
        class="fixed flex top-0 left-0 justify-center items-center mx-auto w-full h-screen z-80 bg-black"
      >
        <div
          class="text-center mx-8 px-4 py-6 rounded-lg text-white lg:text-xl tracking-wider"
          style="background: rgba(0,0,0,0.5)"
        >
          Za chwilę nastąpi automatyczne wylogowanie z powodu braku
          aktywności...
        </div>
      </div>
    </transition>
    <!--      end logout animation-->

    <!-- content -->
    <div
      @click="hideNavbar()"
      class="container w-full mx-auto pl-20 lg:pl-32 pr-4"
    >
      <div
        class="fixed top-0 left-0 ml-20 lg:ml-32 mt-2 flex flex-col items-center justify-between z-10"
        v-if="this.$route.name !== 'login'"
      >
        <div
          v-if="this.$route.name !== 'home'"
          class="cursor-pointer bg-blue-800 hover:bg-blue-700 rounded-full border-2 lg:border-3 opacity-50 hover:opacity-100"
          @click="goBack()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current text-white w-8 lg:w-10"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
          </svg>
        </div>
        <transition
          enter-active-class="animated zoomInDown faster"
          leave-active-class="animated fadeOutUpBig"
        >
          <div
            v-if="posY > 100"
            class="cursor-pointer bg-blue-800 hover:bg-blue-700 rounded-full mt-2 border-2 lg:border-3 opacity-50 hover:opacity-100"
            @click="goTop()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-current text-white w-8 lg:w-10"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
            </svg>
          </div>
        </transition>
      </div>

      <!--        Loading animation-->
      <transition
        v-if="loading"
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster"
        name="loading-transition"
      >
        <div
          class="fixed flex top-0 left-0 justify-center items-center mx-auto w-full h-screen z-70"
          style="background: rgba(0,0,0,0.5)"
        >
          <div class="lds-heart visible z-80">
            <div />
          </div>
        </div>
      </transition>
      <!--        end of loading animation-->

      <div>
        <div class="flex flex-row justify-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            viewBox="0 0 450 127"
            class="w-64 lg:w-128 fill-current text-white"
          >
            <path
              d="M28.3 11.8C17.1 15.8 9.6 23.6 6 34.9c-4 12.7-1.8 27 6 38.8l3.5 5.3h32.2l1.8-4c2.1-4.5 3-5 4.1-1.8.7 2.2.8 2.1 1.5-.7.4-1.7 2.2-12.3 4-23.8C60.9 37.3 62.7 28 63 28c.4 0 1.2 3.3 1.8 7.2 2.8 19.5 8.4 54.5 8.9 55.8.3.8 1.6-2.3 3-7s2.7-8.7 2.9-8.9c.2-.2 1.2.3 2.2 1.2 1.8 1.6 1.9 1.3 3.6-7.8 1-5.2 2.2-9.3 2.6-9 .4.3 1.3 2.7 2 5.5 1.1 4.8 2.9 7.6 3.1 4.8 0-.7.9.6 1.9 2.9l1.9 4.3H111c11.8 0 14 .2 14 1.5 0 1.2 1.8 1.5 10.5 1.5H146v-9.8l.1-9.7 5-5.5c4-4.5 5.1-5.2 5.9-4 .5.8 5.6 7.6 11.2 15l10.3 13.5h27.8l3.3-7.5 3.3-7.5 16.9-.3c12.8-.2 17.2.1 17.9 1 .5.7 2.3 4.3 3.9 8l2.8 6.8H287V56.9l8.2.3 8.2.3 8 11.2 8 11.3h62.8c61.5 0 62.8 0 62.8-1.9 0-1.7-.8-2-4.7-2.3l-4.8-.3-.3-31.8L435 12h-11v64h-15.5c-8.5 0-15.5-.2-15.5-.4s1.6-1.4 3.5-2.6c8.2-5 13.1-17.2 12.2-30.1-.8-12-5.4-20.3-14.3-25.5-7.3-4.3-13.5-5.4-30.6-5.4H348v64h-8.7l-8.8-.1-6-8.5c-3.3-4.7-6.6-9.4-7.4-10.4-1.2-1.8-1.1-2.1 1.2-2.9 4.1-1.6 9.5-7 10.8-10.8.6-2 1.2-6.4 1.2-9.9.1-8.8-3.2-14.9-9.8-18.4-4.7-2.4-5.8-2.5-24.7-2.8l-19.8-.4V76h-11.5l-14-32-14-32h-6.3c-5.1 0-6.4.3-6.9 1.7-.4 1-6.6 15.3-13.9 31.8l-13.3 30-3.4.3c-3.5.3-3.6.1-16-17l-12.5-17.3 8.2-8.9c4.4-4.9 10.5-11.5 13.4-14.7l5.4-5.9h-14l-15.3 16.3-15.4 16.4-.3-16.4L146 12h-11v12.7l-.1 12.8-3.3-7c-4.4-9.4-11.3-15.7-20.3-18.5-13.5-4.2-28.2-1.5-37.4 6.7L69 23.2l-4.7-4.1c-7.1-6-13.4-8.4-22.8-8.8-6-.3-9.3.1-13.2 1.5zm284.6 11.3c3.8 1.4 6.1 5.4 6.1 10.9 0 9.8-4.4 12.5-20.5 12.5h-11l-.3-12.3-.3-12.2h11.4c6.3 0 12.8.5 14.6 1.1zm74.2 2.6c6.4 3.6 9.7 9.1 10.6 17.4 1.1 10.6-3 18.8-11.6 23.1-5 2.5-6.5 2.8-16.3 2.8H359V21.7l11.3.5c10.4.4 11.8.7 16.8 3.5zM239.6 46.2l3.3 7.8h-12.4c-6.9 0-12.5-.3-12.5-.6 0-.7 8.8-21 10.8-24.9l1.5-3 3 6.5c1.6 3.6 4.5 10 6.3 14.2zM135 66v10h-9.8l2.9-5.3c1.6-2.8 3.6-7.3 4.5-10 .8-2.6 1.7-4.7 2-4.7.2 0 .4 4.5.4 10z"
            />
            <path
              d="M62.5 45.2c-.2.7-1.6 8.9-3 18.3-3.2 20.7-3.3 21-5.2 16.5l-1.5-3.4-1.6 2.2c-1.6 2-2.6 2.2-17.7 2.4l-16 .3 8 8.4C40 105 62.6 122 68.3 122c6.1 0 29.8-17 44.7-31.9l9.5-9.6-13.7-.3c-12.5-.2-13.7-.4-14.3-2.2-.3-1-1.2-1.7-1.9-1.4-.9.3-1.8-1.2-2.8-4.8l-1.5-5.3-1.8 8.2c-1.9 8.5-2.7 9.6-4.4 6.6-.5-1-1.1-1.6-1.4-1.3-.2.3-1.9 6.1-3.7 13-1.8 6.9-3.6 12.8-3.9 13.2-.4.4-2.6-13.4-5-30.7C65.7 58.2 63.5 44 63.3 44c-.2 0-.5.6-.8 1.2z"
            />
          </svg>
        </div>
        <transition name="component-transition" mode="out-in">
          <keep-alive v-if="loggedIn && currentModal !== null">
            <Modal v-if="currentModal" ref="modal">
              <component
                :key="currentModal"
                v-bind:is="currentModal"
                :edit-mode="editMode"
              ></component
            ></Modal>
          </keep-alive>
        </transition>
        <transition name="component-transition" mode="out-in">
          <keep-alive
            :exclude="[
              'Login',
              'Comments',
              'MyMenu',
              'SearchResults',
              'TailwindToggle',
              'EditProfile'
            ]"
          >
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </div>
    <!-- end content -->
    <!-- chat -->
    <Chat v-if="loggedIn" />
    <!-- end chat -->
    <!-- addButton -->
    <div class="fixed bottom-0 right-0 mr-6 mb-6">
      <NewButton />
    </div>
    <!-- end addButton -->
    <!-- notifications -->
    <vue-snotify></vue-snotify>
    <!-- end notifications -->
  </div>
</template>
<script>
import debounce from "lodash.debounce";
import SearchResults from "./components/SearchResults";
import NewPatient from "./components/NewPatient";
import EditProfile from "./components/EditProfile";
import NewButton from "./components/NewButton";
import NewEvent from "./components/NewEvent";
import NewStatus from "./components/NewStatus";
import Modal from "./components/Modal";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock";
import Chat from "./components/Chat";

export default {
  name: "App",
  components: {
    Chat,
    Modal,
    SearchResults,
    NewPatient,
    NewButton,
    NewEvent,
    NewStatus,
    EditProfile
  },
  data: function() {
    return {
      expand: false,
      expandTimer: null,
      logoutTimer: null,
      inactiveTime: 0,
      myMenu: false,
      search: false,
      posY: 0
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    acronym() {
      return this.$store.getters.user
        ? this.$store.getters.user.name[0] + this.$store.getters.user.surname[0]
        : "";
    },
    fullName() {
      return this.$store.getters.user
        ? this.$store.getters.user.name + " " + this.$store.getters.user.surname
        : "";
    },
    loading() {
      return this.$store.getters.isLoading;
    },
    currentModal() {
      return this.$store.getters.currentModal;
    },
    editMode() {
      return this.$store.getters.editMode;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$store.dispatch("retrieveUser"));
  },
  created() {
    this.expand = false;
    this.expandTimer = null;
    this.myMenu = false;
    this.search = false;
    if (!this.loggedIn) {
      this.$gapi.getGapiClient().then(res => {
        if (res.auth2.getAuthInstance().isSignedIn.get()) {
          let google_access_token = res.client.getToken().access_token;
          this.$store
            .dispatch("googleLogin", google_access_token)
            .then(() => {
              this.$store.dispatch("retrieveUser").then(() => {
                if (this.$route.name === "login") {
                  if (this.$route.query.redirect) {
                    this.$router.push(this.$route.query.redirect);
                  } else this.$router.push({ name: "home" });
                }
                this.$snotify.success("Sesja przywrócona");
              });
            })
            .catch(() => {
              this.$snotify.warning("Sesja wygasła");
              this.$store.dispatch("authLogout").then(() => {
                if (this.$route.name !== "login") this.$router.push("login");
              });
            });
        } else {
          if (this.$route.name !== "login") this.$router.push("login");
        }
      });
    } else {
      this.$store.dispatch("retrieveUser").then(user => {
        if (user.data.clinic === null) {
          this.$snotify.info("Proszę uzupełnić profil", {
            position: "centerTop"
          });
          this.$store.commit("setCurrentModal", "EditProfile");
        }
      });
    }
    this.debouncedResetLogoutTimer = debounce(this.resetLogoutTimer, 100);
    this.startLogoutTimer();
  },
  mounted() {
    window.addEventListener("scroll", debounce(this.onScroll, 100));
    window.addEventListener(
      "mousemove",
      debounce(this.debouncedResetLogoutTimer, 100)
    );
    window.addEventListener(
      "keyup",
      debounce(this.debouncedResetLogoutTimer, 100)
    );
  },
  beforeDestroy() {
    window.removeEventListener("scroll", debounce(this.onScroll, 100));
    window.removeEventListener(
      "mousemove",
      debounce(this.debouncedResetLogoutTimer, 100)
    );
    window.removeEventListener(
      "keyup",
      debounce(this.debouncedResetLogoutTimer, 100)
    );
  },
  methods: {
    startLogoutTimer() {
      this.logoutTimer = window.setInterval(() => {
        if (this.loggedIn && this.inactiveTime > 245) {
          this.logOut();
        }
        this.inactiveTime++;
      }, 1000);
    },
    resetLogoutTimer() {
      window.clearInterval(this.logoutTimer);
      this.startLogoutTimer();
      this.inactiveTime = 0;
    },
    startExpandTimer() {
      if (!this.expandTimer && this.expand === false) {
        this.expandTimer = window.setTimeout(() => {
          this.expand = true;
        }, 800);
      }
    },
    stopExpandTimer() {
      if (!this.search) {
        window.clearTimeout(this.expandTimer);
        this.expand = false;
        this.expandTimer = null;
        this.myMenu = false;
      }
    },
    hideNavbar() {
      this.search = false;
      this.stopExpandTimer();
    },
    showMyMenu() {
      this.expand = true;
      this.myMenu = !this.myMenu;
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    onScroll() {
      this.posY = window.scrollY;
    },
    async logOut() {
      this.$store.commit("setLoading", true);
      await this.$http.post("/logout");
      await this.$store.dispatch("authLogout");
      await this.$router.push({
        name: "login"
      });
      this.$store.commit("setLoading", false);
      this.$snotify.success("Wylogowano");
    }
  },
  watch: {
    currentModal: function(val) {
      if (val !== "") {
        disableBodyScroll(this.$refs.modal);
      } else {
        this.$store.commit("setEditMode", false);
        enableBodyScroll();
      }
    }
  }
};
</script>
<style>
@import "~animate.css";
@import "assets/main.css";
.logout-fade-enter,
.logout-fade-leave-to {
  @apply opacity-0;
}
.logout-fade-enter-active {
  transition: opacity 45s;
}
.logout-fade-leave-active {
  transition: opacity 0.5s;
}
.component-transition-enter-active,
.component-transition-leave-active {
  transition: opacity 0.3s;
}
.component-transition-enter,
.component-transition-leave-to {
  opacity: 0;
}
</style>
