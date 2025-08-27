import{_ as h,c as x,a as M,o as S}from"./index-CDPYIlxD.js";const w={mounted(){const i=["Days","Hours","Minutes","Seconds"],c=document.getElementById("flipClock"),n={};function l(e){const t=document.createElement("div");return t.className="flip-clock__piece",t.innerHTML=`
        <div class="flip-card">
          <div class="flip-card__top">0</div>
          <div class="flip-card__bottom">0</div>
          <div class="flip-card__back-top">0</div>
          <div class="flip-card__back-bottom">0</div>
        </div>
        <div>${e}</div>
      `,t}i.forEach(e=>{const t=l(e);c.appendChild(t),n[e]=t.querySelector(".flip-card")});const r=new Date("2025-12-31T23:59:59");function a(){let t=Math.max(0,r-new Date);const d=Math.floor(t/(1e3*60*60*24));t-=d*(1e3*60*60*24);const p=Math.floor(t/(1e3*60*60));t-=p*(1e3*60*60);const f=Math.floor(t/(1e3*60));t-=f*(1e3*60);const m=Math.floor(t/1e3),v={Days:d,Hours:p,Minutes:f,Seconds:m};for(const[b,s]of Object.entries(v)){const o=n[b],u=o.querySelector(".flip-card__top"),k=o.querySelector(".flip-card__bottom"),y=o.querySelector(".flip-card__back-top"),C=o.querySelector(".flip-card__back-bottom"),_=parseInt(u.textContent,10);_!==s&&(y.textContent=_,C.textContent=s,o.classList.remove("flip"),o.offsetWidth,o.classList.add("flip"),u.textContent=s,k.textContent=s)}}a(),setInterval(a,1e3)}},q={class:"body-countdown"};function B(i,c,n,l,r,a){return S(),x("div",q,c[0]||(c[0]=[M("div",{class:"flip-clock",id:"flipClock"},null,-1)]))}const $=h(w,[["render",B]]);export{$ as default};
