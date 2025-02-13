<template>
  <div class="container_slide">
    <div id="mod_slide">
      <div class="slide_items">
        <div class="slide_img">
          <img src="/src/assets/beach/2.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="/src/assets/beach/3.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="/src/assets/beach/4.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="/src/assets/beach/6.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="/src/assets/beach/7.jpg" />
        </div>
        <div class="slide_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sint.</div>
      </div>
      <div class="slide_items">
        <div class="slide_img">
          <img src="/src/assets/beach/8.jpg" />
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
