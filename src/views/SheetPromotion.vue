<script setup>
import { ref, onMounted, computed } from "vue";
import Papa from "papaparse";
import axios from "axios";

const loading = ref(true);
const sheetRows = ref([]);
const selectedMonth = ref("All");
const selectedYear = ref("All");
const searchQuery = ref("");
const GOOGLE_SHEET_CSV_URL =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQhdMYSXXIfiuIfj7snoEY7kXjbMk0eXkIuYE1fApzW-1x0VeOlu3-3O7ruSOX6yV2JGlnaM68ltMa/pub?gid=1023775006&single=true&output=csv"
  );

onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios.get(GOOGLE_SHEET_CSV_URL, { responseType: "text" });
    Papa.parse(res.data, {
      header: true,
      complete: (results) => {
        sheetRows.value = results.data
          .filter((row) => row.ชื่อเว็บไซต์)
          .map((row, idx) => {
            const monthYear = String(row["Month"] || "").trim();
            const [monthName, year] = monthYear.split(" ");
            return {
              id: idx + 1,
              column1: row.ชื่อเว็บไซต์ || "",
              column2: row["โปรโมชั่น"] || "",
              column3: row["Remark"] || "",
            };
          });
      },
    });
  } catch (e) {
    sheetRows.value = [];
  } finally {
    loading.value = false;
  }
});

// Get unique months and years for dropdowns
const monthOptions = computed(() => {
  const months = sheetRows.value.map((r) => r.month).filter(Boolean);
  return ["All", ...Array.from(new Set(months))];
});
const yearOptions = computed(() => {
  const years = sheetRows.value.map((r) => r.year).filter(Boolean);
  return ["All", ...Array.from(new Set(years))];
});

const filteredRows = computed(() => {
  let rows = sheetRows.value;
  if (selectedMonth.value !== "All") {
    rows = rows.filter((row) => row.month === selectedMonth.value);
  }
  if (selectedYear.value !== "All") {
    rows = rows.filter((row) => row.year === selectedYear.value);
  }
  const query = searchQuery.value.toLowerCase();
  if (query) {
    rows = rows.filter(
      (row) => row.column1.toLowerCase().includes(query) || row.column2.toLowerCase().includes(query) || row.column3.toLowerCase().includes(query)
    );
  }
  return rows;
});

function statusDetect(value) {
  if (!value) return "";
  if (value.includes("เพิ่มพื้นที่ (5 GB)")) return "status1";
  if (value.includes("Google Search Console")) return "status2";
  if (value.includes("Smart Widget")) return "status3";
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
    </div>
    <table class="TableViews">
      <thead>
        <tr>
          <th>Website</th>
          <th>Promotion</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in filteredRows" :key="idx">
          <td>
            <a :href="'http://' + row.column1" target="_blank">{{ row.column1 }}</a>
          </td>
          <td :class="statusDetect(row.column2)">
            {{ row.column2 }}
          </td>
          <td :class="statusDetect(row.column3)">
            {{ row.column3 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loading v-else></Loading>
</template>
