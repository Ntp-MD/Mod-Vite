<template>
  <table>
    <thead>
      <tr>
        <th class="main-corner">
          <div>Abrasive</div>
          <div class="line"></div>
          <div>Grit Size</div>
        </th>
        <th>Diamond (D)</th>
        <th>Silicon Carbide (SC)</th>
        <th>Aluminum Oxide (AO)</th>
        <th>Silicon Oxide (SO)</th>
        <th>Cerium Oxide (CO)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>80µm #180</td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>60µm #240</td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>45µm #360</td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>40µm #360</td>
        <td>●</td>
        <td></td>
        <td>●</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>30µm #600</td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>20µm #800</td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>16µm #1000</td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>15µm #1200</td>
        <td></td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>12µm #1500</td>
        <td></td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>9µm #2000</td>
        <td>●</td>
        <td></td>
        <td>●</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>6µm #2500</td>
        <td></td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>5µm #3000</td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>3µm #4000</td>
        <td></td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2µm #6000</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>●</td>
      </tr>
      <tr>
        <td>1µm #8000</td>
        <td>●</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>0.5µm #10000</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>0.3µm #15000</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>0.01µm</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin: 50px auto;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  max-width: 1400px;
}

thead tr {
  max-height: 100px;
}

th {
  padding: 10px;
  background: #203f9a;
  color: #fff;
  border-right: 1px solid #fff;
}

tbody tr td:first-child {
  text-align: left;
}

td {
  border: 1px solid #000;
  padding: 15px;
  text-align: center;
}

.main-corner {
  position: relative;
  width: 100%;
  height: clamp(80px, 10vw, 120px);
  background-color: #203f9a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.main-corner > div:first-child {
  position: absolute;
  top: 10%;
  right: 10%;
}

.main-corner > div:last-child {
  position: absolute;
  bottom: 10%;
  left: 10%;
}

.line {
  background: #fff;
  width: 100%;
  height: 1px;
  transform: skewY(211deg);
}
</style>
