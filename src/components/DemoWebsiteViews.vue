<template>
  <div class="demo-website-view">
    <Loading v-if="ui.isLoading" />

    <!-- Main Content -->
    <main class="table-section">
      <div class="table-views">
        <table>
          <thead>
            <tr>
              <th style="width: 10%">ID</th>
              <th>Name</th>
              <th>Note</th>
              <th style="width: 15%">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in paginatedData" :key="row.id ?? idx">
              <td style="width: 10%">{{ row.id }}</td>
              <td>{{ row.column1 }}</td>
              <td>{{ row.column2 }}</td>
              <td :class="statusDetect(row.column3)" style="width: 15%">{{ row.column3 }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="pagination-footer">
        <div class="pagination-info">Showing {{ displayFrom }}–{{ displayTo }} of {{ filteredCount }}</div>
        <div class="pagination-controls">
          <button :disabled="currentPage === 1" @click="goFirst" title="First Page">«</button>
          <button :disabled="currentPage === 1" @click="prevPage" title="Previous">‹</button>
          <button v-for="p in pageWindow" :key="p" :class="{ active: p === currentPage }" @click="gotoPage(p)">{{ p }}</button>
          <button :disabled="currentPage === totalPages" @click="nextPage" title="Next">›</button>
          <button :disabled="currentPage === totalPages" @click="goLast" title="Last Page">»</button>
        </div>
      </div>
    </main>

    <!-- Filter Sidebar -->
    <aside class="filter-sidebar">
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
          <button v-if="hasActiveFilters" @click="resetAllFilters" class="btn-reset"><span>🔄</span> Reset All</button>
        </div>

        <!-- Results Summary -->
        <div class="results-summary">
          <span class="result-count">{{ filteredCount }}</span>
          <span class="result-label">demos found</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import Loading from "@/ui/Loading.vue";
import { useDemoWebsite } from "@/composables/useDemoWebsite";

const {
  ui,
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
</script>

<style scoped>
/* Main Layout */
.demo-website-view {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--gap2);
  height: 100%;
  overflow: hidden;
}

/* Table Section */
.table-section {
  display: flex;
  flex-direction: column;
  gap: var(--gap2);
  overflow: hidden;
}

.table-views {
  flex: 1;
  overflow: hidden;
  background: var(--color2);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

/* Pagination Footer */
.pagination-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap2);
  padding: var(--gap2);
  background: var(--color2);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.pagination-info {
  font-size: var(--font-4);
  color: var(--font-color);
  opacity: 0.8;
}

.pagination-controls {
  display: flex;
  gap: 6px;
  align-items: center;
}

.pagination-controls button {
  min-width: 36px;
  padding: 8px 12px;
  font-size: var(--font-4);
  background: var(--color3);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.pagination-controls button.active {
  background: var(--primary);
  border-color: var(--primary-hover);
  color: #fff;
  font-weight: 600;
}

.pagination-controls button:hover:not(:disabled):not(.active) {
  background: var(--btn-color);
  border-color: var(--font-color);
}

.pagination-controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Filter Sidebar */
.filter-sidebar {
  display: flex;
  flex-direction: column;
  background: var(--color2);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  overflow-y: auto;
}

.filter-section {
  padding: var(--gap2);
}

.filter-title {
  font-size: var(--font-1);
  font-weight: 600;
  margin-bottom: calc(var(--gap2) * 1.5);
  color: var(--font-color);
}

.filter-group {
  margin-bottom: calc(var(--gap2) * 1.5);
}

.filter-label {
  display: block;
  font-size: var(--font-4);
  font-weight: 600;
  color: var(--font-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--gap);
  opacity: 0.9;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-options button {
  flex: 1 1 auto;
  min-width: 70px;
  padding: 8px 12px;
  font-size: var(--font-4);
  background: var(--color3);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.filter-options button.active {
  background: var(--primary);
  border-color: var(--primary-hover);
  color: #fff;
  font-weight: 600;
}

.filter-options button:hover:not(.active) {
  background: var(--btn-color);
  border-color: var(--font-color);
  transform: translateY(-1px);
}

/* Search Input */
.search-input {
  width: 100%;
  padding: 10px var(--gap2);
  background: var(--color3);
  font-size: var(--font-4);
  transition: all 0.2s ease;
}

.search-input:focus {
  background: var(--color1);
  box-shadow: 0 0 0 2px var(--primary);
}

/* Dropdown */
.dropdown {
  width: 100%;
  padding: 10px var(--gap2);
  background: var(--color3);
  font-size: var(--font-4);
  cursor: pointer;
}

/* Filter Actions */
.filter-actions {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding-top: var(--gap2);
  border-top: 1px solid var(--border-color);
}

.btn-reset {
  background: var(--danger);
  border: 1px solid var(--danger-hover);
  font-weight: 600;
}

.btn-reset:hover {
  background: var(--danger-hover);
}

.btn-reset span {
  margin-right: 6px;
}

/* Results Summary */
.results-summary {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: var(--gap2);
  background: var(--color3);
  border-radius: var(--border-radius);
  margin-top: var(--gap2);
}

.result-count {
  font-size: var(--font-1);
  font-weight: 700;
  color: var(--primary);
}

.result-label {
  font-size: var(--font-4);
  color: var(--font-color);
  opacity: 0.7;
}

/* Status Classes */
.hasStatus {
  font-weight: 500;
  text-align: center;
}

.hasStatus.Service {
  color: var(--primary);
  background: rgba(37, 99, 235, 0.1);
}

.hasStatus.No {
  color: var(--danger);
  background: rgba(220, 38, 38, 0.1);
}

.hasStatus.Complete {
  color: var(--success);
  background: rgba(22, 163, 74, 0.1);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .demo-website-view {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .filter-sidebar {
    order: -1;
    max-height: none;
  }

  .pagination-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .pagination-info {
    text-align: center;
  }

  .pagination-controls {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .filter-options {
    gap: 6px;
  }

  .filter-options button {
    min-width: 60px;
    padding: 6px 10px;
    font-size: 10px;
  }

  .search-input {
    font-size: 13px;
  }

  .result-count {
    font-size: 20px;
  }

  .pagination-controls button {
    min-width: 32px;
    padding: 6px 8px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .demo-website-view {
    gap: var(--gap);
  }

  .filter-sidebar,
  .table-views,
  .pagination-footer {
    border-radius: 0;
  }

  .pagination-controls {
    flex-wrap: wrap;
  }
}
</style>
