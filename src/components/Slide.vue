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

<style scoped>
.container_slide {
  margin: 150px 0 0;
  max-width: 1500px;
  margin: auto;
  min-height: 120vh;
}

.title-section {
  margin: 50px 0;
}

#box_slide {
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 10px;
  height: 30vw;
  min-height: 500px;
  width: 100%;
}

.slide_items {
  scroll-snap-align: center;
  position: relative;
  z-index: 1;
  width: 20%;
  height: 100%;
  transition: 0.3s ease-in-out;
}

.slide_items > div {
  pointer-events: none;
  user-select: none;
}

.slide_items.active {
  width: 50%;
}

.slide_img {
  height: 100%;
}

.slide_img img {
  position: relative;
  z-index: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.slide_items.active .slide_text {
  visibility: visible;
  bottom: 0;
}

.slide_text {
  visibility: hidden;
  position: absolute;
  left: 0;
  z-index: 0;
  width: 100%;
  bottom: -50%;
  padding: 15px;
  background: #000;
  color: #fff;
  transition: 0.3s ease-in-out;
}

#slide_dot {
  display: flex;
  place-content: center;
  gap: 8px;
  width: 100%;
  padding: 15px;
}

.dot {
  width: 15px;
  height: 15px;
  border-radius: 30px;
  background: #000;
  transition: 0.3s;
  cursor: pointer;
}

.dot.active {
  width: 50px;
  background: red;
}

@media screen and (max-width: 992px) {
  .container_slide {
    margin: 20px 0 0;
  }
}

@media screen and (max-width: 440px) {
  .container_slide {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
  }

  #box_slide {
    height: 350px;
    min-height: auto;
  }

  .slide_items {
    position: absolute;
    width: 100%;
    z-index: 0;
    padding-bottom: 60px;
    opacity: 0.1;
    transition: 1.5s ease-in-out;
  }

  .slide_items.active {
    z-index: 1;
    width: 100%;
    opacity: 1;
  }

  .slide_text {
    visibility: visible;
    padding: 10px;
    bottom: 0;
  }
}
</style>

<script>
const modSlide = {
  init() {
    const container = document.getElementById("box_slide");
    if (!container) return; // Ensure the container exists
    const items = container.querySelectorAll(".slide_items");
    const dotIndicators = document.getElementById("slide_dot");
    if (!items.length || !dotIndicators) return; // Ensure items and dots exist

    let initialXPosition = null;
    let currentXPosition = null;
    const dragThreshold = 20; // Minimum drag distance to switch items
    const autoplayDelay = 3000; // Delay between auto-scrolls (in milliseconds)
    let autoplayInterval = null; // Set it to null initially to track if interval is active

    // Create dots based on the number of items
    items.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.dataset.index = index;
      dotIndicators.appendChild(dot);
    });

    // Explicitly set the first item and dot as active
    function setActive(index) {
      items.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });
      dotIndicators.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      items[index].querySelectorAll("a, button, input, textarea, select").forEach((el) => {
        el.addEventListener("focus", (e) => {
          e.preventDefault(); // Prevent default scrolling on focus
        });
      });

      // items[index].scrollIntoView({ behavior: "smooth", inline: "start" });
    }

    // Initialize active state for the first item
    const activeSlide = container.querySelector(".slide_items.active");
    if (!activeSlide) {
      setActive(0); // Only set the first active slide if none is currently active
    }

    // Add click event listener to dots
    dotIndicators.addEventListener("click", (event) => {
      if (event.target.classList.contains("dot")) {
        const index = parseInt(event.target.dataset.index, 10);
        setActive(index);
        resetAutoplay();
      }
    });

    // Handle dragging behavior
    function handleDragEnd() {
      if (initialXPosition !== null && currentXPosition !== null) {
        const dragDistance = currentXPosition - initialXPosition;
        const activeIndex = Array.from(items).findIndex((item) => item.classList.contains("active"));
        let newIndex = activeIndex;

        if (Math.abs(dragDistance) >= dragThreshold) {
          if (dragDistance < 0) {
            newIndex = (activeIndex + 1) % items.length; // Next item or loop back to the first
          } else {
            newIndex = (activeIndex - 1 + items.length) % items.length; // Previous item or loop to the last
          }
          setActive(newIndex);
          resetAutoplay();
        }
      }
      initialXPosition = currentXPosition = null;
    }

    // Event listeners for dragging
    container.addEventListener("mousedown", (e) => {
      initialXPosition = e.clientX;
    });

    container.addEventListener("mousemove", (e) => {
      if (initialXPosition !== null) {
        currentXPosition = e.clientX;
      }
    });

    container.addEventListener("mouseup", handleDragEnd);

    container.addEventListener("touchstart", (e) => {
      initialXPosition = e.touches[0].clientX;
    });

    container.addEventListener("touchmove", (e) => {
      if (initialXPosition !== null) {
        currentXPosition = e.touches[0].clientX;
      }
    });

    container.addEventListener("touchend", handleDragEnd);

    // Enable mouse wheel scrolling with looping

    container.addEventListener("wheel", (e) => {
      e.preventDefault();
      const activeIndex = Array.from(items).findIndex((item) => item.classList.contains("active"));
      let newIndex = activeIndex;

      if (e.deltaY > 0) {
        newIndex = (activeIndex + 1) % items.length; // Next item or loop back to the first
      } else {
        newIndex = (activeIndex - 1 + items.length) % items.length; // Previous item or loop to the last
      }
      setActive(newIndex);
      resetAutoplay();
    });

    // Autoplay functionality
    function autoplay() {
      const activeIndex = Array.from(items).findIndex((item) => item.classList.contains("active"));
      const newIndex = (activeIndex + 1) % items.length; // Next item or loop back to the first
      setActive(newIndex);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(autoplay, autoplayDelay);
    }

    function resetAutoplay() {
      if (autoplayInterval !== null) {
        clearInterval(autoplayInterval); // Clear existing interval if present
      }
      startAutoplay(); // Restart the autoplay with a fresh interval
    }

    // Start autoplay when page loads
    startAutoplay();
  },
  destroy() {
    // Cleanup any active autoplay interval and event listeners
    if (autoplayInterval !== null) {
      clearInterval(autoplayInterval);
    }
    // Any other cleanup logic if necessary
  },
};

window.onload = function () {
  modSlide.init();
};

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
