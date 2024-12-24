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
        <h1>Lorem ipsum, dolor sit amet</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div class="grid-content">
          <div class="pic">
            <img src="@/assets/images/app1.png" alt="" />
          </div>
          <div class="content">
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

    <div id="section-3">
      <div class="_container">
        <h1>Lorem ipsum dolor sit amet.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>

    <div id="section-4">
      <div class="_container">
        <h1>Lorem ipsum, dolor sit amet</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div class="grid-content">
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

.grid-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  place-items: center;
  min-height: 30vw;
}

.grid-content > div {
  width: 100%;
  height: 100%;
}

.grid-content .pic {
  display: grid;
  margin: auto;
  max-width: 70%;
  min-width: 300px;
}

#section-4 {
  background: #fff;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .grid-content {
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
</style>

<script></script>
