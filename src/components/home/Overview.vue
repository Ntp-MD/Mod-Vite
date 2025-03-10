<template>
  <section>
    <div class="container">
      <div class="grid-content">
        <div class="grid-items">
          <div class="count-value">25 +</div>
          <h3>Lorem, ipsum dolor.</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure reprehenderit quia, qui quos eos omnis fugit perspiciatis voluptatem
            repudiandae laborum!</span
          >
        </div>
        <div class="grid-items">
          <div class="count-value">25 +</div>
          <h3>Lorem, ipsum dolor.</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure reprehenderit quia, qui quos eos omnis fugit perspiciatis voluptatem
            repudiandae laborum!</span
          >
        </div>
        <div class="grid-items">
          <div class="count-value">25 +</div>
          <h3>Lorem, ipsum dolor.</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure reprehenderit quia, qui quos eos omnis fugit perspiciatis voluptatem
            repudiandae laborum!</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
}

.grid-items {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20% 30px 20%;
  border-radius: 25px;
  background: var(--linear3);
  min-height: 10vw;
  text-align: center;
}

.count-value {
  font-size: clamp(30px, 10vw, 60px);
  font-weight: 600;
}

@media screen and (max-width: 1200px) {
  .grid-content {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
