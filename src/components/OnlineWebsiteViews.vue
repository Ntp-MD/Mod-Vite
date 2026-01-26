<template>
  <div class="online-website-view">
    <Loading v-if="ui.isLoading" />
    <!-- Main Content -->
    <main class="table-section">
      <div class="table-views">
        <table>
          <thead>
            <tr>
              <th style="width: 10%">Date</th>
              <th>Website Name</th>
              <th style="width: 15%">Space 5GB</th>
              <th style="width: 18%">Search Console</th>
              <th style="width: 18%">Smart Widget</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in displayedRows" :key="row.id">
              <td style="width: 10%">{{ row.selectOnlineDate }}</td>
              <td>{{ row.selectName }}</td>
              <td class="hasStatus" :class="free5gbClass(row)" style="width: 15%">
                {{ free5gbLabel(row) }}
              </td>
              <td class="hasStatus" :class="searchConsoleClass(row)" style="width: 18%">
                {{ searchConsoleLabel(row) }}
              </td>
              <td class="hasStatus" :class="smartWidgetClass(row)" style="width: 18%">
                {{ smartWidgetLabel(row) }}
              </td>
            </tr>
          </tbody>
        </table>
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
            <input type="search" class="search-input" placeholder="Search website..." v-model="searchQuery" autocomplete="off" />
          </form>
        </div>

        <!-- Year Filter -->
        <div class="filter-group">
          <label class="filter-label">Year</label>
          <div class="filter-options">
            <button :class="{ active: selectedYear === 0 }" @click="selectedYear = 0">All</button>
            <button v-for="year in availableYears" :key="year" :class="{ active: selectedYear === year }" @click="selectedYear = year">
              {{ year }}
            </button>
          </div>
        </div>

        <!-- Month Filter -->
        <div class="filter-group">
          <label class="filter-label">Month</label>
          <div class="filter-options">
            <button :class="{ active: selectedMonth === 0 }" @click="selectedMonth = 0">All</button>
            <button v-for="(name, i) in MONTH_NAMES" :key="i + 1" :class="{ active: selectedMonth === i + 1 }" @click="selectedMonth = i + 1">
              {{ name }}
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="filter-actions">
          <button v-if="hasActiveFilters" @click="resetFilters" class="btn-reset"><span>🔄</span> Reset</button>
          <button :class="['btn-toggle', { active: showLast100 }]" @click="showLast100 = !showLast100">
            {{ showLast100 ? "Last 100" : "All Records" }}
          </button>
        </div>

        <!-- Results Summary -->
        <div class="results-summary">
          <span class="result-count">{{ filteredRows.length }}</span>
          <span class="result-label">websites found</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import Loading from "@/ui/Loading.vue";
import { useOnlineWebsite } from "@/composables/useOnlineWebsite";

const {
  MONTH_NAMES,
  ui,
  selectedYear,
  selectedMonth,
  searchQuery,
  bottom,
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
</script>

<style scoped>
/* Main Layout */
.online-website-view {
  display: grid;
  grid-template-columns: 80% 1fr;
  gap: var(--gap2);
  height: 100%;
  overflow: hidden;
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
  flex: 0 0 auto;
  min-width: 60px;
  padding: 8px 14px;
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

.btn-toggle {
  background: var(--color3);
  border: 1px solid var(--border-color);
}

.btn-toggle.active {
  background: var(--primary);
  border-color: var(--primary-hover);
  color: #fff;
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

/* Table Section */
.table-section {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--border-radius);
}

.table-views {
  flex: 1;
  overflow: hidden;
  background: var(--color2);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .online-website-view {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .filter-sidebar {
    max-height: none;
  }

  .filter-section {
    padding: var(--gap2);
  }

  .filter-group {
    margin-bottom: var(--gap2);
  }
}

@media (max-width: 768px) {
  .filter-options {
    gap: 6px;
  }

  .filter-options button {
    min-width: 50px;
    padding: 6px 10px;
    font-size: 11px;
  }

  .search-input {
    font-size: 13px;
  }

  .result-count {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .online-website-view {
    gap: var(--gap);
  }

  .filter-sidebar {
    border-radius: 0;
  }

  .table-section {
    border-radius: 0;
  }
}
</style>
