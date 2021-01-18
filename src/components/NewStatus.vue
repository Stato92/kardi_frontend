<template>
  <form
    id="addForm"
    class="w-full max-w-4xl mx-auto mt-4"
    @submit.prevent="addStatus()"
    autocomplete="off"
  >
    <h1 class="text-2xl text-gray-600">Nowy status</h1>
    <div class="flex flex-wrap -mx-3 mb-2 mt-4">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-name"
        >
          Nazwa
        </label>
        <vue-tags-input
          id="grid-name"
          v-model="status"
          :placeholder="'Wpisz i zatwierdź klawiszem enter'"
          :autocomplete-items="filteredStatuses"
          :max-tags="1"
          :add-only-from-autocomplete="false"
          :class="[
            errors.status ? 'border-red-500' : 'border-gray-200',
            newStatus.name === '' ? '' : 'disable-edit'
          ]"
          @tags-changed="
            tag => {
              if (tag.length > 0) {
                newStatus.name = tag[0].text;
              } else newStatus.name = '';
            }
          "
          class="block w-full m-0 p-0"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Pacjent
        </label>
        <vue-tags-input
          v-model="patient"
          :placeholder="'Wpisz i zatwierdź klawiszem enter'"
          :autocomplete-items="patients"
          :max-tags="1"
          :add-only-from-autocomplete="true"
          :class="[
            errors.patient_id ? 'border-red-500' : 'border-gray-200',
            newStatus.patient_id === '' ? '' : 'disable-edit'
          ]"
          @tags-changed="
            tag => {
              if (tag.length > 0) {
                newStatus.patient_id = tag[0].id;
              } else newStatus.patient_id = '';
            }
          "
          :tags="patientTags"
          class="block w-full m-0 p-0"
        />
        <div v-if="errors.patient_id">
          <p
            v-for="error in errors.patient_id"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6 mt-4">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-priority"
        >
          Priorytet
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-priority"
            v-model="newStatus.priority"
            required
          >
            <option v-for="n in 4" :value="n" :key="n">{{ n }}</option>
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
    </div>

    <div class="flex flex-row justify-around">
      <input
        id="submit"
        class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        value="Dodaj"
      />
      <input
        class="bg-red-400 hover:bg-red-600 text-white font-bold ml-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        type="reset"
        @click="resetForm()"
      />
    </div>
  </form>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import debounce from "lodash.debounce";

export default {
  name: "NewStatus",
  components: { VueTagsInput },
  data() {
    return {
      errors: [],
      statuses: [],
      status: "",
      patients: [],
      patient: "",
      patientTags: [],
      newStatus: {
        name: "",
        patient_id: "",
        user_id: "",
        priority: "1"
      }
    };
  },
  created() {
    this.getStatuses();
    this.debouncedFilterPatients = debounce(this.filterPatients, 500);
  },
  activated() {
    if (this.$store.getters.currentPatient !== null) {
      let patient = this.$store.getters.currentPatient;
      this.newStatus.patient_id = patient.id;
      this.patientTags = [
        {
          text: patient.name + " " + patient.surname
        }
      ];
    }
    this.newStatus.user_id = this.$store.getters.user.id;
  },
  methods: {
    filterPatients(query) {
      if (query.length >= 2) {
        this.$store.commit("setLoading", true);
        this.$store
          .dispatch("retrieveData", {
            url: "/patients/search?query=" + query
          })
          .then(response => {
            this.$store.commit("setLoading", false);
            this.patients = response.data.map(patient => {
              return {
                id: patient.id,
                text: patient.name + " " + patient.surname
              };
            });
          });
      }
    },
    resetForm() {
      this.patientTags = [];
      this.newStatus = {
        name: "",
        patient_id: "",
        user_id: "",
        priority: ""
      };
    },
    getStatuses() {
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("retrieveData", {
          url: "statuses/most_popular"
        })
        .then(response => {
          this.statuses = response.data.map(status => {
            return {
              text: status
            };
          });
        })
        .finally(() => this.$store.commit("setLoading", false));
    },
    addStatus() {
      this.$store.commit("setLoading", true);
      this.$http
        .post("/statuses", this.newStatus)
        .then(res => {
          if (res.status === 201) {
            this.$store.commit("setCurrentModal", "");
            this.$snotify.success("Status dodany");
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
    }
  },
  computed: {
    filteredStatuses() {
      return this.statuses.filter(i => {
        return i.text.toLowerCase().indexOf(this.status.toLowerCase()) !== -1;
      });
    }
  },
  watch: {
    patient: function(val) {
      this.debouncedFilterPatients(val);
    }
  }
};
</script>

<style scoped></style>
