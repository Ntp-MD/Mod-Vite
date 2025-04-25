<template>
  <section id="section1">
    <div class="banner-1">
      <div class="no-content"></div>
      <img src="/src/assets/images/banner-1.jpg" alt="" width="100%" />
    </div>
  </section>
  <section id="section2">
    <div class="container">
      <sup>Interior Design</sup>
      <h1>
        Lorem ipsum <br />
        dolor sit amet consectetur.
      </h1>
      <article class="review-grid">
        <figure>
          <img src="/src/assets/images/1.jpg" alt="" />
          <figcaption>Lorem, ipsum dolor.</figcaption>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div class="btn-view">View more<sub>&rarr;</sub></div>
        </figure>
        <figure>
          <img src="/src/assets/images/2.jpg" alt="" />
          <figcaption>Lorem, ipsum dolor.</figcaption>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div class="btn-view">View more<sub>&rarr;</sub></div>
        </figure>
        <figure>
          <img src="/src/assets/images/3.jpg" alt="" />
          <figcaption>Lorem, ipsum dolor.</figcaption>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div class="btn-view">View more<sub>&rarr;</sub></div>
        </figure>
        <div class="review-grid-text">
          <h1>
            Lorem ipsum <br />
            dolor sit amet
          </h1>
          <div class="btn-view">View more<sub>&rarr;</sub></div>
        </div>
      </article>
    </div>
  </section>
  <section id="section3">
    <div class="container">
      <div class="name0">
        <h1>
          Lorem ipsum dolor<br />
          sit amet
        </h1>
        <div class="name1">
          <div class="no-image" v-for="n in 3"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="section4">
    <div class="container"></div>
  </section>
  <section id="section5">
    <div class="container"></div>
  </section>
  <section id="section4">
    <div class="container"></div>
  </section>
</template>

<style>
.banner-1 {
  display: grid;
  grid-template-columns: 20% auto;
}

.banner-1 img {
  max-height: 90vh;
}

#section1 .no-content {
  background: #2b2b2b;
}

article.review-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.review-grid-text {
  border-left: 2px solid #feb68e;
  padding-left: 30px;
}

.btn-view {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.name1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
#section3 {
  background: #2b2b2b;
  color: #fff;
}

#section5 {
  background: var(--bg-color3);
}
</style>
