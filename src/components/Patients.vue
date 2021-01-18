<template>
  <div class="w-full pb-4">
    <h1 class="lg:text-2xl text-white mb-2 lg:mb-4">
      Pacjenci
    </h1>
    <div
      class="flex flex-col xl:flex-row justify-start w-full mb-2 border-3 border-blue-500 bg-blue-800 px-2 py-2 rounded-lg text-xs lg:text-base"
    >
      <label
        for="searchPatient"
        class="flex flex-row lg:justify-start text-white relative"
      >
        <svg
          class="w-8 fill-current cursor-pointer"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <input
          class="bg-blue-800 px-2 py-4"
          placeholder="Wyszukaj w tabeli"
          v-model="searchQuery"
          id="searchPatient"
        />
        <svg
          v-if="searchQuery.length > 0"
          @click="
            () => {
              searchQuery = '';
              onFilterChange();
            }
          "
          xmlns="http://www.w3.org/2000/svg"
          class="absolute w-5 mr-2 right-0 mt-4 fill-current cursor-pointer"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
          />
        </svg>
      </label>
      <a
        href=""
        class="text-white mt-2 my-2 py-1 lg:py-2 px-2 mx-2 rounded-lg bg-blue-800 tracking-widest hover:bg-blue-600 active:bg-blue-700 text-center border-blue-500 border-2"
        :class="{ 'shadow-outline': showFiltersMenu }"
        @click.prevent="showFiltersMenu = !showFiltersMenu"
      >
        Filtry
      </a>
      <transition
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster"
        name="filters-transition"
      >
        <div
          class="z-10 flex flex-col lg:flex-row lg:justify-around lg:items-center w-full text-white"
          v-if="showFiltersMenu"
        >
          <div class="inline-block relative lg:w-48 pt-2">
            <select
              v-model="filters.disease"
              @change="onFilterChange()"
              class="block appearance-none w-full bg-blue-800 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" selected>Rozpoznanie</option>
              <option v-for="disease in diseases" :key="disease.id">{{
                disease.name
              }}</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
            >
              <svg
                class="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
          <div class="inline-block relative lg:w-48 pt-2">
            <select
              v-model="filters.eventType"
              @change="onFilterChange()"
              class="block appearance-none w-full bg-blue-800 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option selected value="">Wydarzenia</option>
              <option
                v-for="eventType in eventTypes"
                :key="eventType.id"
                :value="eventType.id"
                >{{ eventType.name }}</option
              >
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
            >
              <svg
                class="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
          <div class="inline-block relative lg:w-48 pt-2">
            <select
              v-model="filters.clinic"
              class="block appearance-none w-full bg-blue-800 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              @change="
                () => {
                  onFilterChange();
                }
              "
            >
              <option value="" selected>Klinika</option>
              <option value="nacz">Naczyniówka</option>
              <option value="kardio">Kardiochirurgia</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
            >
              <svg
                class="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
          <div class="inline-block relative lg:w-48 pt-2">
            <select
              v-model="filters.showDead"
              class="block appearance-none w-full bg-blue-800 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              @change="onFilterChange()"
            >
              <option value="" selected>Stan pacjenta</option>
              <option value="false">Pokaż tylko żywych</option>
              <option value="true">Pokaż tylko zmarłych</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
            >
              <svg
                class="fill-current h-5 w-5"
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
      </transition>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      mode="remote"
      :row-style-class="rowStyleClassFn"
      @on-row-click="onRowClick"
      @on-sort-change="onSortChange"
    >
      <div slot="emptystate">
        <span>Brak wyników</span>
      </div>
    </vue-good-table>
    <span
      class="flex justify-center w-full text-center text-white tracking-widest"
      v-if="noMoreData"
      >Koniec wyników</span
    >
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import debounce from "lodash.debounce";

