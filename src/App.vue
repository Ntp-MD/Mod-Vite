<template>
  <div class="dashboard-layout">
    <aside class="left">
      <NavAside></NavAside>
    </aside>
    <div class="dashboard-section">
      <div class="top-section">
        <button>Lorem, ipsum dolor.</button>
        <button>Lorem, ipsum dolor.</button>
        <button>Lorem, ipsum dolor.</button>
        <User-profile></User-profile>
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
      <div class="social-panel">
        <a href=""><img src="@/assets/social/add-post.png" alt="" /></a>
        <a href=""><img src="@/assets/social/camera.png" alt="" /></a>
        <a href=""><img src="@/assets/social/location.png" alt="" /></a>
        <a href=""><img src="@/assets/social/line.png" alt="" /></a>
        <a href=""><img src="@/assets/social/ig.png" alt="" /></a>
      </div>
      <Widget-mode></Widget-mode>
    </aside>
  </div>
</template>
