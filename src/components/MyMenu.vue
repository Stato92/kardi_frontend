<template>
  <div
    @mouseenter="menuExpand = true"
    @mouseleave="menuExpand = false"
    class="flex flex-row cursor-pointer my-auto ml-2 lg:ml-4 relative hover:bg-blue-700 rounded-full"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="fill-current border-white border-2 rounded-full"
      :class="
        'lg:w-' +
          iconSize +
          ' lg:h-' +
          iconSize +
          ' w-' +
          (iconSize - 4) +
          ' h-' +
          (iconSize - 4)
      "
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path
        d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      />
    </svg>
    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
      name="myMenu-transition"
      mode="out-in"
    >
      <div
        v-if="menuExpand"
        class="absolute z-50"
        :class="
          rightExpand
            ? 'pl-' + parseInt(this.iconSize + 2) + ' left-0'
            : 'pr-' + parseInt(this.iconSize + 2) + ' right-0'
        "
      >
        <div
          class="rounded-lg bg-blue-900 z-50 flex flex-col items-center justify-between w-48 lg:w-64"
          style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
          @click="menuExpand = false"
        >
          <template v-for="menuItem in menuItems">
            <router-link
              v-if="menuItem.action.type === 'route'"
              :key="menuItem.name"
              :to="{
                name: menuItem.action.routeName,
                params: { id: itemObject.id }
              }"
              class="navbar-link py-1 lg:py-2 z-50 text-xs lg:text-base"
            >
              <svg
                class="navbar-icon-small w-6 h-6 lg:h-8 lg:w-8 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                v-html="menuItem.svg"
              ></svg>
              <span class="navbar-link-text-small pr-4 lg:text-base">
                {{ menuItem.title }}
              </span>
            </router-link>
            <a
              v-else
              :key="menuItem.name"
              href="#"
              @click.prevent="$emit(menuItem.action.name, itemObject)"
              class="navbar-link py-1 lg:py2 text-xs lg:text-base"
            >
              <svg
                class="navbar-icon-small w-6 h-6 lg:h-8 lg:w-8 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                v-html="menuItem.svg"
              ></svg>
              <span class="navbar-link-text-small pr-4 lg:text-base">
                {{ menuItem.title }}
              </span>
            </a>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MyMenu",
  props: {
    menuItems: Array,
    itemObject: Object,
    rightExpand: Boolean,
    iconSize: Number,
    methods: Object
  },
  data: function() {
    return {
      menuExpand: false
    };
  }
};
</script>

<style scoped>
@import "~animate.css";
</style>
