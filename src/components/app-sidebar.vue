<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <div class="sidebar-top">
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">M</div>
        <div class="sidebar-brand-text">Personal Used</div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <navLink @close-sidebar="$emit('close-sidebar')"></navLink>
    </nav>
    <div class="sidebar-bottom">
      <div class="sidebar-time">
        <div class="sidebar-time-label">Bangkok Time</div>
        <div class="sidebar-time-value">{{ timeOnly }}</div>
        <div class="sidebar-time-date">{{ dateOnly }}</div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import navLink from "../components/nav-link.vue";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
});

const emit = defineEmits(["close-sidebar"]);

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
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color2);
  border-right: 1px solid var(--border-color);
}

.sidebar-top {
  padding: calc(var(--gap2) * 1.5);
  border-bottom: 1px solid var(--border-color);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: var(--gap2);
}

.sidebar-brand-icon {
  display: grid;
  place-items: center;
  width: var(--icon-size3);
  height: var(--icon-size3);
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  border-radius: 10px;
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--white);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.sidebar-brand-text {
  font-size: var(--font-md);
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: var(--gap2);
}

.sidebar-bottom {
  padding: calc(var(--gap2) * 1);
  border-top: 1px solid var(--border-color);
  background: var(--color1);
}

.sidebar-time {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap) * 0.4);
  padding: var(--gap2);
  background: var(--color2);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.sidebar-time-label {
  font-size: var(--font-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--font-color);
  opacity: 0.6;
}

.sidebar-time-value {
  font-size: var(--font-lg);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--primary);
  font-family: "Courier New", monospace;
  letter-spacing: 1px;
}

.sidebar-time-date {
  font-size: var(--font-sm);
  color: var(--font-color);
  opacity: 0.7;
}

@media screen and (max-width: 1200px) {
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: var(--color1);
    height: 100%;
    z-index: 1000;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5);
  }

  .sidebar-open {
    transform: translateX(0%);
  }
}
</style>
