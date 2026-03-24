<template>
  <ul class="nav-list">
    <li v-for="page in pages" :key="page.path" class="nav-list-item">
      <NuxtLink class="nav-item" :to="page.path" @click="handleLinkClick">
        <span class="nav-icon">
          <img :src="page.icon" :alt="page.label" />
        </span>
        <span class="nav-label">{{ page.label }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  const emit = defineEmits(['close-sidebar'])

  function handleLinkClick() {
    emit('close-sidebar')
  }

  const pages = [
    {
      path: '/font-family-views',
      label: 'Font Family',
      icon: 'https://api.iconify.design/mdi:format-font.svg'
    },
    {
      path: '/smart-widget',
      label: 'Smart Widget',
      icon: 'https://api.iconify.design/mdi:widgets-outline.svg'
    },
    {
      path: '/online-website-views',
      label: 'Online Website',
      icon: 'https://api.iconify.design/mdi:monitor-cellphone.svg'
    },
    {
      path: '/demo-website-views',
      label: 'Demo Website',
      icon: 'https://api.iconify.design/mdi:monitor-multiple.svg'
    },
    {
      path: '/water-ripple',
      label: 'Test Ripple',
      icon: 'https://api.iconify.design/mdi:water.svg'
    },
    {
      path: '/timeline',
      label: 'Timeline',
      icon: 'https://api.iconify.design/mdi:calendar.svg'
    },
    {
      path: '/format',
      label: 'Example',
      icon: 'https://api.iconify.design/mdi:database-refresh-outline.svg'
    },
    {
      path: '/pk-table',
      label: 'Aliment',
      icon: 'https://api.iconify.design/mdi:poker-chip.svg'
    }
  ]
</script>

<style scoped>
  .nav-list {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 0.5);
    list-style: none;
  }

  .nav-list-item {
    display: flex;
  }

  .nav-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--gap2);
    padding: calc(var(--gap) * 1.5) calc(var(--gap2) * 1.5);
    font-weight: 500;
    color: var(--font-color);
    border-radius: var(--border-radius);
    transition: background var(--transition), color var(--transition);
    text-decoration: none;
    overflow: hidden;
  }

  .nav-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background: var(--primary);
    border-radius: 0 2px 2px 0;
    transition: height var(--transition);
  }

  .nav-item:hover {
    background: var(--color3);
    color: var(--primary-hover);
  }

  .nav-item:focus-visible {
    outline: 1px solid var(--primary);
    outline-offset: 2px;
  }

  .nav-item:hover::before {
    height: 60%;
  }

  .nav-item.router-link-active,
  .nav-item.router-link-exact-active {
    background: linear-gradient(90deg, rgba(37, 99, 235, 0.15), transparent);
    color: var(--primary);
    font-weight: 600;
  }

  .nav-item.router-link-active::before,
  .nav-item.router-link-exact-active::before {
    height: 70%;
    background: var(--primary);
  }

  .nav-item.router-link-active .nav-icon,
  .nav-item.router-link-exact-active .nav-icon {
    transform: scale(1.1);
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--icon-size);
    height: var(--icon-size);
    transition: transform var(--transition);
  }

  .nav-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) saturate(100%) invert(80%);
  }

  .light-mode .nav-icon img {
    filter: brightness(0) saturate(100%) invert(35%) sepia(51%) saturate(2125%)
      hue-rotate(203deg) brightness(95%) contrast(97%);
  }

  .nav-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
