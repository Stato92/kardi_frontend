<template>
  <form
    id="addForm"
    class="w-full max-w-4xl mx-auto mt-4"
    @submit.prevent="addCalendarEvent()"
  >
    <h1 class="text-2xl text-gray-600">Nowe wydarzenie</h1>
    <div class="flex flex-wrap -mx-3 mb-6 mt-4">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-event-type"
        >
          Typ wydarzenia
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-event-type"
            v-model="newEvent.event_type_id"
            required
          >
            <option
              v-for="eventType in eventTypes"
              :value="eventType.id"
              :key="eventType.id"
              >{{ eventType.name }}</option
            >
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

        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-6"
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
            newEvent.patient_id === '' ? '' : 'disable-edit'
          ]"
          @tags-changed="
            tag => {
              if (tag.length > 0) {
                newEvent.patient_id = tag[0].id;
              } else newEvent.patient_id = '';
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

        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-6"
        >
          Uczestnicy
        </label>
        <vue-tags-input
          v-model="doctor"
          :placeholder="'Wpisz i zatwierdź klawiszem enter'"
          :autocomplete-items="filteredDoctors"
          :add-only-from-autocomplete="true"
          :class="errors.doctor ? 'border-red-500' : 'border-gray-200'"
          @tags-changed="
            newUsers => {
              newEvent.event_users = newUsers.map(event_user => event_user.id);
            }
          "
          :tags="doctorTags"
          class="block w-full m-0 p-0"
        />
        <div v-if="errors.event_users">
          <p
            v-for="error in errors.event_users"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </p>
        </div>
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-6"
          for="grid-description"
        >
          Opis
        </label>
        <textarea-autosize
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          :class="errors.description ? 'border-red-500' : 'border-gray-200'"
          id="grid-description"
          type="text"
          placeholder="Podaj opis"
          v-model="newEvent.description"
        />
        <div v-if="errors.description">
          <p
            v-for="error in errors.description"
            :key="error"
            class="text-red-500 text-xs italic"
          >
            {{ error }}
          </p>
        </div>
      </div>
      <div
        class="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-col justify-center"
      >
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Data
        </label>
        <v-date-picker
          v-model="newEvent.date"
          is-inline
          is-expanded
          :attributes="attrs"
          :min-date="new Date()"
          is-required
        />
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4"
          for="grid-time"
        >
          Godzina
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          :class="errors.hour ? 'border-red-500' : 'border-gray-200'"
          id="grid-time"
          type="time"
          placeholder="Podaj opis"
          v-model="newEvent.hour"
        />
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
import CalendarInit from "../mixins/CalendarInit";
import debounce from "lodash.debounce";
import moment from "moment";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export default {
  name: "NewEvent",
  components: { VueTagsInput },
  mixins: [CalendarInit],
  data() {
    return {
      events: [],
      attrs: [],
      eventTypes: [],
      eventUser: "",
      errors: [],
      doctors: [],
      doctor: "",
      patients: [],
      patient: "",
      patientTags: [],
      doctorTags: [],
      gapi: null,
      newEvent: {
        event_type_id: "",
        patient_id: "",
        user_id: "",
        event_users: [],
        date: "",
        hour: "",
        description: ""
      }
    };
  },

  created() {
    this.getDoctors();
    this.getEventTypes();
    this.debouncedFilterPatients = debounce(this.filterPatients, 500);
  },
  async activated() {
    if (this.$store.getters.currentPatient !== null) {
      let patient = this.$store.getters.currentPatient;
      this.newEvent.patient_id = patient.id;
      this.patientTags = [
        {
          text: patient.name + " " + patient.surname
        }
      ];
    }
    this.eventUser = this.$store.getters.user;
    this.newEvent.user_id = this.eventUser.id;
    try {
      await Promise.all([
        this.$store.commit("setLoading", true),
        await this.initGapi(),
        await this.authenticateUser(),
        await this.loadCalendarClient(),
        await this.getEventsFromCalendar()
      ]);
    } catch (err) {
      if (err.error === "popup_closed_by_user") {
        this.$snotify.error("Autoryzacja przerwana przez użytkownika");
      } else if (err.error === "access_denied") {
        this.$snotify.error("Brak wymaganych uprawnień");
      } else if (err.error === "popup_blocked_by_browser") {
        this.$snotify.error(
          "Proszę odblokować wyskakujące okienka i przekierowania w przeglądarce"
        );
      } else {
        this.$snotify.error("Błąd usługi Google");
      }
      this.$store.commit("setCurrentModal", "");
    } finally {
      this.$store.commit("setLoading", false);
    }
  },

  methods: {
    async getEventsFromCalendar() {
      let response = await this.gapi.client.calendar.events.list({
        calendarId: "YOUR_CALENDAR_ID",
        timeMin: moment()
          .subtract(1, "months")
          .toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime"
      });
      let events = [
        {
          key: "today",
          highlight: {
            color: "green",
            fillMode: "light"
          },
          dates: new Date(),
          popover: {
            visibility: "hover",
            hideIndicator: true,
            label: "Dzisiejsza data"
          }
        }
      ];
      response.result.items.forEach(event => {
        let vacation = event.summary.includes("urlop");
        events.push({
          dates: {
            start: moment(
              event.start.dateTime ? event.start.dateTime : event.start.date
            ).toDate(),
            end: moment(
              event.end.dateTime ? event.end.dateTime : event.end.date
            ).toDate()
          },
          highlight: vacation ? { color: "gray", fillMode: "light" } : false,
          dot: !vacation,
          popover: {
            visibility: "hover",
            label: event.summary ? event.summary : ""
          },
          description: event.description
        });
      });
      this.attrs = events;
    },
    validateNewEvent() {
      let invalid = false;
      if (
        !this.eventTypes.some(
          eventType => this.newEvent.event_type_id === eventType.id
        )
      ) {
        this.$snotify.error("Proszę wybrać typ wydarzenia");
        invalid = true;
      }
      if (this.newEvent.patient_id === "") {
        this.$snotify.error("Proszę wybrać pacjenta");
        invalid = true;
      }
      if (this.newEvent.date === "") {
        this.$snotify.error("Proszę wybrać datę");
        invalid = true;
      }
      return !invalid;
    },
    addCalendarEvent() {
      if (!this.validateNewEvent()) return;
      this.$store.commit("setLoading", true);
      let startDate = this.newEvent.hour
        ? moment(this.newEvent.date)
            .set({
              hour: moment(this.newEvent.hour).hour(),
              minute: moment(this.newEvent.hour).minute()
            })
            .toISOString()
        : moment(this.newEvent.date)
            .format("YYYY-MM-DD")
            .toString();
      let endDate = this.newEvent.hour
        ? moment(startDate)
            .add(1, "hours")
            .toISOString()
        : startDate;
      if (this.patients.length === 0 && this.$store.getters.currentPatient) {
        this.patients.push({
          id: this.$store.getters.currentPatient.id,
          text:
            this.$store.getters.currentPatient.name +
            " " +
            this.$store.getters.currentPatient.surname
        });
      }
      let eventType = this.newEvent.event_type_id;
      let eventName = this.eventTypes.find(item => eventType === item.id).name;
      let patientId = this.newEvent.patient_id;
      let patientName = this.patients.find(patient => patientId === patient.id)
        .text;
      let summary =
        eventName +
        " - " +
        patientName +
        " - " +
        this.eventUser.name +
        " " +
        this.eventUser.surname;
      let atendees = [];
      let doctors = this.doctors;
      this.newEvent.event_users.forEach(user => {
        let doctor = doctors.find(doctor => doctor.id === user);
        atendees.push({
          displayName: doctor.text,
          email: doctor.email
        });
      });
      let event = {
        summary: summary,
        description: this.newEvent.description,
        start: this.newEvent.hour
          ? { dateTime: startDate, timeZone: "Europe/Warsaw" }
          : { date: startDate },
        end: this.newEvent.hour
          ? { dateTime: endDate, timeZone: "Europe/Warsaw" }
          : { date: endDate },
        atendees: atendees
      };
      this.gapi.client.calendar.events
        .insert({
          calendarId: "YOUR_CALENDAR_ID",
          resource: event
        })
        .then(() => {
          this.$snotify.success("Dodano wydarzenie do Kalendarza Google");
          this.getEventsFromCalendar();
          this.resetForm();
        })
        .catch(() => {
          this.$snotify.error("Błąd przy dodawaniu wydarzenia do Google");
        });
      this.$store.commit("setLoading", false);
    },
    addApiEvent(event) {
      this.$store.commit("setLoading", true);
      this.$http
        .post("/events", this.newPatient)
        .then(res => {
          if (res.status === 201) {
            this.$store.commit("setCurrentModal", null);
            this.$snotify.success("Wydarzenie dodane");
            this.$router
              .push("/wydarzenia/" + res.data.id)
              .then(() => this.$store.commit("setLoading", false));
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
    getEventTypes() {
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("retrieveData", {
          url: "events/types"
        })
        .then(response => {
          this.eventTypes = response.data;
        })
        .finally(() => this.$store.commit("setLoading", false));
    },
    getDoctors() {
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("retrieveData", {
          url: "/users"
        })
        .then(response => {
          this.doctors = response.data.map(doctor => {
            return {
              id: doctor.id,
              text: doctor.name + " " + doctor.surname,
              email: doctor.email
            };
          });
        })
        .finally(() => this.$store.commit("setLoading", false));
    },
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
      this.doctorTags = [];
      this.newEvent = {
        event_type_id: "",
        patient_id: "",
        event_users: [],
        date: "",
        hour: "",
        description: ""
      };
    }
  },
  computed: {
    filteredDoctors() {
      return this.doctors.filter(i => {
        return i.text.toLowerCase().indexOf(this.doctor.toLowerCase()) !== -1;
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

<style>
.disable-edit .ti-new-tag-input {
  border: 0 !important;
  background: white !important;
  display: none !important;
}
.disable-edit .ti-input {
  border-color: white !important;
  background: white !important;
}
.vue-tags-input {
  max-width: 100% !important;
}
</style>
