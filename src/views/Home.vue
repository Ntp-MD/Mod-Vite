<template>
  <main>
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
        <h1>Lorem ipsum dolor sit amet.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div class="grid-custom-1">
          <div class="grid-items" v-for="n in 4">
            <h2>Lorem, ipsum dolor.</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi error culpa saepe totam at quasi.</p>
          </div>
        </div>
      </div>
    </div>

    <div id="section-3">
      <div class="_container">
        <h1>
          Lorem ipsum, dolor sit amet <br />
          consectetur Veritatis, quasi?
        </h1>
        <div class="grid-2">
          <div class="left">
            <img src="@/assets/images/app1.png" alt="" />
          </div>
          <div class="right">
            <h2>
              Lorem ipsum dolor sit amet <br />
              consectetur adipisicing.
            </h2>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia suscipit officiis sed earum magnam provident ab saepe soluta, itaque ipsam, excepturi in sapiente quis atque non, nam
              eum laudantium minus!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia suscipit officiis sed earum magnam provident ab saepe soluta, itaque ipsam, excepturi in sapiente quis atque non, nam
              eum laudantium minus!
            </p>
          </div>
        </div>
      </div>
    </div>

    <div id="section-4">
      <div class="_container">
        <h1>Lorem ipsum, dolor sit amet</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div class="grid-2">
          <div class="">
            <form>
              <h3>Lorem ipsum dolor sit.</h3>
              <div id="input">
                <div><input type="text" name="" id="" placeholder="Firstname" /></div>
                <div><input type="text" name="" id="" placeholder="Lastname" /></div>
              </div>
              <div id="input">
                <div><input type="text" name="" id="" placeholder="Email" /></div>
                <div><input type="text" name="" id="" placeholder="Tel" /></div>
              </div>
              <div id="input">
                <div><input type="text" name="" id="" placeholder="Country" /></div>
                <div><input type="text" name="" id="" placeholder="Company" /></div>
              </div>
              <address>
                <textarea name="" id="" placeholder="Address"></textarea>
              </address>
              <button>Submit</button>
            </form>
          </div>
          <div class="">
            <img src="@/assets/images/office1.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#section-1 {
  text-align: center;
}

#section-2 {
  background: #fff;
}

.grid-custom-1 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  margin-top: 50px;
}

#section-3 .grid-2 {
  margin: 50px auto;
  align-items: center;
  place-items: center;
  gap: 50px;
}

#section-3 .left {
  display: grid;
  width: 70%;
}

#section-4 {
  background: #fff;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .grid-2 {
    background: var(--main-overlay);
    border-radius: 15px;
    overflow: hidden;
  }
}

.mock {
  background: #fff;
  border-radius: 15px;
  height: 30vw;
}

.grid-items {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 300px;
  background: var(--main-overlay);
  border-radius: 15px;
  padding: 20px;
  box-shadow: var(--box-shadow1);
}
</style>

<script></script>
