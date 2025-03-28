<template>
  <div class="bydsusco_maincontainer">
    <div class="bydsusco_container">
      <div class="bydsusco_inside_container">
        <div class="bydsusco_top_container">
          <div class="bydsusco_topic">
            <span>คำนวณค่างวดรถ</span>
          </div>
          <div class="bydsusco_topic_choose">
            <span>เลือกรถยนต์ไฟฟ้าที่คุณสนใจ</span>
          </div>
          <div class="bydsusco_topic_select">
            <select name="bydsuscoCar" id="bydsuscoCar" class="form-select">
              <option value="16" selected>NEW BYD ATTO 3 Premium 24</option>
              <option value="0">NEW BYD ATTO 3 Extended 24</option>
              <option value="1">NEW BYD DOLPHIN Standard</option>
              <option value="2">NEW BYD DOLPHIN Extended</option>
              <option value="3">BYD SEAL Dynamic RWD</option>
              <option value="4">BYD SEAL Premium RWD</option>
              <option value="5">BYD SEAL Performance AWD</option>
              <option value="6">BYD SEALION 6 DM-i Dynamic</option>
              <option value="7">BYD SEALION 6 DM-i Premium</option>
              <option value="8">BYD M6 Dynamic</option>
              <option value="9">BYD M6 Extended</option>
              <option value="10">BYD SEALION 7 Premium</option>
              <option value="11">BYD SEALION 7 AWD Performance</option>
              <option value="12">BYD T3</option>
              <option value="13">BYD E6</option>
              <option value="14">BYD DENZA D9 Premium</option>
              <option value="15">BYD DENZA D9 AWD Performance</option>
            </select>
          </div>
        </div>
        <div class="bydsusco_middle_container">
          <div class="bydsusco_inside_left_container"></div>
          <div class="bydsusco_inside_right_container">
            <div class="bydsusco_calculator_container">
              <div class="bydsusco_calculator_inside">
                <div class="bydsusco_result_text1">
                  <span>ดาวน์</span>
                </div>
                <div class="InstallmentDurationClass"></div>
                <div class="bydsusco_result_text1">
                  <span>ระยะเวลาผ่อน</span>
                </div>
                <div class="selectResult_container">
                  <label for="range">
                    <input name="range" id="inputRageBydsusco" type="range" min="0" value="0" max="3" step="1" />
                  </label>
                </div>
                <div class="monthCountClass">
                  <div>
                    <span>48 เดือน</span>
                  </div>
                  <div>
                    <span>60 เดือน</span>
                  </div>
                  <div>
                    <span>72 เดือน</span>
                  </div>
                  <div>
                    <span>84 เดือน</span>
                  </div>
                </div>
                <div class="bydsusco_result_calculated_container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//mod lasted 26/4/2025
