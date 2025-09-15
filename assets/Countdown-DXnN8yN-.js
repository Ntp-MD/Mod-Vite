import{_ as h,c as x,a as M,o as S}from"./index-DXmiST7j.js";const w={mounted(){const r=["Days","Hours","Minutes","Seconds"],s=document.getElementById("flipClock"),n={};function i(c){const t=document.createElement("div");return t.className="flip-clock__piece",t.innerHTML=`
        <div class="card">
          <div class="front__top"></div>
          <div class="front__bottom" data-value="0">0</div>
          <div class="back__top" data-value="0"></div>
          <div class="back__bottom" data-value="0">0</div>
        </div>
        <div class="flip-clock__slot">${c}</div>
      `,t}r.forEach(c=>{const t=i(c);s.appendChild(t),n[c]=t.querySelector(".card")});const d=new Date("2025-10-31T23:59:59");function a(){let t=Math.max(0,d-new Date);const u=Math.floor(t/(1e3*60*60*24));t-=u*(1e3*60*60*24);const f=Math.floor(t/(1e3*60*60));t-=f*(1e3*60*60);const p=Math.floor(t/(1e3*60));t-=p*(1e3*60);const b=Math.floor(t/1e3),k={Days:u,Hours:f,Minutes:p,Seconds:b};for(const[y,o]of Object.entries(k)){const e=n[y],l=e.querySelector(".front__top"),_=e.querySelector(".front__bottom"),C=e.querySelector(".back__top"),v=e.querySelector(".back__bottom"),m=parseInt(l.textContent,10);m!==o&&(e.classList.remove("flip"),e.offsetWidth,C.setAttribute("data-value",o),v.setAttribute("data-value",o),v.textContent=o,_.setAttribute("data-value",o),_.textContent=o,l.textContent=m,setTimeout(()=>{l.textContent=o},300),e.classList.add("flip"))}}a(),setInterval(a,1e3)}},B={class:"body-countdown"};function q(r,s,n,i,d,a){return S(),x("div",B,s[0]||(s[0]=[M("div",{class:"flip-clock",id:"flipClock"},null,-1)]))}const T=h(w,[["render",q]]);export{T as default};
