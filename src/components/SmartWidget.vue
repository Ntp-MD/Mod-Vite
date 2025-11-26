<template>
  <form id="SmartWidget">
    <div class="form-group">
      <label for="websiteName">Website Name</label>
      <input name="websiteName" v-model="form.websiteName" />
    </div>
    <div class="form-group">
      <label for="websiteEmail">Binding Email</label>
      <input name="websiteEmail" v-model="form.websiteEmail" />
    </div>
    <div class="form-group">
      <label for="websiteUser">Username</label>
      <input name="websiteUser" v-model="form.websiteUser" />
    </div>
    <div class="form-group">
      <label for="websitePassword">Password</label>
      <input name="websitePassword" v-model="form.websitePassword" />
    </div>
    <div class="form-group">
      <label for="websiteTel">Binding Tel</label>
      <input name="websiteTel" v-model="form.websiteTel" />
    </div>

    <div class="form-group">
      <label for="websiteTel2">Tel</label>
      <input name="websiteTel2" v-model="form.websiteTel2" />
    </div>
    <div class="form-group">
      <label for="websiteFacebook">Facebook Page</label>
      <input name="websiteFacebook" v-model="form.websiteFacebook" />
    </div>
    <div class="form-group">
      <label for="websiteLine">Line @</label>
      <input name="websiteLine" v-model="form.websiteLine" />
    </div>
    <div class="form-group">
      <label for="">Information </label>
      <div class="text-frame">
        <div>{{ form.websiteName }}</div>
        <div>{{ form.websiteEmail }}</div>
        <div>{{ form.websitePassword }}</div>
      </div>
      <div class="flex">
        <button class="copyButton" @click="copyText(getInformationText())">Copy Info</button>
        <button class="clearButton" @click="clearStorage">Clear Storage</button>
      </div>
    </div>
    <div class="form-group">
      <label for="">Snippet Css </label>
      <div class="text-frame">
        <code>
          .unknown { position: fixed; bottom: 8% !important; } .unknown_prf .btn-main, .unknown_prf:hover .btn-main { margin-bottom: 0 !important; }
        </code>
      </div>
      <button class="copyButton" @click="copyText(cssSnippet)">Copy Css</button>
    </div>
  </form>
</template>

<style scoped>
form#SmartWidget {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
}

form#SmartWidget > div {
  flex: 1 40%;
}
input {
  background: var(--color3);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.btn-group {
  display: flex;
  align-items: center;
  gap: var(--gap);
}

.text-frame {
  border-radius: var(--border-radius);
  min-height: 200px;
  border: 1px solid var(--border-color);
  padding: var(--gap);
}

.copyButton {
  display: inline-block;
}

.clearButton {
  float: right;
}

@media screen and (max-width: 480px) {
  .copyButton {
    position: unset;
    bottom: var(--gap);
    right: var(--gap);
  }
}
</style>

<script setup>
import { reactive, onMounted, watch } from "vue";

const STORAGE_KEY = "SmartWidgetFormData";

const form = reactive({
  websiteName: "",
  websiteEmail: "",
  websiteUser: "",
  websitePassword: "",
  websiteTel: "",
  websiteFacebook: "",
  websiteLine: "",
});

const cssSnippet = `.unknown { position: fixed; bottom: 8% !important; } .unknown_prf .btn-main, .unknown_prf:hover .btn-main { margin-bottom: 0 !important; }`;

function getInformationText() {
  return `
${form.websiteName}
${form.websiteEmail}
${form.websitePassword}
  `.trim();
}

function copyText(text) {
  navigator.clipboard.writeText(text).catch(() => {});
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) Object.assign(form, JSON.parse(saved));
});

watch(form, (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)), { deep: true });

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(form).forEach((k) => (form[k] = ""));
}
</script>
