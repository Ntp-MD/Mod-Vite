<script setup>
import { ref, onMounted, computed } from "vue";
import Papa from "papaparse";
import axios from "axios";

const loading = ref(true);
const sheetRows = ref([]);
const selectedMonth = ref("All");

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
        sheetRows.value = results.data.filter((row) => row["Name"]);
      },
    });
  } catch (e) {
    sheetRows.value = [];
  } finally {
    loading.value = false;
  }
});

const filteredRows = computed(() => {
  if (selectedMonth.value === "All") return sheetRows.value;
  return sheetRows.value.filter((row) => String(row["Month"]).trim() === selectedMonth.value);
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
            <a :href="'http://' + row['Name']" target="_blank">{{ row["Name"] }}</a>
          </td>
          <td class="Status" :class="statusDetect(row['Search Console'])">
            {{ row["Search Console"] }}
          </td>
          <td class="Status" :class="statusDetect(row['Smart Widget'])">
            {{ row["Smart Widget"] }}
          </td>
          <td>{{ row["Online Date"] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>Loading...</div>
</template>

<style>
.Status {
}

.Status.Ads {
}

.Status.Installed {
}

.Status.Wait {
}

.Status.None {
}
</style>
