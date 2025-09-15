<template>
  <div class="Quick_access">
    <router-link class="Quick_menu" to="/">
      <div class="Quick_menu_text">Dashboard</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/dashboard.png" alt="" />
      </div>
    </router-link>

    <router-link class="Quick_menu" to="/OnlinePromotion">
      <div class="Quick_menu_text">Online Promotion</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/website.png" alt="" />
      </div>
    </router-link>

    <router-link class="Quick_menu" to="/DemoWebsite">
      <div class="Quick_menu_text">Demo Website</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/demo.png" alt="" />
      </div>
    </router-link>

    <router-link class="Quick_menu" to="/SmartWidget">
      <div class="Quick_menu_text">Smart Widget</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/widget.png" alt="" />
      </div>
    </router-link>

    <router-link class="Quick_menu" to="/FontDisplay">
      <div class="Quick_menu_text">Font Family</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/font.png" alt="" />
      </div>
    </router-link>

    <router-link class="Quick_menu" to="/SlidePause">
      <div class="Quick_menu_text">Slide Pause</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/slide.png" alt="" />
      </div>
    </router-link>

    <router-link class="Quick_menu" to="/Map">
      <div class="Quick_menu_text">World Map</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/map.png" alt="" />
      </div>
    </router-link>

    <router-link class="Quick_menu" to="/Table">
      <div class="Quick_menu_text">Table</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/dashboard.png" alt="" />
      </div>
    </router-link>

    <router-link class="Quick_menu" to="/Countdown">
      <div class="Quick_menu_text">Countdown</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/countdown.png" alt="" />
      </div>
    </router-link>

    <router-link class="Quick_menu" to="/Free">
      <div class="Quick_menu_text">Free</div>
      <div class="Quick_menu_img">
        <img src="/src/assets/icon/dashboard.png" alt="" />
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.Quick_access {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(180px, 30%, 300px), 1fr));
  gap: var(--gap);
  margin: auto;
}

.Quick_menu {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--border-radius);
  background: var(--sub-color);
  width: 100%;
  min-height: clamp(250px, 15vw, 270px);
  aspect-ratio: 4/2;
}

.Quick_menu_text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--sub-color2);
  padding: var(--gap);
}

.Quick_menu_text:after {
  content: "<>";
  display: block;
  color: var(--font-color);
  font-size: inherit;
}

.Quick_menu_img {
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.Quick_menu_img img {
  margin: auto;
  aspect-ratio: 1;
  object-fit: contain;
  width: clamp(100px, 35%, 130px);
  filter: invert(0.7);
  transition: 0.3s;
}

.Quick_menu_img:hover > img {
  transform: translateY(-10px);
  filter: invert(1);
}
</style>