$(document).ready(function () {
  let carData = [
    //BYD ATTO 3 Extended 24
    {
      carId: "0",
      carImageUrl: "http://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/1376/0/NewBYDATTO3(localproduction)Whitez-z1046854208768.png",
      carName1: "ATTO 3 24",
      carName2: "Extended",
      carPriceText: "799,900",
      carPrice: 799900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //DOLPHIN Standard
    {
      carId: "1",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Dolphin-Standardz-z575687640133.png",
      carName1: "DOLPHIN",
      carName2: "Standard Range 410 km.",
      carPriceText: "499,900",
      carPrice: 499900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //DOLPHIN Extended
    {
      carId: "2",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Dolphin-Extendedz-z1103390912531.png",
      carName1: "DOLPHIN",
      carName2: "Extended Range 490 km.",
      carPriceText: "599,900",
      carPrice: 599900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },

    //BYD SEAL Dynamic
    {
      carId: "3",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Seal-Dynamicz-z338669778231.png",
      carName1: "SEAL",
      carName2: "Dynamic RWD 510 km.",
      carPriceText: "999,900",
      carPrice: 999900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEAL Premium
    {
      carId: "4",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Seal-Premiumz-z311859941759.png",
      carName1: "SEAL",
      carName2: "Premium RWD 650 km.",
      carPriceText: "1,099,900",
      carPrice: 1099900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEAL Performance
    {
      carId: "5",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Seal-Performacez-z12969357071.png",
      carName1: "SEAL",
      carName2: "Performance AWD 580 km.",
      carPriceText: "1,199,900",
      carPrice: 1199900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEALION 6 Dynamic
    {
      carId: "6",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Sealion-6-Dynamicz-z907323662593.png",
      carName1: "SEALION 6",
      carName2: "Dynamic",
      carPriceText: "899,900",
      carPrice: 899900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEALION 6 Premium
    {
      carId: "7",
      carImageUrl: "http://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/1410/0/BYD-12-1z-z346285238073.png",
      carName1: "SEALION 6",
      carName2: "Premium",
      carPriceText: "999,900",
      carPrice: 999900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD M6 Dynamic
    {
      carId: "8",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/M6-Dynamicz-z171573915743.png",
      carName1: "M6",
      carName2: "Dynamic",
      carPriceText: "799,900",
      carPrice: 799900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD M6 Extended
    {
      carId: "9",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/M6-Extendedz-z262469479662.png",
      carName1: "M6",
      carName2: "Extended",
      carPriceText: "899,900",
      carPrice: 899900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEALION 7 Premium
    {
      carId: "10",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Sealion-7-Premiumz-z729332427395.png",
      carName1: "SEALION7",
      carName2: "Premium",
      carPriceText: "1,149,900",
      carPrice: 1149900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEALION 7 Performance
    {
      carId: "11",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Sealion-7-Performancez-z936022421655.png",
      carName1: "SEALION7",
      carName2: "AWD Performance",
      carPriceText: "1,249,900",
      carPrice: 1249900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD T3
    {
      carId: "12",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/T3z-z877711029520.png",
      carName1: "T3",
      carName2: "ELECTRIC CARGOVAN",
      carPriceText: "999,000",
      carPrice: 999000,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.94] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.69, 4.44] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.39, 3.94] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [2.19, 2.79, 3.29, 3.74] },
        },
      ],
    },
    //BYD E6
    {
      carId: "13",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/E6z-z862197735525.png",
      carName1: "E6",
      carName2: "ELECTRIC VEHICLE",
      carPriceText: "850,000",
      carPrice: 850000,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.94] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //DENZA D9 Premium
    {
      carId: "14",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Denza-D9-Premiumz-z687725877121.png",
      carName1: "DENZA D9",
      carName2: "Premium",
      carPriceText: "1,999,900",
      carPrice: 1999900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.59, 3.89, 4.19, 4.49] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [2.99, 3.29, 3.49, 4.19] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.59, 2.79, 3.09, 3.69] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.88, 2.59, 2.89, 3.59] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.88, 2.35, 2.79, 3.49] },
        },
      ],
    },
    //DENZA D9 AWD Performance
    {
      carId: "15",
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Denza-D9-Performancez-z520082036768.png",
      carName1: "DENZA D9",
      carName2: "AWD Performance",
      carPriceText: "2,699,900",
      carPrice: 2699900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.59, 3.89, 4.19, 4.49] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [2.99, 3.29, 3.49, 4.19] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.59, 2.79, 3.09, 3.69] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.88, 2.59, 2.89, 3.59] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.88, 2.35, 2.79, 3.49] },
        },
      ],
    },
    //BYD ATTO 3 Premiu, 24
    {
      carId: "16",
      carImageUrl: "http://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/1376/0/NewBYDATTO3(localproduction)Whitez-z1046854208768.png",
      carName1: "ATTO 3 24",
      carName2: "Premium",
      carPriceText: "699,900",
      carPrice: 699900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //end
  ];

  function renderResultInstallment(carIndex) {
    let installmentIndex = Number($("#InstallmentDuration").val());
    let installmentMonthIndex = [48, 60, 72, 84][Number($("#inputRageBydsusco").val())];
    let calculatedResult = carData[carIndex].carInstallmentDetails.find((x) => x.carRatePricePercent === installmentIndex);

    if (!calculatedResult) {
      $(".bydsusco_result_calculated_container").empty().append("<div>No data available for this selection.</div>");
      return;
    }

    let monthIndex = Number($("#inputRageBydsusco").val());
    let interestRate = calculatedResult.carMonthPaid.percentPerMonth[monthIndex] / 100 / 12;
    const carPrice = carData[carIndex].carPrice;
    const downPrice = Math.round((carPrice * installmentIndex) / 100);
    const excellentPrice = Math.round(carPrice - downPrice);
    const calculatedMonthlyPayment = calculateMonthlyPayment(excellentPrice, interestRate, installmentMonthIndex);

    $(".bydsusco_result_calculated_container").html(`
        <div class="bydsusco_result_calculated_inside">
          <div class="flex_bydsusco_result"><span>เงินดาวน์</span><span>${downPrice.toLocaleString()}</span><span>บาท</span></div>
          <div class="flex_bydsusco_result"><span>ยอดจัด</span><span>${excellentPrice.toLocaleString()}</span><span>บาท</span></div>
          <div class="flex_bydsusco_result"><span>ผ่อนเดือนละ</span><span>${calculatedMonthlyPayment.toLocaleString()}</span><span>บาท</span></div>
        </div>
      `);
  }

  function calculateMonthlyPayment(excellentPrice, monthlyInterestRate, numberOfPayments) {
    const totalInterest = excellentPrice * monthlyInterestRate * numberOfPayments;
    const totalPayment = excellentPrice + totalInterest;
    return Math.round(totalPayment / numberOfPayments);
  }

  function renderCarDetails(carIndex) {
    let selectedCar = carData[carIndex];
    if (!selectedCar) return;

    $(".bydsusco_inside_left_container").html(`
         <div class="bydsusco_result_container">
  <div class="bydsusco_result_image">
    <img src="${selectedCar.carImageUrl}" alt="${selectedCar.carName1}" width="100%" />
  </div>
  <div class="bydsusco_result_name1">
    <div>
      <img src="https://itp1.itopfile.com/ImageServer/z_itp_18092022t6wg/0/0/BYDz-z1114814961666.png" style="width: 100%" />
    </div>
    <div>
      <span>${selectedCar.carName1}</span>
    </div>
  </div>
  <div class="bydsusco_result_name2">
    <span>${selectedCar.carName2}</span>
  </div>
  <div class="bydsusco_result_price">
    <div class="bydsusco_price_text1">
      <span>ราคา</span>
    </div>
    <div class="bydsusco_price_text2">
      <span>${selectedCar.carPriceText}</span>
    </div>
    <div class="bydsusco_price_text3">
      <span>บาท</span>
    </div>
  </div>
</div>

      `);
  }

  function generateSelectPercent(carIndex) {
    const selectedCarDetails = carData[carIndex]?.carInstallmentDetails;
    if (!selectedCarDetails) return;

    let selectResult = `<select name="InstallmentDuration" id="InstallmentDuration" class="form-select">`;
    selectedCarDetails.forEach((detail) => {
      selectResult += `<option value="${detail.carRatePricePercent}">${detail.carRatePricePercent}%</option>`;
    });
    selectResult += `</select>`;
    $(".InstallmentDurationClass").html(selectResult);
    renderResultInstallment(carIndex);
  }

  generateSelectPercent(0);
  renderCarDetails(0);

  $("#bydsuscoCar").on("change", function () {
    let valueIndex = Number(this.value);
    generateSelectPercent(valueIndex);
    renderCarDetails(valueIndex);
  });

  $(document).on("change", "#InstallmentDuration", function () {
    renderResultInstallment(Number($("#bydsuscoCar").find(":selected").val()));
  });

  $("#inputRageBydsusco")
    .on("input", function () {
      renderResultInstallment(Number($("#bydsuscoCar").find(":selected").val()));
    })
    .trigger("input");
});
</script>
<style scoped>
/*calc*/
.bydsusco_maincontainer {
  width: 100%;
  background-image: url(https://itp1.itopfile.com/ImageServer/z_itp_18092022t6wg/831/0/white-tunnel-with-light-end-3d-renderingz-z387796491816.webp);
  background-size: cover;
  min-height: 50vw;
  color: #444;
  line-height: 1;
  padding-top: 100px;
}

.bydsusco_top_container {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 15px;
}

.bydsusco_topic {
  font-size: clamp(24px, 5vw, 40px);
  font-weight: 500;
}

.bydsusco_container select {
  position: relative;
  border: 2px solid rgb(223, 223, 223);
  padding: 0 25px;
  width: 100%;
  height: 52px;
  border-radius: 30px;
  -webkit-appearance: none;
  appearance: none;
  outline: unset;
  font-size: clamp(20px, 1vw, 22px);
  color: #444;
}

.bydsusco_topic_select {
  display: flex;
  align-items: center;
  position: relative;
  min-width: 400px;
  margin: 0 auto;
}

.InstallmentDurationClass {
  display: flex;
  align-items: center;
  position: relative;
  width: 80%;
  margin: 0 auto;
}

.bydsusco_topic_select::after,
.InstallmentDurationClass::after {
  content: "▼";
  font-size: 1rem;
  position: relative;
  top: 0;
  right: 35px;
  width: 0;
}

.bydsusco_middle_container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  padding: 2vw 20vw;
  align-items: center;
}

