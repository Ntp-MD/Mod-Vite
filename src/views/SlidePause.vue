<template>
  <div id="modquee">
    <div id="modquee-contain">
      <div class="modquee-items">
        <div>1</div>
      </div>
      <div class="modquee-items">
        <div>2</div>
      </div>
      <div class="modquee-items">
        <div>3</div>
      </div>
      <div class="modquee-items">
        <div>4</div>
      </div>
      <div class="modquee-items">
        <div>5</div>
      </div>
      <div class="modquee-items">
        <div>6</div>
      </div>
      <div class="modquee-items">
        <div>7</div>
      </div>
      <div class="modquee-items">
        <div>8</div>
      </div>
      <div class="modquee-items">
        <div>9</div>
      </div>
    </div>
  </div>
</template>

<style>
#modquee {
  overflow: hidden;
  position: relative;
  display: flex;
  height: 500px;
  width: 100%;
  margin: 0 auto;
}

#modquee-contain {
  display: flex;
  position: absolute;
  inset: 0;
  width: inherit;
  user-select: none;
}

.modquee-items {
  padding: 20px;

  margin: auto;
}

.modquee-items > div {
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 25px;
  background: #222;
  box-shadow: 0 4px 18px rgb(0, 0, 0, 0.1);
}
</style>

<script>
// last update 21/7/2025 — merged TrickStepMode and LinearMode
const observer = new MutationObserver(() => {
  const container = document.querySelector("#modquee");
  const box = document.querySelector("#modquee-contain");
  if (!container || !box) return;

  const slideMode = "TrickStepMode"; // "TrickStepMode" or "LinearMode"
  const itemsToShow = 5;
  const itemsToSlide = 2;
  const waitDuration = 3000;
  const slideDuration = 1; // seconds
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
    items.forEach((el) => (el.style.flex = `0 0 calc(100% / ${itemsToShow})`));

    let step = 0;
    if (items.length > itemsToSlide) {
      const r1 = items[0].getBoundingClientRect();
      const r2 = items[itemsToSlide].getBoundingClientRect();
      step = r2.left - r1.left;
    }

    let offset = 0;
    Object.assign(box.style, {
      position: "absolute",
      transition: `transform ${slideDuration}s ease-in-out`,
    });
    container.style.overflow = "hidden";

    setInterval(() => {
      offset += step;
      if (offset >= box.scrollWidth / 4) {
        offset = 0;
        box.style.transition = "none";
        box.style.transform = `translateX(0)`;
        requestAnimationFrame(() => {
          void box.offsetWidth;
          box.style.transition = `transform ${slideDuration}s ease-in-out`;
          box.style.transform = `translateX(-${step}px)`;
          offset = step;
        });
      } else {
        box.style.transform = `translateX(-${offset}px)`;
      }
    }, waitDuration + slideDuration * 1000);
  }

  function linearScroll(boxWidth) {
    document.querySelectorAll("style[data-marquee]").forEach((el) => el.remove());

    const duration = (boxWidth / slideSpeed).toFixed(2) + "s";

    const style = document.createElement("style");
    style.dataset.marquee = "true";
    style.textContent = `
      @keyframes slideLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${boxWidth}px); }
      }
      @keyframes slideLeftClone {
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
