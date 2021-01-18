<template>
  <div
    class="w-full h-full z-40 fixed top-0 left-0 pl-20 lg:pl-32 pr-4 py-4 overflow-y-scroll"
    style="background: rgba(0,0,0,0.5)"
    @click.self="$store.commit('setCurrentModal', '')"
  >
    <div class="container mx-auto relative z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-0 w-8 h-8 absolute right-0 mr-6 mt-2 cursor-pointer"
        viewBox="0 0 24 24"
        @click="$store.commit('setCurrentModal', '')"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
      </svg>

      <div class="bg-white rounded-lg px-6 py-4">
        <form
          class="w-full max-w-4xl mx-auto mt-4"
          @submit.prevent="editProfile()"
        >
          <h1 class="text-2xl text-gray-600">Edycja profilu</h1>
          <div class="flex flex-wrap -mx-3 mb-2 mt-4">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-clinic"
              >
                Klinika
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  :class="
                    user.clinic === '' ? 'border-red-500' : 'border-gray-200'
                  "
                  id="grid-clinic"
                  v-model="user.clinic"
                  required
                >
                  <option value="nacz">Naczyniówka</option>
                  <option value="kardio">Kardiochirurgia</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Numery telefonów
              </label>
              <vue-tags-input
                v-model="phoneNumber"
                :placeholder="'Wpisz i zatwierdź klawiszem enter'"
                :class="
                  errors.phone_numbers ? 'border-red-500' : 'border-gray-200'
                "
                @tags-changed="
                  newPhoneNumbers => {
                    user.phone_numbers = newPhoneNumbers.map(
                      number => number.text
                    );
                  }
                "
                class="block w-full m-0 p-0"
              />
              <div v-if="errors.phone_numbers">
                <p
                  v-for="error in errors.phone_numbers"
                  :key="error"
                  class="text-red-500 text-xs italic"
                >
                  {{ error }}
                </p>
              </div>
            </div>
          </div>
          <input
            id="submit"
            class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Zapisz"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "EditProfile",
  components: { VueTagsInput },
  data() {
    return {
      user: {
        phone_numbers: "",
        clinic: ""
      },
      phoneNumber: "",
      errors: []
    };
  },
  methods: {
    editProfile() {
      this.$store.commit("setLoading", true);
      this.$http
        .patch("/users", this.user)
        .then(res => {
          if (res.status === 200) {
            this.$store
              .dispatch("retrieveUser")
              .then(() => this.$store.commit("setCurrentModal", ""))
              .then(() => this.$snotify.success("Profil edytowany"));
          }
        })
        .catch(err => {
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
            this.$snotify.error("Wprowadzono nieprawidłowe dane");
          } else {
            this.$snotify.error(
              "Wystąpił błąd serwera, spróbuj ponownie później."
            );
          }
        })
        .finally(() => this.$store.commit("setLoading", false));
    }
  }
};
</script>

<style scoped></style>
