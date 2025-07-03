<script setup>
import { ref, onMounted, computed } from "vue";
import Papa from "papaparse";
import axios from "axios";

const loading = ref(true);
const sheetRows = ref([]);
const selectedMonth = ref("All");
const searchQuery = ref("");
const onlineMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
            onlineName: row.Name || "",
            free5GB: row["Free5GB"] || "",
            freeSearchConsole: row["FreeSearchConsole"] || "",
            freeSmartWidget: row["FreeSmartWidget"] || "",
            onlineSearchConsole: row["OnlineSearchConsole"] || "",
            onlineSmartWidget: row["OnlineSmartWidget"] || "",
            Check5GB: row["Check5GB"] || "",
            onlineMonth: String(row["Month"] || "").trim(),
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
  // Filter by onlineMonth
  if (selectedMonth.value !== "All") {
    rows = rows.filter((row) => row.onlineMonth === selectedMonth.value);
  }
  // Filter by search query
  const query = searchQuery.value.toLowerCase();
  if (query) {
    rows = rows.filter(
      (row) =>
        row.onlineName.toLowerCase().includes(query) ||
        row.free5GB.toLowerCase().includes(query) ||
        row.freeSearchConsole.toLowerCase().includes(query) ||
        row.freeSmartWidget.toLowerCase().includes(query)
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
        v-for="(name, idx) in onlineMonthNames"
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
            {{ row.onlineName }}
          </td>
          <td :class="{ Installed: row.Check5GB === 'Up Space' }">
            {{ row.free5GB }}
          </td>
          <td
            :class="{
              Installed: row.onlineSearchConsole === 'Installed',
              Wait: row.onlineSearchConsole === 'Wait' || row.onlineSearchConsole === '' || row.onlineSearchConsole == null,
            }"
          >
            {{
              row.onlineSearchConsole === "Wait" || row.onlineSearchConsole === "" || row.onlineSearchConsole == null
                ? "Wait"
                : row.onlineSearchConsole === "Installed"
                ? "Search Console Installed"
                : row.freeSearchConsole
            }}
          </td>
          <td
            :class="{
              Installed: row.onlineSmartWidget === 'Installed' || row.freeSmartWidget === 'Smart Widget',
              Ads: row.onlineSmartWidget === 'Google Ads',
              NoService: row.onlineSmartWidget === 'ไม่มีบริการ',
              Wait: row.onlineSmartWidget === 'Wait',
            }"
          >
            {{
              row.onlineSmartWidget === "ไม่มีบริการ"
                ? "ไม่มีบริการ"
                : row.onlineSmartWidget === "Google Ads"
                ? "Google Ads"
                : row.onlineSmartWidget === "Wait" && (row.freeSmartWidget === "Smart Widget" || row.freeSmartWidget === "")
                ? "Wait"
                : row.onlineSmartWidget === "Installed"
                ? "Smart Widget Installed"
                : row.freeSmartWidget
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loading v-else></Loading>
</template>

<style>
.Installed {
  background: linear-gradient(to right, var(--Complete) 0, var(--Complete) 5px, transparent 5px, transparent 100%);
}

.Wait {
  background: linear-gradient(to right, var(--Warning) 0, var(--Warning) 5px, transparent 5px, transparent 100%);
}

.Ads {
  background: linear-gradient(to right, var(--focus) 0, var(--focus) 5px, transparent 5px, transparent 100%);
}

.NoService {
  background: linear-gradient(to right, var(--No) 0, var(--No) 5px, transparent 5px, transparent 100%);
}
</style>
