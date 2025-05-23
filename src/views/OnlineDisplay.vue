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
      <div class="add-box">
        <input v-model="newCurrentSite" placeholder="Enter new site" />
      </div>
      <div class="group-btn">
        <div class="action-button add-btn" @click="addNewCurrentSite">Add</div>
        <div class="action-button clear-btn" @click="clearSelectedFromAll">Clear Select</div>
      </div>
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
      <div class="search-box">
        <input class="search-input" type="search" v-model="searchQuery" placeholder="Search Website" />
        <img src="/src/assets/icon/search.png" alt="" />
      </div>
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
@import url(/src/css/OnlineDisplay.css);
</style>
