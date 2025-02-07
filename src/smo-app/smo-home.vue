<style scoped>
@import url("smo-style.css");
</style>
<template>
  <div id="Smo-App">
    <div class="smo-screen smo-assets">
      <div class="smo-top">
        <img src="/src/smo-app/smo-assets/logo/nav-logo.png" v-auto-alt />
      </div>
      <div class="smo-mid">
        <div class="section1">
          <div class="pic">
            <img src="/src/smo-app/smo-assets/image/home1.png" v-auto-alt />
          </div>
          <div class="pic">
            <img src="/src/smo-app/smo-assets/image/home2.png" v-auto-alt />
          </div>
        </div>

        <div class="section2">
          <div class="smo-header">
            <img src="/src/smo-app/smo-assets/icon/location-pin.png" alt="" />
            Choose location
          </div>
          <div class="checkbox-location">
            <div class="checkbox-items">
              <input type="checkbox" id="location1" name="location1" value="location1" />
              <label for="location1">Southern</label>
            </div>
            <div class="checkbox-items">
              <input type="checkbox" id="location1" name="location1" value="location1" />
              <label for="location1">Eastern</label>
            </div>
            <div class="checkbox-items">
              <input type="checkbox" id="location1" name="location1" value="location1" />
              <label for="location1">Western</label>
            </div>
            <div class="checkbox-items">
              <input type="checkbox" id="location1" name="location1" value="location1" />
              <label for="location1">Central</label>
            </div>
            <div class="checkbox-items">
              <input type="checkbox" id="location1" name="location1" value="location1" />
              <label for="location1">Northern</label>
            </div>
            <div class="checkbox-items">
              <input type="checkbox" id="location1" name="location1" value="location1" />
              <label for="location1">Northeastern</label>
            </div>
          </div>

          <div class="smo-header">
            <img src="/src/smo-app/smo-assets/icon/location-map.png" alt="" />
            Choose Province
          </div>
          <div class="smo-select">
            <select id="province" v-model="selectedProvince">
              <option value="" disabled selected>Select a province</option>
              <option v-for="province in provinces" :key="province" :value="province">
                {{ province }}
              </option>
            </select>
          </div>
        </div>

        <div class="section3">
          <div class="smo-header">
            <img src="/src/smo-app/smo-assets/icon/star.png" alt="" />
            Popular dive site
          </div>
          <div class="popular-slide">
            <div class="pic">
              <img src="/src/smo-app/smo-assets/image/poppular-site1.png" v-auto-alt />
            </div>
            <div class="pic">
              <img src="/src/smo-app/smo-assets/image/poppular-site1.png" v-auto-alt />
            </div>
          </div>
        </div>

        <div class="section4">
          <div class="smo-header">
            <img src="/src/smo-app/smo-assets/icon/fish2.png" v-auto-alt />
            Fish identification
          </div>
          <div class="pic">
            <img src="/src/smo-app/smo-assets/image/fish-identify.png" v-auto-alt />
          </div>
        </div>
      </div>

      <div class="smo-bottom">
        <div class="smo-assets-menu">
          <router-link class="smo-assets-link" to=""><img src="/src/smo-app/smo-assets/icon/home.png" />Home</router-link>
          <router-link class="smo-assets-link" to=""><img src="/src/smo-app/smo-assets/icon/dive.png" />Dive</router-link>
          <router-link class="smo-assets-link" to=""><img src="/src/smo-app/smo-assets/icon/course.png" />Course</router-link>
          <router-link class="smo-assets-link" to=""><img src="/src/smo-app/smo-assets/icon/tips.png" />Tips</router-link>
          <router-link class="smo-assets-link" to="/smo-login"><img src="/src/smo-app/smo-assets/icon/log.png" />Log</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import provinceData from "@/data/province.json";

export default {
  data() {
    return {
      selectedProvince: "",
      provinces: provinceData,
    };
  },
  methods: {},
};
</script>

<style scoped>
.smo-screen.smo-assets {
  background-image: unset !important;
}

.smo-assets {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  gap: 0;
}

.smo-assets img {
  object-fit: contain;
}

.smo-assets .smo-top {
  position: sticky;
  top: 0;
  background: #0c4a60;
  height: fit-content;
  display: grid;
  place-items: center;
  padding: 5px 0;
  z-index: 1;
}

.smo-top img {
  width: 110px;
}

.smo-mid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding: 10px 20px;
  overflow-x: scroll;
  padding-bottom: 200px;
}

.smo-mid > div {
  display: grid;
  gap: 20px;
}

.section1 {
  gap: 5px !important;
}

.smo-bottom {
  position: fixed;
  bottom: 0;
  background: #fff;
  height: fit-content;
  width: 100%;
  z-index: 1;
}

.smo-assets-menu {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: #0c4a60;
  height: 100%;
}

.smo-assets-menu a {
  display: grid;
  place-items: center;
  gap: 2px;
  padding: 10px 0 5px;
  color: #fff;
  font-weight: 300;
  font-size: 12px;
  height: 100%;
}

.smo-assets-menu a:first-child {
  background: #ef6c33;
}

.pic {
  overflow: hidden;
  border-radius: 8px;
  height: fit-content;
}

.smo-assets-menu img {
  aspect-ratio: 1;
  width: 22px;
  object-fit: contain;
}

.smo-header {
  display: grid;
  grid-template-columns: 25px auto;
  align-items: center;
  color: #0c4a60;
  font-weight: 600;
  font-size: 20px;
  gap: 8px;
}

.checkbox-location {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: #0c4a60;
}

.smo-assets select {
  outline: none;
  padding-left: 5px;
  border: 1px solid #0c4a60 !important;
}

.checkbox-items {
  display: grid;
  grid-template-columns: 20px auto;
  align-items: center;
  gap: 8px;
}

.checkbox-items input {
  margin: 0;
}

.popular-slide {
  display: flex;
  gap: 10px;
  overflow-y: scroll;
  white-space: nowrap;
}

.popular-slide .pic {
  overflow: unset;
}

.popular-slide img {
  aspect-ratio: 12/8;
  border-radius: 8px;
  width: auto;
  object-fit: fill;
}
</style>
