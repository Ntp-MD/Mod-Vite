<template>
  <div id="AppClient" :class="themeClass">
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
    <footer v-if="route.meta.HideThis && isAuthenticated">
      <Footer></Footer>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getCurrentInstance } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { appContext } = getCurrentInstance();
const themeClass = appContext.config.globalProperties.$theme.themeClass;
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
