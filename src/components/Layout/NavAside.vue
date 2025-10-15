<template>
  <div class="nav_menu">
    <div class="nav_top">Administrator</div>
    <nav class="nav_mid">
      <router-link class="nav_menu_link" to="/">Dashboard</router-link>
      <router-link class="nav_menu_link" to="/OnlinePage">Online Promotion</router-link>
      <router-link class="nav_menu_link" to="/SmartWidget">Smart Widget</router-link>
      <router-link class="nav_menu_link" to="/DemoPage">Demo Website</router-link>
      <router-link class="nav_menu_link" to="/FontFamilyPage">Font Family</router-link>
      <router-link class="nav_menu_link" to="/SlidePause">Slide Pause</router-link>
      <router-link class="nav_menu_link" to="/Map">World Map</router-link>
    </nav>
    <div class="nav_bottom">
      <div id="bangkok-time">{{ bangkokTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const bangkokTime = ref("");

function updateBangkokTime() {
  const options = {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    day: "numeric",
    month: "long",
  };
  const now = new Date();
  bangkokTime.value = now.toLocaleTimeString("en-US", options);
}

let intervalId;

onMounted(() => {
  updateBangkokTime();
  intervalId = setInterval(updateBangkokTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.nav_menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 100%;
  background: var(--main-color);
  border-right: 1px solid var(--border-color);
}

.nav_menu_link {
  font-size: clamp(12px, vw, 18px);
  padding: clamp(10px, 1vw, 15px);
  width: 100%;
  margin: auto;
}

.nav_menu_link:hover {
  background: var(--main-color3);
  color: #fff;
}

.nav_top {
  display: grid;
  align-items: center;
  height: 50px;
  text-align: left;
  padding: var(--gap);
}

.nav_mid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: fit-content;
}

.nav_bottom {
  display: grid;
  place-items: center;
  height: 50px;
  border-top: 1px solid var(--border-color);
}

@media screen and (max-width: 1200px) {
  .nav_menu {
    position: fixed;
    top: 50px;
    height: calc(100% - 50px);
    width: 70%;
    transform: translateX(-100%);
    transition: 0.5s;
  }

  .nav_menu.open {
    transform: translateX(0%);
  }
}
</style>
