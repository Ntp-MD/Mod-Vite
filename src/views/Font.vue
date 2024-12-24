<template>
  <div class="_container">
    <div>font family test</div>

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

<style scoped>
.copy-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  gap: 20px;
}

.copy-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--main-white);
  box-shadow: var(--box-shadow1);
}

.code-block {
  display: grid;
  grid-template-columns: auto 40px;
  align-items: center;
  gap: 10px;
  background-color: var(--main-overlay);
  border-radius: 5px;
  overflow: hidden;
}

.code-content {
  display: grid;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  width: auto;
  padding: 0px 10px;
  user-select: none;
  height: 35px;
}

.copy-button {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: var(--main-color);
  cursor: pointer;
}

.copy-button img {
  object-fit: contain;
  width: 40%;
  filter: invert(1);
}

@media screen and (max-width: 992px) {
  .copy-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  }
}

@media screen and (max-width: 440px) {
  .copy-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
}
</style>
