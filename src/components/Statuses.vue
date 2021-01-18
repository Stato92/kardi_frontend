<template>
  <div>Statusy</div>
</template>

<script>
export default {
  name: "Statuses",
  beforeRouteEnter(to, from, next) {
    this.$store.commit("setLoading", false);
  }
};
</script>

<style scoped></style>