.bydsusco_inside_right_container {
  width: 85%;
  margin: auto;
}

.bydsusco_calculator_container {
  background: rgb(47 46 46 / 85%);
  border-radius: 30px;
}

.bydsusco_calculator_inside {
  display: flex;
  flex-direction: column;
  color: #bfbfbf;
  width: 100%;
  height: 100%;
  text-align: center;
  height: 100%;
  font-size: clamp(20px, 1vw, 22px);
}

.bydsusco_result_text1 {
  margin: 50px 0 25px;
}

.bydsusco_result_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.bydsusco_result_image {
  max-width: 500px;
  margin: 0 auto;
}

.bydsusco_result_image > img {
  min-height: 300px !important;
  object-fit: contain;
}

.bydsusco_result_name1 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  align-items: end;
  text-align: left;
  padding: 0 20px;
}

.bydsusco_result_name1 img {
  max-width: 250px;
  object-fit: contain;
}

.bydsusco_result_name1 span {
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 500;
}

.bydsusco_result_name2 span {
  font-size: clamp(22px, 5vw, 24px);
  font-weight: 500;
}

.bydsusco_result_price {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
}

.bydsusco_price_text1,
.bydsusco_price_text3 {
  font-size: clamp(22px, 5vw, 24px);
}

.bydsusco_price_text2 {
  font-size: clamp(22px, 5vw, 38px);
  font-weight: 600;
}

