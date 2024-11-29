<template>
  <div class="App-layout">
    <aside class="left-section">
      <NavAside></NavAside>
    </aside>
    <section class="mid-section">
      <router-view />
    </section>
    <aside class="right-section">
      <Widget-mode></Widget-mode>
    </aside>
  </div>
</template>
