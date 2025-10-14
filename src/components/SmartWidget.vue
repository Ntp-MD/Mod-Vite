<template>
  <div class="labelName">Smart Widget Information</div>

  <div class="SmartWidgetForm">
    <button class="clearButton" @click="clearStorage">Clear Storage</button>
    <div class="InputGroup">
      <div class="SmartWidgetInput">
        <label for="websiteName">Website Name</label>
        <input name="websiteName" v-model="form.websiteName" />
      </div>
      <div class="SmartWidgetInput">
        <label for="websiteEmail">Binding Email</label>
        <input name="websiteEmail" v-model="form.websiteEmail" />
      </div>
    </div>
    <div class="InputGroup">
      <div class="SmartWidgetInput">
        <label for="websiteUser">Username</label>
        <input name="websiteUser" v-model="form.websiteUser" />
      </div>
      <div class="SmartWidgetInput">
        <label for="websitePassword">Password</label>
        <input name="websitePassword" v-model="form.websitePassword" />
      </div>
    </div>
    <div class="InputGroup">
      <div class="SmartWidgetInput">
        <label for="websiteTel">Binding Tel</label>
        <input name="websiteTel" v-model="form.websiteTel" />
      </div>
      <div class="SmartWidgetInput">
        <label for="websiteTel2">Tel</label>
        <input name="websiteTel2" v-model="form.websiteTel2" />
      </div>
      <div class="SmartWidgetInput">
        <label for="websiteFacebook">Facebook Page</label>
        <input name="websiteFacebook" v-model="form.websiteFacebook" />
      </div>
      <div class="SmartWidgetInput">
        <label for="websiteLine">Line @</label>
        <input name="websiteLine" v-model="form.websiteLine" />
      </div>
    </div>

    <div class="InputGroup">
      <div class="SmartWidgetInput">
        <label for="">Information </label>
        <div class="textBlock">
          <div>{{ form.websiteName }}</div>
          <div>{{ form.websiteEmail }}</div>
          <div>{{ form.websitePassword }}</div>
        </div>
        <button class="copyButton" @click="copyText(getInformationText())">Copy Info</button>
      </div>
      <div class="SmartWidgetInput">
        <label for="">Snippet Css </label>
        <div class="textBlock">
          <code>
            .unknown { position: fixed; bottom: 8% !important; } .unknown_prf .btn-main, .unknown_prf:hover .btn-main { margin-bottom: 0 !important; }
          </code>
        </div>
        <button class="copyButton" @click="copyText(cssSnippet)">Copy Css</button>
      </div>
    </div>
  </div>
</template>

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

<style scoped>
.SmartWidgetForm {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: var(--gap);
  background: var(--sub-color);
  padding: var(--gap);
  border-radius: var(--border-radius);
  user-select: none;
  border-radius: var(--border-radius);
}

.InputGroup {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  width: 100%;
}

.InputGroup > div {
  position: relative;
  flex: 1;
}

.SmartWidgetInput {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.SmartWidgetForm *:not(button) {
  width: -webkit-fill-available;
}

.SmartWidgetForm :is(input, textarea) {
  border: 1px solid var(--border-color);
  background: var(--sub-color2);
}

.textBlock {
  border: 1px solid var(--border-color);
  padding: var(--gap);
  min-height: 20vh;
  background: var(--sub-color2);
}

/*
.copyButton {
  position: absolute;
  bottom: var(--gap);
  right: var(--gap);
}
*/

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
