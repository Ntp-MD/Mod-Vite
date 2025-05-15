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
    </div>
  </div>
</template>

<style>
#modquee {
  overflow: hidden;
  position: relative;
  display: flex;
  height: 200px;
  width: 100%;
  margin: 0 auto;
}
#modquee-contain {
  display: flex;
  position: absolute;
  inset: 0;
}

.modquee-items {
  padding: 20px;
  aspect-ratio: 1;
  height: 200px;
  width: 200px;
  min-width: 10vw;
}
.modquee-items img {
  border-radius: 10px;
  width: 100%;
}

#modquee-contain {
  display: flex;
}
</style>

<script>
const observer = new MutationObserver(() => {
  const container = document.querySelector("#modquee");
  const box = document.querySelector("#modquee-contain");
  if (!container || !box) return;

  // Speed setting (pixels per second)
  const speed = 100;

  // Wait for all images to load
  const imgs = box.querySelectorAll("img");
  let loaded = 0;
  imgs.forEach((img) => {
    if (img.complete) loaded++;
    else
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === imgs.length) setup();
      };
  });
  if (loaded === imgs.length) setup();

  function setup() {
    // Ensure content width exceeds container
    const containerWidth = container.clientWidth;
    let boxWidth = box.scrollWidth;

    while (boxWidth < containerWidth * 2) {
      const clone = box.cloneNode(true);
      clone.querySelectorAll("img").forEach((img) => (img.loading = "lazy"));
      box.appendChild(...clone.childNodes); // copy items, not nested div
      boxWidth = box.scrollWidth;
    }

    const duration = boxWidth / speed + "s"; // Speed control

    // Remove old keyframes if any
    document.querySelectorAll("style[data-marquee]").forEach((el) => el.remove());

    // Inject keyframes
    const style = document.createElement("style");
    style.setAttribute("data-marquee", "true");
    style.innerHTML = `
      @keyframes slideLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${boxWidth}px); }
      }
      @keyframes slideLeftClone {
        0% { transform: translateX(${boxWidth}px); }
        100% { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);

    // Style container and box
    Object.assign(container.style, {
      position: "relative",
      overflow: "hidden",
    });

    Object.assign(box.style, {
      position: "absolute",
      left: "0",
      top: "0",
      whiteSpace: "nowrap",
      zIndex: "1",
      animation: `slideLeft ${duration} linear infinite`,
    });

    // Clone and animate second set
    const animClone = box.cloneNode(true);
    Object.assign(animClone.style, {
      position: "absolute",
      left: "0",
      top: "0",
      whiteSpace: "nowrap",
      zIndex: "2",
      transform: `translateX(-${boxWidth}px)`,
      animation: `slideLeftClone ${duration} linear infinite`,
    });
    container.appendChild(animClone);

    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
</script>
