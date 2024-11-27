<script>
import NavSide from "./components/nav-side.vue";

export default {
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
</style>
