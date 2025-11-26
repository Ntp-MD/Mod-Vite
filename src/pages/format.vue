<template>
  <div id="cars-output"></div>
</template>

<style>
#cars-output {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: scroll;
  height: 80vh;
}

.car-des {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.car-mile,
.car-price {
  display: grid;
  grid-template-columns: 20% 10px auto;
  gap: 5px;
  line-height: 1;
  font-size: clamp(18px, 2vw, 18px);
}

.btn-view {
  width: fit-content;
}

.car-mile-3,
.car-price-3 {
  color: red;
}
</style>

<script>
// === CONFIG ===
const SHEET_ID = "1J06xJG3N-XL4i3e7bZY8FrqBKEHNYme__NbEXm1JdYc";
const SHEET_NAME = "Sheet1";

const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_NAME}&tqx=out:json`;

fetch(URL)
  .then((res) => res.text())
  .then((text) => {
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    let html = "";

    rows.forEach((row, i) => {
      if (!row.c) return;

      const code = row.c[8]?.v || ""; // รหัส
      const mileRaw = row.c[5]?.v || 0; // เลขไมล์
      const priceRaw = row.c[7]?.v || 0; // ราคา

      // Format numbers with commas
      const mile = typeof mileRaw === "number" ? mileRaw.toLocaleString() : mileRaw;
      const price = typeof priceRaw === "number" ? priceRaw.toLocaleString() : priceRaw;

      html += `
<!-- รหัส: ${code} -->
<div class="car-des">
  <div class="car-mile">
    <div class="car-mile-1">เลขไมล์</div>
    <div class="car-mile-2">:</div>
    <div class="car-mile-3">${mile} Km</div>
  </div>
  <div class="car-price">
    <div class="car-price-1">ราคา</div>
    <div class="car-price-2">:</div>
    <div class="car-price-3">${price} บาท</div>
  </div>
  <button class="btn-view">ดูข้อมูล</button>
</div>
`;
    });

    document.getElementById("cars-output").innerHTML = html;
  })
  .catch((err) => console.error("Sheet Error:", err));
</script>
