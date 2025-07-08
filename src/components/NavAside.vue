<template>
  <div class="navAside">
    <div class="top">Administrator</div>
    <nav class="mid">
      <router-link class="nav-menu-link" to="/Dashboard">Dashboard</router-link>
      <router-link class="nav-menu-link" to="/FontDisplay">Font Family</router-link>
      <router-link class="nav-menu-link" to="/">Online Promotion</router-link>
      <router-link class="nav-menu-link" to="/DemoWebsite">Demo Website</router-link>
      <router-link class="nav-menu-link" to="/Table">Table </router-link>
    </nav>
    <div class="bottom">
      <div id="bangkok-time">{{ bangkokTime }}</div>
    </div>
  </div>
</template>

<style scoped>
.navAside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  background: var(--main-color);
  width: 100%;
}

.navAside a {
  padding: 10px 15px;
  border-radius: var(--border-radius);
}

.navAside a:hover {
  background: var(--btn);
  color: #fff;
}

.top {
  display: grid;
  align-items: center;
  height: 50px;
  text-align: left;
  padding: var(--gap);
}

.mid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: -webkit-fill-available;
}

.bottom {
  display: grid;
  place-items: center;
  height: 50px;
  border-top: 1px solid var(--border-color);
}
</style>

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
