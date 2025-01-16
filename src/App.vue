<template>
  <div id="AppClient">
    <header>
      <NavHeader />
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <FooterSection />
    </footer>
  </div>


</template>

<style scoped>
@import url("@/css/app.css");

#AppClient {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 70px;
}


main {
  position: relative;
  overflow: hidden;
}


footer {
  min-height: 300px;
}
</style>
