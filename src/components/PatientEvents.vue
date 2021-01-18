<template>
  <div class="flex-1 w-full">
    <h1 class="text-2xl text-white mb-4">
      Wydarzenia dotyczące pacjenta
    </h1>
    <span
      v-if="PatientEvents.length === 0"
      class="tracking-wider text-gray-400 mt-2 block bg-blue-800 rounded-lg px-4 py-6 flex flex-row font-semibold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 fill-current mr-2"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path
          d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3 1.3.58 1.3 1.3-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"
        />
      </svg>

      Brak wydarzeń</span
    >
    <ul v-else>
      <li
        v-for="PatientEvent in PatientEvents"
        :key="PatientEvent.id"
        class="flex justify-start items-start list-none bg-blue-800 shadow-outline rounded-lg px-6 py-4 mb-4 text-white leading-normal"
      >
        <div
          class="flex flex-col justify-between items-start w-1/8 ml-4 flex-none"
        >
          <span class="text-xl">{{ PatientEvent.event_type.name }}</span>
          <span class="text-sm">{{ PatientEvent.date }}</span>
        </div>
        <div
          class="flex flex-col justify-between items-start w-1/6 ml-8 flex-none"
        >
          <span
            v-for="user in PatientEvent.users"
            :key="user.id"
            class="text-sm"
            >{{ user.name }} {{ user.surname }}</span
          >
        </div>
        <div class="flex">
          <h2>{{ PatientEvent.name }}</h2>
        </div>
        <div class="flex flex-row justify-start items-center" />
      </li>
    </ul>
  </div>
</template>

<script>
import CalendarInit from "../mixins/CalendarInit";
import moment from "moment";
export default {
  name: "PatientEvents",
  mixins: [CalendarInit],
  data() {
    return {
      PatientEvents: []
    };
  },
  async activated() {
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
      } else if (err.status === 401 && err.statusText === "Unauthorized") {
        await this.$store.dispatch("authLogout");
        this.$snotify.error("Sesja wygasła, proszę zalogować się ponownie");
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
    }
  }
};
</script>
