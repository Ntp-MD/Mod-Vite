<template>
  <div class="PromoPanel">
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
          <div class="action-button add-btn" @click="addNewCurrentSite">Add</div>
          <div class="action-button clear-btn" @click="clearSelectedFromAll">Clear Select</div>
        </div>
      </form>
    </div>
    <div class="SwapCard">
      <div class="PrevSwap" @click="moveSelectedFromCurrentToWaiting"><img src="/src/assets/icon/swap.png" alt="" /></div>
      <div class="NextSwap" @click="moveSelectedFromWaitingToCurrent"><img src="/src/assets/icon/swap.png" alt="" /></div>
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
    <div class="SwapCard">
      <div class="PrevSwap" @click="moveSelectedFromWaitingToComplete">
        <img src="/src/assets/icon/swap.png" alt="" />
      </div>
      <div class="NextSwap" @click="moveSelectedFromCompleteToWaiting">
        <img src="/src/assets/icon/swap.png" alt="" />
      </div>
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
        <div class="action-button add-btn" @click="addNewCurrentSite">Add</div>
        <div class="action-button clear-btn" @click="clearSelectedFromAll">Clear Select</div>
      </div>
    </div>
  </div>
</template>

<script>
import OnlinePromotionFunction from "../js/OnlinePromotion.js";

export default {
  ...OnlinePromotionFunction,
};
</script>

<style scoped>
.PromoPanel {
  display: flex;
  height: 100%;
  width: 100%;
  margin: auto;
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
  padding: 8px 10px;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-bottom: 1px solid var(--border-color);
}

.highlighted {
  color: #4abdff;
  border: 1px solid #4abdff;
}

.CurrentCard,
.WaitingCard,
.CompleteCard {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  flex: 2;
  border-radius: var(--border-radius);
  background: var(--ui-bg1);
  padding: var(--gap);
  box-shadow: 0 0 3px var(--border-color);
}

.SwapCard {
  position: relative;
  height: 100%;
  display: grid;
  place-content: center;
  place-items: center;
  gap: 20px;
  flex: 0.5;
}

.SwapCard div {
  padding: 5px 20px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  user-select: none;
  height: fit-content;
  max-width: 70px;
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

.action-button {
  cursor: pointer;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  text-align: center;
  user-select: none;
  padding: 10px 20px;
  width: fit-content;
}

.action-button:hover {
  border: 1px solid #4abdff;
}

.PrevSwap {
  background: #56d524;
}

.NextSwap {
  background: red;
}

.PrevSwap img {
  filter: invert(1);
  height: auto;
  object-fit: contain;
}

.NextSwap img {
  filter: invert(1);
  height: auto;
  object-fit: contain;
}
</style>
