<template>
  <form
    id="addForm"
    class="w-full max-w-4xl mx-auto mt-4"
    @submit.prevent="editMode ? editPatient() : addPatient()"
  >
    <h1 v-if="editMode" class="text-2xl text-gray-600">
      Edytuj dane pacjenta
    </h1>
    <h1 v-else class="text-2xl text-gray-600">Nowy pacjent</h1>
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
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-clinic"
            @change="getSelectDoctors(newPatient.clinic)"
            v-model="newPatient.clinic"
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
      <div v-if="doctors" class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-doctor"
        >
          Lekarz prowadzący
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="errors.doctor ? 'border-red-500' : 'border-gray-200'"
            id="grid-doctor"
            v-model="newPatient.doctor"
            required
          >
            <option
              v-for="doctor in doctors"
              :key="doctor.id"
              :value="doctor.id"
              >{{ doctor.name + " " + doctor.surname }}</option
            >
          </select>
          <div v-if="errors.doctor">
            <p
              v-for="error in errors.doctor"
              :key="error"
              class="text-red-500 text-xs italic"
            >
              {{ error }}
            </p>
          </div>
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
    <div class="flex flex-wrap -mx-3 mb-6 mt-4">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-name"
        >
          Imię
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          :class="errors.name ? 'border-red-500' : 'border-gray-200'"
          id="grid-name"
          type="text"
          placeholder="Jan"
          v-model="newPatient.name"
          required
        />
        <div v-if="errors.name">
          <p
            v-for="error in errors.name"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          Nazwisko
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          :class="errors.surname ? 'border-red-500' : 'border-gray-200'"
          id="grid-last-name"
          type="text"
          placeholder="Kowalski"
          v-model="newPatient.surname"
          required
        />
        <div v-if="errors.surname">
          <p
            v-for="error in errors.surname"
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
          for="grid-pesel"
        >
          PESEL
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-pesel"
          type="number"
          placeholder="12345678910"
          v-model="newPatient.pesel"
          :class="errors.pesel ? 'border-red-500' : 'border-gray-200'"
        />
        <div v-if="errors.pesel">
          <p
            v-for="error in errors.pesel"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-email"
        >
          Email
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-email"
          type="email"
          placeholder="adres@email.pl"
          v-model="newPatient.email"
          :class="errors.email ? 'border-red-500' : 'border-gray-200'"
        />
        <div v-if="errors.email">
          <p
            v-for="error in errors.email"
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
        >
          Numery telefonów
        </label>
        <vue-tags-input
          v-model="phoneNumber"
          :placeholder="'Wpisz i zatwierdź klawiszem enter'"
          :class="errors.phone_numbers ? 'border-red-500' : 'border-gray-200'"
          @tags-changed="
            newPhoneNumbers => {
              newPatient.phone_numbers = newPhoneNumbers.map(
                number => number.text
              );
            }
          "
          :tags="phoneTags"
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
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Rozpoznanie
        </label>
        <vue-tags-input
          v-model="disease"
          :placeholder="'Wpisz i zatwierdź klawiszem enter'"
          :autocomplete-items="filteredDiseases"
          :class="errors.diseases ? 'border-red-500' : 'border-gray-200'"
          @tags-changed="
            newDiseases => {
              newPatient.diseases = newDiseases.map(disease => disease.text);
            }
          "
          :tags="diseasesTags"
          class="block w-full m-0 p-0"
        />
        <div v-if="errors.diseases">
          <p
            v-for="error in errors.diseases"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6 mt-4">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-diagnosis"
        >
          Choroby towarzyszące
        </label>
        <textarea
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          :class="errors.diagnosis ? 'border-red-500' : 'border-gray-200'"
          id="grid-diagnosis"
          placeholder=""
          v-model="newPatient.diagnosis"
        ></textarea>
        <div v-if="errors.diagnosis">
          <p
            v-for="error in errors.diagnosis"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-around">
      <input
        id="submit"
        class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        :value="editMode ? 'Edytuj' : 'Dodaj'"
      />
      <input
        v-if="!editMode"
        class="bg-red-400 hover:bg-red-600 text-white font-bold ml-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="reset"
        @click="resetForm()"
      />
    </div>
  </form>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "NewPatient",
  components: { VueTagsInput },
  props: ["editMode"],
  data() {
    return {
      newPatient: {
        name: "",
        surname: "",
        pesel: "",
        email: "",
        clinic: "",
        doctor: "",
        phone_numbers: [],
        diseases: [],
        diagnosis: ""
      },
      doctors: [],
      diseases: [],
      phoneNumber: "",
      disease: "",
      errors: [],
      phoneTags: [],
      diseasesTags: []
    };
  },
  methods: {
    getSelectDoctors() {
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("retrieveData", {
          url:
            "/users" +
            (this.newPatient.clinic !== ""
              ? "?clinic=" + this.newPatient.clinic
              : "")
        })
        .then(response => {
          this.doctors = response.data;
        })
        .finally(() => this.$store.commit("setLoading", false));
    },
    getDiseases() {
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("retrieveData", {
          url: "/diseases"
        })
        .then(response => {
          this.diseases = response.data.map(disease => {
            return { text: disease.name };
          });
        })
        .finally(() => this.$store.commit("setLoading", false));
    },
    addPatient() {
      this.$store.commit("setLoading", true);
      this.$http
        .post("/patients", this.newPatient)
        .then(res => {
          if (res.status === 201) {
            this.$store.commit("setCurrentModal", "");
            this.$snotify.success("Pacjent dodany");
            this.$router.push("/pacjenci/" + res.data.id);
          }
        })
        .catch(err => {
          if (err.response.status === 422) {
            this.errors = err.response.data.errors;
            this.$snotify.error(
              "Pole " +
                Object.keys(err.response.data.errors)[0] +
                " zawiera nieprawidłowe dane"
            );
          } else {
            this.$snotify.error(
              "Wystąpił błąd serwera, spróbuj ponownie później lub powiadom administratora."
            );
          }
        })
        .finally(() => this.$store.commit("setLoading", false));
    },
    editPatient() {
      this.$store.commit("setLoading", true);
      this.$http
        .put("/patients/" + this.newPatient.id, this.newPatient)
        .then(res => {
          if (res.status === 200) {
            this.$store.commit("setCurrentPatient", this.newPatient);
            this.$store.commit("setCurrentModal", "");
            this.$snotify.success("Pacjent Edytowany");
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
    resetForm() {
      this.newPatient = {
        name: "",
        surname: "",
        pesel: "",
        email: "",
        clinic: "",
        doctor: "",
        phone_numbers: [],
        diseases: [],
        diagnosis: ""
      };
      this.phoneTags = [];
      this.diseasesTags = [];
      this.getSelectDoctors();
    },
    getEditedPatient() {
      if (this.editMode) {
        let patient = this.$store.getters.currentPatient;
        this.newPatient = {
          id: patient.id,
          name: patient.name,
          surname: patient.surname,
          pesel: patient.pesel,
          email: patient.email,
          clinic: patient.user.clinic,
          doctor: patient.user.id,
          phone_numbers: JSON.parse(patient.phone_numbers) || null,
          diseases: patient.diseases.map(disease => {
            return disease.name;
          }),
          diagnosis: patient.diagnosis
        };
        this.phoneTags = patient.phone_numbers
          ? JSON.parse(patient.phone_numbers).map(phone => {
              return { text: phone };
            })
          : [];
        this.diseasesTags = patient.diseases
          ? patient.diseases.map(disease => {
              return { text: disease.name };
            })
          : [];
      }
    }
  },
  created() {
    this.getDiseases();
    this.getEditedPatient();
    this.getSelectDoctors();
  },
  activated() {
    this.getEditedPatient();
    this.getSelectDoctors();
  },
  deactivated() {
    if (this.editMode) {
      this.resetForm();
    }
  },
  computed: {
    filteredDiseases() {
      return this.diseases.filter(i => {
        return i.text.toLowerCase().indexOf(this.disease.toLowerCase()) !== -1;
      });
    }
  }
};
</script>

<style>
/* style the background and the text color of the input ... */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
.vue-tags-input {
  @apply bg-gray-200;
}
.vue-tags-input .ti-input {
  @apply appearance-none bg-gray-200 py-2 px-4 border-gray-200 rounded text-gray-700 text-xl;
}
.vue-tags-input .ti-new-tag-input {
  @apply appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight;
}
.vue-tags-input.ti-focus .ti-new-tag-input {
  @apply bg-white;
}
.vue-tags-input.ti-focus .ti-input {
  @apply outline-none bg-white border-gray-500;
}

form:invalid #submit:hover {
  cursor: not-allowed;
  @apply bg-blue-400;
}
</style>
