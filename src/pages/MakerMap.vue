<template>
  <div class="labelName">Map Marker</div>

  <div class="map_layout">
    <div class="map_content" ref="map">
      <img src="https://itp1.itopfile.com/ImageServer/z_itp_12052025qsdh/0/0/white-mapz-z1584138795656.png" alt="" />
      <mark
        v-for="(marker, idx) in markers"
        :key="marker.name + idx"
        :class="marker.name"
        :style="{ top: marker.top + '%', left: marker.left + '%' }"
      >
        <div class="mark"></div>
        <label @mousedown="startDrag($event, idx)">{{ marker.name }}</label>
        <div @click="removeMarker(idx)" style="margin-left: 5px">x</div>
      </mark>
    </div>
    <div class="map_control" @submit.prevent="addMarker">
      <input v-model="newName" placeholder="Country name" required />
      <input hidden v-model.number="newTop" type="number" min="0" max="100" placeholder="Top (%)" required />
      <input hidden v-model.number="newLeft" type="number" min="0" max="100" placeholder="Left (%)" required />
      <button type="submit">Add Marker</button>
    </div>
  </div>
</template>

<style scoped>
.map_layout {
  display: grid;
  grid-template-columns: 70% 30%;
  gap: var(--gap);
}

.map_control {
  width: 100%;
}

.map_content {
  position: relative;
  display: block;
  width: auto;
  height: auto;
  border: 1px solid var(--btn-color);
  margin: auto;
  width: auto;
}

.map_content mark {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
}

.map_content label {
  padding: 2px 10px;
  font-size: clamp(8px, 1vw, 14px);
  color: #fff;
  background: var(--btn-color);
  cursor: all-scroll;
}

.map_content mark .mark {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--btn-color);
}
</style>

<script setup>
import { ref, onMounted } from "vue";

const markers = ref([]);

// Form fields for new marker
const newName = ref("");
const newTop = ref(50);
const newLeft = ref(50);

// Load saved positions from localStorage
onMounted(() => {
  const savedMarkers = localStorage.getItem("mapMarkers");
  if (savedMarkers) {
    try {
      markers.value = JSON.parse(savedMarkers);
    } catch {}
  }
});

// Add a new marker
function addMarker() {
  if (!newName.value) return;
  markers.value.push({
    name: newName.value,
    top: newTop.value,
    left: newLeft.value,
  });
  localStorage.setItem("mapMarkers", JSON.stringify(markers.value));
  newName.value = "";
  newTop.value = 75;
  newLeft.value = 25;
}

// Remove a marker
function removeMarker(idx) {
  markers.value.splice(idx, 1);
  localStorage.setItem("mapMarkers", JSON.stringify(markers.value));
}

// ...existing drag & drop code...
let dragging = ref(null);
let offset = ref({ x: 0, y: 0 });
let map = ref(null);
let dragTimer = null;
let dragStarted = false;

function startDrag(e, idx) {
  dragStarted = false;
  dragTimer = setTimeout(() => {
    dragStarted = true;
    dragging.value = idx;
    const marker = e.target.closest("mark");
    const markerRect = marker.getBoundingClientRect();
    offset.value = {
      x: e.clientX - markerRect.left,
      y: e.clientY - markerRect.top,
    };
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  }, 10);
  document.addEventListener("mouseup", cancelDrag);
}

function cancelDrag() {
  clearTimeout(dragTimer);
  document.removeEventListener("mouseup", cancelDrag);
}

function onDrag(e) {
  if (!dragStarted || dragging.value === null) return;
  const rect = map.value.getBoundingClientRect();
  let left = ((e.clientX - rect.left - offset.value.x) / rect.width) * 100;
  let top = ((e.clientY - rect.top - offset.value.y) / rect.height) * 100;
  left = Math.max(0, Math.min(100, left));
  top = Math.max(0, Math.min(100, top));
  markers.value[dragging.value].left = left;
  markers.value[dragging.value].top = top;
}

function stopDrag() {
  clearTimeout(dragTimer);
  dragStarted = false;
  dragging.value = null;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("mouseup", cancelDrag);
  localStorage.setItem("mapMarkers", JSON.stringify(markers.value));
}
</script>
