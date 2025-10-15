<template>
  <div v-if="!loading">
    <div class="filter_box">
      <form id="search_box">
        <input class="search_input" type="search" placeholder="Search demo" v-model="searchQuery" />
      </form>
      <button class="filter_range" @click="filterRange(1, 199)">1–199</button>
      <button class="filter_range" @click="filterRange(200, 399)">200–399</button>
      <button class="filter_range" @click="filterRange(400, 599)">400–599</button>
      <button class="filter_range" @click="filterRange(600, 800)">600–800</button>
      <button class="filter_range" @click="clearFilter">All</button>
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
        <tr v-for="(row, idx) in filteredData" :key="idx">
          <td>{{ row.column1 }}</td>
          <td>{{ row.column2 }}</td>
          <td :class="statusDetect(row.column3)">
            {{ row.column3 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loading v-else></Loading>
</template>

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
            column1: row.Name || "",
            column2: row.Note || "",
            column3: row.Status || "",
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
        item.column1.toLowerCase().includes(query) || item.column2.toLowerCase().includes(query) || item.status.toLowerCase().includes(query);

      const idNum = Number(item.id);
      const inRange = (filterMin.value === null && filterMax.value === null) || (idNum >= filterMin.value && idNum <= filterMax.value);

      return matchesSearch && inRange;
    })
    .sort((a, b) => a.id - b.id);
});

function statusDetect(value) {
  if (!value) return "";
  if (value.includes("Reserve")) return "Service";
  if (value.includes("Abort")) return "No";
  if (value.includes("Available")) return "Complete";
  return "";
}
</script>
