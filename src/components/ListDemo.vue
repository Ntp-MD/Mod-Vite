<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Note</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(site, idx) in listData" :key="idx">
        <td>{{ site.name }}</td>
        <td>{{ site.note }}</td>
        <td>{{ site.status }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const listData = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3001/list-demo-data");
    console.log("Data loaded:", res.data);
    listData.value = res.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  table-layout: fixed;
}
th,
td {
  border: 1px solid #444;
  padding: 8px;
  text-align: left;
}
thead {
  background: var(--dh-bg1);
  color: #fff;
}
</style>
