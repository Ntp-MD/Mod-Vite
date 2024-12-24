<script setup>
import Modslide from "../components/Mod-Slide/modslide.vue";
</script>

<template>
  <div :key="$route.fullPath">
    <Modslide></Modslide>
  </div>
</template>
