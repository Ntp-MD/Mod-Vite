<style>
.TableViews {
  color: var(--ui-font);
}
/*
.none {
  background: var(--status0);
}
.wait {
  background: var(--status1);
}
.complete {
  background: var(--status2);
}
  */
</style>

<template>
  <div v-if="!loading">
    <table class="TableViews">
      <thead>
        <tr>
          <th>Website</th>
          <th>Search Console</th>
          <th>Smart Widget</th>
          <th>Package</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(months, year) in displayData" :key="year">
          <!-- Year Heading -->
          <tr class="year-heading">
            <td colspan="5">{{ year }}</td>
          </tr>

          <template v-for="(items, monthName) in months" :key="monthName">
            <!-- Month Heading -->
            <tr class="month-heading">
              <td colspan="5">{{ shortMonthName(monthName) }}</td>
            </tr>

            <!-- Data Rows -->
            <tr v-for="(item, index) in items" :key="item.website || `${year}-${monthName}-${index}`">
              <td>{{ item.website }}</td>
              <td :class="getClass(item.searchconsole)">{{ getText(item.searchconsole) }}</td>
              <td :class="getClass(item.widget)">{{ getText(item.widget) }}</td>
              <td :class="getClass(item.blank)">{{ getText(item.blank) }}</td>
              <td>{{ item.onlineDate }}</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const apiData = ref({});
const loading = ref(true);

const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios.get("http://localhost:3001/OnlineTrackGetData");
    apiData.value = res.data || {};
  } catch (error) {
    console.error("Failed to fetch data:", error);
    apiData.value = {};
  } finally {
    loading.value = false;
  }
});

const displayData = computed(() => {
  const sortedResult = {};
  Object.keys(apiData.value || {})
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach((year) => {
      const yearData = apiData.value[year];
      const sortedMonths = {};
      monthOrder.forEach((month) => {
        if (Array.isArray(yearData?.[month])) {
          sortedMonths[month] = yearData[month];
        }
      });
      if (Object.keys(sortedMonths).length) {
        sortedResult[year] = sortedMonths;
      }
    });
  return sortedResult;
});

const getClass = (value) => {
  if (value === "0") return "none";
  if (value === "1") return "wait";
  if (value === "2") return "complete";
  return "";
};

const getText = (value) => {
  if (value === "0") return "Not Service";
  if (value === "1") return "Installed";
  if (value === "2") return "Complete";
  return "Unknown";
};

const shortMonthName = (full) => full.slice(0, 3);
</script>
