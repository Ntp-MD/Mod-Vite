<script>
import NavHeader from "./components/nav-header.vue";
import NavSide from "./components/nav-side.vue";

export default {
  components: {
    NavHeader,
  },
  components: {
    NavSide,
  },
};
</script>

<template>
  <div class="dashboard-layout">
    <nav-side />
    <div class="dashboard-content">
      <router-view />
      <div class="top">
        <div class="search-box">
          <input type="search" />
        </div>
        <button>Lorem, ipsum dolor.</button>
      </div>
      <img src="/src/assets/images/mock-panel.png" alt="" width="100%" />
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: 18% auto;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  padding: 2vw 5vw 5vw 2vw;
  background: #f5f5f5;
  & .top {
    display: flex;
    justify-content: end;
    float: right;
  }
}

.toggle-mode {
  cursor: pointer;
  position: fixed;
  top: 40%;
  right: 10px;
}

.bg-toggle {
  position: relative;
  display: grid;
  place-items: center;
  width: 35px;
  aspect-ratio: 2/5;
  background-image: url(/src/assets/icon/bg-day.png);
  background-size: cover;
  background-repeat: no-repeat;
  border: 2px solid #ccc;
  border-radius: 30px;
}

body.dark-mode .bg-toggle {
  background-image: url(/src/assets/icon/bg-night.png) !important;
  border: 2px solid var(--color2);
}

.icon-toggle {
  background-image: url(/src/assets/icon/sun.png);
  background-size: cover;
  background-repeat: no-repeat;
  transform: translateY(-90%);
  height: 25px;
  aspect-ratio: 1;
  transition: 0.5s;
  border-radius: 50%;
}

body.dark-mode .icon-toggle {
  background-image: url(/src/assets/icon/moon.png);
  transform: translateY(90%);
}
</style>
