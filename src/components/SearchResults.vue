<template>
  <div
    class="text-white flex flex-col w-full pt-2 lg:pt-6 px-2 lg:px-4 absolute left-0 top-0 w-48 lg:w-80 z-40"
  >
    <input
      class="px-2 lg:px-4 py-2 lg:py-4 bg-blue-800 relative"
      :class="
        !searchResults || searchResults.length === 0
          ? 'rounded-lg focus:shadow-outline'
          : 'focus:shadow-none rounded-t-lg border-t border-l border-r'
      "
      id="search"
      v-model="query"
      placeholder="Szukaj"
      type="search"
      @focus="$emit('search-active')"
      @blur="
        () => {
          $emit('search-inactive');
          searchResults = [];
        }
      "
      @keyup.esc="searchResults = []"
      @keyup.enter="debouncedGetSearchResults"
    />
    <svg
      v-if="query.length > 0"
      @click="query = ''"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute w-4 lg:w-6 right-0 mr-3 lg:mr-6 mt-3 lg:mt-4 fill-current cursor-pointer"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
      />
    </svg>
    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
      name="search-results-transition"
    >
      <div
        v-if="searchResults && searchResults.length !== 0"
        class="bg-blue-800 border rounded-b-lg pb-4 shadow-xl z-40 max-h-64 lg:max-h-160 overflow-y-auto text-sm lg:text-base"
        @keyup.esc="searchResults = []"
      >
        <template
          v-if="searchResults.patients && searchResults.patients.length"
        >
          <div class="flex flex-row justify-center">
            <svg
              class="mt-2 navbar-icon-small fill-current lg:w-8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"
              />
            </svg>
          </div>
          <ul @keyup.enter="$emit('search-result-click')">
            <router-link
              v-for="patient in searchResults.patients"
              :key="patient.id"
              :to="{ name: 'PatientDetails', params: { id: patient.id } }"
            >
              <li
                class="px-2 lg:px-4 py-1 lg:py-2 hover:bg-blue-600"
                @click="$emit('search-result-click')"
              >
                {{ patient.name }} {{ patient.surname }}
              </li>
            </router-link>
          </ul>
        </template>

        <template v-if="searchResults.users && searchResults.users.length">
          <div class="flex flex-row justify-center">
            <svg
              class="mt-2 navbar-icon-small fill-current lg:w-8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"
              />
            </svg>
          </div>
          <ul>
            <li v-for="user in searchResults.users" :key="user.id" class="mb-2">
              {{ user.name }} {{ user.surname }}
            </li>
          </ul>
        </template>
        <template v-if="searchResults.events && searchResults.events.length">
          <div class="flex flex-row justify-center">
            <svg
              class="mt-2 navbar-icon-small lg:w-8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M17 13h-5v5h5v-5zM16 2v2H8V2H6v2H3.01L3 22h18V4h-3V2h-2zm3 18H5V9h14v11z"
              />
            </svg>
          </div>
          <ul>
            <li
              v-for="event in searchResults.events"
              :key="event.id"
              class="mb-2"
            >
              {{ event.name }}
            </li>
          </ul>
        </template>

        <div
          v-else-if="searchResults == 'no results'"
          class="text-gray-500 mt-3 lg:mt-4 text-center w-full text-xs lg:text-base"
        >
          Brak wyników
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
export default {
  name: "SearchResults",
  data() {
    return {
      query: "",
      searchResults: []
    };
  },
  created() {
    this.debouncedGetSearchResults = debounce(this.getSearchResults, 500);
  },
  methods: {
    getSearchResults() {
      this.$store.commit("setLoading", true);
      this.$http.get("/search/" + this.query).then(response => {
        this.searchResults = response.data;
        this.$store.commit("setLoading", false);
      });
    }
  },
  watch: {
    query: function(query) {
      this.searchResults = undefined;
      if (query.length > 2) {
        this.debouncedGetSearchResults();
      }
    }
  }
};
</script>

<style scoped></style>
