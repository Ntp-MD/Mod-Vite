<script setup>
import { ref, computed, onMounted } from "vue";
import Papa from "papaparse";
import axios from "axios";
const loading = ref(true);
const sheetRows = ref([]);
const searchQuery = ref("");
const filterMin = ref(null);
const filterMax = ref(null);
const GOOGLE_SHEET_CSV_URL =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRM5lsZMJ-EGwUcT-XurRjV54V2Tnf2n7MYK0kgp7L6nROAl8clWcsZPAq8cidyIijawHVjIHa93pRg/pub?gid=1303784359&single=true&output=csv"
  );

onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios.get(GOOGLE_SHEET_CSV_URL, { responseType: "text" });
    Papa.parse(res.data, {
      header: true,
      complete: (results) => {
        sheetRows.value = results.data
          .filter((row) => row.Name)
          .map((row, idx) => ({
            id: idx + 1,
            name: row.Name || "",
            note: row.Note || "",
            status: row.Status || "",
          }));
      },
    });
  } finally {
    loading.value = false;
  }
});

function filterRange(min, max) {
  filterMin.value = min;
  filterMax.value = max;
}

function clearFilter() {
  filterMin.value = null;
  filterMax.value = null;
}

const filteredData = computed(() => {
  return sheetRows.value
    .filter((item) => {
      const query = searchQuery.value.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) || item.note.toLowerCase().includes(query) || item.status.toLowerCase().includes(query);

      const idNum = Number(item.id);
      const inRange = (filterMin.value === null && filterMax.value === null) || (idNum >= filterMin.value && idNum <= filterMax.value);

      return matchesSearch && inRange;
    })
    .sort((a, b) => a.id - b.id);
});

// Status color class
function statusClass(status) {
  if (!status) return "";
  if (status.includes("Reserve")) return "status-reserve";
  if (status.includes("Abort")) return "status-abort";
  if (status.includes("Available")) return "status-available";
  return "";
}
</script>

<template>
  <div v-if="!loading">
    <div class="Tablefilter">
      <form id="search-form">
        <input class="search-input" type="search" placeholder="Search demo" v-model="searchQuery" />
      </form>
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
          <td>{{ site.note }}</td>
          <td :class="statusClass(site.status)">
            {{ site.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loading v-else></Loading>
</template>

<style></style>
