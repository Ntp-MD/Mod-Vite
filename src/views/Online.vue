<script setup>
import { ref, onMounted, computed } from "vue";
import Papa from "papaparse";
import axios from "axios";

const loading = ref(true);
const sheetRows = ref([]);
const selectedMonth = ref("All");
const searchQuery = ref(""); // <-- Add this
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const GOOGLE_SHEET_CSV_URL =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbhLBcw4jg80ogDxEeLs5wRrsQdFrWoN0g8OGy3aO_YJ0UoL-BIhuY8EozSzuTXppIIbfqp100FYIZ/pub?gid=1419480009&single=true&output=csv"
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
            searchConsole: row["Search Console"] || "",
            smartWidget: row["Smart Widget"] || "",
            onlineDate: row["Online Date"] || "",
            month: String(row["Month"] || "").trim(),
          }));
      },
    });
  } catch (e) {
    sheetRows.value = [];
  } finally {
    loading.value = false;
  }
});

const filteredRows = computed(() => {
  let rows = sheetRows.value;
  // Filter by month
  if (selectedMonth.value !== "All") {
    rows = rows.filter((row) => row.month === selectedMonth.value);
  }
  // Filter by search query
  const query = searchQuery.value.toLowerCase();
  if (query) {
    rows = rows.filter(
      (row) =>
        row.name.toLowerCase().includes(query) ||
        row.searchConsole.toLowerCase().includes(query) ||
        row.smartWidget.toLowerCase().includes(query) ||
        row.onlineDate.toLowerCase().includes(query)
    );
  }
  return rows;
});

function statusDetect(value) {
  if (!value) return "";
  if (value.includes("Google Ads")) return "Ads";
  if (value.includes("ติดตั้งเรียบร้อย")) return "Installed";
  if (value.includes("รอดำเนินการ")) return "Wait";
  if (value.includes("ไม่มีบริการ")) return "None";
  return "";
}
</script>

<template>
  <div v-if="!loading">
    <div class="Tablefilter">
      <form id="search-form">
        <input class="search-input" type="search" placeholder="Search..." v-model="searchQuery" />
      </form>
      <button :class="{ active: selectedMonth === 'All' }" @click="selectedMonth = 'All'">All</button>
      <button
        v-for="(name, idx) in monthNames"
        :key="idx"
        :class="{ active: selectedMonth === String(idx + 1) }"
        @click="selectedMonth = String(idx + 1)"
      >
        {{ name }}
      </button>
    </div>
    <table class="TableViews">
      <thead>
        <tr>
          <th>Name</th>
          <th>Search Console</th>
          <th>Smart Widget</th>
          <th>Online Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in filteredRows" :key="idx">
          <td>
            <a :href="'http://' + row.name" target="_blank">{{ row.name }}</a>
          </td>
          <td class="Status" :class="statusDetect(row.searchConsole)">
            {{ row.searchConsole }}
          </td>
          <td class="Status" :class="statusDetect(row.smartWidget)">
            {{ row.smartWidget }}
          </td>
          <td>{{ row.onlineDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loading v-else></Loading>
</template>
