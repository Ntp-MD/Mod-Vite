<template>
  <div id="app">
    <NavHeader />
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<style scoped>
@import url("@/css/app.css");

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
