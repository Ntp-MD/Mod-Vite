<template>
  <div id="app">
    <NavHeader />
    <main>
      <router-view></router-view>
    </main>
    <FooterSection />
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
