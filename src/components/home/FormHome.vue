<template>
  <section>
    <main>
      <form>
        <h3>Contact Info</h3>
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
      <div class="grid-image"><img src="/src/assets/beach/4.jpg" alt="office1" /></div>
    </main>
  </section>
</template>

<style scoped>
section {
  border-radius: 15px;
  overflow: hidden;
  background: var(--bg2);
  min-height: auto;
}

h3 {
  white-space: nowrap;
}

form {
  padding: 50px;
  background: var(--bg2);
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  main {
    gap: 0;
    padding: 0;
  }
}
</style>
