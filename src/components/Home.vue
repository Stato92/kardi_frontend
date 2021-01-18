<template>
  <div class="flex-1">
    <div class="bg-green-700 rounded-lg py-4">
      <h1 class="text-2xl text-white px-4 py-2">Co nowego?</h1>
      <p class="text-xl text-white px-4 pb-2">
        Dodawanie wydarzeń do kalendarza Google (plus)<br />
        Naprawione logowanie Google<br />
        Komentarze do pacjentów (karta pacjenta)<br />
        Dodawanie pacjentów (prawy dolny róg)<br />
        Wyszukiwarka w menu bocznym<br />
        &lbarr; Menu pacjenci
        <br />Logowanie/rejestracja poprzez konto Google<br />Dużo usprawnień w
        silniku aplikacji<br />Ulepszony wygląd na mobilce (jeszcze będzie inne
        menu, bo to jest za duże na telefon)<br />Automatyczne wylogowanie po x
        sekundach nieaktywności
      </p>
    </div>
    <!--    <h1 class="text-xl lg:text-3xl text-white mb-4">-->
    <!--      Nadchodzące wydarzenia-->
    <!--    </h1>-->
    <ul>
      <li
        v-for="event in events"
        :key="event.id"
        class="flex justify-start items-center list-none bg-blue-800 shadow-outline rounded-lg px-2 lg:px-6 py-2 lg:py-4 mb-4 text-white lg:leading-loose"
      >
        <div
          class="ml-2 flex flex-col justify-between items-start w-1/5 flex-none"
        >
          <span
            class="lg:text-xl self-center text-center"
            title="Typ wydarzenia"
            >{{ event.event_type.name }}</span
          >
          <span
            class="text-xs lg:text-sm self-center text-center lg:text-left"
            title="Data wydarzenia"
            >{{ event.date }}</span
          >
        </div>
        <div
          class="flex flex-col justify-start text-center items-center w-1/5 flex-none lg:mx-4 mx-2"
        >
          <span class="text-sm lg:text-xl" title="Imię i nazwisko pacjenta"
            >{{ event.patient.name }} {{ event.patient.surname }}</span
          >
          <span class="text-xxs lg:text-sm"
            >lat {{ ageFromPesel(event.patient.pesel) }}</span
          >
        </div>

        <div class="text-xs lg:text-base flex text-justify self-start">
          <h2 title="Nazwa wydarzenia">{{ event.name }}</h2>
        </div>
        <!--                    <div class="flex flex-row justify-start items-center">-->
        <!--                    </div>-->
      </li>
    </ul>
  </div>
</template>

<script>
import { age } from "../helpers";
export default {
  name: "Main",
  data() {
    return {
      events: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    getData() {
      this.events = this.$store.getters.responseData;
    },
    ageFromPesel(pesel) {
      return age(pesel);
    }
  }
};
</script>

<style scoped></style>
