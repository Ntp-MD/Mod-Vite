import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, type Ref } from "vue";
import Papa from "papaparse";
import axios from "axios";
import { useStoreLoading } from "~/stores/useLoading";
import { useUiStore } from "~/stores/ui";

interface OnlineRow {
  id: number;
  selectName: string;
  selectOnlineDate: string;
  selectfree5GB: string;
  selectfreeSearchConsole: string;
  selectfreeSmartWidget: string;
  onlineSearchConsole: string;
  onlineSmartWidget: string;
  Check5GB: string;
  onlineMonth: number;
  onlineYear: number;
  _name_lc: string;
  demoWebsite: string;
  _5gb_lc: string;
  _sc_lc: string;
  _sw_lc: string;
}

const MONTH_NAMES: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function useOnlineWebsite() {
  const { showLoading, hideLoading } = useStoreLoading();
  const ui = useUiStore();
  const controller = new AbortController();

  const sheetRows = ref<OnlineRow[]>([]);
  const selectedYear = ref(0);
  const selectedMonth = ref(0);
  const searchQuery = ref("");
  const debouncedQuery = ref("");
  const bottom = ref<HTMLElement | null>(null);
  const showLast100 = ref(false);
  const currentPage = ref(1);
  const pageSize = ref(100);

  const GOOGLE_SHEET_CSV_URL =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbhLBcw4jg80ogDxEeLs5wRrsQdFrWoN0g8OGy3aO_YJ0UoL-BIhuY8EozSzuTXppIIbfqp100FYIZ/pub?gid=1419480009&single=true&output=csv",
    );

  // Dynamic year list
  const availableYears = computed(() => {
    const years = new Set<number>();
    sheetRows.value.forEach((row) => {
      if (row.onlineYear > 0) years.add(row.onlineYear);
    });
    return Array.from(years).sort((a, b) => b - a);
  });

  // Filter state check
  const hasActiveFilters = computed(() => {
    return selectedYear.value !== 0 || selectedMonth.value !== 0 || debouncedQuery.value !== "";
  });

  // Reset filters
  function resetFilters() {
    selectedYear.value = 0;
    selectedMonth.value = 0;
    searchQuery.value = "";
    debouncedQuery.value = "";
  }

  // Debounce search
  let t: ReturnType<typeof setTimeout> | null = null;
  watch(searchQuery, (v: string) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => (debouncedQuery.value = (v || "").toLowerCase().trim()), 200);
  });

  // Normalize functions
  const norm = (v: unknown): string => String(v ?? "").trim();
  const lc = (v: unknown): string => norm(v).toLowerCase();

  function normalizeRow(r: Record<string, string>, id: number): OnlineRow {
    const monthNum = Number(norm(r["Month"])) || 0;
    const selectName = norm(r["Name"]);
    const onlineDate = norm(r["OnlineDate"]);
    const demoWebsite = norm(r["DemoWebsite"]);

    let yearNum = 0;
    const yearMatch = onlineDate.match(/\d{4}/);
    if (yearMatch) {
      yearNum = Number(yearMatch[0]);
    }

    return {
      id,
      selectName,
      selectOnlineDate: onlineDate,
      selectfree5GB: norm(r["Free5GB"]),
      selectfreeSearchConsole: norm(r["FreeSearchConsole"]),
      selectfreeSmartWidget: norm(r["FreeSmartWidget"]),
      onlineSearchConsole: norm(r["OnlineSearchConsole"]),
      onlineSmartWidget: norm(r["OnlineSmartWidget"]),
      Check5GB: norm(r["Check5GB"]),
      onlineMonth: monthNum,
      onlineYear: yearNum,
      _name_lc: lc(r["Name"]),
      demoWebsite: lc(r["DemoWebsite"]),
      _5gb_lc: lc(r["Free5GB"]),
      _sc_lc: lc(r["FreeSearchConsole"]),
      _sw_lc: lc(r["FreeSmartWidget"]),
    };
  }

  // Fetch data
  async function fetchData() {
    showLoading();
    try {
      const res = await axios.get(GOOGLE_SHEET_CSV_URL, {
        responseType: "text",
        signal: controller.signal,
      });

      Papa.parse(res.data as string, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data }: Papa.ParseResult<Record<string, string>>) => {
          let id = 1;
          sheetRows.value = data.filter((r: Record<string, string>) => r?.Name).map((r: Record<string, string>) => normalizeRow(r, id++));
          hideLoading();
        },
      });
    } catch {
      sheetRows.value = [];
      hideLoading();
    }
  }

  // Filtering
  const filteredRows = computed(() => {
    const y = selectedYear.value;
    const m = selectedMonth.value;
    const q = debouncedQuery.value;

    if (y === 0 && m === 0 && !q) return sheetRows.value;

    return sheetRows.value.filter((row) => {
      const yearOk = y === 0 || row.onlineYear === y;
      if (!yearOk) return false;

      const monthOk = m === 0 || row.onlineMonth === m;
      if (!monthOk) return false;

      if (!q) return true;
      return row._name_lc.includes(q) || row._5gb_lc.includes(q) || row._sc_lc.includes(q) || row._sw_lc.includes(q);
    });
  });

  // Display rows with pagination
  const displayedRows = computed(() => {
    const rows = filteredRows.value;
    const filtered = !showLast100.value ? rows : rows.slice(-100);
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filtered.slice(start, end);
  });

  // Pagination helpers
  const filteredCount = computed(() => {
    const rows = filteredRows.value;
    return !showLast100.value ? rows.length : rows.slice(-100).length;
  });

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredCount.value / pageSize.value || 1)));

  watch([filteredCount, pageSize], () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
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
  function gotoPage(p: number): void {
    if (p >= 1 && p <= totalPages.value) currentPage.value = p;
  }
  function nextPage(): void {
    if (currentPage.value < totalPages.value) currentPage.value++;
  }
  function prevPage(): void {
    if (currentPage.value > 1) currentPage.value--;
  }
  function goFirst(): void {
    currentPage.value = 1;
  }
  function goLast(): void {
    currentPage.value = totalPages.value;
  }

  // Reset page when filters change
  watch(filteredRows, () => {
    currentPage.value = 1;
  });

  // Reset page when toggling Last 100
  watch(showLast100, () => {
    currentPage.value = 1;
  });

  // Count waiting/pending services
  const waitingSpace5GB = computed(() => {
    return filteredRows.value.filter((row) => {
      const hasReq = row.selectfree5GB === "เพิ่มพื้นที่ (5 GB)";
      return hasReq && !row.Check5GB;
    }).length;
  });

  const waitingSearchConsole = computed(() => {
    return filteredRows.value.filter((row) => {
      return row.selectfreeSearchConsole && (!row.onlineSearchConsole || row.onlineSearchConsole === "Wait");
    }).length;
  });

  const waitingSmartWidget = computed(() => {
    return filteredRows.value.filter((row) => {
      return row.selectfreeSmartWidget === "Smart Widget" && row.onlineSmartWidget !== "Installed";
    }).length;
  });

  // Scroll behavior
  function scrollToBottom(): void {
    if (!bottom.value) return;
    if (filteredRows.value.length > 15) {
      bottom.value.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }

  watch(filteredRows, () => nextTick(scrollToBottom));

  // Status helpers
  function free5gbClass(row: OnlineRow): string {
    const hasReq = row.selectfree5GB === "เพิ่มพื้นที่ (5 GB)";
    if (!hasReq && !row.Check5GB) return "NoService";
    if (hasReq && row.Check5GB === "Completed") return "Installed";
    if (hasReq && !row.Check5GB) return "Wait";
    return "";
  }

  function free5gbLabel(row: OnlineRow): string {
    if (!row.selectfree5GB && !row.Check5GB) return "ไม่มีบริการ";
    return row.selectfree5GB || "เพิ่มพื้นที่ (5 GB)";
  }

  function searchConsoleClass(row: OnlineRow): string {
    if (row.onlineSearchConsole === "Installed") return "Installed";
    if (!row.onlineSearchConsole || row.onlineSearchConsole === "Wait") return "Wait";
    return "";
  }

  function searchConsoleLabel(row: OnlineRow): string {
    const v = row.onlineSearchConsole;
    if (!v || v === "Wait") return "Search Console";
    if (v === "Installed") return "Search Console Installed";
    return row.selectfreeSearchConsole || "Search Console";
  }

  function smartWidgetClass(row: OnlineRow): string {
    const v = row.onlineSmartWidget;
    if (v === "Installed" || row.selectfreeSmartWidget === "Smart Widget") return "Installed";
    if (v === "Google Ads") return "Ads";
    if (v === "ไม่มีบริการ") return "NoService";
    if (v === "Wait") return "Wait";
    return "";
  }

  function smartWidgetLabel(row: OnlineRow): string {
    const v = row.onlineSmartWidget;
    if (v === "ไม่มีบริการ") return "ไม่มีบริการ";
    if (v === "Google Ads") return "Google Ads";
    if (v === "Installed") return "Smart Widget Installed";
    if (v === "Wait" && (row.selectfreeSmartWidget === "Smart Widget" || !row.selectfreeSmartWidget)) {
      return "Smart Widget";
    }
    return row.selectfreeSmartWidget || "Smart Widget";
  }

  onMounted(() => {
    fetchData();
    scrollToBottom();
  });

  onBeforeUnmount(() => controller.abort());

  return {
    MONTH_NAMES,
    ui,
    sheetRows,
    selectedYear,
    selectedMonth,
    searchQuery,
    debouncedQuery,
    bottom,
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
    scrollToBottom,
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
  };
}
