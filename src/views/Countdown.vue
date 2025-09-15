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
        <div class="card">
          <div class="front__top"></div>
          <div class="front__bottom" data-value="0">0</div>
          <div class="back__top" data-value="0"></div>
          <div class="back__bottom" data-value="0">0</div>
        </div>
        <div class="flip-clock__slot">${label}</div>
      `;
      return piece;
    }

    labels.forEach((label) => {
      const piece = createFlipPiece(label);
      clock.appendChild(piece);
      pieces[label] = piece.querySelector(".card");
    });

    const targetDate = new Date("2025-10-31T23:59:59");

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
        const frontTop = card.querySelector(".front__top");
        const frontBottom = card.querySelector(".front__bottom");
        const backTop = card.querySelector(".back__top");
        const backBottom = card.querySelector(".back__bottom");

        const current = parseInt(frontTop.textContent, 10);
        if (current !== value) {
          card.classList.remove("flip");
          void card.offsetWidth;

          backTop.setAttribute("data-value", value);
          backBottom.setAttribute("data-value", value);
          backBottom.textContent = value;
          frontBottom.setAttribute("data-value", value);
          frontBottom.textContent = value;
          frontTop.textContent = current;
          setTimeout(() => {
            frontTop.textContent = value;
          }, 300);
          card.classList.add("flip");
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
  text-align: center;
  align-items: start;
}

.flip-clock {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
}

.flip-clock__piece {
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  width: 100%;
}

.flip-clock__slot {
  font-size: 22px;
}

.card {
  display: block;
  position: relative;
  aspect-ratio: 3/2;
  container-type: inline-size;
}

.card > div {
  font-size: clamp(24px, 5cqi, 100px);
  font-weight: 900;
  line-height: 1.5;
  width: 100%;
}

.flip-clock > div:not(:last-child) {
  display: none;
}

.card > div {
  display: block;
  width: 100%;
  height: 100%;
}

.front__top {
  background: #222;
}

.front__bottom {
  background: #222;
}

.back__top {
  background: #222;
}

.flip .back__bottom {
  background: #222;
}

.flip .front__top {
  background: #222;
  animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
  animation-fill-mode: both;
  transform-origin: center bottom;
}

@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
    z-index: 2;
    opacity: 0;
  }
  55% {
    opacity: 0.99;
  }
  100% {
    transform: rotateX(-180deg);
    opacity: 0;
  }
}
@keyframes flipBottom {
  0%,
  50% {
    z-index: -1;
    transform: rotateX(45deg);
    opacity: 0;
    background: #222;
  }
  55% {
    opacity: 0.99;
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
    z-index: 5;
    background: #393939;
  }
}
</style>
