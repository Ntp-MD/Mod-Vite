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
      }
    };

    window.requestAnimationFrame(step);
  }

  const elements = document.querySelectorAll(".value");
  let animatedElements = new Map();

  // Function to get scroll trigger values based on screen width
  function getScrollTriggerRange() {
    const width = window.innerWidth;

    if (width < 576) {
      return { start: 5, end: 20 }; // Mobile
    } else if (width < 992) {
      return { start: 15, end: 35 }; // Tablet
    } else {
      return { start: 15, end: 35 }; // Desktop
    }
  }

  $(window).scroll(function () {
    const { start: scrollTriggerStartPercentage, end: scrollTriggerEndPercentage } = getScrollTriggerRange();

    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height();
    const winHeight = $(window).height();
    const scrollPercentage = (scrollTop / (docHeight - winHeight)) * 100;

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isElementInView = elementTop < window.innerHeight && elementBottom >= 0;

      let animationState = animatedElements.get(element);
      if (animationState === undefined) {
        animationState = { animated: false };
      }

      if (scrollPercentage >= scrollTriggerStartPercentage && scrollPercentage <= scrollTriggerEndPercentage && isElementInView) {
        if (!animationState.animated) {
          const startValue = parseFloat(element.getAttribute("data-start") || 0);
          const endValue = parseFloat(element.getAttribute("data-stop") || element.getAttribute("data-value"));
          const options = {
            decimals: element.getAttribute("data-decimals") !== "false",
            decimalPlaces: parseInt(element.getAttribute("data-places")) || 2,
          };

          ModNumberRun(element, startValue, endValue, 1500, options);
          animationState.animated = true;
        }
      } else {
        animationState.animated = false;
      }

      animatedElements.set(element, animationState);
    });
  });

  $(window).on("load", function () {
    animatedElements.clear();
  });
});
