<style scoped>
@import url(/src/css/Table.css);
</style>

<template>
  <div>
    <div class="TableBody">
      <div class="TableBoard">
        <div class="TableFlob"></div>
        <div class="MainPlayer PlayerDetail">
          <div class="PlayerHand">7 J</div>
          <div class="PlayerName">Bob</div>
          <div class="PlayerMoney">100 $</div>
        </div>
      </div>

      <div class="PlayerAction">
        <div class="PlayerActionGroup1">
          <button @click="playerAction('check')">Check</button>
          <button @click="playerAction('call')">Call</button>
          <button @click="playerAction('raise')">Raise</button>
          <button @click="playerAction('fold')">Fold</button>
        </div>
        <div class="PlayerActionGroup2">
          <button @click="chipBet(10)">$10</button>
          <button @click="chipBet(20)">$20</button>
          <button @click="chipBet(50)">$50</button>
          <button @click="chipBet(100)">$100</button>
          <button @click="customBet(1)">All-in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.TableBody {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid #444;
  padding-bottom: 50px;
}

.TableBoard {
  position: relative;
  height: 70%;
  width: 70%;
  margin: auto;
  border: 1px solid var(--focus);
}

.TableFlob {
  position: absolute;
  inset: 0;
  margin: auto;
  height: 100px;
  width: 50%;
  border: 1px solid var(--focus);
}

.PlayerDetail {
  display: grid;
  place-items: center;
  min-height: 100px;
  min-width: 150px;
  width: fit-content;
  border: 1px solid #444;
}

.MainPlayer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  margin: auto;
}

.PlayerAction {
  display: grid;
  gap: 20px;
}

.PlayerActionGroup1 {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.PlayerActionGroup2 {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.PlayerActionGroup2 > button {
  display: flex;
  justify-content: space-around;
}
</style>
