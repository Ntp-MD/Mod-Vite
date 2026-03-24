<template>
  <div class="timeline-md">
    <div class="timeline-section">
      <div class="timeline-date">พ.ศ.<span>2535</span></div>
      <div class="timeline-point"><div class="timeline-dot"></div></div>
      <div class="timeline-content">
        โดยผู้ก่อตั้งบริษัท เริ่มต้นธุรกิจจากการจำหน่ายไม้ไผ่แปรรูป ไม้ตะเกียบ และไม้เสียบลูกชิ้น ทั้งในประเทศและต่างประเทศ
      </div>
    </div>
    <div class="timeline-section">
      <div class="timeline-date">พ.ศ.<span>2549</span></div>
      <div class="timeline-point"><div class="timeline-dot"></div></div>
      <div class="timeline-content">
        บริษัทได้ขยายธุรกิจเข้าสู่การผลิตและจำหน่าย เคมีเกษตร ภายใต้เครื่องหมายการค้า &ldquo;ตราไผ่หยก&rdquo; โดย คณะผู้บริหาร
        รุ่นใหม่เข้ามาบริหารกิจการต่อ พร้อมเล็งเห็นศักยภาพของ ประเทศไทยในฐานะประเทศเกษตรกรรม
      </div>
    </div>
    <div class="timeline-section">
      <div class="timeline-date">พ.ศ.<span>2551</span></div>
      <div class="timeline-point"><div class="timeline-dot"></div></div>
      <div class="timeline-content">
        บริษัทได้ยุติธุรกิจไม้ไผ่แปรรูป และมุ่งเน้นการพัฒนาและ จำหน่ายผลิตภัณฑ์เคมีเกษตรอย่างเต็มรูปแบบ สร้างมาตรฐาน คุณภาพที่เกษตรกรไว้วางใจ
        เพื่อสนับสนุนการเพิ่มผลผลิต และคุณภาพพืชผลของเกษตรกรไทย
      </div>
    </div>
  </div>
</template>

<style>
.timeline-md {
  --size-gap: 40px;
  display: grid;
  grid-template-columns: max-content auto 1fr;
  grid-auto-rows: auto;
  column-gap: var(--gap2);
  align-items: center;
  max-width: 50%;
}

.timeline-section {
  position: relative;
  display: contents;
  color: #fff;
}

.timeline-date {
  display: flex;
  flex-direction: column;
}

.timeline-point {
  position: relative;
  align-self: stretch;
  display: grid;
  place-items: center;
}

.timeline-point::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 50%;
  background: red;
  z-index: -1;
}

.timeline-point::after {
  content: "";
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 50%;
  background: red;
  z-index: -1;
}

.timeline-dot {
  background: red;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  border: 2px solid transparent;
}
</style>
