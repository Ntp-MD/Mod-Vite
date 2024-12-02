<template>
  <div class="App-layout">
    <aside class="left-section">
      <NavAside></NavAside>
    </aside>
    <section class="mid-section">
      <router-view />
    </section>
    <aside class="right-section">
      <User-profile></User-profile>
      <Widget-mode></Widget-mode>
    </aside>
  </div>
</template>

<style scoped>
aside {
  position: sticky;
  top: 0;
  display: grid;
  height: 100vh;
  background: var(--sub-color);
  box-shadow: var(--box-shadow1);
}

aside.right-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}
</style>
