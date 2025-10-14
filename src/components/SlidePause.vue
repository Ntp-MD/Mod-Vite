<template>
  <div class="modquee-parent">
    <div class="modquee-prev nav-btn"><</div>
    <div class="modquee-next nav-btn">></div>
    <div class="modquee-border">
      <div class="modquee-container">
        <div class="_items">
          <div class="_items-child">1</div>
        </div>
        <div class="_items">
          <div class="_items-child">2</div>
        </div>
        <div class="_items">
          <div class="_items-child">3</div>
        </div>
        <div class="_items">
          <div class="_items-child">4</div>
        </div>
        <div class="_items">
          <div class="_items-child">5</div>
        </div>
        <div class="_items">
          <div class="_items-child">6</div>
        </div>
        <div class="_items">
          <div class="_items-child">7</div>
        </div>
        <div class="_items">
          <div class="_items-child">8</div>
        </div>
        <div class="_items">
          <div class="_items-child">9</div>
        </div>
        <div class="_items">
          <div class="_items-child">10</div>
        </div>
      </div>
      <div class="modquee-dots-contain"></div>
    </div>
  </div>
</template>

<style>
.modquee-parent {
  display: grid;
  place-items: center;
  position: relative;
  height: 500px;
  width: 100%;
}

.modquee-border {
  overflow: hidden;
  position: relative;
  display: flex;
  height: 100%;
  width: 95%;
  margin: 0 auto;
}

.modquee-parent .nav-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  height: fit-content;
  width: fit-content;
  margin: auto;
  background: #0ea66b;
  padding: 15px;
  cursor: pointer;
  user-select: none;
}

.modquee-prev {
  left: 0;
}

.modquee-next {
  right: 0;
}

.modquee-container {
  display: flex;
  position: absolute;
  inset: 0;
  width: inherit;
  user-select: none;
}

._items {
  padding: 20px;
  margin: auto;
}

._items > div {
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 25px;
  background: #222;
  box-shadow: 0 4px 18px rgb(0, 0, 0, 0.1);
}

.modquee-dots-contain {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10%;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 2;
}

.modquee-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}

.modquee-dot.active {
  background: #0ea66b;
}
</style>

<script>
// last update 21/7/2025 — merged TrickStepMode and LinearMode
const observer = new MutationObserver(() => {
  const container = document.querySelector(".modquee-border");
  const box = document.querySelector(".modquee-container");
  const dotsContainer = document.querySelector(".modquee-dots-contain");
  if (!container || !box || !dotsContainer) return;

  const slideMode = "TrickStepMode"; // "TrickStepMode" or "LinearMode"
  const itemsToShow = 5;
  const itemsToSlide = 2;
  const waitDuration = 3000;
  const slideDuration = 0.8; // seconds
  const slideSpeed = 100; // px/sec for LinearMode

  const imgs = box.querySelectorAll("img");
  let loaded = 0;
  if (imgs.length === 0) return setup();
  imgs.forEach((img) => {
    if (img.complete) loaded++;
    else img.onload = img.onerror = () => ++loaded === imgs.length && setup();
  });
  if (loaded === imgs.length) setup();

  function setup() {
    const containerWidth = container.clientWidth;
    let boxWidth = box.scrollWidth;

    const originals = [...box.children];
    while (boxWidth < containerWidth * 2) {
      originals.forEach((el) => box.appendChild(el.cloneNode(true)));
      boxWidth = box.scrollWidth;
    }

    slideMode === "LinearMode" ? linearScroll(boxWidth) : trickStep();
    observer.disconnect();
  }

  function trickStep() {
    const items = [...box.children];
    // Calculate item width based on wrapper width and itemsToShow
    const wrapperWidth = container.clientWidth;
    const itemWidth = wrapperWidth / itemsToShow + "px";
    items.forEach((el) => {
      el.style.flex = `0 0 ${itemWidth}`;
      el.style.maxWidth = itemWidth;
    });

    let step = 0;
    if (items.length > itemsToSlide) {
      const r1 = items[0].getBoundingClientRect();
      const r2 = items[itemsToSlide].getBoundingClientRect();
      step = r2.left - r1.left;
    }

    let offset = 0;
    let currentIndex = 0;
    let timer = null;
    const maxIndex = items.length / 2 - itemsToShow;

    // --- Dot indicator setup ---
    const dotCount = Math.ceil((items.length / 2 - itemsToShow) / itemsToSlide) + 1;
    dotsContainer.innerHTML = "";
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.className = "modquee-dot";
      dot.setAttribute("data-dot", i);
      dot.onclick = () => {
        goTo(i * itemsToSlide);
        resetTimer();
      };
      dotsContainer.appendChild(dot);
    }
    function updateDots() {
      const dots = dotsContainer.querySelectorAll(".modquee-dot");
      dots.forEach((dot) => dot.classList.remove("active"));
      const activeIdx = Math.round(currentIndex / itemsToSlide);
      if (dots[activeIdx]) dots[activeIdx].classList.add("active");
    }
    // --- End dot indicator setup ---

    Object.assign(box.style, {
      position: "absolute",
      transition: `transform ${slideDuration}s ease-in-out`,
    });
    container.style.overflow = "hidden";

    function goTo(index) {
      currentIndex = index;
      offset = step * currentIndex;
      box.style.transition = `transform ${slideDuration}s ease-in-out`;
      box.style.transform = `translateX(-${offset}px)`;
      updateDots();
    }

    function next() {
      if (currentIndex < maxIndex) {
        goTo(currentIndex + itemsToSlide);
      } else {
        goTo(0);
      }
      resetTimer();
    }

    function prev() {
      if (currentIndex > 0) {
        goTo(currentIndex - itemsToSlide);
      } else {
        goTo(maxIndex);
      }
      resetTimer();
    }

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        next();
      }, waitDuration + slideDuration * 1000);
    }

    document.querySelector(".modquee-next").onclick = next;
    document.querySelector(".modquee-prev").onclick = prev;

    goTo(0);
    resetTimer();
  }

  function linearScroll(boxWidth) {
    document.querySelectorAll("style[data-marquee]").forEach((el) => el.remove());

    const duration = (boxWidth / slideSpeed).toFixed(2) + "s";

    const style = document.createElement("style");
    style.dataset.marquee = "true";
    style.textContent = `
      @keyborders slideLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${boxWidth}px); }
      }
      @keyborders slideLeftClone {
        0% { transform: translateX(${boxWidth}px); }
        100% { transform: translateX(0); }
      }`;
    document.head.appendChild(style);

    Object.assign(container.style, { position: "relative", overflow: "hidden" });
    Object.assign(box.style, {
      position: "absolute",
      whiteSpace: "nowrap",
      animation: `slideLeft ${duration} linear infinite`,
    });

    const clone = box.cloneNode(true);
    Object.assign(clone.style, {
      position: "absolute",
      whiteSpace: "nowrap",
      transform: `translateX(${boxWidth}px)`,
      animation: `slideLeftClone ${duration} linear infinite`,
    });
    container.appendChild(clone);
  }
});

observer.observe(document.body, { childList: true, subtree: true });
</script>
