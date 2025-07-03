<script setup>
import { ref, onMounted, computed } from "vue";
import Papa from "papaparse";
import axios from "axios";

const loading = ref(true);
const sheetRows = ref([]);
const selectedMonth = ref("All");
const searchQuery = ref("");
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
            column1: row.Name || "",
            column2: row["OnlineSearchConsole"] || "",
            column3: row["OnlineSmartWidget"] || "",
            column7: row["Online Date"] || "",
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
        row.column1.toLowerCase().includes(query) ||
        row.column2.toLowerCase().includes(query) ||
        row.column3.toLowerCase().includes(query) ||
        row.column7.toLowerCase().includes(query)
    );
  }
  return rows;
});

function statusDetect(value) {
  if (!value) return "";
  if (value.includes("Google Ads")) return "status1";
  if (value.includes("ติดตั้งเรียบร้อย")) return "status2";
  if (value.includes("รอดำเนินการ")) return "status3";
  if (value.includes("ไม่มีบริการ")) return "status4";
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
          <th>SearchConsole</th>
          <th>SmartWidget</th>
          <th>Online Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in filteredRows" :key="idx">
          <td>
            <a :href="'http://' + row.name" target="_blank">{{ row.column1 }}</a>
          </td>
          <td :class="statusDetect(row.column2)">
            {{ row.column2 }}
          </td>
          <td :class="statusDetect(row.column3)">
            {{ row.column3 }}
          </td>
          <td>{{ row.column7 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loading v-else></Loading>
</template>
