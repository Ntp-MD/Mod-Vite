<template>
  <aside class="nav-aside" :class="{ open: isOpen }">
    <div class="nav-top">
      <div class="brand">
        <div class="brand-icon">M</div>
        <div class="brand-text">Personal Used</div>
      </div>
    </div>
    <nav class="nav-mid">
      <navLink></navLink>
    </nav>
    <div class="nav-bottom">
      <div class="time-display">
        <div class="time-label">Bangkok Time</div>
        <div class="time-value">{{ timeOnly }}</div>
        <div class="date-value">{{ dateOnly }}</div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import navLink from "../components/navLink.vue";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
});

const bangkokTime = ref(new Date());

const timeOnly = computed(() => {
  return bangkokTime.value.toLocaleTimeString("en-US", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
});

const dateOnly = computed(() => {
  return bangkokTime.value.toLocaleDateString("en-US", {
    timeZone: "Asia/Bangkok",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
});

function updateBangkokTime() {
  bangkokTime.value = new Date();
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
.nav-aside {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color2);
  border-right: 1px solid var(--border-color);
}

.nav-top {
  padding: calc(var(--gap2) * 1.5);
  border-bottom: 1px solid var(--border-color);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--gap2);
}

.brand-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.brand-text {
  font-size: var(--font-1);
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-mid {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: var(--gap2);
}

.nav-bottom {
  padding: calc(var(--gap2) * 1);
  border-top: 1px solid var(--border-color);
  background: var(--color1);
}

.time-display {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: var(--gap2);
  background: var(--color2);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.time-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--font-color);
  opacity: 0.6;
}

.time-value {
  font-size: 24px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--primary);
  font-family: "Courier New", monospace;
  letter-spacing: 1px;
}

.date-value {
  font-size: var(--font-4);
  color: var(--font-color);
  opacity: 0.7;
}

@media screen and (max-width: 1200px) {
  .nav-aside {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: var(--color1);
    height: calc(100vh - 50px);
    z-index: 1000;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5);
  }

  .nav-aside.open {
    transform: translateX(0%);
  }
}
</style>
