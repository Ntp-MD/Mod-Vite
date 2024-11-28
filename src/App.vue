<template>
  <toggle-mode />
  <div class="dashboard-layout">
    <nav-side />

    <div class="dashboard-content">
      <router-view />
      <div class="top-content">
        <div class="search-box">
          <input type="search" />
          <div class="search-icon">
            <img src="@/assets/dashboard/search.png" alt="" width="100%" />
          </div>
        </div>
        <button>Lorem, ipsum dolor.</button>
      </div>
      <img src="@/assets/images/mock-panel.png" alt="" width="100%" />
    </div>
  </div>
</template>

<style scoped>
@import url("@/css/dashboard");
</style>
