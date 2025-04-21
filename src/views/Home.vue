<template>
  <section class="container">
    <div class="mock-section"></div>
  </section>
  <section class="container">
    <span>OUR PRODUCT</span>
    <h1>
      Various kinds of <br />
      Finance Product
    </h1>
    <div class="blog-group">
      <div class="blog-item" v-for="n in 3">
        <div class="no-image"></div>
        <div class="blog-content">
          <h3 class="blog-title">Lorem, ipsum dolor.</h3>
          <div class="blog-detail">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic sequi vitae inventore animi sunt quaerat porro, similique magni cum
            dignissimos.
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="grid-default">
      <div class="">
        <h1>
          Various kinds of<br />
          Finance Product
        </h1>
        <ul></ul>
      </div>
      <div class="no-image"></div>
    </div>
  </section>
</template>

<style>
.blog-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2vw;
}

.blog-item {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 3px 0 #ccc;
  padding-bottom: 30px;
}

.blog-item .no-image {
  aspect-ratio: 16/10;
}

.blog-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
}

.blog-title {
  font-weight: 600;
  background: #fff;
}
</style>
