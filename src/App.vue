<template>
  <div id="AppClient">
    <header v-if="route.meta.HideThis">
      <NavHeader></NavHeader>
    </header>
    <aside>
      <router-link class="nav-menu-link" to="/FontDisplay">Font Family</router-link>
      <router-link class="nav-menu-link" to="/OnlineTrackDisplay">Online Track</router-link>
      <router-link class="nav-menu-link" to="/OnlineDisplay">Online Promotion</router-link>
      <router-link class="nav-menu-link" to="/DemoDisplay">List Demo</router-link>
      <router-link class="nav-menu-link" to="/QuickAccess">QuickAccess</router-link>
      <router-link class="nav-menu-link" to="/">Table </router-link>
      <router-link class="nav-menu-link" to="/blank">Setting</router-link>
    </aside>
    <main>
      <router-view></router-view>
    </main>
    <!--
    <footer v-if="route.meta.HideThis">
      <NavFooter></NavFooter>
    </footer>

    -->
  </div>
</template>

<script setup>
import NavHeader from "/src/components/Header.vue";
import NavFooter from "/src/components/Footer.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
