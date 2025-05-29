import{_,r as d,j as b,c as e,F as v,f as y,b as a,o as i,n as w,t as u}from"./index-BmkYZAYt.js";const x=`<script>\r
  $(window).scroll(function () {\r
    if ($(this).scrollTop() > 0) {\r
      $(".itopplus-banner").addClass("itopplus-sticky");\r
    } else {\r
      $(".itopplus-banner").removeClass("itopplus-sticky");\r
    }\r
  });\r
<\/script>\r
\r
<style>\r
  @media screen and (min-width: 1024px) {\r
    .no-js .itopplus-banner {\r
      position: fixed;\r
      background: transparent;\r
      width: 100%;\r
      z-index: 1000;\r
      transition: 0.3s;\r
    }\r
\r
    .itopplus-sticky {\r
      background: #fff;\r
    }\r
  }\r
</style>\r
\r
<style>\r
  @media screen and (min-width: 1024px) {\r
    .no-js .itopplus-banner {\r
      position: fixed;\r
      background: transparent;\r
      width: 100%;\r
      z-index: 1000;\r
      transition: 0.3s;\r
    }\r
\r
    .itopplus-sticky {\r
      background: #fff;\r
    }\r
\r
    .itopplus-logo {\r
      position: relative;\r
      height: clamp(90px, 6vw, 100px);\r
      transition: 0.3s;\r
    }\r
\r
    #controlBanner {\r
      object-fit: contain;\r
      padding: 15px;\r
      width: clamp(160px, 70%, 20vw);\r
      margin: 0 auto;\r
      transition: 0.3s;\r
    }\r
\r
    .itopplus-sticky .itopplus-logo {\r
      height: 120px;\r
    }\r
\r
    .itopplus-sticky #controlBanner {\r
      width: 120px;\r
    }\r
  }\r
</style>\r
\r
<style>\r
  @media screen and (min-width: 1024px) {\r
    #controlMenu :is(a:not(.dropdown-menu a)) {\r
      color: #fff;\r
    }\r
\r
    #controlMenu :is(a:hover, a:focus, a:active, .open > a) {\r
      border-color: #fff;\r
    }\r
\r
    .itopplus-sticky #controlMenu :is(a) {\r
      color: #444 !important;\r
    }\r
\r
    .itopplus-sticky #controlMenu :is(a:hover, a:focus, a:active, .open > a) {\r
      border-color: #444 !important;\r
    }\r
  }\r
</style>\r
`,k=`<style>\r
  @media screen and (max-width: 0px) {\r
    #itopplus-sticky-nav-bar .navbar-default {\r
      background: #0f3371 !important;\r
    }\r
\r
    .itopplus-sticky-nav-bar-inside {\r
      display: grid;\r
      grid-template-columns: 15% auto;\r
      width: 100% !important;\r
      align-items: center;\r
      padding: 0 5vw !important;\r
      background: #0f3371 !important;\r
    }\r
\r
    #itopplus-sticky-nav-bar {\r
      animation-duration: 0.8s !important;\r
    }\r
\r
    .itopplus-sticky-nav-bar-inside > div {\r
      width: 100%;\r
    }\r
\r
    #itopplus-sticky-nav-bar #itopplus-nav-bar-sticky {\r
      display: flex;\r
      justify-content: flex-end;\r
      gap: 10px;\r
      width: 100%;\r
    }\r
\r
    .itopplus-menu-logo,\r
    img.itopplus-img-logo {\r
      height: 100% !important;\r
      width: 100% !important;\r
      padding: 10px;\r
      margin: auto;\r
    }\r
  }\r
</style>\r
`,$=`$(document).ready(function () {\r
  $(document).on("click", function (e) {\r
    if ($(e.target).closest(".test").length) {\r
      $(".test").toggleClass("active");\r
    } else {\r
      $(".test").removeClass("active");\r
    }\r
  });\r
});\r
\r
$(document).ready(function () {\r
  const Target = [".test", ".test", ".test"];\r
  $(document).on("click", function (e) {\r
    Target.forEach(function (filter) {\r
      if ($(e.target).closest(filter).length) {\r
        $(filter).toggleClass("open");\r
      } else {\r
        $(filter).removeClass("open");\r
      }\r
    });\r
  });\r
});\r
\r
$(document).ready(function () {\r
  $(document).on("click", function (e) {\r
    if ($(e.target).closest(".test").length) {\r
      $(".jelwery_cate_filter").toggleClass("open");\r
    } else {\r
      $(".jelwery_cate_filter").removeClass("open");\r
    }\r
\r
    if ($(e.target).closest(".test2").length) {\r
      $(".jelwery_cate_filter2").toggleClass("open2");\r
    } else {\r
      $(".jelwery_cate_filter2").removeClass("open2");\r
    }\r
  });\r
});\r
`,z=`$(document).ready(() => {\r
  triggerScroll();\r
  $(window).on("hashchange", () => setTimeout(triggerScroll, 1000));\r
});\r
\r
function triggerScroll() {\r
  const $findElement = $("#section1"); //link\r
  if ($findElement.length) {\r
    $findElement.on("click", () => {\r
      const $targetElement = $("#itopplus-footer"); //target\r
      if ($targetElement.length) {\r
        $("html, body").animate(\r
          {\r
            scrollTop: $targetElement.offset().top,\r
          },\r
          1000\r
        );\r
      }\r
    });\r
  } else {\r
    setTimeout(triggerScroll, 500);\r
  }\r
}\r
\r
$(document).ready(() => {\r
  triggerScroll();\r
  $(window).on("hashchange", () => setTimeout(triggerScroll, 1000));\r
});\r
\r
function triggerScroll() {\r
  const $findElement = $("#section1");\r
  if ($findElement.length) {\r
    $findElement.on("click", () => {\r
      const scrollPercentage = 55;\r
      const documentHeight = $(document).height();\r
      const targetScrollPosition = (documentHeight * scrollPercentage) / 100;\r
      $("html, body").animate(\r
        {\r
          scrollTop: targetScrollPosition,\r
        },\r
        1000\r
      );\r
    });\r
  } else {\r
    setTimeout(triggerScroll, 1000);\r
  }\r
}\r
`,S=`<script>\r
  $(document).ready(function () {\r
    $(document).on("click", function (e) {\r
      var $target = $(e.target);\r
      if ($target.closest(".itopplus-search .ui.search").length) {\r
        $(".itopplus-search .ui.icon.input").addClass("expanded");\r
      } else {\r
        $(".itopplus-search .ui.icon.input").removeClass("expanded");\r
      }\r
    });\r
  });\r
<\/script>\r
\r
<style>\r
  .itopplus-search .ui.icon.input {\r
    display: flex;\r
    flex-direction: row-reverse;\r
    position: relative;\r
    width: 60px;\r
    height: 60px;\r
  }\r
\r
  .itopplus-search .ui.icon.input > i.icon {\r
    position: absolute;\r
    right: 10px;\r
  }\r
\r
  .itopplus-search .ui.icon.input.expanded {\r
    width: 15vw;\r
    border-radius: 0;\r
  }\r
\r
  .itopplus-search .ui.icon.input input {\r
    position: relative;\r
    width: 40px;\r
    padding: 0;\r
    transition: 0.4s;\r
  }\r
\r
  .itopplus-search .ui.icon.input.expanded input {\r
    position: relative;\r
    width: 15vw;\r
    padding-left: 20px;\r
  }\r
</style>\r
`,I=`<style>\r
  .itopplus-nav-bar li:not(:last-of-type):not(.itopplus-sidebar-menu-parent):not(.dropdown-submenu):after {\r
    content: "|";\r
    display: grid;\r
    place-content: center;\r
    color: #444;\r
  }\r
\r
  #itopplus-nav-bar > li {\r
    display: -webkit-inline-box;\r
  }\r
\r
  .navbar-header {\r
    height: 80px;\r
  }\r
  .itopplus-sidebar-background,\r
  .itopplus-sidebar-main {\r
    top: 80px;\r
  }\r
\r
  #controlMenu :is(a:not(.dropdown-menu a)) {\r
    color: #fff;\r
  }\r
\r
  #controlMenu :is(a:hover, a:focus, a:active, .open > a) {\r
    border-color: #fff;\r
  }\r
\r
  .itopplus-sticky #controlMenu :is(a) {\r
    color: #444 !important;\r
  }\r
\r
  .itopplus-sticky #controlMenu :is(a:hover, a:focus, a:active, .open > a) {\r
    border-color: #444 !important;\r
  }\r
\r
  /**/\r
  .itopplus-layout {\r
    display: grid;\r
    grid-template-columns: 25% 75%;\r
    gap: 20px;\r
    overflow: hidden;\r
  }\r
\r
  /*แก้อะไรสักอย่างมองภาพไม่ออก*/\r
  .itopplus-logo {\r
    position: relative;\r
    height: clamp(90px, 6vw, 100px);\r
    transition: 0.3s;\r
  }\r
\r
  #controlBanner {\r
    object-fit: contain;\r
    padding: 15px;\r
    width: clamp(160px, 60%, 20vw);\r
    margin: 0 auto;\r
    transition: 0.3s;\r
  }\r
\r
  .itopplus-sticky .itopplus-logo {\r
    height: 120px;\r
  }\r
\r
  .itopplus-sticky #controlBanner {\r
    width: 120px;\r
  }\r
</style>\r
\r
<style>\r
  #itpphonemobile::before {\r
    background-image: url(https://itp1.itopfile.com/ImageServer/z_itp_2711202470mi/0/0/telz-z1565433624019.png) !important;\r
    /*\r
    background-image: url(  https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/telz-z77323662137.png) !important;\r
    */\r
  }\r
\r
  #itpsearchmobile::before {\r
    background-image: url(https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/searchz-z1134319420589.png) !important;\r
  }\r
\r
  .old-image-icon-facebook::before {\r
    background-image: url(https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/facebookz-z1318628404704.png) !important;\r
  }\r
\r
  .old-image-icon-line::before {\r
    background-image: url(https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/linez-z1655517020729.png) !important;\r
  }\r
\r
  .old-image-icon-instragram::before {\r
    background-image: url(https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/instagramz-z1066049211157.png) !important;\r
  }\r
\r
  .old-image-icon-youtube::before {\r
    background-image: url(https://itp1.itopfile.com/ImageServer/z_itp_09062024wnrm/0/0/youtubez-z1416596488876.png) !important;\r
  }\r
\r
  .new-image-icon-twitter::before {\r
    background-image: url(https://itp1.itopfile.com/ImageServer/z_itp_24092023yxze/0/0/cf-twitterz-z1322532545693.png) !important;\r
  }\r
</style>\r
\r
<style>\r
  /*split menu new technic*/\r
  .itopplus-banner > .container {\r
    display: grid;\r
    height: 95px;\r
    align-items: center;\r
  }\r
  #itopplus-nav-bar::before,\r
  #itopplus-nav-bar::after {\r
    display: none;\r
  }\r
\r
  #itopplus-nav-bar a {\r
    width: fit-content;\r
  }\r
\r
  #itopplus-nav-bar > li:nth-child(3) {\r
    flex: 2;\r
  }\r
\r
  #itopplus-nav-bar > li:nth-child(4) {\r
    flex: 2;\r
    display: grid;\r
    justify-content: end;\r
  }\r
\r
  #itopplus-nav-bar > li:nth-child(4) .dropdown-menu {\r
    left: auto;\r
    right: -4vw;\r
  }\r
\r
  .itopplus-logo {\r
    position: absolute;\r
    width: fit-content;\r
    margin: auto;\r
    left: 0;\r
    right: 0;\r
    z-index: 1;\r
  }\r
</style>\r
`,T=`<style>\r
  @media screen and (max-width: 0px) {\r
    .itp-intro {\r
      width: 100vw;\r
      height: 100vh;\r
    }\r
\r
    .itp-intro img {\r
      height: 100%;\r
    }\r
\r
    .itopplus-banner,\r
    .itopplus-pos2,\r
    footer {\r
      display: none;\r
    }\r
\r
    @media screen and (min-width: 1201px) {\r
      .itp-intro img {\r
        object-fit: cover;\r
      }\r
    }\r
\r
    @media screen and (max-width: 1200px) {\r
      .itp-intro img {\r
        object-fit: contain;\r
      }\r
    }\r
  }\r
</style>\r
`,j=`//option 1\r
$(document).ready(function () {\r
  $(".test").html("<span>-10%</span>");\r
  window.onhashchange = function () {\r
    $(".test").html("<span>-10%</span>");\r
  };\r
});\r
\r
//option 2\r
window.onhashchange = function () {\r
  setTimeout(function () {\r
    $("#test").placeholder("Please enter your telephone number");\r
  }, 200);\r
};\r
\r
//remove text place in master page\r
$(".itopplus-search-shopcart-name").each(function () {\r
  let text = $(this).text();\r
  let newText = text.replace("ชื่อสินค้า ", "");\r
  $(this).text(newText);\r
});\r
`,C=`.unknown {\r
  position: fixed;\r
  bottom: 8% !important;\r
}\r
\r
.unknown_prf .btn-main,\r
.unknown_prf:hover .btn-main {\r
  margin-bottom: 0 !important;\r
}\r
`,P={key:0,class:"itp-work"},E={class:"file-header"},B={class:"file-name"},M={class:"file-content"},F={key:1},A={__name:"QuickAccess",setup(O){const m=d(Object.entries(Object.assign({"/ITP/BannerSticky.html":x,"/ITP/BannerStickyDefault.html":k,"/ITP/ClickAddClass.js":$,"/ITP/ClickToScroll.js":z,"/ITP/Custom-Search.html":S,"/ITP/Extend.html":I,"/ITP/IntroPage.html":T,"/ITP/ReplaceAttr.js":j,"/ITP/Smart-Widget.css":C})).map(([t,n])=>({path:t,content:n}))),g=(()=>{try{const t=localStorage.getItem("itpViewerFileOrder"),n=JSON.parse(t);return Array.isArray(n)?n:[]}catch{return[]}})(),h=t=>{const n=t.split("/").pop()||"",r=n.lastIndexOf(".");return r>0?n.slice(0,r):n},l=d([]),f=(t,n)=>{const r=new Map(n.map((o,s)=>[o,s]));return[...t].sort((o,s)=>{const p=r.get(o.path),c=r.get(s.path);return p!==void 0&&c!==void 0?p-c:p!==void 0?-1:c!==void 0?1:o.path.localeCompare(s.path)})};return b(()=>{l.value=f(m.value,g)}),(t,n)=>(i(),e("div",null,[l.value.length>0?(i(),e("div",P,[(i(!0),e(v,null,y(l.value,r=>(i(),e("div",{key:r.path,class:w(["file-entry",{"js-file":r.path.endsWith(".js"),"css-file":r.path.endsWith(".css"),"html-file":r.path.endsWith(".html")}])},[a("div",E,[a("div",B,u(h(r.path)),1)]),a("pre",M,u(r.content),1)],2))),128))])):(i(),e("div",F,n[0]||(n[0]=[a("p",null,"No files found in the /ITP/ directory.",-1)])))]))}},R=_(A,[["__scopeId","data-v-7b99a046"]]);export{R as default};
