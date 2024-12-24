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

<script>
export default {
  mounted() {
    const container = document.getElementById("mod_slide");
    const items = container.querySelectorAll(".slide_items");
    const dotIndicators = document.getElementById("slide_dot");
    let initialXPosition = null;
    let currentXPosition = null;
    const dragThreshold = 20; // Minimum drag distance to switch items
    let autoplayInterval = null; // Stores the interval ID
    let autoplayState = true; // `true` for running, `false` for paused, `null` for disabled
    const autoplayDelay = 3000; // Delay between auto-scrolls (in milliseconds)

    // Create dots based on the number of items
    items.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.dataset.index = index;
      dotIndicators.appendChild(dot);
    });

    function setFirstItemActive() {
      items.forEach((item) => item.classList.remove("active"));
      dotIndicators.querySelectorAll(".dot").forEach((dot) => dot.classList.remove("active"));

      items[0].classList.add("active");
      dotIndicators.children[0].classList.add("active");
      container.scrollLeft = 0; // Ensure the first item is visible
    }

    setFirstItemActive();

    const autoplay = () => {
      if (autoplayState !== true) return; // Skip autoplay if not explicitly enabled

      const activeItemIndex = Array.from(items).findIndex((item) => item.classList.contains("active"));
      const newIndex = activeItemIndex + 1 < items.length ? activeItemIndex + 1 : 0;

      const targetItem = items[newIndex];
      if (targetItem) {
        targetItem.scrollIntoView({ behavior: "smooth", inline: "start" });
        items.forEach((item) => item.classList.remove("active"));
        dotIndicators.querySelectorAll(".dot").forEach((dot) => dot.classList.remove("active"));
        targetItem.classList.add("active");
        dotIndicators.children[newIndex].classList.add("active");
      }
    };

    const startAutoplay = () => {
      if (autoplayInterval || autoplayState === null) return; // Skip if interval already exists or autoplay is disabled
      autoplayInterval = setInterval(autoplay, autoplayDelay);
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    };

    const resetAutoplay = () => {
      stopAutoplay();
      if (autoplayState === true) startAutoplay();
    };

    dotIndicators.addEventListener("click", (event) => {
      if (event.target.classList.contains("dot")) {
        const index = parseInt(event.target.dataset.index, 10);
        const targetItem = items[index];

        if (targetItem) {
          targetItem.scrollIntoView({ behavior: "smooth", inline: "start" });
          items.forEach((item) => item.classList.remove("active"));
          dotIndicators.querySelectorAll(".dot").forEach((dot) => dot.classList.remove("active"));
          targetItem.classList.add("active");
          event.target.classList.add("active");
          resetAutoplay();
        }
      }
    });

    // Autoplay control functions
    this.$root.$on("set-autoplay", (state) => {
      if (state === true) {
        autoplayState = true;
        startAutoplay();
      } else if (state === false) {
        autoplayState = false;
        stopAutoplay(); // Pause but keep ready for resuming
      } else if (state === null) {
        autoplayState = null;
        stopAutoplay(); // Fully disable autoplay
      }
    });

    // Start autoplay if initially enabled
    if (autoplayState === true) startAutoplay();
  },
};
</script>

<style scope>
@import url(modslide.css);
</style>
