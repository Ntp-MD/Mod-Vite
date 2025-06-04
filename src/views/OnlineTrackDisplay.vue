<template>
  <template v-for="(months, year) in displayData" :key="year">
    <!-- Year row -->
    <div class="year-header" @click="toggleYear(year)">
      <div colspan="4">{{ year }}{{ collapsedYears[year] ? "➤" : "[-]" }}</div>
    </div>
    <div v-if="!collapsedYears[year]">
      <div v-for="(items, monthName) in months" :key="monthName">
        <div class="month-header" @click="toggleMonth(year, monthName)">
          <div colspan="4">{{ monthName }}{{ collapsedMonths[year] && collapsedMonths[year][monthName] ? "➤" : "[-]" }}</div>
        </div>
        <div v-if="!(collapsedMonths[year] && collapsedMonths[year][monthName])">
          <!-- No items -->
          <div v-if="items.length === 0">
            <div colspan="4">No entries for this month.</div>
          </div>
          <div v-for="(item, index) in items" :key="item.website || `${year}-${monthName}-${index}`">
            <div>{{ item.website }}</div>
            <div>{{ item.searchconsole }}</div>
            <div>{{ item.widget }}</div>
            <div>{{ item.onlineDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style>
.month-header {
  margin-left: 20px;
}
</style>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const listData = ref([]); // Define and initialize listData
const apiData = ref({});
const loading = ref(true);
const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const collapsedYears = ref({}); // e.g., { "2023": true }
const collapsedMonths = ref({}); // e.g., { "2023": { "Jan": true } }

onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios.get("http://localhost:3001/OnlineTrackGetData");
    // Ensure listData.value is an array.
    // If res.data is an array, use it. Otherwise, default to an empty array.
    listData.value = Array.isArray(res.data) ? res.data : [];
    apiData.value = res.data || {}; // Store the fetched object
  } catch (error) {
    console.error("Failed to fetch online track data:", error);
    listData.value = []; // Set to empty array on error to prevent issues with subsequent processing
    apiData.value = {}; // Set to empty object on error
  } finally {
    loading.value = false;
  }
});

const displayData = computed(() => {
  const sortedResult = {};
  if (!apiData.value || typeof apiData.value !== "object") {
    return sortedResult;
  }

  Object.keys(apiData.value)
    .sort((a, b) => parseInt(a) - parseInt(b)) // Sort years numerically
    .forEach((year) => {
      const yearData = apiData.value[year];
      if (yearData && typeof yearData === "object") {
        const sortedMonths = {};
        monthOrder.forEach((monthKey) => {
          if (Object.prototype.hasOwnProperty.call(yearData, monthKey) && Array.isArray(yearData[monthKey])) {
            sortedMonths[monthKey] = yearData[monthKey];
          }
        });
        if (Object.keys(sortedMonths).length > 0) {
          sortedResult[year] = sortedMonths;
        }
      }
    });
  return sortedResult;
});

const toggleYear = (year) => {
  collapsedYears.value[year] = !collapsedYears.value[year];
  // Optionally, when a year is collapsed, collapse all its months
  // Or, when expanded, restore previous month states or expand all
};

const toggleMonth = (year, monthName) => {
  if (!collapsedMonths.value[year]) {
    collapsedMonths.value[year] = {};
  }
  collapsedMonths.value[year][monthName] = !collapsedMonths.value[year][monthName];
};

// Initialize all years and months as expanded by default (or collapsed, as you prefer)
// For example, to start with all expanded:
// onMounted, after data is fetched, iterate through displayData and set collapsed states to false.
</script>
