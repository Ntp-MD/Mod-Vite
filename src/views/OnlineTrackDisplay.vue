<style>
.folderFile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.folderFile::before {
  display: block;
  content: "";
  background-image: url(/src/assets/icon/folder2.png);
  background-size: 100%;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  z-index: 1;
}

.folderYear::before {
  background-image: url(/src/assets/icon/folder.png);
}

.folderMonth::before {
  background-image: url(/src/assets/icon/folder2.png);
}

.folderWebsite::before {
  background-image: url(/src/assets/icon/folder.png);
}

.otd-year ul {
  margin: 10px 0;
}

.groupFile {
  position: relative;
  height: fit-content;
}

.groupFile::before {
  position: absolute;
  left: 10px;
  margin: auto;
  display: block;
  content: "";
  height: 100%;
  width: 1px;
  background: var(--border-color);
}

.subFolder {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.subFolder > div > div {
  color: #fff;
  border-radius: 3px;
  padding: 3px 10px;
  font-size: 12px;
}

.none {
  background: var(--status0);
}
.wait {
  background: var(--status1);
}
.complete {
  background: var(--status2);
}
</style>

<template>
  <div class="otd-year" v-for="(months, year) in displayData" :key="year">
    <div class="folderYear folderFile" @click="toggleYear(year)">{{ year }} {{ collapsedYears[year] ? "[-]" : "[-]" }}</div>
    <div class="groupFile" v-if="!collapsedYears[year]">
      <ul class="otd-month" v-for="(items, monthName) in months" :key="monthName">
        <div class="folderMonth folderFile" @click="toggleMonth(year, monthName)">
          {{ monthName }} {{ collapsedMonths[year] && collapsedMonths[year][monthName] ? "[-]" : "[-]" }}
        </div>
        <ul class="groupFile" v-if="!(collapsedMonths[year] && collapsedMonths[year][monthName])">
          <div class="groupFile" v-for="(item, index) in items" :key="item.website || `${year}-${monthName}-${index}`">
            <div class="folderWebsite folderFile">{{ item.website }}</div>
            <ul class="subFolder">
              <div class="folderFile">
                Search Console:
                <div :class="getClass(item.searchconsole)">{{ getText(item.searchconsole) }}</div>
              </div>
              <div class="folderFile">
                Smart Widget:
                <div :class="getClass(item.widget)">{{ getText(item.widget) }}</div>
              </div>
              <div class="folderFile">
                Package:
                <div :class="getClass(item.blank)">{{ getText(item.blank) }}</div>
              </div>
            </ul>
          </div>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const listData = ref([]);
const apiData = ref({});
const loading = ref(true);
const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const collapsedYears = ref({});
const collapsedMonths = ref({});

onMounted(async () => {
  loading.value = true;
  try {
    const res = await axios.get("http://localhost:3001/OnlineTrackGetData");

    listData.value = Array.isArray(res.data) ? res.data : [];
    apiData.value = res.data || {}; // Store the fetched object
  } catch (error) {
    console.error("Failed to fetch online track data:", error);
    listData.value = [];
    apiData.value = {};
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
    .sort((a, b) => parseInt(a) - parseInt(b))
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
};

const toggleMonth = (year, monthName) => {
  if (!collapsedMonths.value[year]) {
    collapsedMonths.value[year] = {};
  }
  collapsedMonths.value[year][monthName] = !collapsedMonths.value[year][monthName];
};

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
</script>
