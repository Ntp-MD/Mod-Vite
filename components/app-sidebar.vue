<template>
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }" aria-label="Primary navigation">
    <header class="sidebar-top">
      <div class="sidebar-brand panel-surface">
        <div class="sidebar-brand-icon">M</div>
        <div class="sidebar-brand-copy">
          <div class="sidebar-brand-text">Personal Used</div>
          <div class="sidebar-brand-subtitle">Workspace tools</div>
        </div>
      </div>
    </header>
    <nav class="sidebar-nav" aria-label="Project pages">
      <navLink @close-sidebar="emit('close-sidebar')"></navLink>
    </nav>
    <footer class="sidebar-bottom">
      <div class="sidebar-time panel-surface panel-surface-muted">
        <div class="sidebar-time-label">Bangkok Time</div>
        <div class="sidebar-time-value">{{ timeOnly }}</div>
        <div class="sidebar-time-date text-muted">{{ dateOnly }}</div>
      </div>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import navLink from "~/components/nav-link.vue";

defineProps({
  isOpen: { type: Boolean, default: false },
});

const emit = defineEmits(["close-sidebar"]);
const bangkokTime = ref(new Date());
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Bangkok",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Bangkok",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const timeOnly = computed(() => {
  return timeFormatter.format(bangkokTime.value);
});

const dateOnly = computed(() => {
  return dateFormatter.format(bangkokTime.value);
});

function updateBangkokTime() {
  bangkokTime.value = new Date();
}

let intervalId: ReturnType<typeof setInterval> | undefined;

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
  justify-content: space-between;
  height: 100%;
  background: var(--color2);
  border-right: 1px solid var(--border-color);
}

.sidebar-top {
  padding: var(--gap-md);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: calc(var(--gap-sm) * 1.5);
}

.sidebar-brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size3);
  height: var(--icon-size3);
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  border-radius: 10px;
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--white);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.sidebar-brand-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-brand-text {
  font-size: var(--font-md);
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar-brand-subtitle {
  font-size: var(--font-xs);
  color: var(--font-color);
  opacity: 0.65;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.sidebar-bottom {
  padding: var(--gap-md);
  border-top: 1px solid var(--border-color);
  background: var(--color1);
}

.sidebar-time {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap-sm) * 0.4);
  padding: var(--gap-md);
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
}

@media screen and (max-width: 1200px) {
  .sidebar {
    position: absolute;
    inset: 0 auto 0 0;
    transform: translateX(-100%);
    transition: transform var(--transition);
    background: var(--color1);
    height: 100%;
    z-index: 1000;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5);
  }

  .sidebar--open {
    transform: translateX(0%);
  }
}
</style>