.selectResult_container {
  height: 50px;
  position: relative;
  margin: 0 0 30px;
  padding: 0 25px;
}

.selectResult_container::before {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  display: block;
  content: "";
  width: 85%;
  background: #bebebe;
  height: 3px;
  margin: auto;
}

#inputRageBydsusco {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  width: 80%;
  height: 100%;
  margin: auto;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  border: unset;
  z-index: 1000;
}

#inputRageBydsusco::-webkit-slider-thumb {
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  background: #444;
  cursor: pointer;
  border-radius: 50%;
  border: 5px solid #bebebe;
}

.monthCountClass {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 25px;
  height: 50px;
  font-size: clamp(16px, 0.5vw, 18px);
}

.monthCountClass > div {
  position: relative;
  height: 100%;
}

/*fake dot*/
.monthCountClass > div::before {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  margin: auto;
  display: block;
  content: "";
  width: 12px;
  height: 12px;
  background: #bebebe;
  border-radius: 50%;
}

.bydsusco_result_calculated_container {
  background-color: #fff;
  color: #000;
  width: 95%;
  margin: 15px auto;
  border-radius: 30px;
  padding: 25px;
}

.bydsusco_result_calculated_inside {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.flex_bydsusco_result {
  display: grid;
  grid-template-columns: 40% 40% 20%;
  width: 100%;
  text-align: left;
}

.flex_bydsusco_result span:nth-child(2) {
  font-weight: 500;
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
  .bydsusco_middle_container {
    gap: 20px;
    padding: clamp(20px, 6vw, 100px);
  }

  .bydsusco_inside_right_container {
    width: 100%;
  }

  .bydsusco_result_calculated_container {
    width: 90%;
  }
}

@media screen and (max-width: 480px) {
  div#background6515306d53502700135c95b1 {
    margin: -10px;
  }

  .bydsusco_middle_container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding: 10px;
  }

  .bydsusco_topic_select {
    width: 90%;
    min-width: auto;
  }

  .bydsusco_inside_right_container {
    width: 100%;
  }
}
</style>
