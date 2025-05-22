<style>
@import url(/src/css/NavTab.css);

#NavAside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--ui-bg1);
  color: #fff;
  height: 100%;
}

#NavAside a {
  text-transform: unset;
  color: #fff;
}

.NavAsideTop {
  border-top: 1px solid #444;
  border-bottom: 1px solid #444;
  text-align: left;
  padding: 15px;
}

.NavAsideMid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 15px;

  height: -webkit-fill-available;
}

.NavAsideBottom {
  text-align: left;
  padding: 15px;
}
</style>

<template>
  <div id="NavAside">
    <div class="NavAsideTop">Dashboard</div>
    <div class="NavAsideMid">
      <router-link class="nav-menu-link" to="/" @click="closeMenu">Font Family</router-link>
      <router-link class="nav-menu-link" to="/OnlineTrack" @click="closeMenu">Online Track</router-link>
      <router-link class="nav-menu-link" to="/ListDemo" @click="closeMenu">List Demo</router-link>
      <router-link class="nav-menu-link" to="/blank" @click="closeMenu">Calendar</router-link>
      <router-link class="nav-menu-link" to="/blank" @click="closeMenu">Peference </router-link>
      <router-link class="nav-menu-link" to="/blank" @click="closeMenu">Setting</router-link>
    </div>
    <div class="NavAsideBottom">Version 1.0.0</div>
  </div>
</template>

<script>
export default {
  data: () => ({ isMenuOpen: false }),
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (!this.$refs.NavMenu.contains(e.target) && !this.$refs.navToggle.contains(e.target)) {
        this.isMenuOpen = false;
      }
    });
  },
};
</script>