export default {
  name: "Patients",
  components: {
    VueGoodTable
  },
  data: function() {
    return {
      columns: [
        {
          label: "Imię",
          field: "name"
        },
        {
          label: "Nazwisko",
          field: "surname"
        },
        {
          label: "Pesel",
          field: "pesel",
          type: "number"
        },
        {
          label: "Rozpoznanie",
          field: "diseases",
          formatFn: this.patientDiseases,
          sortable: false
        },
        {
          label: "Wydarzenia",
          field: "events",
          formatFn: this.patientEvents,
          sortable: false
        },
        {
          label: "Dodano",
          field: "created_at",
          type: "date",
          dateInputFormat: "dd.MM.yyyy",
          dateOutputFormat: "dd.MM.yyyy"
        },
        {
          label: "Klinika",
          field: "clinic",
          sortable: false
        }
      ],
      sort: {
        field: "",
        type: ""
      },
      filters: {
        showDead: "",
        clinic: "",
        eventType: "",
        disease: ""
      },
      showFiltersMenu: false,
      eventTypes: [],
      rows: [],
      diseases: [],
      isActive: false,
      searchQuery: "",
      dataOffset: 1,
      noMoreData: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.rows.length === 0) {
        vm.rows = vm.$store.getters.responseData;
        vm.getSelectEventTypes();
        vm.getSelectDiseases();
      }
    });
  },
  created() {
    this.debouncedSearchTable = debounce(this.searchTable, 500);
    this.setEchoListeners();
  },
  activated() {
    this.isActive = true;
    this.onFilterChange();
  },
  deactivated() {
    this.isActive = false;
  },
  beforeDestroy() {
    this.$echo.leave("patients");
  },
  methods: {
    setEchoListeners() {
      this.$echo
        .private("patients")
        .listen(".patient.created", e => {
          this.onFilterChange();
          this.$snotify.info(
            "Dodano pacjenta: " + e.patient.name + " " + e.patient.surname,
            { timeout: false }
          );
        })
        .listen(".patient.edited", e => {
          this.rows.splice(
            this.rows.findIndex(patient => patient.id === e.patient.id),
            1,
            e.patient
          );
          this.$snotify.info(
            "Edytowano pacjenta: " + e.patient.name + " " + e.patient.surname,
            { timeout: false }
          );
        })
        .listen(".patient.deleted", e => {
          this.rows.splice(
            this.rows.findIndex(patient => patient.id === e.patient.id),
            1
          );
          this.$snotify.info(
            "Usunięto pacjenta: " + e.patient.name + " " + e.patient.surname,
            { timeout: false }
          );
        });
    },
    getData() {
      this.$store.commit("setLoading", true);
      return this.$store
        .dispatch("retrieveData", {
          url:
            "/patients?offset=" +
            this.dataOffset +
            "&search=" +
            this.searchQuery +
            "&sort=" +
            this.sort.field +
            "&type=" +
            this.sort.type +
            "&showDead=" +
            this.filters.showDead +
            "&clinic=" +
            this.filters.clinic +
            "&eventType=" +
            this.filters.eventType +
            "&disease=" +
            this.filters.disease
        })
        .then(response => {
          this.$store.commit("setLoading", false);
          return response;
        });
    },
    patientEvents(events) {
      if (events.length > 0) {
        events = [...new Set(events)];
        let eventNames = [];
        this.eventTypes.forEach(eventType => {
          events.forEach(event => {
            if (event === eventType.id) eventNames.push(eventType.name);
          });
        });
        if (eventNames.length > 0) {
          return eventNames.join(", ");
        }
        return "";
      }
    },
    patientDiseases(diseases) {
      return Array.isArray(diseases) && diseases.length > 1
        ? diseases.join(", ")
        : diseases[0];
    },
    onRowClick(params) {
      this.$router.push("/pacjenci/" + params.row.id);
    },
    rowStyleClassFn(row) {
      return row.is_alive ? "" : "bg-gray-300";
    },
    searchTable() {
      this.sort = {
        field: "",
        type: ""
      };
      this.getData().then(response => (this.rows = response.data));
    },
    onSortChange(params) {
      this.dataOffset = 1;
      this.noMoreData = false;
      this.sort = {
        type: params[0].type,
        field: params[0].field
      };
      this.getData().then(response => (this.rows = response.data));
    },
    onFilterChange() {
      this.dataOffset = 1;
      this.noMoreData = false;
      this.rows = [];
      //TODO zrobić while dla dataOffset > 1
      this.getData().then(response => (this.rows = response.data));
    },
    getSelectEventTypes() {
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("retrieveData", {
          url: "/events/types"
        })
        .then(response => {
          this.eventTypes = response.data.filter(eventType => {
            if (
              eventType.name !== "Wizyta" &&
              eventType.name !== "Tomografia kontrolna"
            ) {
              return true;
            }
          });
          this.$store.commit("setLoading", false);
        });
    },
    getSelectDiseases() {
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("retrieveData", {
          url: "/diseases"
        })
        .then(response => {
          this.diseases = response.data;
          this.$store.commit("setLoading", false);
        });
    }
  },
  computed: {
    scrollPosition() {
      return this.$parent.posY;
    }
  },
  watch: {
    scrollPosition: function(scrollY) {
      if (this.isActive) {
        let bottomOfWindow =
          scrollY + 350 + window.innerHeight >=
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          if (!this.noMoreData) {
            this.dataOffset++;
            this.getData().then(response => {
              if (response.data.length === 0) {
                this.noMoreData = true;
              } else {
                Object.values(response.data).forEach(patient => {
                  return this.rows.push(patient);
                });
              }
            });
          }
        }
      }
    },
    searchQuery: function() {
      if (this.searchQuery.length > 2) {
        this.dataOffset = 1;
        this.noMoreData = false;
        this.debouncedSearchTable(this.searchQuery);
      }
    },
    showFiltersMenu: function(val) {
      if (!val) {
        this.filters = {
          showDead: "",
          clinic: "",
          eventType: "",
          disease: ""
        };
        this.onFilterChange();
        this.dataOffset = 1;
        this.noMoreData = false;
      }
    }
  }
};
</script>
