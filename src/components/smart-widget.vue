<template>
  <div class="smart-widget-container">
    <form id="smart-widget" @submit.prevent>
      <div class="form-group">
        <label for="websiteName">Website Name</label>
        <input class="input" name="websiteName" v-model="form.websiteName" />
      </div>
      <div class="form-group">
        <label for="websiteEmail">Binding Email</label>
        <input class="input" name="websiteEmail" v-model="form.websiteEmail" />
      </div>
      <div class="form-group">
        <label for="websiteUser">Username</label>
        <input class="input" name="websiteUser" v-model="form.websiteUser" />
      </div>
      <div class="form-group">
        <label for="websitePassword">Password</label>
        <input class="input" name="websitePassword" v-model="form.websitePassword" />
      </div>
      <div class="form-group">
        <label for="websiteTel">Binding Tel</label>
        <input class="input" name="websiteTel" v-model="form.websiteTel" />
      </div>

      <div class="form-group">
        <label for="websiteTel2">Tel</label>
        <input class="input" name="websiteTel2" v-model="form.websiteTel2" />
      </div>
      <div class="form-group">
        <label for="websiteFacebook">Facebook Page</label>
        <input class="input" name="websiteFacebook" v-model="form.websiteFacebook" />
      </div>
      <div class="form-group">
        <label for="websiteLine">Line @</label>
        <input class="input" name="websiteLine" v-model="form.websiteLine" />
      </div>
    </form>
    <div>
      <div class="form-panel">
        <label>Information</label>
        <div class="text-frame">
          <div>{{ form.websiteName }}</div>
          <div>{{ form.websiteEmail }}</div>
          <div>{{ form.websitePassword }}</div>
        </div>
        <div class="button-group">
          <button type="button" class="btn btn-primary" @click="copyText(getInformationText())">Copy Info</button>
          <button type="button" class="btn btn-danger" @click="clearStorage">Clear Storage</button>
        </div>
        <label>Snippet Css</label>
        <div class="text-frame">
          <code>
            .unknown { position: fixed; bottom: 8% !important; } .unknown_prf .btn-main, .unknown_prf:hover .btn-main { margin-bottom: 0 !important; }
          </code>
        </div>
        <button type="button" class="btn btn-primary" @click="copyText(cssSnippet)">Copy Css</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.smart-widget-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap2);
}

form#smart-widget {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap2);
}

form#smart-widget > div {
  flex: 1 40%;
}

.form-panel {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding: var(--gap2);
  background: var(--color2);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.form-panel label {
  font-weight: 600;
  color: var(--font-color);
  margin-top: var(--gap);
}

.form-panel label:first-child {
  margin-top: 0;
}

.text-frame {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap) * 0.5);
  padding: var(--gap);
  background: var(--color3);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--font-color);
}

.text-frame code {
  font-family: monospace;
  color: var(--primary);
  word-wrap: break-word;
}

.button-group {
  display: flex;
  gap: var(--gap);
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
