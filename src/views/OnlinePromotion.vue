<script setup>
import { ref, watch, onMounted, computed, nextTick } from "vue";
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
            selectName: row.Name || "",
            selectfree5GB: row["Free5GB"] || "",
            selectfreeSearchConsole: row["FreeSearchConsole"] || "",
            selectfreeSmartWidget: row["FreeSmartWidget"] || "",
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
        row.selectName.toLowerCase().includes(query) ||
        row.selectfree5GB.toLowerCase().includes(query) ||
        row.selectfreeSearchConsole.toLowerCase().includes(query) ||
        row.selectfreeSmartWidget.toLowerCase().includes(query)
    );
  }
  return rows;
});

const bottom = ref(null);

onMounted(() => {
  scrollToBottom();
});

watch(filteredRows, () => {
  nextTick(() => scrollToBottom());
});

const scrollToBottom = () => {
  if (bottom.value) {
    bottom.value.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div v-if="!loading">
    <div class="Tablefilter">
      <form id="SearchBox">
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
            {{ row.selectName }}
          </td>
          <td
            :class="{
              Installed: row.selectfree5GB === 'เพิ่มพื้นที่ (5 GB)' && row.Check5GB === 'Completed',
              Wait: row.selectfree5GB === 'เพิ่มพื้นที่ (5 GB)' && row.Check5GB === '',
              NoService: row.selectfree5GB === '' && row.Check5GB === '',
            }"
          >
            {{ !row.selectfree5GB?.trim() && !row.Check5GB?.trim() ? "ไม่มีบริการ" : row.selectfree5GB }}
          </td>

          <td
            :class="{
              Installed: row.onlineSearchConsole === 'Installed',
              Wait: row.onlineSearchConsole === 'Wait' || row.onlineSearchConsole === '' || row.onlineSearchConsole == null,
            }"
          >
            {{
              row.onlineSearchConsole === "Wait" || row.onlineSearchConsole === "" || row.onlineSearchConsole == null
                ? "Search Console"
                : row.onlineSearchConsole === "Installed"
                ? "Search Console Installed"
                : row.selectfreeSearchConsole
            }}
          </td>
          <td
            :class="{
              Installed: row.onlineSmartWidget === 'Installed' || row.selectfreeSmartWidget === 'Smart Widget',
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
                : row.onlineSmartWidget === "Wait" && (row.selectfreeSmartWidget === "Smart Widget" || row.selectfreeSmartWidget === "")
                ? "Smart Widget"
                : row.onlineSmartWidget === "Installed"
                ? "Smart Widget Installed"
                : row.selectfreeSmartWidget
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <div ref="bottom"></div>
  </div>

  <Loading v-else></Loading>
</template>
