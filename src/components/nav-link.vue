<template>
  <div class="nav">
    <router-link v-for="page in pages" :key="page.path" class="nav__item" :to="page.path" @click="handleLinkClick">
      <span class="nav__icon">
        <img :src="page.icon" :alt="page.label" />
      </span>
      <span class="nav__label">{{ page.label }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["close-sidebar"]);

function handleLinkClick() {
  emit("close-sidebar");
}

const pages = ref([
  { path: "/font-family-views", label: "Font Family", icon: "https://api.iconify.design/mdi:format-font.svg" },
  { path: "/smart-widget", label: "Smart Widget", icon: "https://api.iconify.design/mdi:widgets-outline.svg" },
  { path: "/online-website-views", label: "Online Website", icon: "https://api.iconify.design/mdi:monitor-cellphone.svg" },
  { path: "/demo-website-views", label: "Demo Website", icon: "https://api.iconify.design/mdi:monitor-multiple.svg" },
  { path: "/format", label: "Example", icon: "https://api.iconify.design/mdi:database-refresh-outline.svg" },
  { path: "/water-ripple", label: "Test Ripple", icon: "https://api.iconify.design/mdi:water.svg" },
  { path: "/timeline", label: "Timeline", icon: "https://api.iconify.design/mdi:calendar.svg" },
  { path: "/pk-table", label: "Poker", icon: "https://api.iconify.design/mdi:poker-chip.svg" },
]);
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap) * 0.5);
}

.nav__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--gap2);
  padding: calc(var(--gap) * 1.5) calc(var(--gap2) * 1.5);
  font-weight: 500;
  color: var(--font-color);
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  text-decoration: none;
  overflow: hidden;
}

.nav__item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--primary);
  border-radius: 0 2px 2px 0;
  transition: height 0.2s ease;
}

.nav__item:hover {
  background: var(--color3);
  color: #fff;
}

.nav__item:hover::before {
  height: 60%;
}

.nav__item.router-link-active {
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.15), transparent);
  color: var(--primary);
  font-weight: 600;
}

.nav__item.router-link-active::before {
  height: 70%;
  background: var(--primary);
}

.nav__item.router-link-active .nav__icon {
  transform: scale(1.1);
}

.nav__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size);
  height: var(--icon-size);
  transition: transform 0.2s ease;
}

.nav__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(80%);
}

.nav__item:hover .nav__icon img,
.nav__item.router-link-active .nav__icon img {
  filter: brightness(0) saturate(100%) invert(45%) sepia(91%) saturate(3116%) hue-rotate(213deg) brightness(95%) contrast(92%);
}

.nav__label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
