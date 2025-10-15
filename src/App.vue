<template>
  <div id="AppClient">
    <header v-if="route.meta.HideThis && isAuthenticated">
      <Header></Header>
    </header>
    <main>
      <aside v-if="route.meta.HideThis && isAuthenticated">
        <NavAside></NavAside>
      </aside>
      <section>
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const route = useRoute();
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

$(window).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $("#AppClient").addClass("slideDown");
  } else {
    $("#AppClient").removeClass("slideDown");
  }
});
</script>
