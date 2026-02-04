<template>
  <Loading v-if="isLoading" />
  <div v-else class="font-container">
    <!-- Font Grid -->
    <div class="font-bookmark">
      <div class="font-family" v-for="font in fonts" :key="font.font_name">
        <div class="font-name" :style="{ fontFamily: font.font_name }">{{ font.font_name }}</div>
        <div class="font-info">
          <div class="font-url">
            {{ font.font_url }}
          </div>
          <div class="copy-btn" @click="copyToClipboard(font.font_url)">
            <img src="https://api.iconify.design/mdi:link-variant.svg" alt="" />
          </div>
        </div>
        <div class="font-info">
          <div class="font-url">
            {{ font.font_family }}
          </div>
          <div class="copy-btn" @click="copyToClipboard(font.font_family)">
            <img src="https://api.iconify.design/mdi:content-copy.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import fontData from "@/assets/data/fontfamily.json";
import { useClipboard } from "@/composables/useClipboard";
import { useLoading } from "@/composables/useLoading";
import Loading from "@/ui/Loading.vue";

const fonts = ref([...fontData]);
const { copyToClipboard } = useClipboard();
const { isLoading } = useLoading(1500);

// Load Google Fonts dynamically
onMounted(() => {
  fonts.value.forEach(loadFont);
});

const loadFont = (font) => {
  const fontName = font.font_name.replace(/ /g, "+");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@100..900&display=swap`;

  if (!document.querySelector(`link[href="${link.href}"]`)) {
    document.head.appendChild(link);
  }
};
</script>

<style scoped>
.font-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap2);
  height: 90vh;
}

.font-bookmark {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--gap2);
  padding: 0 var(--gap2);
  overflow-y: auto;
  flex: 1;
}

.font-family {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding: var(--gap2);
  border-radius: var(--border-radius);
  background: var(--color2);
  border: 1px solid var(--border-color);
  box-shadow: var(--box-shadow);
}

.font-name {
  font-weight: 600;
}

.font-info {
  display: grid;
  grid-template-columns: 1fr var(--icon-size);
  align-items: center;
  background: var(--color3);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.font-url {
  padding: 0 12px;
  height: var(--icon-size);
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
}

.copy-btn img {
  filter: invert(1);
  width: var(--icon-size);
  height: var(--icon-size);
  transform: scale(0.5);
}

@media screen and (max-width: 992px) {
  .font-bookmark {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
