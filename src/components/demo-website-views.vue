<template>
  <div class="wrapper-container">
    <div class="wrapper-scroll">
      <div class="results-display">
        <div class="results-summary">
          <span class="result-count">{{ filteredCount }}</span>
          <span class="result-label">demos found</span>
        </div>
      </div>
      <div class="table-views">
        <Loading v-if="isLoading" />
        <table v-else>
          <thead>
            <tr>
              <th>Name</th>
              <th>Note</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in paginatedData" :key="row.id ?? idx">
              <td>{{ row.column1 }}</td>
              <td>{{ row.column2 }}</td>
              <td :class="statusDetect(row.column3)">{{ row.column3 }}</td>
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

        <!-- Search -->
        <div class="filter-group">
          <label class="filter-label">Search</label>
          <form @submit.prevent>
            <input type="search" class="search-input" placeholder="Search demo..." v-model="searchQuery" autocomplete="off" />
          </form>
        </div>

        <!-- ID Range Filter -->
        <div class="filter-group">
          <label class="filter-label">ID Range</label>
          <div class="filter-options">
            <button :class="{ active: isRangeActive(null, null) }" @click="clearFilter">All</button>
            <button :class="{ active: isRangeActive(1, 199) }" @click="filterRange(1, 199)">1–199</button>
            <button :class="{ active: isRangeActive(200, 399) }" @click="filterRange(200, 399)">200–399</button>
            <button :class="{ active: isRangeActive(400, 599) }" @click="filterRange(400, 599)">400–599</button>
            <button :class="{ active: isRangeActive(600, 800) }" @click="filterRange(600, 800)">600–800</button>
          </div>
        </div>

        <!-- Page Size -->
        <div class="filter-group">
          <label class="filter-label">Per Page</label>
          <select class="dropdown" v-model.number="pageSize">
            <option :value="10">10 items</option>
            <option :value="20">20 items</option>
            <option :value="50">50 items</option>
            <option :value="100">100 items</option>
          </select>
        </div>

        <!-- Actions -->
        <div class="filter-actions">
          <button v-if="hasActiveFilters" @click="resetAllFilters" class="btn-reset">Reset All</button>
        </div>

        <!-- Results Summary -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDemoWebsite } from "@/composables/useDemoWebsite";
import { useLoading } from "@/composables/useLoading";
import Loading from "@/ui/Loading.vue";

const {
  searchQuery,
  currentPage,
  pageSize,
  hasActiveFilters,
  filteredCount,
  totalPages,
  paginatedData,
  displayFrom,
  displayTo,
  pageWindow,
  filterRange,
  clearFilter,
  isRangeActive,
  resetAllFilters,
  gotoPage,
  nextPage,
  prevPage,
  goFirst,
  goLast,
  statusDetect,
} = useDemoWebsite();

const { isLoading } = useLoading(1200);
</script>
