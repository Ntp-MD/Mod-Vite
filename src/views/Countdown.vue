<template>
  <div class="body-countdown">
    <div class="flip-clock" id="flipClock"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const labels = ["Days", "Hours", "Minutes", "Seconds"];
    const clock = document.getElementById("flipClock");
    const pieces = {};

    function createFlipPiece(label) {
      const piece = document.createElement("div");
      piece.className = "flip-clock__piece";
      piece.innerHTML = `
        <div class="flip-card">
          <div class="flip-card__top">0</div>
          <div class="flip-card__bottom">0</div>
          <div class="flip-card__back-top">0</div>
          <div class="flip-card__back-bottom">0</div>
        </div>
        <div>${label}</div>
      `;
      return piece;
    }

    labels.forEach((label) => {
      const piece = createFlipPiece(label);
      clock.appendChild(piece);
      pieces[label] = piece.querySelector(".flip-card");
    });

    const targetDate = new Date("2025-12-31T23:59:59");

    function updateClock() {
      const now = new Date();
      let diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);

      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);

      const seconds = Math.floor(diff / 1000);

      const time = { Days: days, Hours: hours, Minutes: minutes, Seconds: seconds };

      for (const [label, value] of Object.entries(time)) {
        const card = pieces[label];
        const top = card.querySelector(".flip-card__top");
        const bottom = card.querySelector(".flip-card__bottom");
        const backTop = card.querySelector(".flip-card__back-top");
        const backBottom = card.querySelector(".flip-card__back-bottom");

        const current = parseInt(top.textContent, 10);
        if (current !== value) {
          backTop.textContent = current;
          backBottom.textContent = value;
          card.classList.remove("flip");
          void card.offsetWidth;
          card.classList.add("flip");
          top.textContent = value;
          bottom.textContent = value;
        }
      }
    }

    updateClock();
    setInterval(updateClock, 1000);
  },
};
</script>

<style>
.body-countdown {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
}

.flip-clock {
  display: flex;
  gap: 10px;
  text-align: center;
  perspective: 1000px;
  height: 100%;
  width: 100%;
  max-width: 800px;
  max-height: 250px;
}

.flip-clock__piece {
  width: 100%;
  perspective: 1000px;
}

.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  background: #222;
  color: #0ea66b;
  text-align: center;
  border-radius: 5px;
  transform-style: preserve-3d;
  container-type: inline-size;
}
.flip-card__top,
.flip-card__bottom,
.flip-card__back-top,
.flip-card__back-bottom {
  position: unset;
  width: 100%;
  height: 50%;
  inset: 0;
  background: #222;
  backface-visibility: hidden;
  font-size: 50cqi;
  font-weight: 800;
}
</style>
