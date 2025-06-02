<template>
  <table class="TableViews">
    <thead>
      <tr>
        <th>Website</th>
        <th>Search Console</th>
        <th>Widget</th>
        <th>Online Date</th>
      </tr>
    </thead>

    <template v-for="(months, year) in listData" :key="year">
      <!-- Loop through months within the current year -->
      <template v-for="(sites, month) in months" :key="`${year}-${month}`">
        <!-- Only render tbody if there are sites for this month -->
        <tbody v-if="sites && sites.length > 0">
          <!-- Header row for the month and year -->
          <tr class="month-header-row">
            <td :colspan="4">
              <strong>{{ month }} {{ year }}</strong>
            </td>
          </tr>
          <!-- Loop through sites for the current month -->
          <tr v-for="(item, idx) in sites" :key="`${year}-${month}-${idx}`">
            <td>{{ item.website }}</td>
            <td>{{ item.searchconsole }}</td>
            <td>{{ item.widget }}</td>
            <td>{{ item.onlineDate }}</td>
          </tr>
        </tbody>
      </template>
    </template>
  </table>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const listData = ref({}); // Initialize as an object for the nested data structure
const selectedYear = ref(null); // null represents "All Years"
const selectedMonth = ref(null); // null represents "All Months"

const yearOptions = computed(() => {
  return listData.value ? Object.keys(listData.value).sort((a, b) => parseInt(b) - parseInt(a)) : []; // Sort years descending
});

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthOptions = computed(() => {
  return monthNames;
});

const filteredDisplayData = computed(() => {
  const originalData = listData.value;
  if (!originalData || Object.keys(originalData).length === 0) {
    if (Object.keys(listData.value).length === 0 && !selectedYear.value && !selectedMonth.value) {
    }
    return {};
  }

  const result = {};
  const sy = selectedYear.value;
  const sm = selectedMonth.value;

  const yearsToProcess = sy ? [sy] : Object.keys(originalData).sort((a, b) => parseInt(a) - parseInt(b)); // Sort for consistent display order

  for (const year of yearsToProcess) {
    if (!originalData[year]) continue;

    const yearDataFromOriginal = originalData[year];

    const monthsToProcess = sm ? [sm] : monthNames;

    let yearHasVisibleData = false;
    const currentYearResultMonths = {};

    for (const month of monthsToProcess) {
      if (sm === month || (sm === null && yearDataFromOriginal[month])) {
        const sites = yearDataFromOriginal[month] || []; // Get sites or default to empty array
        currentYearResultMonths[month] = sites;

        if (sm === month || (sm === null && sites.length > 0)) {
          yearHasVisibleData = true;
        }
      }
    }

    if (yearHasVisibleData) {
      result[year] = currentYearResultMonths;
    }
  }
  return result;
});

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3001/OnlineTrackGetData");
    listData.value = res.data || {}; // Ensure listData is an object, even if API returns null/undefined
  } catch (error) {
    console.error("Failed to fetch online track data:", error);
    listData.value = {}; // Set to empty object on error to prevent issues
  }
});
</script>
