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
            <img src="/src/assets/dashboard/search.png" alt="" width="100%" />
          </div>
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
}

.top-content {
  display: flex;
  justify-content: end;
}

.search-box {
  display: flex;
  align-items: center;
  position: relative;
}

.search-box input {
  width: 15vw;
  border-radius: 30px;
  height: 100%;
  border: 2px solid var(--color3);
  padding-left: 15px;
}
.search-box input:focus {
  outline: none;
}

.search-icon {
  display: grid;
  place-items: center;
  position: relative;
  right: 12%;
  background: var(--color3);
  border-radius: 50%;
  padding: 5px;
  height: 20px;
  width: 20px;
}

.search-icon img {
  width: 80%;
  filter: invert(1);
}
</style>
