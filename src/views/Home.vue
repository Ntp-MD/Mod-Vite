<template>
  <div id="section-1">
    <div class="_container">
      <h1>
        Lorem ipsum, dolor sit amet <br />
        consectetur Veritatis, quasi?
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
        Deserunt maxime magni debitis nemo esse ut, in veniam molestias ullam commodi.
      </p>
      <button>Let' Get Started</button>
      <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, libero.</span>
    </div>
  </div>

  <div id="section-2">
    <div class="_container">
      <div class="grid-default">
        <div class="grid-image">
          <img src="@/assets/images/app1.png" alt="app1" />
        </div>
        <div class="grid-content">
          <h1>Lorem ipsum dolor sit amet consectetur.</h1>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia suscipit officiis sed earum magnam provident ab saepe soluta, itaque ipsam, excepturi in sapiente quis atque non, nam eum
            laudantium minus!
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia suscipit officiis sed earum magnam provident ab saepe soluta, itaque ipsam, excepturi in sapiente quis atque non, nam eum
            laudantium minus!
          </p>
        </div>
      </div>
    </div>
  </div>

  <div id="section-3">
    <div class="_container">
      <div class="center">
        <h1>Lorem ipsum, dolor sit amet</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="package-content">
        <div class="package-items" v-for="n in 4">
          <div class="package-title">Lorem ipsum dolor</div>
          <div class="package-price">199$</div>
          <div class="package-details">
            <div v-for="n in 3">Lorem ipsum dolor sit amet.</div>
          </div>
          <div class="package-border"></div>
          <div class="package-details">
            <div v-for="n in 1">Lorem ipsum dolor sit amet.</div>
          </div>
          <button class="package-button">Contact</button>
        </div>
      </div>
    </div>
  </div>

  <div id="section-4">
    <div class="_container">
      <div class="center">
        <h1>Lorem ipsum, dolor sit amet</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="grid-default">
        <form>
          <h2>Lorem ipsum dolor sit.</h2>
          <div id="input">
            <div><input type="text" name="firstname" id="firstname" placeholder="Firstname" /></div>
            <div><input type="text" name="lastname" id="lastname" placeholder="Lastname" /></div>
          </div>
          <div id="input">
            <div><input type="text" name="email" id="email" placeholder="Email" /></div>
            <div><input type="text" name="tel" id="tel" placeholder="Tel" /></div>
          </div>
          <div id="input">
            <div><input type="text" name="country" id="country" placeholder="Country" /></div>
            <div><input type="text" name="company" id="company" placeholder="Company" /></div>
          </div>
          <address>
            <textarea name="address" id="address" placeholder="Address"></textarea>
          </address>

          <button>Submit</button>
        </form>
        <div class=""><img src="@/assets/images/office1.jpg" alt="office1" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#section-1 {
  text-align: center;
  background: var(--main-overlay);
  color: var(--font-color);
}

#section-2 {
  background: #fff;
}

#section-2 img {
  min-width: 250px;
  max-width: 25vw;
}

#section-3 {
  background: var(--main-overlay);
  color: var(--font-color);
}

#section-4 .grid-default {
  background: var(--main-overlay);
  border-radius: 15px;
  overflow: hidden;
}

#section-4 button {
  margin-top: 20px;
}

/*package content*/
.package-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  width: 100%;
  margin: clamp(50px, 10vw, 50px) auto;
}

.package-items {
  display: grid;
  gap: 20px;
  background: var(--main-bg);
  box-shadow: var(--box-shadow1);
  padding: 50px 20px 20px;
  border-radius: 12px;
  text-align: center;
}

.package-title {
  color: var(--font-color2);
  font-size: 22px;
  font-weight: 400;
}

.package-price {
  position: relative;
  color: var(--main-color);
  font-size: 44px;
  font-weight: 600;
}

.package-price:after {
  content: "Per/Month";
  display: block;
  color: var(--font-color2);
  font-size: 22px;
  font-weight: 400;
  border-bottom: 1px solid var(--main-color);
  padding-bottom: 20px;
}

.package-price-sub {
  position: relative;
}

.package-details {
  color: var(--font-color2);
}

button.package-button {
  margin: 20px auto;
  width: 85%;
}
</style>
