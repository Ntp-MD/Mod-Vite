<template>
  <section id="intro-slide">
    <div>
      <div class="no-content"></div>
      <img src="/src/assets/images/banner-1.jpg" alt="" width="100%" />
    </div>
  </section>

  <section id="present-section">
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
  </section>

  <section id="preview-section">
    <div class="">
      <h1>
        Lorem<br />
        ipsum dolor<br />
        sit amet elit.
      </h1>
      <sup>Interior Design</sup>
    </div>
    <div class="collapse-pic">
      <img src="/src/assets/images/5.jpg" />
      <img src="/src/assets/images/6.jpg" />
    </div>
  </section>

  <section id="gallery-section">
    <div class="gallery-text">
      <sup>Interior Design</sup>
      <h1>
        Lorem ipsum dolor<br />
        sit amet
      </h1>
      <div class="gallery-pic">
        <img src="/src/assets/images/1.jpg" alt="" />
        <img src="/src/assets/images/2.jpg" alt="" />
        <img src="/src/assets/images/3.jpg" alt="" />
        <img src="/src/assets/images/4.jpg" alt="" />
      </div>
    </div>
  </section>
  <section id="form-section">
    <form id="contact-form" action="">
      <fieldset>
        <label for="">Name</label>
        <input type="text" placeholder="" />
      </fieldset>
      <fieldset>
        <label for="">Lastname</label>
        <input type="text" placeholder="" />
      </fieldset>
      <fieldset>
        <label for="">Email</label>
        <input type="text" placeholder="" />
      </fieldset>
      <fieldset>
        <label for="">Tel</label>
        <input type="text" placeholder="" />
      </fieldset>

      <textarea name="" cols="30" rows="10" placeholder="Message" id=""></textarea>
    </form>
  </section>
  <section id="section4"></section>
</template>

<style>
:root {
  --main-padding: clamp(15px, 10vw, 150px) clamp(15px, 12vw, 200px);
  --bg-color: #fff;
  --bg-color2: #2b2b2b;
  --bg-color3: #3a3e4a;
  --bg-btn: #3a3e4a;
  --font-color: #3a3e4a;
  --font-color2: #fff;
  --gap-text: clamp(20px, 5vw, 50px);
  --gap-content: clamp(50px, 100%, 100px);
  --color: #feb68e;
  --bg-color20: #eeeff3;
}

div > h1:first-of-type {
  padding-left: 30px;
  border-left: 5px solid #feb68e;
}

/**/
#intro-slide > div {
  display: grid;
  grid-template-columns: 20% auto;
}

#intro-slide img {
  max-height: 90vh;
}

#intro-slide .no-content {
  background: #2b2b2b;
}
/**/

/**/
section#present-section {
  padding: var(--main-padding);
}

article.review-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.review-grid-text {
  display: grid;
  justify-content: space-around;
  padding-left: 25px;
  border-left: 3px solid #feb68e;
}

.review-grid-text h1 {
  padding: 0 !important;
  border: none !important;
}

.btn-view {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}
/**/

section#preview-section {
  display: grid;
  grid-template-columns: 30% auto;
  padding: var(--main-padding);
  background: #2b2b2b;
  color: #fff;
  min-height: 50vw;
}

section#preview-section > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

section#preview-section sup {
  color: #fff;
}

.collapse-pic {
  position: relative;
  top: -15%;
  min-height: 0;
  width: 100%;
}

.collapse-pic img {
  position: relative;
  width: 60%;
  aspect-ratio: 5/3;
  object-fit: contain;
  z-index: 1;
}

.collapse-pic img:last-child {
  position: absolute;
  bottom: -30%;
  right: 15%;
  z-index: 0;
}

/**/
section#form-section {
  padding: var(--main-padding);
  background: var(--bg-color3);
}

form#contact-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

form#contact-form label {
  color: #fff;
}

form#contact-form fieldset {
  flex: 1 45%;
}
/**/

section#gallery-section {
  padding: var(--main-padding);
}

.gallery-pic {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  min-height: 20vw;
}
</style>
