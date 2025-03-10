<template>
  <section>
    <div class="container">
      <div class="banner-intro">
        <div class="text1">Chat, write, and get community done</div>
        <h1>
          Come for our chat. <br />
          Stay for our everything else.
        </h1>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur tempore incidunt facilis fugit,<br />
          quos quasi necessitatibus dolore esse officia itaque.
        </span>
        <form>
          <input type="search" name="" id="" placeholder="Contact Email" />
          <button>Get Started</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner-intro {
  display: flex;
  flex-direction: column;
  gap: var(--gap-text);
  text-align: center;
}

.banner-intro .text1 {
  font-weight: 500;
}

.banner-intro form {
  display: flex;
  align-items: center;
  position: relative;
  height: 65px;
  background: #fff;
  border-radius: 50px;
  padding: 0 10px 0 30px;
  width: clamp(320px, 70%, 500px);
  margin: auto;
}

.banner-intro input {
  height: 100%;
  border: none;
  color: var(--color2);
}

.banner-intro input::placeholder {
  text-transform: unset;
}

.banner-intro button {
  background: var(--linear2);
  border-radius: 50px;
}

@media screen and (max-width: 1200px) {
  .banner-intro {
    margin-top: 0;
  }

  .banner-intro input {
    display: none;
  }
  .banner-intro form {
    background: transparent;
  }

  .banner-intro button {
    margin: auto;
  }
}
</style>
