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
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal"
};
</script>

<style scoped></style>
