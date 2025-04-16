<template>
  <div class="container_slide">
    <div class="title-section">
      <h2>gallery</h2>
    </div>
    <div id="box_slide">
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_26012025ka3n/0/0/1z-z668805100343.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_26012025ka3n/0/0/2z-z1033251447469.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_26012025ka3n/0/0/3z-z752263557884.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>

      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_26012025ka3n/0/0/4z-z57391367113.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_26012025ka3n/0/0/5z-z1355768825409.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>

      <div class="slide_items">
        <div class="slide_img">
          <img src="https://itp1.itopfile.com/ImageServer/z_itp_26012025ka3n/0/0/6z-z1095549849140.jpg" />
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
      const container = document.getElementById("box_slide");
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
