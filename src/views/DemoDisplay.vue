<template>
  <div class="Tablefilter">
    <div class="search-box">
      <input class="search-input" type="search" placeholder="Search demo" v-model="searchQuery" />
    </div>
    <button class="filter-range" @click="filterRange(1, 199)">1–199</button>
    <button class="filter-range" @click="filterRange(200, 399)">200–399</button>
    <button class="filter-range" @click="filterRange(400, 599)">400–599</button>
    <button class="filter-range" @click="filterRange(600, 800)">600–800</button>
    <button class="filter-range" @click="clearFilter">All</button>
  </div>
  <table class="TableViews">
    <thead>
      <tr>
        <th>Name</th>
        <th>Note</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(site, idx) in filteredData" :key="idx">
        <td>{{ site.name }}</td>
        <!-- Note -->
        <td :class="{ editing: editingIndex === idx && editingField === 'note' }">
          <template v-if="editingIndex === idx && editingField === 'note'">
            <input v-model="tempInput" @keyup.enter="saveEdit" @blur="saveEdit" @keyup.esc="cancelEdit" autofocus class="edit-cell" />
          </template>
          <template v-else>
            {{ site.note }}
            <img @click="startEditing(idx, 'note')" src="/src/assets/icon/edit.png" />
          </template>
        </td>

        <!-- Status -->
        <td :class="{ editing: editingIndex === idx && editingField === 'status' }">
          <template v-if="editingIndex === idx && editingField === 'status'">
            <input v-model="tempInput" @keyup.enter="saveEdit" @blur="saveEdit" @keyup.esc="cancelEdit" autofocus class="edit-cell" />
          </template>
          <template v-else>
            {{ site.status }}
            <img @click="startEditing(idx, 'status')" src="/src/assets/icon/edit.png" />
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const listData = ref([]);
const editingIndex = ref(null);
const editingField = ref(null);
const tempInput = ref("");
const searchQuery = ref("");
const filterMin = ref(null);
const filterMax = ref(null);

onMounted(async () => {
  const res = await axios.get("http://localhost:3001/DemoDisplayGet");
  listData.value = res.data;
});

function startEditing(index, field) {
  editingIndex.value = index;
  editingField.value = field;
  tempInput.value = listData.value[index][field];
}

async function saveEdit() {
  if (editingIndex.value !== null && editingField.value !== null) {
    listData.value[editingIndex.value][editingField.value] = tempInput.value;
    await axios.post("http://localhost:3001/DemoDisplayPost", listData.value);
    editingIndex.value = null;
    editingField.value = null;
    tempInput.value = "";
  }
}

function cancelEdit() {
  editingIndex.value = null;
  editingField.value = null;
  tempInput.value = "";
}

function filterRange(min, max) {
  filterMin.value = min;
  filterMax.value = max;
}

function clearFilter() {
  filterMin.value = null;
  filterMax.value = null;
}

const filteredData = computed(() => {
  return listData.value
    .filter((item) => {
      const query = searchQuery.value.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) || item.note.toLowerCase().includes(query) || item.status.toLowerCase().includes(query);

      const idNum = Number(item.id);
      const inRange = (filterMin.value === null && filterMax.value === null) || (idNum >= filterMin.value && idNum <= filterMax.value);

      return matchesSearch && inRange;
    })
    .sort((a, b) => a.id - b.id); // Optional: sort by ID
});
</script>

<style scoped>
table.TableViews {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  color: var(--ui-font);
}

table.TableViews th,
table.TableViews td,
table.TableViews tr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  position: relative;
}

img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  cursor: pointer;
  filter: invert(1);
}

table.TableViews td img {
  position: absolute;
  right: 10px;
}

.Tablefilter {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-box,
.edit-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 1px solid var(--border-color);
}

.filter-range {
  display: grid;
  place-items: center;
  min-width: 100px;
  height: inherit;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid var(--border-color);
}

.filter-range:hover {
  background: var(--btn);
  color: #fff;
}
</style>
