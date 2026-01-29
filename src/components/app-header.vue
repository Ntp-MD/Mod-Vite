<template>
  <div class="header" ref="navheaderRef">
    <button class="header__menu-toggle" ref="nav_buttonRef" @click="toggleMenu">
      <div class="header__menu-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </button>

    <div class="header__actions">
      <ThemeSwitch></ThemeSwitch>

      <!-- Notification Bell -->
      <div class="header__notification">
        <img src="https://api.iconify.design/mdi:bell-outline.svg" alt="Notifications" />
        <span class="header__notification-badge">3</span>
      </div>

      <!-- User Profile -->
      <div class="header__user">
        <div class="header__user-avatar">NS</div>
        <div class="header__user-info">
          <span class="header__user-name">Natthapon</span>
          <span class="header__user-role">Administrator</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ThemeSwitch from "../ui/theme-switch.vue";

const emit = defineEmits(["toggle-menu"]);
const navheaderRef = ref(null);

function toggleMenu() {
  emit("toggle-menu");
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap2);
  width: 100%;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  height: 50px;
  padding: 0 var(--gap);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: var(--gap2);
  width: 100%;
}

.header__notification {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size2);
  height: var(--icon-size2);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background var(--transition);
}

.header__notification:hover {
  background: var(--color3);
}

.header__notification img {
  width: var(--icon-size);
  height: var(--icon-size);
  filter: brightness(0) saturate(100%) invert(80%);
}

.header__notification-badge {
  position: absolute;
  top: 0px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 calc(var(--gap) * 0.5);
  background: var(--danger);
  color: #fff;
  font-size: var(--font-xs);
  font-weight: 600;
  border-radius: 9px;
}

.header__user {
  display: flex;
  align-items: center;
  gap: calc(var(--gap) * 1.5);
  padding: calc(var(--gap) * 0.5) calc(var(--gap) * 1.5);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background var(--transition);
}

.header__user:hover {
  background: var(--color3);
}

.header__user-avatar {
  display: grid;
  place-content: center;
  font-size: var(--font-sm);
  background-color: var(--primary);
  width: var(--icon-size2);
  height: var(--icon-size2);
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1;
}

.header__user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header__user-info {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap) * 0.5);
}

.header__user-name {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--font-color);
  line-height: 1;
}

.header__user-role {
  font-size: var(--font-xs);
  color: var(--font-color);
  opacity: 0.6;
  line-height: 1;
}

.header__menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: var(--icon-size2);
  height: var(--icon-size2);
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: background var(--transition);
  background: transparent;
  border: none;
}

.header__menu-toggle:hover {
  background: var(--color3);
}

.header__menu-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 20px;
}

.header__menu-icon div {
  width: 100%;
  height: 2px;
  background-color: var(--font-color);
  border-radius: 2px;
  transition: all 0.3s ease;
}

@media screen and (max-width: 768px) {
  .header__menu-toggle {
    display: flex;
  }

  .header__user-info {
    display: none;
  }
}
</style>
