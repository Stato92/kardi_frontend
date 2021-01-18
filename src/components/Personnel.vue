<template>
  <div>Personel</div>
</template>

<script>
export default {
  name: "Personnel",
  created() {
    this.$store.commit("setLoading", false);
  }
};
</script>

<style scoped></style>
