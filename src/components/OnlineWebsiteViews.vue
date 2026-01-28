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
    <aside class="filter-sidebar">
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
          <button v-if="hasActiveFilters" @click="resetFilters" class="btn-reset"><span>🔄</span> Reset</button>
          <button :class="['btn-toggle', { active: showLast100 }]" @click="showLast100 = !showLast100">
            {{ showLast100 ? "Last 100" : "All Records" }}
          </button>
        </div>
        <div class="results-summary">
          <span class="result-count">{{ filteredRows.length }}</span>
          <span class="result-label">websites found</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useOnlineWebsite } from "@/composables/useOnlineWebsite";
import { useLoading } from "@/composables/useLoading";
import Loading from "@/ui/Loading.vue";

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
} = useOnlineWebsite();

const { isLoading } = useLoading({ duration: 5000, waitForData: displayedRows });
</script>
