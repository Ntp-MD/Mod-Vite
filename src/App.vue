<template>
  <div id="AppClient" :class="themeClass">
    <header v-if="route.meta.HideThis">
      <Header></Header>
    </header>
    <main>
      <aside v-if="route.meta.HideThis">
        <NavAside></NavAside>
      </aside>
      <section>
        <router-view></router-view>
      </section>
    </main>
    <footer v-if="route.meta.HideThis">
      <Footer></Footer>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getCurrentInstance } from "vue";
const { appContext } = getCurrentInstance();
const themeClass = appContext.config.globalProperties.$theme.themeClass;
const route = useRoute();

$(window).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $("#AppClient").addClass("slideDown");
  } else {
    $("#AppClient").removeClass("slideDown");
  }
});
</script>
