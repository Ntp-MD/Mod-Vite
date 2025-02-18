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
    let autoplayInterval = null;

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
    /*
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
  */

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
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    // Start autoplay when page loads
    startAutoplay();
  },
  destroy() {
    // Cleanup any active autoplay interval and event listeners
    clearInterval(autoplayInterval);
    // Any other cleanup logic if necessary
  },
};

window.onload = function () {
  modSlide.init();
};

export default modSlide;
