<style scope>
@import url("/src/css/mod-quee.css");
</style>

<template>
  <div class="modquee-contanier">
    <div class="modquee-box box1"></div>
  </div>

  <div class="modquee-contanier">
    <div class="modquee-box box2"></div>
  </div>
</template>

<script>
const imageUrls = [
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
];

const imageUrls2 = [
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
  "https://itp1.itopfile.com/Images/photos/no-image.jpg",
];
const observer = new MutationObserver((mutationsList, observer) => {
  const modqueeContainer1 = document.querySelector(".modquee-contanier .box1");
  const modqueeContainer2 = document.querySelector(".modquee-contanier .box2");

  if (modqueeContainer1 && modqueeContainer2) {
    // Function to append images to a given element
    const appendImages = (element, urls) => {
      urls.forEach((url) => {
        const modqueeItems = document.createElement("div");
        modqueeItems.classList.add("modquee-items");
        const img = document.createElement("img");
        img.src = url;
        img.alt = "";
        modqueeItems.appendChild(img);
        element.appendChild(modqueeItems);
      });
    };

    // Append images to the original modquee-box
    appendImages(modqueeContainer1, imageUrls);
    appendImages(modqueeContainer2, imageUrls2);

    const cloneCount = 1;

    for (let i = 0; i < cloneCount; i++) {
      const clonedContent1 = modqueeContainer1.cloneNode(true);
      clonedContent1.classList.add("cloned");
      modqueeContainer1.parentElement.appendChild(clonedContent1);

      const clonedContent2 = modqueeContainer2.cloneNode(true);
      clonedContent2.classList.add("cloned");
      modqueeContainer2.parentElement.appendChild(clonedContent2);
    }

    // Stop observing once the desired elements are found and cloned
    observer.disconnect();
  }
});

// Start observing the entire document for changes
observer.observe(document.body, { childList: true, subtree: true });
</script>
