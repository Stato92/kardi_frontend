<template>
  <div class="flex-1">
    <div class="flex justify-between items-end mb-4">
      <h1 class="text-xl lg:text-3xl text-white ">
        Moi pacjenci
      </h1>
      <div>
        <AppToggle
          v-model="showDead"
          onText="pokazuj zmarłych"
          offText="nie pokazuj zmarłych"
        />
      </div>
    </div>
    <ul>
      <li
        v-for="myPatient in filteredPatients"
        :key="myPatient.id"
        class="flex justify-start items-start list-none bg-blue-800 shadow-outline rounded-lg px-4 md:px-6 py-2 md:py-4 mb-4 leading-normal"
        :class="myPatient.is_alive === true ? 'text-white' : 'text-gray-500'"
      >
        <div>
          <my-menu
            :item-object="myPatient"
            :menu-items="myMenuItems"
            :right-expand="true"
            :icon-size="10"
          ></my-menu>
        </div>
        <div class="w-1/4 flex-shrink-0 text-center">
          <a :href="'/pacjenci/' + myPatient.id">
            <span
              class="lg:text-xl break-words"
              title="Imię i nazwisko pacjenta"
            >
              {{ myPatient.name }} {{ myPatient.surname }} </span
            ><br />
            <span v-if="myPatient.pesel" class="text-sm lg:text-base"
              >lat {{ ageFromPesel(myPatient.pesel) }}</span
            >
          </a>
        </div>
        <div
          class="flex h-full flex-col justify-between w-1/4 ml-4 flex-none break-words text-sm lg:text-xl text-center"
        >
          <template
            v-if="
              myPatient.phone_numbers != null &&
                Array.isArray(JSON.parse(myPatient.phone_numbers))
            "
            ><a
              v-for="phone in JSON.parse(myPatient.phone_numbers)"
              :href="'tel:' + phone"
              :key="phone"
              title="Numer telefonu pacjenta"
              >{{ phone }}</a
            ></template
          >
          <a
            v-else
            :href="'tel:' + myPatient.phone_numbers"
            title="Numer telefonu pacjenta"
            >{{ myPatient.phone_numbers || "nie podano" }}</a
          >
          <a
            class="mt-6"
            :href="'mailto:' + myPatient.email"
            title="Email pacjenta"
            >{{ myPatient.email }}</a
          >
        </div>

        <div
          class="ml-4 text-xs lg:text-base text-justify w-full break-words"
          title="Diagnoza"
        >
          {{ myPatient.diagnosis }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import MyMenu from "./MyMenu";
import { age } from "../helpers";
import AppToggle from "./TailwindToggle";

export default {
  name: "MyPatients",
  components: {
    MyMenu,
    AppToggle
  },
  data: function() {
    return {
      showDead: true,
      myPatients: [],
      myMenuItems: [
        {
          action: {
            type: "route",
            routeName: "PatientDetails"
          },
          svg: `<path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>`,
          title: "Więcej informacji"
        },
        {
          action: {
            type: "route",
            routeName: "PatientEvents"
          },
          svg: `<path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M17 13h-5v5h5v-5zM16 2v2H8V2H6v2H3.01L3 22h18V4h-3V2h-2zm3 18H5V9h14v11z"
            />`,
          title: "Wydarzenia pacjenta"
        },
        {
          action: {
            type: "route",
            routeName: ""
          },
          svg: `<path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M17 10H7v2h10v-2zm4-7h-3V1h-2v2H8V1H6v2H3v18h18V3zm-2 16H5V8h14v11zm-5-5H7v2h7v-2z"
            />`,
          title: "Statusy pacjenta"
        },
        {
          action: {
            type: "route",
            routeName: ""
          },
          svg: `<path
              d="M12 23c1.1 0 1.99-.89 1.99-1.99h-3.98c0 1.1.89 1.99 1.99 1.99zm7-6v-6c0-3.35-2.36-6.15-5.5-6.83V1.5h-3v2.67C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2zm-6-1h-2v-2h2v2zm0-4h-2V8h2v4z"
            />`,
          title: "Powiadomienia pacjenta"
        }
      ]
    };
  },
  computed: {
    filteredPatients() {
      return this.showDead
        ? this.myPatients
        : this.myPatients.filter(patient => {
            return patient.is_alive === true;
          });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    getData() {
      this.myPatients = this.$store.getters.responseData;
    },
    ageFromPesel(pesel) {
      return age(pesel);
    }
  }
};
</script>

<style scoped></style>
