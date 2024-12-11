<template>
  <div class="head-content">
    <h1>Font Family</h1>
  </div>
  <div class="font-group">
    <div class="font-items">
      <h2>Noto Sans Thai</h2>
      <div id="textToCopy">font-family: "Noto Sans Thai", sans-serif;</div>
      <div class="font-display"><button id="copyButton">Copy</button><span id="copyStatus">Copies to clipboard</span></div>
    </div>
    <div class="font-items">
      <h2>Noto Sans Thai</h2>
      <div id="textToCopy">font-family: "Noto Sans Thai", sans-serif;</div>
      <div class="font-display"><button id="copyButton">Copy</button><span id="copyStatus">Copies to clipboard</span></div>
    </div>
    <div class="font-items">
      <h2>Noto Sans Thai</h2>
      <div id="textToCopy">font-family: "Noto Sans Thai", sans-serif;</div>
      <div class="font-display"><button id="copyButton">Copy</button><span id="copyStatus">Copies to clipboard</span></div>
    </div>
    <div class="font-items">
      <h2>Noto Sans Thai</h2>
      <div id="textToCopy">font-family: "Noto Sans Thai", sans-serif;</div>
      <div class="font-display"><button id="copyButton">Copy</button><span id="copyStatus">Copies to clipboard</span></div>
    </div>
    <div class="font-items">
      <h2>Noto Sans Thai</h2>
      <div id="textToCopy">font-family: "Noto Sans Thai", sans-serif;</div>
      <div class="font-display"><button id="copyButton">Copy</button><span id="copyStatus">Copies to clipboard</span></div>
    </div>
    <div class="font-items">
      <h2>Noto Sans Thai</h2>
      <div id="textToCopy">font-family: "Noto Sans Thai", sans-serif;</div>
      <div class="font-display"><button id="copyButton">Copy</button><span id="copyStatus">Copies to clipboard</span></div>
    </div>
    <div class="font-items">
      <h2>Noto Sans Thai</h2>
      <div id="textToCopy">font-family: "Noto Sans Thai", sans-serif;</div>
      <div class="font-display"><button id="copyButton">Copy</button><span id="copyStatus">Copies to clipboard</span></div>
    </div>
  </div>
</template>

<script>
$(document).ready(function () {
  $("#copyButton").on("click", function () {
    // Get the text to copy
    const text = $("#textToCopy").text();

    // Check if Clipboard API is supported
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // Make the success message visible
          $("#copyStatus").css("visibility", "visible");

          // Hide the message after 2 seconds
          setTimeout(() => {
            $("#copyStatus").css("visibility", "hidden");
          }, 4000);
        })
        .catch((err) => {
          alert("Failed to copy text: " + err);
        });
    } else {
      alert("Clipboard API not supported on this browser.");
    }
  });
});
</script>

<style scoped>
.font-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 20px;
}

.font-items {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 15px;
  background: var(--main-white);
  height: fit-content;
  box-shadow: var(--box-shadow1);
  height: 150px;
}

.font-display {
  display: flex;
  align-items: center;
  gap: 20px;
}

#copyStatus {
  visibility: hidden;
}
</style>
