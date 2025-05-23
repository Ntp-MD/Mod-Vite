<template>
  <div class="DemoDisplay">
    <div class="DemoDisplayTop">
      <div class="search-box">
        <input class="search-input" type="search" placeholder="Search demo" v-model="searchQuery" />
        <img src="/src/assets/icon/search.png" alt="" />
      </div>
      <div class="filter-range" @click="filterRange(1, 199)">1–199</div>
      <div class="filter-range" @click="filterRange(200, 399)">200–399</div>
      <div class="filter-range" @click="filterRange(400, 599)">400–599</div>
      <div class="filter-range" @click="filterRange(600, 800)">600–800</div>
      <div class="filter-range" @click="clearFilter">All</div>
    </div>
    <table>
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
            <div v-if="editingIndex === idx && editingField === 'note'" class="edit-cell">
              <input v-model="tempInput" @keyup.enter="saveEdit" @blur="saveEdit" @keyup.esc="cancelEdit" autofocus />
            </div>
            <div class="edit-box" v-else>
              <div>{{ site.note }}</div>
              <img @click="startEditing(idx, 'note')" src="/src/assets/icon/edit.png" />
            </div>
          </td>

          <!-- Status -->
          <td :class="{ editing: editingIndex === idx && editingField === 'status' }">
            <div v-if="editingIndex === idx && editingField === 'status'" class="edit-cell">
              <input v-model="tempInput" @keyup.enter="saveEdit" @blur="saveEdit" @keyup.esc="cancelEdit" autofocus />
            </div>
            <div class="edit-box" v-else>
              <div>{{ site.status }}</div>
              <img @click="startEditing(idx, 'status')" src="/src/assets/icon/edit.png" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
.DemoDisplay {
  & table {
    width: 100%;
    border-collapse: collapse;
    color: #fff;
    table-layout: fixed;
  }

  th,
  td {
    border: 1px solid #444;
    padding-left: 10px;
    text-align: left;
    height: 45px;
  }
  thead {
    background: var(--ui-bg1);
    color: #fff;
  }

  td.editing {
    box-shadow: inset 0 0px 2px 1px #4abdff;
  }

  .search-box {
    min-width: 250px;
    width: fit-content;
  }
}

.DemoDisplayTop {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  color: #fff;
  background: var(--ui-bg1);
  z-index: 1;
  padding-bottom: 10px;
}

.filter-range {
  display: grid;
  place-items: center;
  border: 1px solid #444;
  height: 45px;
  min-width: 100px;
  cursor: pointer;
}

.filter-range:hover {
  border: 1px solid #4abdff;
}
</style>
