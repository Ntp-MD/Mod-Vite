<template>
  <div class="PromoPanel">
    <div class="CurrentCard">
      <div class="list-title">
        Current Card
        <div class="selectAll">
          <input type="checkbox" :checked="isAllCurrentSelected" @change="toggleSelectAll('current')" id="select-all-current" />
          <label for="select-all-current">Select All</label>
        </div>
      </div>
      <div class="list-group">
        <div v-for="site in currentSites" :key="'current-' + site" class="list-item">
          <input type="checkbox" :value="site" v-model="selectedCurrentSites" :id="'current-' + site.replace(/\./g, '-')" />
          <label :for="'current-' + site.replace(/\./g, '-')">{{ site }}</label>
        </div>
      </div>
      <div class="add-box">
        <input v-model="newCurrentSite" placeholder="Enter new site" />
      </div>
      <div class="action-button" @click="addNewCurrentSite">Add</div>
    </div>
    <div class="SwapCard">
      <div @click="moveSelectedFromCurrentToWaiting">Next</div>
      <div @click="moveSelectedFromWaitingToCurrent">Back</div>
    </div>
    <div class="WaitingCard">
      <div class="list-title">
        Waiting Card
        <div class="selectAll">
          <input type="checkbox" :checked="isAllWaitingSelected" @change="toggleSelectAll('waiting')" id="select-all-waiting" />
          <label for="select-all-waiting">Select All</label>
        </div>
      </div>
      <div class="list-group">
        <div v-for="site in waitingSites" :key="'waiting-' + site" class="list-item">
          <input type="checkbox" :value="site" v-model="selectedWaitingSites" :id="'waiting-' + site.replace(/\./g, '-')" />
          <label :for="'waiting-' + site.replace(/\./g, '-')">{{ site }}</label>
        </div>
      </div>
    </div>
    <div class="SwapCard">
      <div @click="moveSelectedFromWaitingToComplete">Next</div>
      <div @click="moveSelectedFromCompleteToWaiting">Back</div>
    </div>
    <div class="CompleteCard">
      <div class="list-title">
        Complete Card
        <div class="selectAll">
          <input type="checkbox" :checked="isAllCompleteSelected" @change="toggleSelectAll('complete')" id="select-all-complete" />
          <label for="select-all-complete">Select All</label>
        </div>
      </div>
      <div class="list-group">
        <div v-for="site in completeSites" :key="'complete-' + site" class="list-item">
          <input type="checkbox" :value="site" v-model="selectedCompleteSites" :id="'complete-' + site.replace(/\./g, '-')" />
          <label :for="'complete-' + site.replace(/\./g, '-')">{{ site }}</label>
        </div>
      </div>
      <div class="action-button" @click="clearAllComplete">Clear Select</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentSites: [],
      waitingSites: [],
      completeSites: [],
      selectedCurrentSites: [],
      selectedWaitingSites: [],
      selectedCompleteSites: [],
      newCurrentSite: "",
    };
  },

  computed: {
    isAllCurrentSelected() {
      return this.currentSites.length > 0 && this.selectedCurrentSites.length === this.currentSites.length;
    },
    isAllWaitingSelected() {
      return this.waitingSites.length > 0 && this.selectedWaitingSites.length === this.waitingSites.length;
    },
    isAllCompleteSelected() {
      return this.completeSites.length > 0 && this.selectedCompleteSites.length === this.completeSites.length;
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
    axios.get("https://mod-vite.onrender.com/data").then((res) => {
      const data = res.data;
      this.currentSites = JSON.parse(localStorage.getItem("promoApp_currentSites")) || data.Current || [];
      this.waitingSites = JSON.parse(localStorage.getItem("promoApp_waitingSites")) || data.Waiting || [];
      this.completeSites = JSON.parse(localStorage.getItem("promoApp_completeSites")) || data.Complete || [];
    });
  },

  methods: {
    toggleSelectAll(group) {
      switch (group) {
        case "current":
          this.selectedCurrentSites = this.isAllCurrentSelected ? [] : [...this.currentSites];
          break;
        case "waiting":
          this.selectedWaitingSites = this.isAllWaitingSelected ? [] : [...this.waitingSites];
          break;
        case "complete":
          this.selectedCompleteSites = this.isAllCompleteSelected ? [] : [...this.completeSites];
          break;
      }
    },

    _moveSelectedItems(sourceArrayName, destinationArrayName, selectedArrayName) {
      const selectedItems = this[selectedArrayName];
      if (selectedItems.length === 0) return;

      const itemsToAdd = selectedItems.filter((item) => !this[destinationArrayName].includes(item));
      this[destinationArrayName].push(...itemsToAdd);
      this[sourceArrayName] = this[sourceArrayName].filter((item) => !selectedItems.includes(item));
      this[selectedArrayName] = [];
    },

    moveSelectedFromCurrentToWaiting() {
      this._moveSelectedItems("currentSites", "waitingSites", "selectedCurrentSites");
      this.syncToServer();
    },
    moveSelectedFromWaitingToCurrent() {
      this._moveSelectedItems("waitingSites", "currentSites", "selectedWaitingSites");
      this.syncToServer();
    },
    moveSelectedFromWaitingToComplete() {
      this._moveSelectedItems("waitingSites", "completeSites", "selectedWaitingSites");
      this.syncToServer();
    },
    moveSelectedFromCompleteToWaiting() {
      this._moveSelectedItems("completeSites", "waitingSites", "selectedCompleteSites");
      this.syncToServer();
    },

    /*
    clearSelectedComplete() {
      this.completeSites = this.completeSites.filter((site) => !this.selectedCompleteSites.includes(site));
      this.selectedCompleteSites = [];
      this.syncToServer();
    },
    */

    clearAllComplete() {
      this.completeSites = [];
      this.selectedCompleteSites = [];
      this.syncToServer();
    },

    addNewCurrentSite() {
      const site = this.newCurrentSite.trim();
      if (site && !this.currentSites.includes(site)) {
        this.currentSites.push(site);
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
        .post("https://mod-vite.onrender.com/update-data", updatedData)
        .then(() => {
          console.log("Data synced to server.");
        })
        .catch((err) => {
          console.error("Failed to sync to server:", err);
        });
    },
  },
};
</script>

<style scoped>
.PromoPanel {
  display: flex;
  height: 500px;
  color: #444;
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
}

.list-title {
  display: flex;
  justify-content: space-between;
}

.list-group {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ccc;
  background: #fff;
  overflow-y: scroll;
}

.list-item {
  display: grid;
  grid-template-columns: 15px auto;
  gap: 5px;
  padding: 5px 10px;
}

.CurrentCard,
.WaitingCard,
.CompleteCard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 2;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  padding: 20px;
}

.SwapCard {
  position: relative;
  height: 100%;
  display: grid;
  place-content: center;
  place-items: center;
  flex: 0.5;
}

.SwapCard div {
  cursor: pointer;
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  user-select: none;
  margin: 5px 0;
}

.SwapCard div:hover {
  background-color: #e0e0e0;
}

.selectAll {
  display: grid;
  grid-template-columns: 15px auto;
  gap: 5px;
}

.action-button {
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  user-select: none;
  padding: 10px;
}

.add-box input {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 40px;
  padding: 5px;
}

.add-box input::placeholder {
  color: #444;
}
</style>
