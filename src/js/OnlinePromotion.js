import axios from "axios";

export default {
  data() {
    return {
      currentSites: [],
      waitingSites: [],
      completeSites: [],
      selectedCurrentSiteNames: [],
      selectedWaitingSiteNames: [],
      selectedCompleteSiteNames: [],
      newCurrentSite: "",
      searchQuery: "",
    };
  },

  computed: {
    // Sorted from oldest to newest
    sortedCurrentSites() {
      return [...this.currentSites].sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
    },
    sortedWaitingSites() {
      return [...this.waitingSites].sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
    },
    sortedCompleteSites() {
      return [...this.completeSites].sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
    },

    filteredCurrentSites() {
      return this.sortedCurrentSites.filter((site) => site.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    filteredWaitingSites() {
      return this.sortedWaitingSites.filter((site) => site.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    filteredCompleteSites() {
      return this.sortedCompleteSites.filter((site) => site.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },

    isAllCurrentSelected() {
      return this.currentSites.length > 0 && this.selectedCurrentSiteNames.length === this.currentSites.length;
    },
    isAllWaitingSelected() {
      return this.waitingSites.length > 0 && this.selectedWaitingSiteNames.length === this.waitingSites.length;
    },
    isAllCompleteSelected() {
      return this.completeSites.length > 0 && this.selectedCompleteSiteNames.length === this.completeSites.length;
    },
  },

  watch: {
    currentSites: {
      handler(newVal) {
        localStorage.setItem("promoApp_currentSites", JSON.stringify(newVal));
      },
      deep: true,
    },
    waitingSites: {
      handler(newVal) {
        localStorage.setItem("promoApp_waitingSites", JSON.stringify(newVal));
      },
      deep: true,
    },
    completeSites: {
      handler(newVal) {
        localStorage.setItem("promoApp_completeSites", JSON.stringify(newVal));
      },
      deep: true,
    },
  },

  mounted() {
    const rawLocalCurrent = localStorage.getItem("promoApp_currentSites");
    const rawLocalWaiting = localStorage.getItem("promoApp_waitingSites");
    const rawLocalComplete = localStorage.getItem("promoApp_completeSites");

    if (rawLocalCurrent !== null || rawLocalWaiting !== null || rawLocalComplete !== null) {
      console.log("Loading data from localStorage.");
      this.currentSites = (JSON.parse(rawLocalCurrent) || []).filter((site) => site && site.name);
      this.waitingSites = (JSON.parse(rawLocalWaiting) || []).filter((site) => site && site.name);
      this.completeSites = (JSON.parse(rawLocalComplete) || []).filter((site) => site && site.name);
    } else {
      console.log("No localStorage data. Loading from server.");
      axios
        .get("http://localhost:3001/data")
        .then((res) => {
          const data = res.data;
          this.currentSites = data.Current || [];
          this.waitingSites = data.Waiting || [];
          this.completeSites = data.Complete || [];
        })
        .catch((err) => {
          console.error("Error loading from server:", err);
        });
    }
  },

  methods: {
    isMatch(name) {
      return this.searchQuery && name.toLowerCase().includes(this.searchQuery.toLowerCase());
    },
    toggleSelectAll(group) {
      switch (group) {
        case "current":
          this.selectedCurrentSiteNames = this.isAllCurrentSelected ? [] : this.currentSites.map((site) => site.name);
          break;
        case "waiting":
          this.selectedWaitingSiteNames = this.isAllWaitingSelected ? [] : this.waitingSites.map((site) => site.name);
          break;
        case "complete":
          this.selectedCompleteSiteNames = this.isAllCompleteSelected ? [] : this.completeSites.map((site) => site.name);
          break;
      }
    },

    _moveSelectedItems(sourceArrayName, destinationArrayName, selectedNamesArrayName) {
      const selectedNames = this[selectedNamesArrayName];
      if (selectedNames.length === 0) return;

      const selectedSites = this[sourceArrayName].filter((site) => selectedNames.includes(site.name));

      const itemsToAdd = selectedSites.filter((item) => !this[destinationArrayName].some((site) => site.name === item.name));

      this[destinationArrayName].push(...itemsToAdd);

      this[sourceArrayName] = this[sourceArrayName].filter((site) => !selectedNames.includes(site.name));

      this[selectedNamesArrayName] = [];
    },

    moveSelectedFromCurrentToWaiting() {
      this._moveSelectedItems("currentSites", "waitingSites", "selectedCurrentSiteNames");
      this.syncToServer();
    },
    moveSelectedFromWaitingToCurrent() {
      this._moveSelectedItems("waitingSites", "currentSites", "selectedWaitingSiteNames");
      this.syncToServer();
    },

    moveSelectedFromWaitingToComplete() {
      this._moveSelectedItems("waitingSites", "completeSites", "selectedWaitingSiteNames");
      this.syncToServer();
    },

    moveSelectedFromCompleteToWaiting() {
      this._moveSelectedItems("completeSites", "waitingSites", "selectedCompleteSiteNames");
      this.syncToServer();
    },

    clearSelectedFromAll() {
      this.currentSites = this.currentSites.filter((site) => !this.selectedCurrentSiteNames.includes(site.name));
      this.waitingSites = this.waitingSites.filter((site) => !this.selectedWaitingSiteNames.includes(site.name));
      this.completeSites = this.completeSites.filter((site) => !this.selectedCompleteSiteNames.includes(site.name));

      this.selectedCurrentSiteNames = [];
      this.selectedWaitingSiteNames = [];
      this.selectedCompleteSiteNames = [];

      this.syncToServer();
    },

    addNewCurrentSite() {
      const site = this.newCurrentSite.trim().toLowerCase();
      const allSiteNames = [...this.currentSites, ...this.waitingSites, ...this.completeSites].map((s) => s.name.toLowerCase());
      if (site && !allSiteNames.includes(site)) {
        this.currentSites.push({
          name: site,
          addedAt: new Date().toISOString(),
        });
        this.newCurrentSite = "";
        this.syncToServer();
      }
    },

    syncToServer() {
      const updatedData = {
        Current: this.currentSites,
        Waiting: this.waitingSites,
        Complete: this.completeSites,
      };
      axios
        .post("http://localhost:3001/update-data", updatedData)
        .then(() => {
          console.log("Data synced to server.");
        })
        .catch((err) => {
          console.error("Sync failed:", err);
        });
    },
  },
};
