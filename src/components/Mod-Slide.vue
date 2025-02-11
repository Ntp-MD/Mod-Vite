<template>
  <div class="container_slide">
    <div id="mod_slide">
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/1z-z1242807270081.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/2z-z164754116619.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/3z-z1521248311050.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/4z-z1191711380622.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/5z-z1024447302513.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/6z-z476741613997.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
    </div>
    <div id="slide_dot"></div>
  </div>
</template>

<style scope>
@import url("/src/css/mod-slide.css");
</style>

<script>
import modSlide from "@/js/mod-slide.js";

export default {
  mounted() {
    // Initialize the slider when the component is mounted
    this.initializeSlider();
  },
  activated() {
    // Re-initialize the slider if the component is re-activated (for SPA)
    this.initializeSlider();
  },
  beforeDestroy() {
    // Clean up if necessary before the component is destroyed
    modSlide.destroy();
  },
  methods: {
    initializeSlider() {
      // Ensure the required elements are available before initializing the script
      const container = document.getElementById("mod_slide");
      const items = container ? container.querySelectorAll(".slide_items") : [];
      const dotIndicators = container ? document.getElementById("slide_dot") : null;

      if (container && items.length && dotIndicators) {
        // Initialize modSlide if all required elements are available
        modSlide.init();
      }
    },
  },
};
</script>
