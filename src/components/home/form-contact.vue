<template>
  <main id="form-contact">
    <div class="grid-default">
      <form>
        <h3>Contact Reserved</h3>
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
    </div>
  </main>
</template>

<style scoped>
#form-contact {
  border-radius: 15px;
  overflow: hidden;
}

#form-contact .grid-default {
  background: var(--bg2);
}

#form-contact form {
  padding: 50px;
}

@media screen and (max-width: 480px) {
  #form-contact form {
    padding: 25px;
  }
}
</style>
