import { ref, computed, watch, onMounted } from "vue";
import Papa from "papaparse";
import axios from "axios";
import { useLoading } from "@/stores/useLoading";
import { useUiStore } from "@/stores/ui";

export function useDemoWebsite() {
  const { showLoading, hideLoading } = useLoading();
  const ui = useUiStore();

  const sheetRows = ref([]);
  const searchQuery = ref("");
  const filterMin = ref(null);
  const filterMax = ref(null);
  const currentPage = ref(1);
  const pageSize = ref(100);

  const GOOGLE_SHEET_CSV_URL =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRM5lsZMJ-EGwUcT-XurRjV54V2Tnf2n7MYK0kgp7L6nROAl8clWcsZPAq8cidyIijawHVjIHa93pRg/pub?gid=1303784359&single=true&output=csv",
    );

  // Fetch data
  async function fetchData() {
    showLoading();
    try {
      const res = await axios.get(GOOGLE_SHEET_CSV_URL, { responseType: "text" });
      Papa.parse(res.data, {
        header: true,
        complete: (results) => {
          sheetRows.value = results.data
            .filter((row) => row.Name)
            .map((row, idx) => ({
              id: idx + 1,
              column1: row.Name || "",
              column2: row.Note || "",
              column3: row.Status || "",
            }));
          hideLoading();
        },
      });
    } catch (err) {
      sheetRows.value = [];
      hideLoading();
    }
  }

  // Filter range
  function filterRange(min, max) {
    filterMin.value = min;
    filterMax.value = max;
  }

  function clearFilter() {
    filterMin.value = null;
    filterMax.value = null;
  }

  function isRangeActive(min, max) {
    return filterMin.value === min && filterMax.value === max;
  }

  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return searchQuery.value !== "" || (filterMin.value !== null && filterMax.value !== null);
  });

  // Reset all filters
  function resetAllFilters() {
    searchQuery.value = "";
    clearFilter();
  }

  // Core filtered list
  const filteredData = computed(() => {
    return sheetRows.value
      .filter((item) => {
        const query = (searchQuery.value || "").toLowerCase();
        const matchesSearch =
          item.column1.toLowerCase().includes(query) || item.column2.toLowerCase().includes(query) || item.column3.toLowerCase().includes(query);

        const idNum = Number(item.id);
        const inRange = (filterMin.value === null && filterMax.value === null) || (idNum >= filterMin.value && idNum <= filterMax.value);

        return matchesSearch && inRange;
      })
      .sort((a, b) => a.id - b.id);
  });

  // Keep page in bounds when filters change
  watch([filteredData, pageSize], () => {
    currentPage.value = 1;
  });

  // Pagination
  const filteredCount = computed(() => filteredData.value.length);
  const totalPages = computed(() => Math.max(1, Math.ceil(filteredData.value.length / pageSize.value || 1)));

  watch([filteredCount, pageSize], () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
  });

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredData.value.slice(start, end);
  });

  const displayFrom = computed(() => (filteredCount.value === 0 ? 0 : (currentPage.value - 1) * pageSize.value + 1));
  const displayTo = computed(() => Math.min(currentPage.value * pageSize.value, filteredCount.value));

  const pageWindow = computed(() => {
    const span = 2;
    const start = Math.max(1, currentPage.value - span);
    const end = Math.min(totalPages.value, currentPage.value + span);
    const arr = [];
    for (let p = start; p <= end; p++) arr.push(p);
    return arr;
  });

  // Pagination controls
  function gotoPage(p) {
    if (p >= 1 && p <= totalPages.value) currentPage.value = p;
  }
  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++;
  }
  function prevPage() {
    if (currentPage.value > 1) currentPage.value--;
  }
  function goFirst() {
    currentPage.value = 1;
  }
  function goLast() {
    currentPage.value = totalPages.value;
  }

  // Status detection
  function statusDetect(value) {
    if (!value) return "";
    if (value.includes("Reserve")) return "hasStatus Service";
    if (value.includes("Abort")) return "hasStatus No";
    if (value.includes("Available")) return "hasStatus Complete";
    return "";
  }

  onMounted(fetchData);

  return {
    ui,
    sheetRows,
    searchQuery,
    filterMin,
    filterMax,
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
  };
}
