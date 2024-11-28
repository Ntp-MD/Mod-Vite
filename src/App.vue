<template>
  <div class="dashboard-layout">
    <aside class="left">
      <Nav-aside />
    </aside>
    <div class="dashboard-section">
      <div class="top-section">
        <div class="head-page">
          <h1>Main Panel</h1>
        </div>
        <button>Lorem, ipsum dolor.</button>
        <button>Lorem, ipsum dolor.</button>
        <button>Lorem, ipsum dolor.</button>
      </div>
      <div class="mid-section">
        <router-view />
        <div class="mockup grid3">
          <div class="box type1"></div>
          <div class="box type1"></div>
          <div class="box type1"></div>
        </div>
        <div class="mockup">
          <div class="box type2"></div>
        </div>
        <div class="mockup grid2">
          <div class="box type1"></div>
          <div class="box type1"></div>
        </div>
      </div>
      <div class="bottom-section"></div>
    </div>
    <aside class="right">
      <Widget-mode />
    </aside>
  </div>
</template>
