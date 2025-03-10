<style scoped>
@import url("smo-style.css");
</style>
<template>
  <div id="Smo-App">
    <div class="smo-top">
      <img src="/src/smo-app/smo-assets/image/nav-logo.png" />
    </div>
    <div class="smo-mid">
      <div class="section1">
        <div class="pic">
          <img src="" v-auto-alt />
        </div>
        <div class="pic">
          <img src="" v-auto-alt />
        </div>
      </div>

      <div class="section2">
        <div class="smo-header">
          <img src="/src/smo-app/smo-assets/icon/pin.png" alt="" />
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
          <img src="/src/smo-app/smo-assets/icon/pin2.png" alt="" />
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
          <img src="/src/smo-app/smo-assets/icon/star.png" />
          Popular dive site
        </div>
        <div class="popular-slide">
          <div class="pic">
            <img src="" v-auto-alt />
          </div>
          <div class="pic">
            <img src="" v-auto-alt />
          </div>
        </div>
      </div>

      <div class="section4">
        <div class="smo-header">
          <img src="/src/smo-app/smo-assets/icon/fish.png" v-auto-alt />
          Fish identification
        </div>
        <div class="pic">
          <img src="" v-auto-alt />
        </div>
      </div>
    </div>
    <div class="smo-bottom">
      <div class="smo-home-menu">
        <router-link class="smo-home-link" to="/smp-home"><img src="/src/smo-app/smo-assets/icon/home.png" />Home</router-link>
        <router-link class="smo-home-link" to=""><img src="/src/smo-app/smo-assets/icon/dive.png" />Dive</router-link>
        <router-link class="smo-home-link" to=""><img src="/src/smo-app/smo-assets/icon/course.png" />Course</router-link>
        <router-link class="smo-home-link" to=""><img src="/src/smo-app/smo-assets/icon/tips.png" />Tips</router-link>
        <router-link class="smo-home-link" to="/smo-login"><img src="/src/smo-app/smo-assets/icon/log.png" />Log</router-link>
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
