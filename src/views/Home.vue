<template>
  <div class="height"></div>
  <div class="value plus" data-start="0" data-stop="200" data-value="200">200</div>
  <section id="home-about" class="container">
    <div class="grid-default">
      <div class="grid-image">
        <img src="/src/assets/images/1.jpg" alt="" />
      </div>
      <div class="grid-content">
        <h1>Lorem ipsum</h1>
        <h1>dolor sit amet Suscipit</h1>
        <div class="grid-content-block">
          Completely remodeled and new for 2017, the new management is bringing you a Playa Pool Club facility with all the amenities and more of a
          private club, but without the expensive bond to join. Explore our membership options, see upcoming events, and view our gallery to learn
          more about the plans for our new facility.
        </div>
      </div>
    </div>
  </section>
  <div class="height"></div>
</template>

<style>
.height {
  min-height: 1000px;
}

#home-about .grid-image img {
  box-shadow: 30px 30px 0 #000;
}

.value.plus {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.value.plus::after {
  content: "+";
}
</style>

<script>
// lasted 11/4/2025
$(document).ready(function () {
  function ModNumberRun(obj, start, end, duration, options = {}) {
    const { decimals = false, decimalPlaces = 2 } = options;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      let value = progress * (end - start) + start;

      obj.innerHTML = Math.floor(value).toLocaleString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        if (decimals) {
          value = value.toFixed(decimalPlaces);
        } else {
          value = Math.floor(value);
        }
        obj.innerHTML = parseFloat(value).toLocaleString();
        onComplete();
      }
    };

    window.requestAnimationFrame(step);
  }

  const elements = document.querySelectorAll(".value");
  let animatedElements = new Map();
  let lastScrollTop = window.pageYOffset;

  function getScrollDirection() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const direction = st > lastScrollTop ? "up" : "down";
    lastScrollTop = st <= 0 ? 0 : st;
    return direction;
  }

  function handleScroll() {
    const direction = getScrollDirection();

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      const animationState = animatedElements.get(element) || { animated: false };
      const triggerDown = direction === "down" && elementTop >= 0 && elementTop <= windowHeight * 0.5;
      const triggerUp = direction === "up" && elementBottom <= windowHeight && elementBottom >= windowHeight * 0.5;

      if ((triggerDown || triggerUp) && !animationState.animated) {
        const startValue = parseFloat(element.getAttribute("data-start") || 0);
        const endValue = parseFloat(element.getAttribute("data-stop") || element.getAttribute("data-value"));
        const options = {
          decimals: element.getAttribute("data-decimals") !== "false",
          decimalPlaces: parseInt(element.getAttribute("data-places")) || 2,
        };

        ModNumberRun(element, startValue, endValue, 1500, options);
        animationState.animated = true;
      } else if (!triggerDown && !triggerUp) {
        animationState.animated = false; // Allow re-animation if needed
      }

      animatedElements.set(element, animationState);
    });
  }

  $(window).scroll(handleScroll);

  $(window).on("load", function () {
    animatedElements.clear();
    lastScrollTop = window.pageYOffset;
    handleScroll(); // Initial check
  });
});
</script>
