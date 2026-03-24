<template>
  <div class="header-shell">
    <button
      class="icon-button header-menu-toggle"
      aria-label="Open navigation"
      type="button"
      @click="toggleMenu"
    >
      <div class="header-menu-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

    <div class="header-actions">
      <ThemeSwitch></ThemeSwitch>

      <button
        class="icon-button header-notification"
        aria-label="Open notifications"
        type="button"
      >
        <img
          src="https://api.iconify.design/mdi:bell-outline.svg"
          alt="Notifications"
        />
        <span class="header-notification-badge">3</span>
      </button>

      <button class="header-user" aria-label="Open profile" type="button">
        <div class="header-user-avatar">NS</div>
        <div class="header-user-info">
          <span class="header-user-name">Natthapon</span>
          <span class="header-user-role">Administrator</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ThemeSwitch from '~/ui/theme-switch.vue'

  const emit = defineEmits(['toggle-menu'])

  function toggleMenu() {
    emit('toggle-menu')
  }
</script>

<style scoped>
  .header-shell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap2);
    width: 100%;
    min-height: 56px;
    padding: 0 var(--gap2);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--gap2);
    width: 100%;
  }

  .header-notification {
    position: relative;
  }

  .header-notification img {
    width: var(--icon-size);
    height: var(--icon-size);
    filter: brightness(0) saturate(100%) invert(80%);
  }

  .header-notification-badge {
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
    color: var(--white);
    font-size: var(--font-xs);
    font-weight: 600;
    border-radius: 9px;
  }

  .header-user {
    display: flex;
    align-items: center;
    gap: calc(var(--gap) * 1.5);
    padding: calc(var(--gap) * 0.5) calc(var(--gap) * 1.5);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    background: transparent;
    color: inherit;
    transition: background var(--transition);
  }

  .header-user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-sm);
    background-color: var(--primary);
    width: var(--icon-size2);
    height: var(--icon-size2);
    border-radius: 50%;
    overflow: hidden;
    aspect-ratio: 1;
    color: var(--white);
  }

  .header-user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-user-info {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 0.5);
  }

  .header-user-name {
    font-size: var(--font-sm);
    font-weight: 600;
    color: var(--font-color);
    line-height: 1;
  }

  .header-user-role {
    font-size: var(--font-xs);
    color: var(--font-color);
    opacity: 0.6;
    line-height: 1;
  }

  .header-menu-toggle {
    display: none;
  }

  .header-menu-icon {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 20px;
  }

  .header-menu-icon span {
    width: 100%;
    height: 2px;
    background-color: var(--font-color);
    border-radius: 2px;
    transition: background var(--transition);
  }

  @media screen and (max-width: 1200px) {
    .header-menu-toggle {
      display: flex;
    }
  }

  @media screen and (max-width: 676px) {
    .header-shell {
      padding: 0 var(--gap);
    }

    .header-actions {
      gap: var(--gap);
    }

    .header-user {
      padding-right: var(--gap);
      padding-left: var(--gap);
    }

    .header-user-info {
      display: none;
    }
  }
</style>
