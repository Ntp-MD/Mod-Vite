<template>
  <div v-if="!loading">
    <div class="filter_box">
      <form id="search_box" @submit.prevent>
        <input class="search_input" type="search" placeholder="Search..." v-model="searchQuery" autocomplete="off" />
      </form>

      <button :class="{ active: selectedMonth === 0 }" @click="selectedMonth = 0">All</button>
      <button v-for="(name, i) in MONTH_NAMES" :key="i + 1" :class="{ active: selectedMonth === i + 1 }" @click="selectedMonth = i + 1">
        {{ name }}
      </button>
    </div>

    <table class="TableViews">
      <thead v-once>
        <tr>
          <th>Name</th>
          <th>Upgrade 5GB</th>
          <th>WIC Search Console</th>
          <th>WIC Smart Widget</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in filteredRows" :key="row.id">
          <td>{{ row.selectName }}</td>

          <td :class="free5gbClass(row)">
            {{ free5gbLabel(row) }}
          </td>

          <td :class="searchConsoleClass(row)">
            {{ searchConsoleLabel(row) }}
          </td>

          <td :class="smartWidgetClass(row)">
            {{ smartWidgetLabel(row) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div ref="bottom"></div>
  </div>

  <Loading v-else />
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import Papa from "papaparse";
import axios from "axios";

// ---------- constants ----------
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const GOOGLE_SHEET_CSV_URL =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbhLBcw4jg80ogDxEeLs5wRrsQdFrWoN0g8OGy3aO_YJ0UoL-BIhuY8EozSzuTXppIIbfqp100FYIZ/pub?gid=1419480009&single=true&output=csv"
  );

// ---------- state ----------
const loading = ref(true);
const sheetRows = ref([]); // normalized rows
const selectedMonth = ref(0); // 0 = All, else 1..12
const searchQuery = ref("");
const debouncedQuery = ref("");
const bottom = ref(null);

// debounce search
let t = null;
watch(searchQuery, (v) => {
  clearTimeout(t);
  t = setTimeout(() => (debouncedQuery.value = (v || "").toLowerCase().trim()), 200);
});

// ---------- data load ----------
const controller = new AbortController();

onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios.get(GOOGLE_SHEET_CSV_URL, {
      responseType: "text",
      signal: controller.signal,
    });

    Papa.parse(res.data, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        let id = 1;
        sheetRows.value = data.filter((r) => r?.Name).map((r) => normalizeRow(r, id++));
      },
    });
  } catch {
    sheetRows.value = [];
  } finally {
    loading.value = false;
  }
});

onBeforeUnmount(() => controller.abort());

// ---------- normalization ----------
const norm = (v) => String(v ?? "").trim();
const lc = (v) => norm(v).toLowerCase();

function normalizeRow(r, id) {
  const monthNum = Number(norm(r["Month"])) || 0; // 1..12 or 0
  const selectName = norm(r["Name"]);

  const row = {
    id,
    // originals (for display)
    selectName,
    selectfree5GB: norm(r["Free5GB"]),
    selectfreeSearchConsole: norm(r["FreeSearchConsole"]),
    selectfreeSmartWidget: norm(r["FreeSmartWidget"]),
    onlineSearchConsole: norm(r["OnlineSearchConsole"]),
    onlineSmartWidget: norm(r["OnlineSmartWidget"]),
    Check5GB: norm(r["Check5GB"]),
    onlineMonth: monthNum,

    // normalized for filtering
    _name_lc: lc(r["Name"]),
    _5gb_lc: lc(r["Free5GB"]),
    _sc_lc: lc(r["FreeSearchConsole"]),
    _sw_lc: lc(r["FreeSmartWidget"]),
  };

  return row;
}

// ---------- filtering ----------
const filteredRows = computed(() => {
  const m = selectedMonth.value;
  const q = debouncedQuery.value;

  // quick returns
  if (m === 0 && !q) return sheetRows.value;

  return sheetRows.value.filter((row) => {
    const monthOk = m === 0 || row.onlineMonth === m;
    if (!monthOk) return false;

    if (!q) return true;
    return row._name_lc.includes(q) || row._5gb_lc.includes(q) || row._sc_lc.includes(q) || row._sw_lc.includes(q);
  });
});

// ---------- scroll behavior ----------
function scrollToBottom() {
  if (!bottom.value) return;
  // Avoid excessive scrolling for small lists
  if (filteredRows.value.length > 15) {
    bottom.value.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}
watch(filteredRows, () => nextTick(scrollToBottom));
onMounted(scrollToBottom);

// ---------- label/class helpers ----------
function free5gbClass(row) {
  const hasReq = row.selectfree5GB === "เพิ่มพื้นที่ (5 GB)";
  if (!hasReq && !row.Check5GB) return "NoService";
  if (hasReq && row.Check5GB === "Completed") return "Installed";
  if (hasReq && !row.Check5GB) return "Wait";
  return ""; // default
}
function free5gbLabel(row) {
  if (!row.selectfree5GB && !row.Check5GB) return "ไม่มีบริการ";
  return row.selectfree5GB || "เพิ่มพื้นที่ (5 GB)";
}

function searchConsoleClass(row) {
  if (row.onlineSearchConsole === "Installed") return "Installed";
  // empty / null / Wait => Wait
  if (!row.onlineSearchConsole || row.onlineSearchConsole === "Wait") return "Wait";
  return "";
}
function searchConsoleLabel(row) {
  const v = row.onlineSearchConsole;
  if (!v || v === "Wait") return "Search Console";
  if (v === "Installed") return "Search Console Installed";
  return row.selectfreeSearchConsole || "Search Console";
}

function smartWidgetClass(row) {
  const v = row.onlineSmartWidget;
  if (v === "Installed" || row.selectfreeSmartWidget === "Smart Widget") return "Installed";
  if (v === "Google Ads") return "Ads";
  if (v === "ไม่มีบริการ") return "NoService";
  if (v === "Wait") return "Wait";
  return "";
}
function smartWidgetLabel(row) {
  const v = row.onlineSmartWidget;
  if (v === "ไม่มีบริการ") return "ไม่มีบริการ";
  if (v === "Google Ads") return "Google Ads";
  if (v === "Installed") return "Smart Widget Installed";
  // If waiting but requested or empty → show requested label
  if (v === "Wait" && (row.selectfreeSmartWidget === "Smart Widget" || !row.selectfreeSmartWidget)) {
    return "Smart Widget";
  }
  return row.selectfreeSmartWidget || "Smart Widget";
}
</script>
