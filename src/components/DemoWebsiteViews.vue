<template>
  <div class="body-content">
    <Loading v-if="ui.isLoading" />
    <div class="filter-sort flex">
      <form id="search_box">
        <input class="search-input" type="search" placeholder="Search demo" v-model="searchQuery" />
      </form>
      <button class="filter-range" @click="filterRange(1, 199)">1–199</button>
      <button class="filter-range" @click="filterRange(200, 399)">200–399</button>
      <button class="filter-range" @click="filterRange(400, 599)">400–599</button>
      <button class="filter-range" @click="filterRange(600, 800)">600–800</button>
      <button class="filter-range" @click="clearFilter">All</button>
      <div class="page-control">
        <label for="page-range">Per page</label>
        <select class="dropdown" id="page-range" v-model.number="pageSize">
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
      <div class="page-control">
        <button :disabled="currentPage === 1" @click="goFirst">« First</button>
        <button :disabled="currentPage === 1" @click="prevPage">‹ Prev</button>
        <button v-for="p in pageWindow" :key="p" class="pager-num" :class="{ active: p === currentPage }" @click="gotoPage(p)">{{ p }}</button>
        <button :disabled="currentPage === totalPages" @click="nextPage">Next ›</button>
        <button :disabled="currentPage === totalPages" @click="goLast">Last »</button>
        <span> Showing {{ displayFrom }}–{{ displayTo }} of {{ filteredCount }} </span>
      </div>
    </div>
    <div class="table-views">
      <table>
        <thead v-once>
          <tr>
            <th>Name</th>
            <th>Note</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <!-- Use paginatedData instead of filteredData -->
          <tr v-for="(row, idx) in paginatedData" :key="row.id ?? idx">
            <td>{{ row.column1 }}</td>
            <td>{{ row.column2 }}</td>
            <td :class="statusDetect(row.column3)">{{ row.column3 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination footer -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Papa from "papaparse";
import axios from "axios";
import Loading from "@/ui/Loading.vue";
import { useLoading } from "@/stores/useLoading";
import { useUiStore } from "@/stores/ui";

const { showLoading, hideLoading } = useLoading();
const ui = useUiStore();
const sheetRows = ref([]);
const searchQuery = ref("");
const filterMin = ref(null);
const filterMax = ref(null);

// pagination state
const currentPage = ref(1);
const pageSize = ref(100);

const GOOGLE_SHEET_CSV_URL =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRM5lsZMJ-EGwUcT-XurRjV54V2Tnf2n7MYK0kgp7L6nROAl8clWcsZPAq8cidyIijawHVjIHa93pRg/pub?gid=1303784359&single=true&output=csv"
  );

onMounted(async () => {
  showLoading();
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
        hideLoading();
      },
    });
  } catch (err) {
    sheetRows.value = [];
    hideLoading();
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

// core filtered list (sorted)
const filteredData = computed(() => {
  return sheetRows.value
    .filter((item) => {
      const query = (searchQuery.value || "").toLowerCase();

      // FIX: use column3 instead of item.status
      const matchesSearch =
        item.column1.toLowerCase().includes(query) || item.column2.toLowerCase().includes(query) || item.column3.toLowerCase().includes(query);

      const idNum = Number(item.id);
      const inRange = (filterMin.value === null && filterMax.value === null) || (idNum >= filterMin.value && idNum <= filterMax.value);

      return matchesSearch && inRange;
    })
    .sort((a, b) => a.id - b.id);
});

// keep page in bounds when filters/search change or pageSize changes
watch([filteredData, pageSize], () => {
  currentPage.value = 1;
});

// pagination derivatives
const filteredCount = computed(() => filteredData.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(filteredData.value.length / pageSize.value || 1)));

// clamp currentPage if filtered list shrinks
watch([filteredCount, pageSize], () => {
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
});

// slice for current page
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

// display "Showing X–Y of N"
const displayFrom = computed(() => (filteredCount.value === 0 ? 0 : (currentPage.value - 1) * pageSize.value + 1));
const displayTo = computed(() => Math.min(currentPage.value * pageSize.value, filteredCount.value));

// compact numeric window: current ±2
const pageWindow = computed(() => {
  const span = 2;
  const start = Math.max(1, currentPage.value - span);
  const end = Math.min(totalPages.value, currentPage.value + span);
  const arr = [];
  for (let p = start; p <= end; p++) arr.push(p);
  return arr;
});

// controls
function gotoPage(p) {
  if (p >= 1 && p <= totalPages.value) currentPage.value = p;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function goFirst() {
  currentPage.value = 1;
}
function goLast() {
  currentPage.value = totalPages.value;
}

function statusDetect(value) {
  if (!value) return "";
  if (value.includes("Reserve")) return "Service";
  if (value.includes("Abort")) return "No";
  if (value.includes("Available")) return "Complete";
  return "";
}
</script>
