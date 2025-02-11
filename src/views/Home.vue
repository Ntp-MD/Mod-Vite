<template>
  <div id="section-1">
    <div class="container">
      <div class="group-text1">
        <h1>the place of enjoyment</h1>
        <h1>Welcome to life</h1>
        <button>Booking now</button>
      </div>
    </div>
  </div>

  <div id="section-2">
    <div class="container">
      <div class="group-items" style="display: none">
        <div class="items" v-for="n in 3">
          <h3>Lorem, ipsum dolor.</h3>
          <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, magnam.</span>
        </div>
      </div>
      <div class="grid-default">
        <div class="grid-image">
          <img src="/src/assets/beach/bed-beach.jpg" alt="" />
        </div>
        <div class="group-text2">
          <h2>a vacation</h2>
          <h2>near your</h2>
          <h2>home</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta delectus vero maiores, labore illo cumque veritatis ipsum dolorem quisquam facere.</p>
        </div>
      </div>
    </div>
  </div>

  <div id="section-3">
    <div class="container">
      <div class="center">
        <h2>Lorem ipsum, dolor sit amet</h2>
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
    <div class="container">
      <div class="center">
        <h2>Lorem ipsum, dolor sit amet</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="grid-default">
        <form>
          <h3>Lorem ipsum dolor.</h3>
          <div class="input-group">
            <div><input type="text" name="firstname" id="firstname" placeholder="Firstname" /></div>
            <div><input type="text" name="lastname" id="lastname" placeholder="Lastname" /></div>
          </div>
          <div class="input-group">
            <div><input type="text" name="email" id="email" placeholder="Email" /></div>
            <div><input type="text" name="tel" id="tel" placeholder="Tel" /></div>
          </div>
          <div class="input-group">
            <div><input type="text" name="country" id="country" placeholder="Country" /></div>
            <div><input type="text" name="company" id="company" placeholder="Company" /></div>
          </div>
          <address>
            <textarea name="address" id="address" placeholder="Address"></textarea>
          </address>

          <button>Submit</button>
        </form>
        <div class="grid-image"><img src="/src/assets/beach/bed-beach.jpg" alt="office1" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#section-1 {
  background-image: url("/src/assets/beach/beach-chairs-tropical-white-sand-beach.jpg");
  background-size: cover;
  background-position: 50% 60%;
  text-align: center;
  color: #fff;
}

.group-text1 {
  display: flex;
  flex-direction: column;
  gap: 50px;
  border-radius: 10px;
  color: #fff;
}

.group-text1 h1 {
  color: rgb(255, 255, 255, 1);
  text-shadow: var(--text-shadow1);
}

.group-text2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#section-3 {
  background: var(--main-bg2);
}

#section-3 h2 {
  color: var(--main-color1);
}

#section-4 .container {
  min-height: 30vw;
}

#section-4 .grid-default {
  background: var(--main-bg2);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

#section-4 form {
  padding: 50px;
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
  gap: 10px;
  background: var(--main-bg);
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
}
</style>
