<template>
  <div>Alerty</div>
</template>

<script>
export default {
  name: "Alerts",
  beforeRouteEnter(to, from, next) {
    this.store.commit("setLoading", false);
  }
};
</script>

<style scoped></style>
