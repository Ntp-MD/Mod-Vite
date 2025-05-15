<template>
  <div>
    <div class="itp-work" v-if="displayedFiles.length > 0">
      <div
        v-for="file in displayedFiles"
        :key="file.path"
        :class="[
          'file-entry',
          {
            'js-file': file.path.endsWith('.js'),
            'css-file': file.path.endsWith('.css'),
            'html-file': file.path.endsWith('.html'),
          },
        ]"
      >
        <div class="file-header">
          <div class="file-name">{{ getFilenameWithoutExtension(file.path) }}</div>
        </div>
        <pre class="file-content">{{ file.content }}</pre>
      </div>
    </div>
    <div v-else>
      <p>No files found in the /ITP/ directory.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const allFilesRaw = import.meta.glob("/ITP/**", { eager: true, as: "raw" });

const fileList = ref(Object.entries(allFilesRaw).map(([path, content]) => ({ path, content })));

const savedOrder = (() => {
  try {
    const stored = localStorage.getItem("itpViewerFileOrder");
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
})();

const getFilenameWithoutExtension = (filePath) => {
  const filename = filePath.split("/").pop() || "";
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex > 0 ? filename.slice(0, dotIndex) : filename;
};

const displayedFiles = ref([]);

const sortFiles = (files, order) => {
  const orderMap = new Map(order.map((p, i) => [p, i]));
  return [...files].sort((a, b) => {
    const iA = orderMap.get(a.path),
      iB = orderMap.get(b.path);
    if (iA !== undefined && iB !== undefined) return iA - iB;
    if (iA !== undefined) return -1;
    if (iB !== undefined) return 1;
    return a.path.localeCompare(b.path);
  });
};

watchEffect(() => {
  displayedFiles.value = sortFiles(fileList.value, savedOrder);
});
</script>

<style scoped>
.itp-work {
  column-count: 3;
}

.file-entry {
  display: inline-block;
  width: 100%;
  font-size: 12px;
  break-inside: avoid;
  page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid transparent;
}

.file-header {
  display: grid;
  grid-template-columns: auto 15%;
  align-items: center;
  padding: 15px;
}

.file-name {
  font-size: 16px;
  font-weight: 600;
}

.js-file .file-header {
  background-color: #ffe100;
  color: #000;
}

.css-file .file-header {
  background-color: #2f78ff;
  color: #fff;
}

.html-file .file-header {
  background-color: #ff5733;
  color: #fff;
}

.file-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #fafafa;
  padding: 15px;
  margin: 0;
  overflow-y: auto;
  color: #333;
  border: 1px solid #ddd;
}
</style>
