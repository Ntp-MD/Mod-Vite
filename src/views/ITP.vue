<template>
  <div>
    <div class="itp-work" v-if="Object.keys(allFiles).length > 0">
      <div class="file-entry" v-for="(content, path, index) in allFiles" :key="path">
        <div class="file-name">{{ getFilenameWithoutExtension(path) }}</div>
        <pre class="file-content">{{ content }}</pre>
      </div>
    </div>
    <div v-else>
      <p>No files found in the /ITP/ directory.</p>
    </div>
  </div>
</template>

<script setup>
const allFiles = import.meta.glob("/ITP/**", { eager: true, as: "raw" });

// Helper function to extract filename without extension
const getFilenameWithoutExtension = (filePath) => {
  if (!filePath) return ""; // Handle potential edge cases
  // 1. Get the full filename (e.g., 'test.html')
  const filenameWithExt = filePath.split("/").pop();
  if (!filenameWithExt) return ""; // Handle if path ends with '/'

  // 2. Find the last dot
  const lastDotIndex = filenameWithExt.lastIndexOf(".");

  // 3. If a dot exists and it's not the first character (e.g., not '.htaccess')
  if (lastDotIndex > 0) {
    // Return the part before the last dot
    return filenameWithExt.substring(0, lastDotIndex);
  } else {
    // Otherwise, return the full filename (no extension or hidden file)
    return filenameWithExt;
  }
};

console.log("Loaded files:", allFiles);
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
  padding: 20px;
}

.file-name {
  font-size: 18px;
  background: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
}

.file-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 4px;
  margin: 0;
}
</style>
