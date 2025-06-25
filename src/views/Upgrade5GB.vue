<template>
  <div class="websiteTrack">
    <div class="CurrentCard">
      <div class="list-title">
        Current Card
        <div class="selectAll">
          <input type="checkbox" :checked="isAllCurrentSelected" @change="toggleSelectAll('current')" id="select-all-current" />
          <div for="select-all-current">Select All</div>
        </div>
      </div>
      <div class="list-group">
        <div v-for="site in sortedCurrentSites" :key="'current-' + site.name" class="list-item" :class="{ highlighted: isMatch(site.name) }">
          <input type="checkbox" :value="site.name" v-model="selectedCurrentSiteNames" :id="'current-' + (site.name || '').replace(/\./g, '-')" />
          <div :for="'current-' + (site.name || '').replace(/\./g, '-')">{{ site.name }}</div>
        </div>
      </div>
      <form class="add-box">
        <input v-model="newCurrentSite" placeholder="Enter new site" />
        <div class="group-btn">
          <button class="add-btn" @click="addNewCurrentSite">Add</button>
          <button class="clear-btn" @click="clearSelectedFromAll">Clear Select</button>
        </div>
      </form>
    </div>
    <div class="switchControl">
      <button class="PrevSwap" @click="moveSelectedFromCurrentToWaiting">Forward</button>
      <button class="NextSwap" @click="moveSelectedFromWaitingToCurrent">Back</button>
    </div>
    <div class="WaitingCard">
      <div class="list-title">
        Waiting Card
        <div class="selectAll">
          <input type="checkbox" :checked="isAllWaitingSelected" @change="toggleSelectAll('waiting')" id="select-all-waiting" />
          <div for="select-all-waiting">Select All</div>
        </div>
      </div>
      <div class="list-group">
        <div v-for="site in sortedWaitingSites" :key="'waiting-' + site.name" class="list-item" :class="{ highlighted: isMatch(site.name) }">
          <input type="checkbox" :value="site.name" v-model="selectedWaitingSiteNames" :id="'waiting-' + (site.name || '').replace(/\./g, '-')" />
          <div :for="'waiting-' + (site.name || '').replace(/\./g, '-')">{{ site.name }}</div>
        </div>
      </div>
      <form id="search-form">
        <input class="search-input" type="search" v-model="searchQuery" placeholder="Search Website" />
        <img src="/src/assets/icon/search.png" alt="" width="100%" height="100%" />
      </form>
    </div>
    <div class="switchControl">
      <button class="PrevSwap" @click="moveSelectedFromWaitingToComplete">Forward</button>
      <button class="NextSwap" @click="moveSelectedFromCompleteToWaiting">Back</button>
    </div>
    <div class="CompleteCard">
      <div class="list-title">
        Complete Card
        <div class="selectAll">
          <input type="checkbox" :checked="isAllCompleteSelected" @change="toggleSelectAll('complete')" id="select-all-complete" />
          <div for="select-all-complete">Select All</div>
        </div>
      </div>
      <div class="list-group">
        <div v-for="site in sortedCompleteSites" :key="'complete-' + site.name" class="list-item" :class="{ highlighted: isMatch(site.name) }">
          <input type="checkbox" :value="site.name" v-model="selectedCompleteSiteNames" :id="'complete-' + (site.name || '').replace(/\./g, '-')" />
          <div :for="'complete-' + (site.name || '').replace(/\./g, '-')">{{ site.name }}</div>
        </div>
      </div>
      <div class="group-btn">
        <button class="add-btn" @click="addNewCurrentSite">Add</button>
        <button class="clear-btn" @click="clearSelectedFromAll">Clear Select</button>
      </div>
    </div>
  </div>
</template>

<script>
import PromotionTrackFunction from "../js/Track5GB.js";

export default {
  ...PromotionTrackFunction,
};
</script>

<style scoped>
.websiteTrack {
  display: flex;
  height: 100%;
  width: 100%;
  margin: auto;
  gap: var(--gap);
  color: var(--ui-font);
}

.websiteTrack button {
  background: var(--btn);
}

.list-title {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
}

.list-title::before {
  content: "";
  display: block;
  aspect-ratio: 1;
  width: 13px;
  height: 13px;
  background: #ffff7e;
}

.WaitingCard .list-title::before {
  background: #5eafff;
}

.CompleteCard .list-title::before {
  background: #56d524;
}

.list-group {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  background: var(--ui-bg1);
  overflow-y: scroll;
  height: -webkit-fill-available;
}

.list-item {
  display: grid;
  grid-template-columns: 15px auto;
  align-items: center;
  gap: 10px;
  padding: 8px 15px;
  border-bottom: 1px solid var(--border-color);
}

.highlighted {
  color: #4abdff;
  border: 1px solid var(--btn);
}

.CurrentCard,
.WaitingCard,
.CompleteCard {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  flex: 1;
  border-radius: var(--border-radius);
  background: var(--ui-bg1);
  padding: var(--gap);
  box-shadow: 0 0 3px var(--border-color);
}

.switchControl {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  gap: 20px;
  flex: 0.2;
}

.selectAll {
  display: grid;
  grid-template-columns: 15px auto;
  align-items: center;
  justify-content: end;
  gap: 10px;
  flex: 1;
}

.group-btn {
  display: flex;
  justify-content: space-between;
}

.websiteTrack input {
  border: 1px solid var(--border-color);
  height: fit-content;
}

.list-group input {
  min-height: unset;
}
</style>
