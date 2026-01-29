<template>
  <div class="table-view-container">
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
        <div class="filter-actions">
          <button v-if="hasActiveFilters" @click="resetFilters" class="btn-reset">Reset</button>
          <button :class="['btn-toggle', { active: showLast100 }]" @click="showLast100 = !showLast100">
            {{ showLast100 ? "Last 100" : "All Records" }}
          </button>
        </div>
        <div class="results-summary">
          <span class="result-count">{{ filteredRows.length }}</span>
          <span class="result-label">websites found</span>
        </div>

        <!-- Waiting Services Summary -->
        <div class="filter-group" style="margin-top: var(--gap2)">
          <label class="filter-label">รอดำเนินการ</label>
          <div class="waiting-stats">
            <div class="waiting-stat" @click="showWaiting = showWaiting === '5gb' ? '' : '5gb'" style="cursor: pointer">
              <span class="waiting-stat__icon">📦</span>
              <div class="waiting-stat__info">
                <span class="waiting-stat__label">เพิ่มพื้นที่ 5GB</span>
                <span class="waiting-stat__count">{{ waitingSpace5GB }}</span>
              </div>
            </div>
            <div v-if="showWaiting === '5gb' && waitingList5GB.length" class="waiting-list">
              <ul>
                <li v-for="row in waitingList5GB" :key="row.id">{{ row.selectName }} ({{ row.selectOnlineDate }})</li>
              </ul>
            </div>
            <div class="waiting-stat" @click="showWaiting = showWaiting === 'sc' ? '' : 'sc'" style="cursor: pointer">
              <span class="waiting-stat__icon">🔍</span>
              <div class="waiting-stat__info">
                <span class="waiting-stat__label">Search Console</span>
                <span class="waiting-stat__count">{{ waitingSearchConsole }}</span>
              </div>
            </div>
            <div v-if="showWaiting === 'sc' && waitingListSC.length" class="waiting-list">
              <ul>
                <li v-for="row in waitingListSC" :key="row.id">{{ row.selectName }} ({{ row.selectOnlineDate }})</li>
              </ul>
            </div>
            <div class="waiting-stat" @click="showWaiting = showWaiting === 'sw' ? '' : 'sw'" style="cursor: pointer">
              <span class="waiting-stat__icon">🔧</span>
              <div class="waiting-stat__info">
                <span class="waiting-stat__label">Smart Widget</span>
                <span class="waiting-stat__count">{{ waitingSmartWidget }}</span>
              </div>
            </div>
            <div v-if="showWaiting === 'sw' && waitingListSW.length" class="waiting-list">
              <ul>
                <li v-for="row in waitingListSW" :key="row.id">{{ row.selectName }} ({{ row.selectOnlineDate }})</li>
              </ul>
            </div>
          </div>
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
  availableYears,
  hasActiveFilters,
  filteredRows,
  displayedRows,
  resetFilters,
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

// State for showing waiting lists
const showWaiting = ref(""); // "5gb" | "sc" | "sw" | ""

// Computed lists for each waiting type
const waitingList5GB = computed(() => (filteredRows.value || []).filter((row) => row.selectfree5GB === "เพิ่มพื้นที่ (5 GB)" && !row.Check5GB));
const waitingListSC = computed(() =>
  (filteredRows.value || []).filter((row) => row.selectfreeSearchConsole && (!row.onlineSearchConsole || row.onlineSearchConsole === "Wait")),
);
const waitingListSW = computed(() =>
  (filteredRows.value || []).filter((row) => row.selectfreeSmartWidget === "Smart Widget" && row.onlineSmartWidget !== "Installed"),
);
</script>

<style scoped>
.waiting-stats {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.waiting-stat {
  display: flex;
  align-items: center;
  gap: var(--gap);
  padding: var(--gap);
  background: var(--color3);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  transition: all var(--transition);
}

.waiting-stat:hover {
  background: var(--color2);
  border-color: var(--primary);
}

.waiting-stat__icon {
  font-size: var(--font-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size2);
  height: var(--icon-size2);
}

.waiting-stat__info {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap) * 0.3);
  flex: 1;
}

.waiting-stat__label {
  font-size: var(--font-xs);
  color: var(--font-color);
  opacity: 0.7;
  font-weight: 500;
}

.waiting-stat__count {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--warning);
}

.waiting-list {
  background: var(--color1);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin: 0.5em 0 1em 2em;
  padding: 0.5em 1em;
  font-size: var(--font-sm);
  color: var(--font-color);
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.waiting-list ul {
  margin: 0;
  padding: 0;
  list-style: disc inside;
}

.waiting-list li {
  margin: 0.2em 0;
  padding: 0;
}
</style>
