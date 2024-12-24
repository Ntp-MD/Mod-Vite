<script>
import NavHeader from "@/components/NavHeader.vue";
import FooterSection from "@/components/Footer-Section.vue";

export default {
  components: {
    NavHeader,
    FooterSection,
  },
};
</script>

<template>
  <NavHeader />
  <section>
    <router-view :key="$route.fullPath"></router-view>
  </section>
  <FooterSection />
</template>

<style scoped>
@import url("@/css/app.css");
</style>
