<template>
  <div id="app">
    <NavHeader />
    <section>
      <router-view></router-view>
    </section>
    <FooterSection />
  </div>
</template>
<style scoped>
@import url("@/style/app.css");

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
