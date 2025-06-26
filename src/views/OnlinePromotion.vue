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
            column2: row["WIC-5GB"] || "",
            column3: row["WIC-GoogleSearchConsole"] || "",
            column4: row["WIC-SmartWidget"] || "",
            CheckSearchConsole: row["Online-GoogleSearchConsole"] || "",
            CheckSmartWidget: row["Online-SmartWidget"] || "",
            Check5GB: row["WIC-Up5GB"] || "",
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
        row.column4.toLowerCase().includes(query)
    );
  }
  return rows;
});
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
          <th>Upgrade 5GB</th>
          <th>WIC Search Console</th>
          <th>WIC Smart Widget</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in filteredRows" :key="idx">
          <td>
            {{ row.column1 }}
          </td>
          <td :class="{ Installed: row.Check5GB === 'Up Space' }">
            {{ row.column2 }}
          </td>
          <td :class="{ Installed: row.CheckSearchConsole }">
            {{ row.CheckSearchConsole ? "Installed" : "Wait" }}
          </td>
          <td
            :class="{
              Installed:
                row.CheckSmartWidget === 'Installed' ||
                row.CheckSmartWidget === 'Google Ads' ||
                row.CheckSmartWidget === 'ไม่มีบริการ' ||
                row.column4 === 'Smart Widget',
            }"
          >
            {{ row.CheckSmartWidget ? row.CheckSmartWidget : row.column4 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loading v-else></Loading>
</template>

<style>
td.Installed {
  color: var(--btn);
}
</style>
