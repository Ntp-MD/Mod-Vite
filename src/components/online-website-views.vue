<template>
  <div class="wrapper-container">
    <div class="wrapper-scroll">
      <div class="results-display">
        <div class="results-summary">
          <span class="result-label">websites</span>
          <span class="result-count">{{ filteredRows.length }}</span>
        </div>
        <div class="show-stat" @click="showWaiting = showWaiting === '5gb' ? '' : '5gb'">
          <span class="result-label">เพิ่มพื้นที่ 5GB</span>
          <span class="show-stat-count">{{ waitingSpace5GB }}</span>
          <div v-if="showWaiting === '5gb' && waitingList5GB.length" class="show-list">
            <div v-for="row in waitingList5GB" :key="row.id">{{ row.selectName }}</div>
          </div>
        </div>

        <div class="show-stat" @click="showWaiting = showWaiting === 'sc' ? '' : 'sc'">
          <span class="result-label">Search Console</span>
          <span class="show-stat-count">{{ waitingSearchConsole }}</span>
          <div v-if="showWaiting === 'sc' && waitingListSC.length" class="show-list">
            <div v-for="row in waitingListSC" :key="row.id">{{ row.selectName }}</div>
          </div>
        </div>

        <div class="show-stat" @click="showWaiting = showWaiting === 'sw' ? '' : 'sw'">
          <span class="result-label">Smart Widget</span>
          <span class="show-stat-count">{{ waitingSmartWidget }}</span>
          <div v-if="showWaiting === 'sw' && waitingListSW.length" class="show-list">
            <div v-for="row in waitingListSW" :key="row.id">{{ row.selectName }}</div>
          </div>
        </div>
      </div>
      <div class="table-views">
        <Loading v-if="isLoading" />
        <table v-else>
          <thead>
            <tr>
              <th>Date</th>
              <th>Website Name</th>
              <th>Space 5GB</th>
              <th>Search Console</th>
              <th>Smart Widget</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in displayedRows" :key="row.id">
              <td>{{ row.selectOnlineDate }}</td>
              <td>{{ row.selectName }}</td>
              <td class="hasStatus" :class="free5gbClass(row)">
                {{ free5gbLabel(row) }}
              </td>
              <td class="hasStatus" :class="searchConsoleClass(row)">
                {{ searchConsoleLabel(row) }}
              </td>
              <td class="hasStatus" :class="smartWidgetClass(row)">
                {{ smartWidgetLabel(row) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-container">
        <div class="pagination-info">Showing {{ displayFrom }}–{{ displayTo }} of {{ filteredCount }}</div>
        <div class="pagination-controls">
          <button :disabled="currentPage === 1" @click="goFirst" title="First Page">«</button>
          <button :disabled="currentPage === 1" @click="prevPage" title="Previous">‹</button>
          <button v-for="p in pageWindow" :key="p" :class="{ active: p === currentPage }" @click="gotoPage(p)">{{ p }}</button>
          <button :disabled="currentPage === totalPages" @click="nextPage" title="Next">›</button>
          <button :disabled="currentPage === totalPages" @click="goLast" title="Last Page">»</button>
        </div>
      </div>
    </div>
    <div class="filter-sidebar">
      <div class="filter-section">
        <div class="filter-title">Filters</div>

        <div class="filter-group">
          <label class="filter-label">Search</label>
          <form @submit.prevent>
            <input type="search" class="search-input" placeholder="Search website..." v-model="searchQuery" autocomplete="off" />
          </form>
        </div>
        <div class="filter-group">
          <label class="filter-label">Year</label>
          <div class="filter-options">
            <button :class="{ active: selectedYear === 0 }" @click="selectedYear = 0">All</button>
            <button v-for="year in availableYears" :key="year" :class="{ active: selectedYear === year }" @click="selectedYear = year">
              {{ year }}
            </button>
          </div>
        </div>
        <div class="filter-group">
          <label class="filter-label">Month</label>
          <div class="filter-options">
            <button :class="{ active: selectedMonth === 0 }" @click="selectedMonth = 0">All</button>
            <button v-for="(name, i) in MONTH_NAMES" :key="i + 1" :class="{ active: selectedMonth === i + 1 }" @click="selectedMonth = i + 1">
              {{ name }}
            </button>
          </div>
        </div>
        <div class="filter-group">
          <label class="filter-label">Per Page</label>
          <select class="dropdown" v-model.number="pageSize">
            <option :value="10">10 items</option>
            <option :value="20">20 items</option>
            <option :value="50">50 items</option>
            <option :value="100">100 items</option>
          </select>
        </div>
        <div class="filter-actions">
          <button v-if="hasActiveFilters" @click="resetFilters" class="btn-reset">Reset</button>
          <button :class="['btn-toggle', { active: showLast100 }]" @click="showLast100 = !showLast100">
            {{ showLast100 ? "Last 100" : "All Records" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOnlineWebsite } from "@/composables/useOnlineWebsite";
import { useLoading } from "@/composables/useLoading";
import Loading from "@/ui/Loading.vue";
import { ref, computed } from "vue";

const {
  MONTH_NAMES,
  selectedYear,
  selectedMonth,
  searchQuery,
  showLast100,
  currentPage,
  pageSize,
  availableYears,
  hasActiveFilters,
  filteredRows,
  displayedRows,
  filteredCount,
  totalPages,
  displayFrom,
  displayTo,
  pageWindow,
  resetFilters,
  gotoPage,
  nextPage,
  prevPage,
  goFirst,
  goLast,
  free5gbClass,
  free5gbLabel,
  searchConsoleClass,
  searchConsoleLabel,
  smartWidgetClass,
  smartWidgetLabel,
  waitingSpace5GB,
  waitingSearchConsole,
  waitingSmartWidget,
} = useOnlineWebsite();

const { isLoading } = useLoading({ duration: 5000, waitForData: displayedRows });

// State for showing show lists
const showWaiting = ref(""); // "5gb" | "sc" | "sw" | ""

// Computed lists for each show type
const waitingList5GB = computed(() => (filteredRows.value || []).filter((row) => row.selectfree5GB === "เพิ่มพื้นที่ (5 GB)" && !row.Check5GB));
const waitingListSC = computed(() =>
  (filteredRows.value || []).filter((row) => row.selectfreeSearchConsole && (!row.onlineSearchConsole || row.onlineSearchConsole === "Wait")),
);
const waitingListSW = computed(() =>
  (filteredRows.value || []).filter((row) => row.selectfreeSmartWidget === "Smart Widget" && row.onlineSmartWidget !== "Installed"),
);
</script>
