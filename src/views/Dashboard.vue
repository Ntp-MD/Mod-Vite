<template>
  <div class="labelName">Smart Widget Information</div>
  <div class="smartWidget">
    <div class="form-group">
      <div class="smartWidgetInput">
        <label for="websiteName">Website Name</label>
        <input name="websiteName" v-model="form.websiteName" />
      </div>
      <div class="smartWidgetInput">
        <label for="websiteEmail">Binding Email</label>
        <input name="websiteEmail" v-model="form.websiteEmail" />
      </div>
    </div>
    <div class="form-group">
      <div class="smartWidgetInput">
        <label for="websiteUser">Username</label>
        <input name="websiteUser" v-model="form.websiteUser" />
      </div>
      <div class="smartWidgetInput">
        <label for="websitePassword">Password</label>
        <input name="websitePassword" v-model="form.websitePassword" />
      </div>
    </div>
    <div class="form-group">
      <div class="smartWidgetInput">
        <label for="websiteTel">Tel</label>
        <input name="websiteTel" v-model="form.websiteTel" />
      </div>
      <div class="smartWidgetInput">
        <label for="websiteFacebook">Facebook Page</label>
        <input name="websiteFacebook" v-model="form.websiteFacebook" />
      </div>
      <div class="smartWidgetInput">
        <label for="websiteLine">Line @</label>
        <input name="websiteLine" v-model="form.websiteLine" />
      </div>
    </div>
    <div class="form-group">
      <div class="smartWidgetInput">
        <label for=""
          >Information
          <button class="copyButton" @click="copyText(getInformationText())">Copy Snippet</button>
        </label>
        <div class="textBlock">
          <div>{{ form.websiteName }}</div>
          <div>{{ form.websiteEmail }}</div>
          <div>{{ form.websitePassword }}</div>
          <br />
          <div>{{ form.websiteTel }}</div>
          <div>{{ form.websiteFacebook }}</div>
          <div>{{ form.websiteLine }}</div>
        </div>
      </div>
      <div class="smartWidgetInput">
        <label for="">Snippet Css</label>
        <div class="textBlock">
          <code>
            .unknown { position: fixed; bottom: 8% !important; } .unknown_prf .btn-main, .unknown_prf:hover .btn-main { margin-bottom: 0 !important; }
          </code>
          <button class="copyButton" @click="copyText(cssSnippet)">Copy Snippet</button>
        </div>
      </div>
    </div>

    <button class="clearButton" @click="clearStorage">Clear Storage</button>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const STORAGE_KEY = "smartWidgetData";

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
.smartWidget {
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

.form-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  width: 100%;
}

.form-group > div {
  position: relative;
  flex: 1;
}

.smartWidgetInput {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.smartWidget *:not(button) {
  width: -webkit-fill-available;
}

.smartWidget :is(input, textarea) {
  border: 1px solid var(--border-color);
  background: var(--sub-color2);
}

.textBlock {
  border: 1px solid var(--border-color);
  padding: var(--gap);
  min-height: 20vh;
  background: var(--sub-color2);
}

.labelName {
  display: grid;
  font-size: clamp(20px, 2vw, 24px);
  width: fit-content;
}

.labelName:after {
  display: block;
  content: "";
  background: var(--btn-color);
  border-radius: 30px;
  width: 80%;
  height: 7px;
  margin: 5px 0 var(--gap);
}

.copyButton {
  position: absolute;
  bottom: var(--gap);
  right: var(--gap);
}
</style>
