<style></style>

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
              <option value="0" selected>BYD ATTO 3 Extended 24</option>

              <option value="1">NEW BYD DOLPHIN Extended</option>
              <option value="2">NEW BYD DOLPHIN Standard</option>
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
$(document).ready(function () {
  let carData = [
    //BYD ATTO 3 Extended 24
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Atto-Extended-24z-z109073477884.png",
      carName1: "ATTO 3 24",
      carName2: "Extended",
      carPriceText: "899,900",
      carPrice: 899900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.39, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 3.39, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //DOLPHIN Extended
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Dolphin-Extendedz-z1103390912531.png",
      carName1: "DOLPHIN",
      carName2: "Extended Range 490 km.",
      carPriceText: "709,900",
      carPrice: 709900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.39, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 3.39, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //DOLPHIN Standard
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Dolphin-Standardz-z575687640133.png",
      carName1: "DOLPHIN",
      carName2: "Standard Range 410 km.",
      carPriceText: "569,900",
      carPrice: 569900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEAL Dynamic
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Seal-Dynamicz-z338669778231.png",
      carName1: "SEAL",
      carName2: "Dynamic RWD 510 km.",
      carPriceText: "1,199,000",
      carPrice: 1199000,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEAL Premium
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Seal-Premiumz-z311859941759.png",
      carName1: "SEAL",
      carName2: "Premium RWD 650 km.",
      carPriceText: "1,399,000",
      carPrice: 1399000,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEAL Performance
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Seal-Performacez-z12969357071.png",
      carName1: "SEAL",
      carName2: "Performance AWD 580 km.",
      carPriceText: "1,499,000",
      carPrice: 1499000,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEALION 6 Dynamic
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Sealion-6-Dynamicz-z907323662593.png",
      carName1: "SEALION 6",
      carName2: "Dynamic",
      carPriceText: "939,900",
      carPrice: 939900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEALION 6 Premium
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Sealion-6-Premiumz-z1580769346254.png",
      carName1: "SEALION 6",
      carName2: "Premium",
      carPriceText: "1,039,900",
      carPrice: 1039900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD M6 Dynamic
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/M6-Dynamicz-z171573915743.png",
      carName1: "M6",
      carName2: "Dynamic",
      carPriceText: "799,900",
      carPrice: 799900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD M6 Extended
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/M6-Extendedz-z262469479662.png",
      carName1: "M6",
      carName2: "Extended",
      carPriceText: "899,900",
      carPrice: 899900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEALION 7 Premium
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Sealion-7-Premiumz-z729332427395.png",
      carName1: "SEALION7",
      carName2: "Premium",
      carPriceText: "1,249,900",
      carPrice: 1249900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD SEALION 7 Performance
    {
      carImageUrl:
        "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Sealion-7-Performancez-z936022421655.png",
      carName1: "SEALION7",
      carName2: "AWD Performance",
      carPriceText: "1,399,900",
      carPrice: 1399900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 5,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [4.09, 4.39, 4.69, 4.99] },
        },
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.59] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //BYD T3
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/T3z-z877711029520.png",
      carName1: "T3",
      carName2: "ELECTRIC CARGOVAN",
      carPriceText: "999,000",
      carPrice: 999000,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.99, 3.99, 4.29, 4.94] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.39, 3.39, 3.69, 4.44] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.39, 3.94] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.19, 2.79, 3.29, 3.74] },
        },
      ],
    },
    //BYD E6
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/E6z-z862197735525.png",
      carName1: "E6",
      carName2: "ELECTRIC VEHICLE",
      carPriceText: "850,000",
      carPrice: 850000,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.69, 3.99, 4.29, 4.94] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.09, 3.39, 3.59, 4.29] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.69, 2.89, 3.19, 3.79] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.69, 2.99, 3.69] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.98, 2.45, 2.89, 3.59] },
        },
      ],
    },
    //DENZA D9 Premium
    {
      carImageUrl: "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Denza-D9-Premiumz-z687725877121.png",
      carName1: "DENZA D9",
      carName2: "Premium",
      carPriceText: "1,999,900",
      carPrice: 1999900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.59, 3.89, 4.19, 4.49] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.99, 3.29, 3.49, 4.19] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.59, 2.79, 3.09, 3.69] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.88, 2.59, 2.89, 3.59] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.88, 2.35, 2.79, 3.49] },
        },
      ],
    },
    //DENZA D9 AWD Performance
    {
      carImageUrl:
        "https://itp1.itopfile.com/ImageServer/z_itp_13082023hglw/0/0/Denza-D9-Performancez-z520082036768.png",
      carName1: "DENZA D9",
      carName2: "AWD Performance",
      carPriceText: "2,699,900",
      carPrice: 2699900,
      carInstallmentDetails: [
        {
          carRatePricePercent: 10,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [3.59, 3.89, 4.19, 4.49] },
        },
        {
          carRatePricePercent: 15,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.99, 3.29, 3.49, 4.19] },
        },
        {
          carRatePricePercent: 20,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [2.59, 2.79, 3.09, 3.69] },
        },
        {
          carRatePricePercent: 25,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.88, 2.59, 2.89, 3.59] },
        },
        {
          carRatePricePercent: 30,
          carMonthPaid: { month: [48, 60, 72, 84], percentPerMonth: [1.88, 2.35, 2.79, 3.49] },
        },
      ],
    },
    //end
  ];

  function renderResultInstallment(carIndex) {
    let installmentIndex = Number($("#InstallmentDuration").val());
    let installmentMonthIndex = [48, 60, 72, 84][Number($("#inputRageBydsusco").val())];
    let calculatedResult = carData[carIndex].carInstallmentDetails.find(
      (x) => x.carRatePricePercent === installmentIndex
    );

    if (!calculatedResult) {
      $(".bydsusco_result_calculated_container").empty().append("<div>No data available for this selection.</div>");
      return;
    }

    let monthIndex = calculatedResult.carMonthPaid.month.indexOf(installmentMonthIndex); // [48, 60, 72, 84]
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

  // Price/Month
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
