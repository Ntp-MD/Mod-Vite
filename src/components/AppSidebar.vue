<template>
  <aside :class="{ open: isOpen }">
    <div class="nav-top">Welcome</div>
    <nav class="nav-mid">
      <navLink></navLink>
    </nav>
    <div class="nav-bottom">
      <div id="bangkok-time">{{ bangkokTime }}</div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import navLink from "../components/navLink.vue";

const props = defineProps({
  isOpen: { type: Boolean, default: false }, // <-- added
});

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

<style>
.nav-top {
  padding: var(--gap);
}

.nav-mid {
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  justify-content: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.nav-mid a {
  padding: 15px var(--gap);
}

.nav-mid a:hover {
  background-color: var(--color3);
}

.nav-bottom {
  padding: var(--gap);
}

.nav-button {
  position: fixed;
  top: 0;
  right: 0;
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
}

.nav-icon {
  display: grid;
  place-content: center;
  gap: 6px;
}

.nav-icon div {
  width: 27px;
  height: 3px;
  background: var(--font-color);
}

@media screen and (max-width: 1200px) {
  aside {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: 0.3s;
    background: var(--color1);
    height: calc(100vh - 50px);
    z-index: 1000;
  }

  aside.open {
    transform: translateX(0%);
  }
}
</style>
