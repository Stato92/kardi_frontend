<template>
  <div class="relative">
    <div
      v-if="showAddMenu"
      class="absolute lg:w-80 w-48 h-48 lg:h-64 border-6 rounded-lg z-10"
      @mouseleave="showAddMenu = false"
    ></div>
    <div
      id="addButtonTransition"
      class="lg:border-4 border-white flex flex-col justify-start items-center text-sm lg:text-2xl text-white cursor-pointer overflow-hidden z-20 bg-blue-800"
      style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
      :class="
        showAddMenu
          ? 'border-2 pt-2 rounded-lg lg:w-80 w-48 h-48 lg:h-64 lg:px-4 bg-blue-900 shadow-2xl opacity-100'
          : 'border-2 lg:border-4 rounded-full w-10 h-10 lg:w-16 lg:h-16 opacity-50'
      "
      @mouseenter="showAddMenu = true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current w-8 h-8 lg:w-14 lg:h-14 absolute"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
      <div
        id="addMenuTransition"
        class="mt-10 lg:mt-12 px-2 z-40"
        :class="showAddMenu ? 'opacity-100' : 'opacity-0 h-0'"
        @click="showAddMenu = false"
      >
        <a
          class="navbar-link"
          @click="$store.commit('setCurrentModal', 'NewPatient')"
          >Dodaj pacjenta</a
        >
        <a
          class="navbar-link"
          @click="$store.commit('setCurrentModal', 'NewEvent')"
          >Dodaj wydarzenie</a
        >
        <a
          class="navbar-link"
          @click="$store.commit('setCurrentModal', 'NewStatus')"
          >Dodaj status</a
        >
        <a
          class="navbar-link"
          @click="$store.commit('setCurrentModal', 'NewAlert')"
          >Dodaj powiadomienie</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewButton",
  data() {
    return {
      showAddMenu: false,
      expanding: false
    };
  }
};
</script>

<style scoped>
#addButtonTransition {
  transition: all 0.5s;
  transition-delay: 0.5s;
}
#addMenuTransition {
  transition: all 0.5s;
}
#addButtonTransition > #addMenuTransition {
  transition-delay: 0s;
}
#addButtonTransition:hover {
  transition-delay: 0s;
}
#addButtonTransition:hover > #addMenuTransition {
  transition-delay: 0.5s;
}
</style>
