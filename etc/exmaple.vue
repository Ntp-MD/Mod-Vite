<!-- example.vue -->
<style scoped>
@import "/css/example.css";

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
</style>

<!--  -->
<script>
import { example } from "/js/example.js"; // Importing JS module

export default {
  name: "example",
  mounted() {
    slide1(); // Call the imported function when the component is mounted
  },
};
</script>

<!-- Example page -->
<template>
  <div></div>
  <Slide />
</template>

<script>
// Import the Slide component from the components folder
import Slide from "@/components/Slide.vue";

export default {
  name: "Page1",
  components: {
    Slide, // Register the Slide component so you can use it in the template
  },
};
</script>
<!--  -->

<!-- /js/example.js  -->
<script>
export function example() {
  $(document).ready(function () {});
}
</script>
