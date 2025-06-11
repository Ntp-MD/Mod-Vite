<template>
  <div id="modquee">
    <div id="modquee-contain">
      <div class="modquee-items">
        <img src="https://itp1.itopfile.com/Images/photos/no-image.jpg" alt="" />
      </div>
      <div class="modquee-items">
        <img src="https://itp1.itopfile.com/Images/photos/no-image.jpg" alt="" />
      </div>
      <div class="modquee-items">
        <img src="https://itp1.itopfile.com/Images/photos/no-image.jpg" alt="" />
      </div>
      <div class="modquee-items">
        <img src="https://itp1.itopfile.com/Images/photos/no-image.jpg" alt="" />
      </div>
      <div class="modquee-items">
        <img src="https://itp1.itopfile.com/Images/photos/no-image.jpg" alt="" />
      </div>
      <div class="modquee-items">
        <img src="https://itp1.itopfile.com/Images/photos/no-image.jpg" alt="" />
      </div>
      <div class="modquee-items">
        <img src="https://itp1.itopfile.com/Images/photos/no-image.jpg" alt="" />
      </div>
      <div class="modquee-items">
        <img src="https://itp1.itopfile.com/Images/photos/no-image.jpg" alt="" />
      </div>
      <div class="modquee-items">
        <img src="https://itp1.itopfile.com/Images/photos/no-image.jpg" alt="" />
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
}

.modquee-items {
  padding: 20px;
  aspect-ratio: 1;
  height: auto;
  width: auto;
  min-width: auto;
  margin: auto;
  border-radius: 25px;
  box-shadow: 0 4px 18px rgb(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>

<script>
const observer = new MutationObserver(() => {
  const container = document.querySelector("#modquee");
  const box = document.querySelector("#modquee-contain");
  if (!container || !box) return;

  const itemsToSlide = 5;
  const pauseDuration = 3000;
  const slideDuration = 1000;

  const imgs = box.querySelectorAll("img");
  let loaded = 0;
  imgs.forEach((img) => {
    if (img.complete) loaded++;
    else
      img.onload = img.onerror = () => {
        if (++loaded === imgs.length) setup();
      };
  });
  if (loaded === imgs.length) setup();

  function setup() {
    const itemElements = Array.from(box.children);
    while (box.scrollWidth < container.clientWidth * 2) {
      itemElements.forEach((item) => box.appendChild(item.cloneNode(true)));
    }

    const items = Array.from(box.children);
    items.forEach((item) => {
      item.style.flex = `0 0 calc(100% / ${itemsToSlide})`;
    });

    let step = 0;
    if (items.length > itemsToSlide) {
      const rect1 = items[0].getBoundingClientRect();
      const rect2 = items[itemsToSlide].getBoundingClientRect();
      step = rect2.left - rect1.left;
    }

    let offset = 0;
    box.style.position = "absolute";
    box.style.transition = `transform ${slideDuration}ms ease`;
    container.style.overflow = "hidden";

    const slide = () => {
      offset += step;
      if (offset >= box.scrollWidth / 2) {
        offset = 0;
        box.style.transition = "none";
        box.style.transform = `translateX(0)`;
        requestAnimationFrame(() => {
          void box.offsetWidth;
          box.style.transition = `transform ${slideDuration}ms ease`;
          requestAnimationFrame(() => {
            offset += step;
            box.style.transform = `translateX(-${offset}px)`;
          });
        });
      } else {
        box.style.transform = `translateX(-${offset}px)`;
      }
    };

    setInterval(slide, pauseDuration + slideDuration);
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
</script>
