<template>
  <div id="NavAside">
    <div class="top">Administrator</div>
    <div class="mid">
      <router-link class="nav-menu-link" to="/FontDisplay">Font Family</router-link>
      <router-link class="nav-menu-link" to="/OnlineTrackDisplay">Online Track</router-link>
      <router-link class="nav-menu-link" to="/PromotionTrack">Promotion Track</router-link>
      <router-link class="nav-menu-link" to="/DemoDisplay">List Demo</router-link>
      <router-link class="nav-menu-link" to="/QuickAccess">QuickAccess</router-link>
      <router-link class="nav-menu-link" to="/">Table </router-link>
      <router-link class="nav-menu-link" to="/SlidePause">Setting</router-link>
    </div>
    <div class="bottom">
      <div id="bangkok-time">{{ bangkokTime }}</div>
    </div>
  </div>
</template>

<style scoped>
#NavAside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
}

#NavAside a {
  padding: 10px 15px;
  border-radius: var(--border-radius);
}

#NavAside a:hover {
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
  padding: var(--gap);
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
