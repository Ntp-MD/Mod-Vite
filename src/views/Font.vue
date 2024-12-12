<template>
  <caption>
    font family
  </caption>
  <div class="copy-group">
    <div class="copy-items" v-for="font in fonts" :key="font.font_name">
      <h2>{{ font.font_name }}</h2>
      <div class="code-block">
        <div class="code-content">
          {{ font.font_family }}
        </div>
        <div class="copy-button" @click="copyToClipboard(font.font_family)"><img src="@img/icons/link.png" alt="" /></div>
      </div>
      <div class="code-block">
        <div class="code-content">
          {{ font.font_url }}
        </div>
        <div class="copy-button" @click="copyToClipboard(font.font_url)"><img src="@img/icons/link.png" alt="" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import fontData from "@/data/font-family.json";

export default {
  methods: {
    copyToClipboard(textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert(`${textToCopy} copied to clipboard!`);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    },
  },
  data() {
    return {
      fonts: fontData,
    };
  },
};
</script>

<style scoped></style>
