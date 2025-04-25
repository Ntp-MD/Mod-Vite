<template>
  <div>
    <div class="itp-work" v-if="displayedFiles.length > 0">
      <div
        v-for="(file, index) in displayedFiles"
        :key="file.path"
        :draggable="true"
        @dragstart="handleDragStart($event, file, index)"
        @dragover.prevent="handleDragOver($event, index)"
        @dragleave="handleDragLeave($event)"
        @drop="handleDrop($event, index)"
        @dragend="handleDragEnd($event)"
        :class="[
          'file-entry',
          {
            'js-file': file.path.endsWith('.js'),
            'css-file': file.path.endsWith('.css'),
            'html-file': file.path.endsWith('.html'),

            dragging: draggingItem?.path === file.path,
            'drag-over': dragOverIndex === index && draggingItem && draggingItem.path !== file.path,
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
import { ref, computed, watch, watchEffect, onBeforeUpdate, onUpdated } from "vue";

const FILE_ORDER_STORAGE_KEY = "itpViewerFileOrder";

const allFilesRaw = import.meta.glob("/ITP/**", { eager: true, as: "raw" });

const fileList = ref(
  Object.entries(allFilesRaw).map(([path, content]) => ({
    path,
    content,
  }))
);

const loadInitialOrder = (key) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
        return parsed;
      }
    } catch (e) {
      console.error(`Failed to parse order from localStorage key "${key}":`, e);
      localStorage.removeItem(key);
    }
  }
  return [];
};

const savedFileOrder = ref(loadInitialOrder(FILE_ORDER_STORAGE_KEY));

const saveOrder = (key, orderArray) => {
  try {
    localStorage.setItem(key, JSON.stringify(orderArray));
  } catch (e) {
    console.error(`Failed to save order to localStorage key "${key}":`, e);
  }
};

const getFilenameWithoutExtension = (filePath) => {
  if (!filePath) return "";
  const filenameWithExt = filePath.split("/").pop() || "";
  const lastDotIndex = filenameWithExt.lastIndexOf(".");
  return lastDotIndex > 0 ? filenameWithExt.substring(0, lastDotIndex) : filenameWithExt;
};

const displayedFiles = ref([]);
const draggingItem = ref(null);
const dragOverIndex = ref(null);

const fileEntryRefs = ref([]);

onBeforeUpdate(() => {
  fileEntryRefs.value = [];
});

const sortBySavedOrder = (filesToSort, savedOrderPaths) => {
  if (!savedOrderPaths || savedOrderPaths.length === 0) {
    return [...filesToSort].sort((a, b) => a.path.localeCompare(b.path));
  }
  const orderMap = new Map(savedOrderPaths.map((path, index) => [path, index]));
  return [...filesToSort].sort((a, b) => {
    const indexA = orderMap.get(a.path);
    const indexB = orderMap.get(b.path);
    if (indexA !== undefined && indexB !== undefined) return indexA - indexB;
    if (indexA !== undefined) return -1;
    if (indexB !== undefined) return 1;
    return a.path.localeCompare(b.path);
  });
};

const updateDisplayedFiles = () => {
  displayedFiles.value = sortBySavedOrder(fileList.value, savedFileOrder.value);
};

watchEffect(() => {
  updateDisplayedFiles();
});

const handleDragStart = (event, file, index) => {
  draggingItem.value = { file, index };
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", file.path);
};

const handleDragOver = (event, index) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  if (draggingItem.value && index !== draggingItem.value.index) {
    if (dragOverIndex.value !== index) {
      dragOverIndex.value = index;
    }
  } else if (draggingItem.value && index === draggingItem.value.index) {
    dragOverIndex.value = null;
  }
};

const handleDragLeave = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    dragOverIndex.value = null;
  }
};

const handleDrop = (event, targetIndex) => {
  event.preventDefault();
  if (!draggingItem.value || draggingItem.value.index === targetIndex) {
    cleanupDragState();
    return;
  }

  const draggedItemOriginalIndex = draggingItem.value.index;

  const currentDraggedIndex = displayedFiles.value.findIndex((f) => f.path === draggingItem.value.file.path);

  if (currentDraggedIndex === -1) {
    console.error("Dragged item not found in displayedFiles");
    cleanupDragState();
    return;
  }

  const newOrder = [...displayedFiles.value];
  const [draggedItemData] = newOrder.splice(currentDraggedIndex, 1);

  newOrder.splice(targetIndex, 0, draggedItemData);

  displayedFiles.value = newOrder;

  const newFileOrderPaths = newOrder.map((file) => file.path);
  savedFileOrder.value = newFileOrderPaths;
  saveOrder(FILE_ORDER_STORAGE_KEY, newFileOrderPaths);

  cleanupDragState();
};

const handleDragEnd = (event) => {
  cleanupDragState();
};

let isTouchDragging = false;

const handleTouchStart = (file, index) => {
  if (isTouchDragging) return;

  isTouchDragging = true;
  draggingItem.value = { file, index };

  window.addEventListener("touchmove", handleTouchMove, { passive: false });
  window.addEventListener("touchend", handleTouchEnd);
  window.addEventListener("touchcancel", handleTouchEnd);
};

const handleTouchMove = (event) => {
  if (!isTouchDragging || !draggingItem.value) return;

  event.preventDefault();

  if (event.touches.length > 0) {
    const touch = event.touches[0];
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);

    if (elementUnderTouch) {
      const targetEntryElement = elementUnderTouch.closest(".file-entry");

      if (targetEntryElement) {
        const targetIndex = fileEntryRefs.value.findIndex((ref) => ref === targetEntryElement);

        if (targetIndex !== -1 && targetIndex !== draggingItem.value.index) {
          if (dragOverIndex.value !== targetIndex) {
            dragOverIndex.value = targetIndex;
          }
        } else if (targetIndex === draggingItem.value.index) {
          dragOverIndex.value = null;
        } else {
          dragOverIndex.value = null;
        }
        return;
      }
    }

    dragOverIndex.value = null;
  }
};

const handleTouchEnd = (event) => {
  if (!isTouchDragging || !draggingItem.value) return;

  if (dragOverIndex.value !== null && dragOverIndex.value !== draggingItem.value.index) {
    handleDrop({ preventDefault: () => {} }, dragOverIndex.value);
  } else {
    cleanupDragState();
  }

  removeTouchListeners();
  isTouchDragging = false;
};

const cleanupDragState = () => {
  draggingItem.value = null;
  dragOverIndex.value = null;
};

const removeTouchListeners = () => {
  window.removeEventListener("touchmove", handleTouchMove);
  window.removeEventListener("touchend", handleTouchEnd);
  window.removeEventListener("touchcancel", handleTouchEnd);
};
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
